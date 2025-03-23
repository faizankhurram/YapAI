import 'react-native-url-polyfill/auto.js';
import {View, ScrollView, Text, TouchableOpacity, TextInput, ActivityIndicator, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Alert} from 'react-native';
import {React, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {supabase} from '../../../lib/supabase';
import {toggleTheme} from '../../redux/darkThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './Styling';

const SignUp = ({navigation}) => {

  const darkTheme = useSelector((state) => state.darkTheme.value);
  const dispatch = useDispatch();
  const [showSignUpLoader, setShowSignUpLoader] = useState(false);
  const [user, setUser] = useState({firstName : '', lastName : '', email : '', password : '', confirmedPassword : ''});
  const [firstSecureEntry, setFirstSecureEntry] = useState(true);
  const [secondSecureEntry, setSecondSecureEntry] = useState(true);

  const missingFields = "Please enter all the required fields!"; //used with the Alert component
  const invalidFirstName = "Please enter a valid first name!";
  const invalidLastName = "Please enter a valid last name!";
  const invalidPassword = "Password must be 8 characters long!";
  const mismatchingPasswords = "Passwords do not match!";
  const invalidEmail = "Please provide a valid E-mail address!";
  const everythingCorrect = `Account registered successfully!`; //used with the Alert component

  const checkFirstName = () => {
    const nameRegex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
    if(user.firstName === '') return true;
    else if(!nameRegex.test(user.firstName)){
      return false;
    }
    else{
      return true;
    }
  };
  const checkLastName = () => {
    const nameRegex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
    if(user.lastName === '') return true;
    else if(!nameRegex.test(user.lastName)){
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
  const checkMatchingPasswords = () => {
    if(user.confirmedPassword === '') return true;
    else if(user.password !== user.confirmedPassword){
      return false;
    }
    else{
      return true;
    }
  };

  const modifyUserDetails = (field, value) => {
    setUser({...user, [field] : value});
  };

  const handleOrdinarySignUpEvent = async() => {
    if(user.firstName == '' || user.lastName == '' || user.email == '' || user.password == '' || user.confirmedPassword == ''){
      Alert.alert('Error❌', `${missingFields}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
    }
    else if(!checkFirstName()){
      Alert.alert('Error❌', `${invalidFirstName}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      setUser({...user, firstName : ''});
    }
    else if(!checkLastName()){
      Alert.alert('Error❌', `${invalidLastName}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      setUser({...user, lastName : ''});
    }
    else if(!checkEmail()){
      Alert.alert('Error❌', `${invalidEmail}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      setUser({...user, email : ''});
    }
    else if(!checkPassword()){
      Alert.alert('Error❌', `${invalidPassword}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      setUser({...user, password : ''});
    }
    else if(!checkMatchingPasswords()){
      Alert.alert('Error❌', `${mismatchingPasswords}`, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
    }
    else{
      //supabase user registration logic will take place here
      setShowSignUpLoader(true);
      const {error : signUpError} = await supabase.auth.signUp({
        email : user.email,
        password : user.password,
        options : {
          emailRedirectTo : 'http://supabase.com'
        }
      });
      if(signUpError){
        setShowSignUpLoader(false);
        Alert.alert('Confirm Email', 'Please confirm using the link sent to your Email and press sign up again!', [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
        return;
      }
      const {data : signInData, error: signInError} = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if(signInError){
        setShowSignUpLoader(false);
        Alert.alert('Confirm Email', 'Please confirm using the link sent to your Email and press sign up again!', [{text: 'Dismiss', style: 'cancel'}], {cancelable: false});
        return;
      }
      const userID = signInData.user.id;
      const {error : insertError} = await supabase.from("User").insert([{id : userID, first_name : user.firstName, last_name : user.lastName, email : user.email}]);
      if(insertError){
        setShowSignUpLoader(false);
        Alert.alert('Error❌', insertError.message, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
        return;
      }
      Alert.alert(
        'Success✅',
        `${everythingCorrect}`,
        [{text : "Dismiss", style : 'cancel', onPress : () => navigation.navigate('Login Page')}],
        {cancelable : false}
      );
      setUser({});    //clearing the input fields
      setShowSignUpLoader(false);
    }
  };

  const handleExistingAccountEvent = () => {
    navigation.navigate('Login Page');
  };

  const handleThemeToggleEvent = async() => {
    const toggledValue = !darkTheme;
    await AsyncStorage.setItem('darkTheme', JSON.stringify(toggledValue));
    dispatch(toggleTheme());
  };

  return (
    <KeyboardAvoidingView style = {{flex : 1}}>

      <TouchableWithoutFeedback onPressOut = {() => Keyboard.dismiss()}>

        <ScrollView contentContainerStyle = {[Styles.container, {backgroundColor : darkTheme ? "black" : "white"}]} keyboardShouldPersistTaps = 'handled'>

          {showSignUpLoader ? 
          <>
            <ActivityIndicator size = {'large'} color = 'rgba(200, 0, 255, 1)'/>
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
            <Text style = {Styles.subMainHeading}>Create your Account</Text>

            <TextInput style = {[Styles.textBox, {color : darkTheme ? "white" : "black"}]}
            value = {user.firstName}
            placeholder = 'First Name'
            placeholderTextColor = 'rgba(255, 120, 0, 1)'
            autoComplete = 'none' autoCorrect = {false}
            onChangeText = {(val) => modifyUserDetails('firstName', val)}
            />

            <TextInput style = {[Styles.textBox, {color : darkTheme ? "white" : "black"}]}
            value = {user.lastName}
            placeholder = 'Last Name'
            placeholderTextColor = 'rgba(255, 120, 0, 1)'
            autoComplete = 'none' autoCorrect = {false}
            onChangeText = {(val) => modifyUserDetails('lastName', val)}
            />

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
                style={[Styles.passwordInput, {color: darkTheme ? 'white' : 'black'}]}
                value={user.password}
                placeholder="Password"
                placeholderTextColor="rgba(255, 120, 0, 1)"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={firstSecureEntry}
                onChangeText={(val) => modifyUserDetails('password', val)}
              />
              <TouchableOpacity onPressOut={() => setFirstSecureEntry(!firstSecureEntry)}>
                <Icon name={firstSecureEntry ? 'eye' : 'eye-off'} size={24} color="rgba(255, 120, 0, 1)" />
              </TouchableOpacity>
            </View>

            <View style={Styles.passwordContainer}>
              <TextInput
                style={[Styles.passwordInput, {color: darkTheme ? 'white' : 'black'}]}
                value={user.confirmedPassword}
                placeholder="Confirm your Password"
                placeholderTextColor="rgba(255, 120, 0, 1)"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={secondSecureEntry}
                onChangeText={(val) => modifyUserDetails('confirmedPassword', val)}
              />
              <TouchableOpacity onPressOut={() => setSecondSecureEntry(!secondSecureEntry)}>
                <Icon name={secondSecureEntry ? 'eye' : 'eye-off'} size={24} color="rgba(255, 120, 0, 1)" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style = {[Styles.ordinarySignUpButton, {backgroundColor : !darkTheme ? 'rgba(255, 120, 0, 1)' : 'rgba(200, 0, 255, 1)'}]}
            activeOpacity = {0.4}
            onPressOut = {handleOrdinarySignUpEvent}
            >
              <Text style = {[Styles.signUpButtonText, {color : !darkTheme ? "black" : "white"}]}>SignUp</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {Styles.existingAccountButton} activeOpacity = {0.4} onPressOut = {handleExistingAccountEvent}>
              <Text style = {[Styles.existingAccountButtonText, {color : !darkTheme ? 'rgba(200, 0, 255, 1)' : "rgba(255, 120, 0, 1)"}]}>Already have an Account?</Text>
            </TouchableOpacity>
          </>
          
          }

        </ScrollView>
     
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

export default SignUp;