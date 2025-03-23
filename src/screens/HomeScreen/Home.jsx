import 'react-native-url-polyfill/auto';
import {View, ScrollView, Text, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {React, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {supabase} from '../../../lib/supabase';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './Styling';

const Home = ({navigation}) => {

  useEffect(() => {
    fetchChat();
    updateUserEmail();
  }, []);

  const darkTheme = useSelector((state) => state.darkTheme.value);

  const [currChat, setCurrChat] = useState(null);
  const [chatLoader, setChatLoader] = useState(false);

  const fetchChat = async() => {
    const {data : {user}, error : userFetchError} = await supabase.auth.getUser();
    if(userFetchError){
      Alert.alert('Error❌', userFetchError.message, [{text : "Dismiss", style : "cancel"}], {cancelable : false});
      return;
    }
    setChatLoader(true);
    const userID = user.id;
    const {data : chat, error : chatFetchError} = await supabase.from("chats").select('*').eq('user_id', userID).maybeSingle();
    if(chatFetchError){
      setChatLoader(false);
      Alert.alert('Error❌', chatFetchError.message, [{text : "Dismiss", style : "cancel"}], {cancelable : false});
      return;
    }
    setCurrChat(chat);
    setChatLoader(false);
  };

  const createChat = async() => {
    const {data : {user}, error : userFetchError} = await supabase.auth.getUser();
    if(userFetchError){
      Alert.alert('Error❌', userFetchError.message, [{text : "Dismiss", style : "cancel"}], {cancelable : false});
      return;
    }
    setChatLoader(true);
    const userID = user.id;
    const {data : newChat, error: newChatError} = await supabase.from('chats').upsert({user_id : userID, messages : []}, {onConflict : 'user_id'}).select().maybeSingle();
    if(newChatError){
      setChatLoader(false);
      Alert.alert('Error❌', newChatError.message, [{text : "Dismiss", style : "cancel"}], {cancelable : false});
      return;
    }
    setCurrChat(newChat);
    setChatLoader(false);
  };

  const handleCreateChatEvent = () => {
    if(!currChat){
      createChat();
      navigation.navigate('Chat Page');
    }
    else{
      Alert.alert(
        'Confirmation',
        'An existing chat load has already been found. Proceeding will override it!',
        [
          {text : "Cancel", style : "cancel"},
          {text : "Proceed", style : "default", onPress : async() => {
            await createChat();
            navigation.navigate('Chat Page');
          }}
        ],
        {cancelable : false}
      );
    }
  };

  const handleLoadChatEvent = async() => {
    if(currChat){
      navigation.navigate('Chat Page');
    }
    else{
      Alert.alert('Error❌', 'No existing chat found!', [{text : "Dismiss", style : "cancel"}], {cancelable : false});
    }
  };

  const updateUserEmail = async() => {
    const {data : {user}, error : userError} = await supabase.auth.getUser();
    if(userError){
      Alert.alert('Error❌', userError.message, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      return;
    }
    //user found in the ongoing session
    const userID = user.id;   //this is the uuid of the user which matches the uid of the user from auth table to User table
    const {error : emailUpdateError} = await supabase.from("User").update({email : user.email}).eq("id", userID);
    if(emailUpdateError){
      Alert.alert(`Error❌`, 'Could not update email in User table', [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      return;
    }
  };

  return (
    <KeyboardAvoidingView style = {{flex : 1}}>

      <TouchableWithoutFeedback onPressOut = {() => Keyboard.dismiss()}>

        <ScrollView contentContainerStyle = {[Styles.container, {backgroundColor : darkTheme ? "rgba(0, 0, 0, 0.85)" : "rgba(200, 0, 255, 0.01)"}]} keyboardShouldPersistTaps = 'handled'>
          
        {chatLoader ? 
        <>
          <View style = {{flex : 1, flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
            <ActivityIndicator size={'large'} color = {'rgba(200, 0, 255, 1)'}/>
          </View>
        </> : 
        <>
          <View style = {Styles.screenTitleView}>
            <Text style = {Styles.screenTitle}>Home</Text>
            <TouchableOpacity style = {Styles.refreshButton} activeOpacity = {0.4} onPressOut = {() => fetchChat()}>
              <Icon name = 'refresh-circle' size = {40} color = "rgba(200, 0, 255, 1)"/>
            </TouchableOpacity>
          </View>

          <View style = {{justifyContent : 'center', alignItems : 'center'}}>

            <Text style = {Styles.tagLine}>Your Personal AI Assistant.</Text>

            <View style = {{marginTop : 80}}>
              <TouchableOpacity style = {[Styles.button, {backgroundColor : darkTheme ? "rgba(200, 0, 255, 1)" : "rgba(255, 120, 0, 1)"}]} activeOpacity = {0.4} onPressOut = {handleCreateChatEvent}>
                <Text style = {[Styles.buttonText, {color : darkTheme ? "white" : "black"}]}>Create New Chat</Text>
                <Icon name = 'add-circle' size = {30} color = {darkTheme ? "white" : "black"}/>
              </TouchableOpacity>

              <TouchableOpacity style = {[Styles.button, {backgroundColor : darkTheme ? "rgba(200, 0, 255, 1)" : "rgba(255, 120, 0, 1)"}]} activeOpacity = {0.4} onPressOut = {handleLoadChatEvent}>
                <Text style = {[Styles.buttonText, {color : darkTheme ? "white" : "black"}]}>Load Chat</Text>
                <Icon name = 'chatbox' size = {30} color = {darkTheme ? "white" : "black"}/>
              </TouchableOpacity>
            </View>

          </View>
        </> 
        }

        </ScrollView>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

export default Home;