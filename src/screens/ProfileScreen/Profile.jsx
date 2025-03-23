import 'react-native-url-polyfill/auto';
import {ScrollView, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Modal} from 'react-native';
import {React, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {supabase} from '../../../lib/supabase';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './Styling';

const Profile = ({navigation}) => {

  useEffect(() => {
    getUserData();
  }, []);

  const darkTheme = useSelector((state) => state.darkTheme.value);

  const [showLoader, setShowLoader] = useState(false);
  const [currUser, setCurrUser] = useState({id : '', first_name : '', last_name : '', email : '', created_at : '', messages_count : undefined});
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [showFirstNameModal, setShowFirstNameModal] = useState(false);
  const [showLastNameModal, setShowLastNameModal] = useState(false);

  const missingFields = "Please enter all the required fields!";
  const invalidFirstName = "Please enter a valid first name!";
  const invalidLastName = "Please enter a valid last name!";

  const getUserData = async() => {
    const {data : {user}, error : userFetchError} = await supabase.auth.getUser();
    if(userFetchError){
      Alert.alert('Error❌', userFetchError.message, [{text : "Dismiss", style : "cancel"}], {cancelable : false});
      return;
    }
    setShowLoader(true);
    const userID = user.id;   //uid of the current user logged in for the current session
    const {data : userRecord, error : userSelectError} = await supabase.from('User').select('*').eq('id', userID).single();
    if(userSelectError){
      setShowLoader(false);
      Alert.alert('Error❌', userSelectError.message, [{text : "Dismiss", style : "cancel"}], {cancelable : false});
      return;
    }
    //setting all the necessary fetched attributes locally
    setCurrUser({...currUser, id : userRecord.id, first_name : userRecord.first_name, last_name : userRecord.last_name, email : userRecord.email, created_at : userRecord.created_at, messages_count : userRecord.total_messages});
    //now, we have correctly initialized the current user object state after fetching the current details from the User table
    //now we can start displaying everything on the screen of the user by saying currUser.someParticularAttribute
    setShowLoader(false);
  };

  const checkFirstName = () => {
    const nameRegex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
    if(!nameRegex.test(newFirstName)){
      return false;
    }
    else{
      return true;
    }
  };

  const checkLastName = () => {
    const nameRegex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
    if(!nameRegex.test(newLastName)){
      return false;
    }
    else{
      return true;
    }
  };

  const updateFirstName = async() => {
    if(newFirstName == ''){
      Alert.alert('Error❌', missingFields, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      return;
    }
    else if(!checkFirstName()){
      Alert.alert('Error❌', invalidFirstName, [{text : "Dismiss", style : "cancel"}], {cancelable : false});
      return;
    }
    else{
      const {data : {user}, error : userError} = await supabase.auth.getUser();
      if(userError){
        Alert.alert('Error❌', userError.message, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
        return;
      }
      const userID = user.id;
      const {error : updateError} = await supabase.from("User").update({first_name : newFirstName}).eq('id', userID);
      if(updateError){
        Alert.alert('Error❌', updateError.message, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
        return;
      }
      getUserData();
      Alert.alert(
        'Success✅',
        'First Name updated successfully!',
        [{text : "Dismiss", style : 'cancel', onPress : () => setShowFirstNameModal(false)}],
        {cancelable : false}
      );
      setNewFirstName('');
    }
  };
  
  const updateLastName = async() => {
    if(newLastName == ''){
      Alert.alert('Error❌', missingFields, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      return;
    }
    else if(!checkLastName()){
      Alert.alert('Error❌', invalidLastName, [{text : "Dismiss", style : "cancel"}], {cancelable : false});
      return;
    }
    else{
      const {data : {user}, error : userError} = await supabase.auth.getUser();
      if(userError){
        Alert.alert('Error❌', userError.message, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
        return;
      }
      const userID = user.id;
      const {error : updateError} = await supabase.from("User").update({last_name : newLastName}).eq('id', userID);
      if(updateError){
        Alert.alert('Error❌', updateError.message, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
        return;
      }
      getUserData();
      Alert.alert(
        'Success✅',
        'Last Name updated successfully!',
        [{text : "Dismiss", style : 'cancel', onPress : () => setShowLastNameModal(false)}],
        {cancelable : false}
      );
      setNewLastName('');
    }
  };

  return (
    <KeyboardAvoidingView style = {{flex : 1}}>

      <TouchableWithoutFeedback onPressOut = {() => Keyboard.dismiss()}>

        <ScrollView contentContainerStyle = {[Styles.container, {backgroundColor : darkTheme ? "rgba(0, 0, 0, 0.85)" : "rgba(200, 0, 255, 0.01)"}]} keyboardShouldPersistTaps = 'handled'>

        {showLoader ? 
        <>
          <View style = {{flex : 1, flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
            <ActivityIndicator size={'large'} color = {'rgba(200, 0, 255, 1)'}/>
          </View>
        </> : 
        <>
          <View style = {Styles.screenTitleView}>

            <Text style = {Styles.screenTitle}>Profile</Text>
            <TouchableOpacity style = {Styles.refreshButton} activeOpacity = {0.4} onPressOut = {() => getUserData()}>
              <Icon name = 'refresh-circle' size = {40} color = "rgba(200, 0, 255, 1)"/>
            </TouchableOpacity>

          </View>

          <View style = {Styles.firstNameView}>
            <Text style = {Styles.firstNameViewSectionHeader}>First Name</Text>
            <View style = {Styles.firstNameViewInnerView}>
              <Text style = {Styles.firstNameViewInnerViewText}>{currUser.first_name}</Text>
              <TouchableOpacity style = {[Styles.firstNameViewButton, {backgroundColor : darkTheme ? "white" : "black"}]} activeOpacity = {0.4} onPressOut = {() => setShowFirstNameModal(true)}>
                <Icon name = "pencil" size = {28} color = {darkTheme ? "black" : "white"}/>
               </TouchableOpacity>
            </View>
          </View>

          <View style = {Styles.lastNameView}>
            <Text style = {Styles.lastNameViewSectionHeader}>Last Name</Text>
            <View style = {Styles.lastNameViewInnerView}>
              <Text style = {Styles.lastNameViewInnerViewText}>{currUser.last_name}</Text>
              <TouchableOpacity style = {[Styles.lastNameViewButton, {backgroundColor : darkTheme ? "white" : "black"}]} activeOpacity = {0.4} onPressOut = {() => setShowLastNameModal(true)}>
                <Icon name = "pencil" size = {28} color = {darkTheme ? "black" : "white"}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style = {Styles.userIDView}>
            <Text style = {Styles.userIDViewSectionHeader}>User ID</Text>
            <View style = {Styles.userIDViewInnerView}>
              <Text style = {Styles.userIDViewInnerViewText}>{currUser.id}</Text>
            </View>
          </View>

          <View style = {Styles.emailView}>
            <Text style = {Styles.emailViewSectionHeader}>Email</Text>
            <View style = {Styles.emailViewInnerView}>
              <Text style = {Styles.emailViewInnerViewText}>{currUser.email}</Text>
            </View>
          </View>
          
          <View style = {Styles.accountView}>
            <Text style = {Styles.accountViewSectionHeader}>Account created on</Text>
            <View style = {Styles.accountViewInnerView}>
              <Text style = {Styles.accountViewInnerViewText}>{currUser.created_at.substring(0, 10)},   at {currUser.created_at.substring(11, 19)}</Text>
            </View>
          </View>

          <View style = {Styles.messagesView}>
            <Text style = {Styles.messagesViewSectionHeader}>Total Messages</Text>
            <View style = {Styles.messagesViewInnerView}>
              <Text style = {Styles.messagesViewInnerViewText}>{currUser.messages_count}</Text>
            </View>
          </View>

          <Modal visible = {showFirstNameModal} transparent = {true} animationType = 'fade'>

            <KeyboardAvoidingView style = {{flex : 1}}>

              <TouchableWithoutFeedback onPressOut = {() => Keyboard.dismiss()}>

                <View style = {[Styles.modalView, {backgroundColor : darkTheme ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.9)"}]}>
                
                  <Text style = {Styles.modalTitle}>Change First Name</Text>

                  <View style = {Styles.modalInnerView}>
                    <TextInput
                    style = {[Styles.modalTextBox, {color : darkTheme ? "white" : "black"}]}
                    value = {newFirstName}
                    placeholder = 'New First Name'
                    placeholderTextColor = 'rgba(255, 120, 0, 1)'
                    autoComplete = 'none' autoCorrect = {false}
                    onChangeText = {(val) => setNewFirstName(val)}
                    />
                  </View>

                  <View style = {Styles.modalButtonsView}>
                    <TouchableOpacity style = {[Styles.modalButton, {backgroundColor : darkTheme ? "rgba(200, 0, 255, 1)" : "rgba(255, 120, 0, 1)"}]} activeOpacity = {0.4} onPressOut = {() => setShowFirstNameModal(false)}>
                      <Text style = {[Styles.modalButtonText, {color : darkTheme ? "white" : "black"}]}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[Styles.modalButton, {backgroundColor : darkTheme ? "rgba(200, 0, 255, 1)" : "rgba(255, 120, 0, 1)"}]} activeOpacity = {0.4} onPressOut = {updateFirstName}>
                      <Text style = {[Styles.modalButtonText, {color : darkTheme ? "white" : "black"}]}>Confirm</Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

          </Modal>
    
          <Modal visible = {showLastNameModal} transparent = {true} animationType = 'fade'>

            <KeyboardAvoidingView style = {{flex : 1}}>

              <TouchableWithoutFeedback onPressOut = {() => Keyboard.dismiss()}>

                <View style = {[Styles.modalView, {backgroundColor : darkTheme ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.9)"}]}>
                
                  <Text style = {Styles.modalTitle}>Change Last Name</Text>

                  <View style = {Styles.modalInnerView}>
                    <TextInput
                    style = {[Styles.modalTextBox, {color : darkTheme ? "white" : "black"}]}
                    value = {newLastName}
                    placeholder = 'New Last Name'
                    placeholderTextColor = 'rgba(255, 120, 0, 1)'
                    autoComplete = 'none' autoCorrect = {false}
                    onChangeText = {(val) => setNewLastName(val)}
                    />
                  </View>

                  <View style = {Styles.modalButtonsView}>
                    <TouchableOpacity style = {[Styles.modalButton, {backgroundColor : darkTheme ? "rgba(200, 0, 255, 1)" : "rgba(255, 120, 0, 1)"}]} activeOpacity = {0.4} onPressOut = {() => setShowLastNameModal(false)}>
                      <Text style = {[Styles.modalButtonText, {color : darkTheme ? "white" : "black"}]}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[Styles.modalButton, {backgroundColor : darkTheme ? "rgba(200, 0, 255, 1)" : "rgba(255, 120, 0, 1)"}]} activeOpacity = {0.4} onPressOut = {updateLastName}>
                      <Text style = {[Styles.modalButtonText, {color : darkTheme ? "white" : "black"}]}>Confirm</Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

          </Modal>
        </>

        }

        </ScrollView>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

export default Profile;