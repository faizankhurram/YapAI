import 'react-native-url-polyfill/auto.js';
import {ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Modal, TextInput} from 'react-native';
import {React, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {supabase} from '../../../lib/supabase';
import {setTheme, toggleTheme} from '../../redux/darkThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './Styles';

const Settings = ({navigation}) => {

  const [showResetPasswordLoader, setShowResetPasswordLoader] = useState(false);
  const [showResetEmailLoader, setShowResetEmailLoader] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmedPassword, setNewConfirmedPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [firstSecureEntry, setFirstSecureEntry] = useState(true);
  const [secondSecureEntry, setSecondSecureEntry] = useState(true);

  const missingFields = "Please enter all the required fields!";
  const invalidEmail = "Please provide a valid E-mail address!";
  const invalidPassword = "Password must be 8 characters long!";
  const mismatchingPasswords = "Passwords do not match!";

  const darkTheme = useSelector((state) => state.darkTheme.value);
  const dispatch = useDispatch();

  const handleThemeToggleEvent = async() => {
    const toggledValue = !darkTheme;
    await AsyncStorage.setItem('darkTheme', JSON.stringify(toggledValue));
    dispatch(toggleTheme());
  };

  const checkEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(newEmail == '') return true;
    else if(!emailRegex.test(newEmail)){
      return false;
    }
    else{
      return true;
    }
  };

  const checkPassword = () => {
    if(newPassword == '') return true;
    else if(newPassword.length < 8){
      return false;
    }
    else{
      return true;
    }
  };

  const checkMatchingPasswords = () => {
    if(newConfirmedPassword === '') return true;
    else if(newPassword !== newConfirmedPassword){
      return false;
    }
    else{
      return true;
    }
  };

  const handleAddNewAccountEvent = () => {
    //just send the user to the signUp page
    navigation.navigate('SignUp Page');
  };

  const handleResetPasswordEvent = async() => {
    if(newPassword == '' || newConfirmedPassword == ''){
      Alert.alert('Error❌', `${missingFields}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
    }
    else if(!checkPassword()){
      Alert.alert('Error❌', `${invalidPassword}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      setNewPassword('');
    }
    else if(!checkMatchingPasswords()){
      Alert.alert('Error❌', `${mismatchingPasswords}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
    }
    else{
      setShowResetPasswordLoader(true);
      const {error : resetPasswordError} = await supabase.auth.updateUser({
        password : newPassword
      });
      if(resetPasswordError){
        setShowResetPasswordLoader(false);
        Alert.alert('Error', resetPasswordError.message, [{text : "Dismiss", style : "cancel"}], {cancelable : false});
        return;
      }
      Alert.alert(
        'Success✅',
        "Password successfully updated!",
        [{text : "Dismiss", style : "cancel", onPress : () => setShowPasswordModal(false)}],
        {cancelable : false}
      );
      setNewPassword(''); setNewConfirmedPassword('');
      setShowResetPasswordLoader(false);
    }
  };

  const handleResetEmailEvent = async() => {
    if(newEmail == ''){
      Alert.alert('Error❌', `${missingFields}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
    }
    else if(!checkEmail()){
      Alert.alert('Error❌', `${invalidEmail}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      setNewPassword('');
    }
    else{
      //here, update the email of the user using auth.updateUser
      setShowResetEmailLoader(true);
      const {error: resetEmailError} = await supabase.auth.updateUser({
        email : newEmail
      });
      if (resetEmailError) {
        setShowResetEmailLoader(false);
        Alert.alert('Error❌', resetEmailError.message, [{ text: "Dismiss", style: "cancel" }], { cancelable: false });
        return;
      }
      Alert.alert(
        'Success✅',
        "Confirm changes by visiting the link sent to your OLD inbox! The Email may take a while to send...",
        [{text : "Dismiss", style : "cancel", onPress : () => setShowEmailModal(false)}],
        {cancelable : false}
      );
      setNewEmail('');
      setShowResetEmailLoader(false);
    }
  };

  const handleLogoutEvent = async() => {
    const {error : logoutError} = await supabase.auth.signOut();
    if(logoutError){
      Alert.alert('Error❌', logoutError.message, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      return;
    }
    Alert.alert(
      'Session Ended✅',
      'Logged out successfully!',
      [{text : "Dismiss", style : 'cancel', onPress : async() =>
      {
        navigation.reset({
        index : 1,
        routes : [
          {name : "SignUp Page"},
          {name : "Login Page"}
        ]
      });
      await AsyncStorage.setItem('darkTheme', JSON.stringify(false));
      dispatch(setTheme(false));
      }}],
      {cancelable : false}
    );
  };

  return (
    <KeyboardAvoidingView style = {{flex : 1}}>

      <TouchableWithoutFeedback onPressOut = {() => Keyboard.dismiss()}>

        <ScrollView
        contentContainerStyle = {[Styles.container, {backgroundColor : darkTheme ? "rgba(0, 0, 0, 0.85)" : "rgba(200, 0, 255, 0.01)"}]}
        keyboardShouldPersistTaps = 'handled'
        >
          
          <View style = {Styles.screenTitleView}>
            <Text style = {Styles.screenTitle}>Settings</Text>
          </View>

          <View style = {Styles.appAppearanceView}>
            <Text style = {Styles.appAppearanceSectionHeader}>App Appearance</Text>
            <View style = {Styles.appAppearanceFirstInnerView}>
              <Text style = {Styles.appAppearanceFirstInnerViewText}>Change Color Theme</Text>
              <TouchableOpacity 
              style = {[Styles.appAppearanceFirstInnerViewButton, {backgroundColor : darkTheme ? "white" : "black"}]}
              activeOpacity = {0.4}
              onPressOut = {handleThemeToggleEvent}
              >
                <Icon name = {darkTheme ? "sunny" : "moon"} size = {25} color = {darkTheme ? "black" : "white"}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style = {Styles.accountView}>
            <Text style = {Styles.accountSectionHeader}>Account</Text>

            <View style = {Styles.accountFirstInnerView}>
              <Text style = {Styles.accountFirstInnerViewText}>Add a new Account</Text>
              <TouchableOpacity
              style = {[Styles.accountFirstInnerViewButton, {backgroundColor : darkTheme ? "white" : "black"}]}
              activeOpacity = {0.4}
              onPressOut = {handleAddNewAccountEvent}
              >
                <Icon name = "person-add" size = {25} color = {darkTheme ? "black" : "white"}/>
              </TouchableOpacity>
            </View>

            <View style = {Styles.accountSecondInnerView}>
              <Text style = {Styles.accountSecondInnerViewText}>Reset your password</Text>
              <TouchableOpacity 
              style = {[Styles.accountSecondInnerViewButton, {backgroundColor : darkTheme ? "white" : "black"}]}
              activeOpacity = {0.4}
              onPressOut = {() => setShowPasswordModal(true)}
              >
                <Icon name = "finger-print" size = {25} color = {darkTheme ? "black" : "white"}/>
              </TouchableOpacity>
            </View>

            <View style = {Styles.accountThirdInnerView}>
              <Text style = {Styles.accountThirdInnerViewText}>Reset your Email</Text>
              <TouchableOpacity
              style = {[Styles.accountThirdInnerViewButton, {backgroundColor : darkTheme ? "white" : "black"}]}
              activeOpacity = {0.4}
              onPressOut = {() => setShowEmailModal(true)}
              >
                <Icon name = "mail" size = {25} color = {darkTheme ? "black" : "white"}></Icon>
              </TouchableOpacity>
            </View>

            <View style = {Styles.accountFourthInnerView}>
              <Text style = {Styles.accountFourthInnerViewText}>Logout</Text>
              <TouchableOpacity
              style = {[Styles.accountFourthInnerViewButton, {backgroundColor : darkTheme ? "white" : "black"}]}
              activeOpacity = {0.4}
              onPressOut = {handleLogoutEvent}
              >
                <Icon name = "exit" size = {25} color = {darkTheme ? "black" : "white"}/>
              </TouchableOpacity>
            </View>

          </View>

          <Modal visible = {showPasswordModal} transparent = {true} animationType = 'fade'>

            <KeyboardAvoidingView style = {{flex : 1}}>

              <TouchableWithoutFeedback onPressOut = {() => Keyboard.dismiss()}>

                <View style = {[Styles.modalView, {backgroundColor : darkTheme ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.9)"}]}>
                
                {showResetPasswordLoader ? 
                <>
                  <ActivityIndicator size = {'large'} color = "rgba(200, 0, 255, 1)"/>
                </> : 
                <>
                  <Text style = {Styles.modalTitle}>Reset Password</Text>

                  <View style = {Styles.passwordModalFirstInnerView}>
                    <TextInput
                    style = {[Styles.modalTextBox, {color : darkTheme ? "white" : "black"}]}
                    value = {newPassword}
                    placeholder = 'New Password'
                    placeholderTextColor = 'rgba(255, 120, 0, 1)'
                    autoComplete = 'none' autoCorrect = {false} autoCapitalize = 'none'
                    secureTextEntry = {firstSecureEntry}
                    onChangeText = {(val) => setNewPassword(val)}
                    />
                    <TouchableOpacity style = {Styles.secureEntryButton} activeOpacity = {0.4} onPressOut = {() => setFirstSecureEntry(!firstSecureEntry)}>
                      <Icon name = {firstSecureEntry ? "eye" : "eye-off"} size = {30} color = "rgba(255, 120, 0, 1)"/>
                    </TouchableOpacity>
                  </View>

                  <View style = {Styles.passwordModalSecondInnerView}>
                    <TextInput
                    style = {[Styles.modalTextBox, {color : darkTheme ? "white" : "black"}]}
                    value = {newConfirmedPassword}
                    placeholder = 'Confirm your new Password'
                    placeholderTextColor = 'rgba(255, 120, 0, 1)'
                    autoComplete = 'none' autoCorrect = {false} autoCapitalize = 'none'
                    secureTextEntry = {secondSecureEntry}
                    onChangeText = {(val) => setNewConfirmedPassword(val)}
                    />
                    <TouchableOpacity style = {Styles.secureEntryButton} activeOpacity = {0.4} onPressOut = {() => setSecondSecureEntry(!secondSecureEntry)}>
                      <Icon name = {secondSecureEntry ? "eye" : "eye-off"} size = {30} color = "rgba(255, 120, 0, 1)"/>
                    </TouchableOpacity>
                  </View>

                  <View style = {Styles.modalButtonsView}>
                    <TouchableOpacity style = {[Styles.modalButton, {backgroundColor : darkTheme ? "rgba(200, 0, 255, 1)" : "rgba(255, 120, 0, 1)"}]} activeOpacity = {0.4} onPressOut = {() => setShowPasswordModal(false)}>
                      <Text style = {[Styles.modalButtonText, {color : darkTheme ? "white" : "black"}]}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[Styles.modalButton, {backgroundColor : darkTheme ? "rgba(200, 0, 255, 1)" : "rgba(255, 120, 0, 1)"}]} activeOpacity = {0.4} onPressOut = {handleResetPasswordEvent}>
                      <Text style = {[Styles.modalButtonText, {color : darkTheme ? "white" : "black"}]}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </>
                
                }

                </View>

              </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

          </Modal>

          <Modal visible = {showEmailModal} transparent = {true} animationType = 'fade'>

            <KeyboardAvoidingView style = {{flex : 1}}>

              <TouchableWithoutFeedback onPressOut = {() => Keyboard.dismiss()}>

                <View style = {[Styles.modalView, {backgroundColor : darkTheme ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.9)"}]}>
                
                {showResetEmailLoader ? 
                <>
                  <ActivityIndicator size = {'large'} color = "rgba(200, 0, 255, 1)"/>
                </> : 
                <>
                  <Text style = {Styles.modalTitle}>Reset Email</Text>

                  <View style = {Styles.emailModalInnerView}>
                    <TextInput
                    style = {[Styles.modalTextBox, {color : darkTheme ? "white" : "black"}]}
                    value = {newEmail}
                    placeholder = 'New Email'
                    placeholderTextColor = 'rgba(255, 120, 0, 1)'
                    autoComplete = 'none' autoCorrect = {false} autoCapitalize = 'none'
                    keyboardType = 'email-address'
                    onChangeText = {(val) => setNewEmail(val)}
                    />
                  </View>

                  <View style = {Styles.modalButtonsView}>
                    <TouchableOpacity style = {[Styles.modalButton, {backgroundColor : darkTheme ? "rgba(200, 0, 255, 1)" : "rgba(255, 120, 0, 1)"}]} activeOpacity = {0.4} onPressOut = {() => setShowEmailModal(false)}>
                      <Text style = {[Styles.modalButtonText, {color : darkTheme ? "white" : "black"}]}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[Styles.modalButton, {backgroundColor : darkTheme ? "rgba(200, 0, 255, 1)" : "rgba(255, 120, 0, 1)"}]} activeOpacity = {0.4} onPressOut = {handleResetEmailEvent}>
                      <Text style = {[Styles.modalButtonText, {color : darkTheme ? "white" : "black"}]}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </>
                
                }

                </View>

              </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

          </Modal>

        </ScrollView>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

export default Settings;