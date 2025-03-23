import 'react-native-url-polyfill/auto.js';
import {View, ScrollView, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {React, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {toggleTheme} from '../../redux/darkThemeSlice';
import {supabase} from '../../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './Styling';

const Login = ({navigation}) => {

  const darkTheme = useSelector((state) => state.darkTheme.value);
  const dispatch = useDispatch();

  const [showLoginLoader, setShowLoginLoader] = useState(false);
  const [user, setUser] = useState({email : '', password : ''});
  const [secureEntry, setSecureEntry] = useState(true);

  const missingFields = "Please enter all the required fields!"; //used with the Alert component
  const invalidEmail = "Please provide a valid E-mail address!";
  const invalidPassword = "Password must be 8 characters long!";
  const everythingCorrect = `Logged in successfully!`; //used with the Alert component

  const modifyUserDetails = (field, value) => {
    setUser({...user, [field] : value});
  };

  const checkEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(user.email == '') return true;
    else if(!emailRegex.test(user.email)){
      return false;
    }
    else{
      return true;
    }
  };
  const checkPassword = () => {
    if(user.password == '') return true;
    else if(user.password.length < 8){
      return false;
    }
    else{
      return true;
    }
  };

  const handleOrdinaryLoginEvent = async() => {
    if(user.email == '' || user.password == ''){
      Alert.alert('Error❌', `${missingFields}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
    }
    else if(!checkEmail()){
      Alert.alert('Error❌', `${invalidEmail}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      setUser({...user, email : ''});
    }
    else if(!checkPassword()){
      Alert.alert('Error❌', `${invalidPassword}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      setUser({...user, password : ''});
    }
    else{
      //here, supabase authentication is going to be performed first
      setShowLoginLoader(true);
      const {error : loginError} = await supabase.auth.signInWithPassword({
        email : user.email,
        password : user.password
      });
      if(loginError){
        setShowLoginLoader(false);
        Alert.alert('Error❌', loginError.message, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
        return;
      }
      Alert.alert(
        'Success✅',
        `${everythingCorrect}`,
        [{text : "Dismiss", style : 'cancel', onPress : () => navigation.reset({
          index : 0,
          routes : [
            {name : "Main Menu"}
          ]
        })}],
        {cancelable : false}
      );
      setUser({});    //clearing the input fields
      setShowLoginLoader(false);
    }
  };

  const handleNonExistingAccountEvent = () => {
    navigation.goBack();
  };

  const handleThemeToggleEvent = async() => {
    const toggledValue = !darkTheme;
    await AsyncStorage.setItem('darkTheme', JSON.stringify(toggledValue));
    dispatch(toggleTheme());
  };

  return (
    <KeyboardAvoidingView style = {{flex : 1, backgroundColor : darkTheme ? "black" : "white"}}>

      <TouchableWithoutFeedback onPressOut = {() => Keyboard.dismiss()}>

        <ScrollView contentContainerStyle = {Styles.container} keyboardShouldPersistTaps = 'handled'>

          {showLoginLoader ? 
          <>
            <ActivityIndicator size = {'large'} color = "rgba(200, 0, 255, 1)"/>
          </> : 
          <>
            <TouchableOpacity
            style = {Styles.themeButton}
            activeOpacity = {0.4}
            onPressOut = {handleThemeToggleEvent}
          >
              <Icon name = {darkTheme ? "sunny" : "moon"} size = {30} color = {darkTheme ? "white" : "black"}/>
            </TouchableOpacity>

            <Text style = {Styles.mainHeading}>YapAI</Text>
            <Text style = {Styles.subMainHeading}>Login</Text>

            <TextInput style = {[Styles.textBox, {color : darkTheme ? "white" : "black"}]}
              value = {user.email}
              placeholder = 'Email'
              placeholderTextColor = 'rgba(255, 120, 0, 1)'
              autoComplete = 'none' autoCorrect = {false} autoCapitalize = 'none'
              keyboardType = 'email-address'
              onChangeText = {(val) => modifyUserDetails('email', val)}
            />

            <View style={Styles.passwordContainer}>
              <TextInput
                style={[Styles.passwordInput, {color : darkTheme ? "white" : "black"}]}
                value={user.password}
                placeholder='Password'
                placeholderTextColor='rgba(255, 120, 0, 1)'
                autoComplete='none' autoCorrect={false} autoCapitalize='none'
                secureTextEntry={secureEntry}
                onChangeText={(val) => modifyUserDetails('password', val)}
              />
              <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)} style={{ padding: 10 }}>
                <Icon name={secureEntry ? "eye" : "eye-off"} size={26} color='rgba(255, 120, 0, 1)' />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[Styles.ordinaryLoginButton, { backgroundColor: !darkTheme ? 'rgba(255, 120, 0, 1)' : 'rgba(200, 0, 255, 1)' }]}
              activeOpacity={0.4}
              onPressOut={handleOrdinaryLoginEvent}
            >
              <Text style={[Styles.loginButtonText, { color: !darkTheme ? "black" : "white" }]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {Styles.nonExistingAccountButton} activeOpacity = {0.4} onPressOut = {handleNonExistingAccountEvent}>
              <Text style = {[Styles.nonExistingAccountButtonText, {color : !darkTheme ? 'rgba(200, 0, 255, 1)' : "rgba(255, 120, 0, 1)"}]}>New to the App?</Text>
            </TouchableOpacity>
          </>
          }

        </ScrollView>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

export default Login;