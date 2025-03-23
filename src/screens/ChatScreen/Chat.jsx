import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import {View, Text, TouchableOpacity, TextInput, FlatList, Alert, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {supabase} from '../../../lib/supabase';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {HUGGINGFACE_API_KEY} from '@env';
import Styles from './Styling';

const Chat = ({navigation}) => {

  useEffect(() => {
    fetchMessages();
  }, []);

  const [showLoader, setShowLoader] = useState(false);
  const [currMessage, setCurrMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const darkTheme = useSelector((state) => state.darkTheme.value);

  const fetchMessages = async () => {
    const {data: {user}, error: userError} = await supabase.auth.getUser();
    if(userError) {
      Alert.alert('Error❌', userError.message, [{text: "Dismiss", style: "cancel"}], {cancelable: false});
      return;
    }
    setShowLoader(true);
    const {data: chat, error: messagesFetchError} = await supabase.from('chats').select('messages').eq('user_id', user.id).maybeSingle();
    if(messagesFetchError) {
      setShowLoader(false);
      Alert.alert('Error❌', messagesFetchError.message, [{text: "Dismiss", style: "cancel"}], {cancelable: false});
      return;
    }
    setChatMessages(chat?.messages || []);
    setShowLoader(false);
  };

  const updateMessagesToSupabase = async (messages) => {
    const {data: {user}, error: userError} = await supabase.auth.getUser();
    if(userError){
      Alert.alert('Error❌', userError.message, [{text: "Dismiss", style: "cancel"}], {cancelable: false});
      return;
    }
    const {error} = await supabase.from('chats').upsert({user_id: user.id, messages}, {onConflict: 'user_id'});
    if(error){
      Alert.alert('Error❌', error.message, [{text: "Dismiss", style: "cancel"}], {cancelable: false});
    }
  };

  const updateUserMessageCount = async() => {
    const {data : {user}, error : userError} = await supabase.auth.getUser();
    if(userError){
      Alert.alert('Error❌', userError.message, [{text: "Dismiss", style: "cancel"}], {cancelable: false});
      return;
    }
    const userID = user.id;
    const {data : userRecord, error : userRecordError} = await supabase.from('User').select('total_messages').eq('id', userID).maybeSingle();
    if(userRecordError){
      Alert.alert('Error❌', userRecordError.message, [{text: "Dismiss", style: "cancel"}], {cancelable: false});
      return;
    }
    let currMessagesCount = userRecord.total_messages;
    currMessagesCount += 1;
    const {error : messagesUpdateError} = await supabase.from('User').update({total_messages : currMessagesCount}).eq('id', userID);
    if(messagesUpdateError){
      Alert.alert('Error❌', messagesUpdateError.message, [{text: "Dismiss", style: "cancel"}], {cancelable: false});
      return;
    }
  };

  const handleMessageSendEvent = async () => {
    if(currMessage.trim() === '') return;

    const trimmedMessage = currMessage.trim();

    const userMessage = {
      id: Date.now().toString(),
      text: trimmedMessage,
      createdAt: new Date(),
      sender: 'user',
    };

    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    await updateMessagesToSupabase(updatedMessages);
    updateUserMessageCount();
    setCurrMessage('');

    try{
      const response = await axios.post('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        {
          inputs: `### Instruction:\n${trimmedMessage}\n\n### Response:\n`,
        },
        {
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botReply =response.data[0]?.generated_text?.split('### Response:\n')[1]?.trim() || "Sorry, I didn't understand that.";

      const botMessage = {
        id: Date.now().toString() + '_bot',
        text: botReply,
        createdAt: new Date(),
        sender: 'bot',
      };

      const updatedMessagesWithBot = [...updatedMessages, botMessage];
      setChatMessages(updatedMessagesWithBot);
      await updateMessagesToSupabase(updatedMessagesWithBot);
    }
    catch(error){
      const errorMessage = {
        id: Date.now().toString() + '_error',
        text: 'Oops! Something went wrong. Try again later.',
        createdAt: new Date(),
        sender: 'bot',
      };

      const updatedMessagesWithError = [...updatedMessages, errorMessage];
      setChatMessages(updatedMessagesWithError);
      await updateMessagesToSupabase(updatedMessagesWithError);
      console.error('Chatbot Error:', error.message);
    }
  };

  const handleDeleteChatEvent = async () => {
    if(chatMessages.length === 0) return;
    Alert.alert(
      'Warning🚨',
      'Your chat will be completely deleted!',
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "default",
          onPress: async () => {
            setChatMessages([]);
            await updateMessagesToSupabase([]);
            const {data : {user}, error : userError} = await supabase.auth.getUser();
            if(userError){
              Alert.alert('Error❌', userError.message, [{text: "Dismiss", style: "cancel"}], {cancelable: false});
              return;
            }
            const userID = user.id;
            const {error : deleteError} = await supabase.from('chats').delete().eq('user_id', userID);
            if(deleteError){
              Alert.alert('Error❌', deleteError.message, [{text: "Dismiss", style: "cancel"}], {cancelable: false});
              return;
            }
            navigation.goBack();
          },
        },
      ],
      {cancelable: false}
    );
  };

  return (
    <KeyboardAvoidingView style = {{flex : 1}} behavior = "padding">

      <View style = {[Styles.container, {backgroundColor: darkTheme ? 'rgba(0, 0, 0, 0.85)' : 'rgba(200, 0, 255, 0.01)'}]}>

        {
          showLoader ? 
          <>
            <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
              <ActivityIndicator size = {'large'} color = "rgba(200, 0, 255, 1)"/>
            </View>
          </> : 
          <>
            <View style = {Styles.headerRow}>

              <TouchableOpacity style = {Styles.backButton} activeOpacity = {0.4} onPressOut = {() => navigation.goBack()}>
                <Icon name = "caret-back" size = {50} color = {darkTheme ? 'white' : 'black'} />
              </TouchableOpacity>

              <TouchableOpacity style = {Styles.trashButton} activeOpacity = {0.4} onPress = {handleDeleteChatEvent}>
                <Icon name = "trash" size = {30} color = "crimson" />
              </TouchableOpacity>
            </View>

            <View style = {{flex: 1}}>
              <FlatList
                data = {chatMessages.slice().reverse()}
                keyExtractor = {(item) => item.id.toString()}
                keyboardShouldPersistTaps = "handled"
                contentContainerStyle = {{flexGrow: 1, paddingBottom : 5}}
                inverted
                renderItem = {({item : message}) => (
                  <View style = {message.sender === 'user' ? [Styles.userTextBubble, {backgroundColor: darkTheme ? 'rgba(200, 0, 255, 1)' : 'rgba(255, 120, 0, 1)'}]
                        : [Styles.botTextBubble, {backgroundColor: darkTheme ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)'}]}
                  >
                    <Text style = {[Styles.messageText, {color: darkTheme ? 'white' : 'black'}]}>{message.text}</Text>
                  </View>
                )}
              />
            </View>

            <View style = {[Styles.inputView, {borderTopColor: darkTheme ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.2)'}]}>
              <TextInput
                style = {[Styles.textBox, {color: darkTheme ? 'white' : 'black'}]}
                value = {currMessage}
                placeholder = "Type something..."
                placeholderTextColor = {'rgba(255, 120, 0, 0.5)'}
                autoCapitalize = "none"
                autoComplete = "off"
                autoCorrect = {false}
                multiline
                onChangeText = {(val) => setCurrMessage(val)}
              />
              <TouchableOpacity style = {[Styles.inputButton, {backgroundColor: darkTheme ? 'rgba(200, 0, 255, 1)' : 'rgba(255, 120, 0, 1)'}]} activeOpacity = {0.4} onPressOut ={ handleMessageSendEvent}>
                <Icon name = "send" size = {25} color = {darkTheme ? 'white' : 'black'}/>
              </TouchableOpacity>
            </View>
          </>
        
        }

      </View>

    </KeyboardAvoidingView>
  );
};

export default Chat;