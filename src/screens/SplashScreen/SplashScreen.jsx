import 'react-native-url-polyfill/auto';
import {React, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert, Modal} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setTheme} from '../../redux/darkThemeSlice';
import {supabase} from '../../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './Styling.js';

const SplashScreen = ({navigation}) => {

  useEffect(() => {
    getUserFirstName();
    loadCorrectTheme();
    checkCurrentSession();
  }, []);

  const [firstName, setFirstName] = useState('');
  const [showIndicator, setShowIndicator] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const darkTheme = useSelector((state) => state.darkTheme.value);
  const dispatch = useDispatch();

  const getUserFirstName = async() => {
    const {data : {user}, error : userSessionError} = await supabase.auth.getUser();
    const userID = user.id;
    const {data : userRecord, error : userRecordError} = await supabase.from('User').select('first_name').eq('id', userID).single();
    if(userRecordError){
      Alert.alert('Error❌', userRecordError.message, [{text : "Dismiss", style : 'cancel'}], {cancelable : false});
      return;
    }
    setFirstName(userRecord.first_name);
  };

  const loadCorrectTheme = async() => {
    const value = await AsyncStorage.getItem('darkTheme');
    const actualValue = JSON.parse(value);
    dispatch(setTheme(actualValue));
  };

  const checkCurrentSession = async() => {
    const {data : {session}, error : sessionError} = await supabase.auth.getSession();
    if(sessionError){
      //the chances of this block execution are almost low to none
      Alert.alert(
        "Error❌",
        sessionError.message,
        [{text : "Dismiss", style : 'cancel', onPress : () => navigation.reset({
          index : 1,
          routes : [
            {name : 'SignUp Page'},
            {name : 'Login Page'}
          ]
        })}],
        {cancelable : false}
      );
    }
    else if(!session){
      //no error, but no ongoing session with any logged in user
      setTimeout(() => {
        setShowIndicator(false);
        navigation.reset({
          index : 1,
          routes : [
            {name : "SignUp Page"},
            {name : "Login Page"}
          ]
        });
      }, 2500);
    }
    else{
      //sesion exists with some current user logged in AND the user exists within the supabase database table "User"
      setTimeout(() => {
        setShowIndicator(false);
        setShowModal(true);
        setTimeout(() => {
          navigation.reset({
            index : 0,
            routes : [
              {name : "Main Menu"}
            ]
          })
        }, 2000)
      }, 2500);
    }
  };

  return(
    <View style = {[Styles.container, {backgroundColor : darkTheme ? "black" : "white"}]}>

      <Text style = {Styles.mainHeading}>YapAI</Text>

      {showIndicator && (<ActivityIndicator size={'large'} color = {'rgba(200, 0, 255, 1)'}/>)}

      <Modal visible = {showModal} transparent = {true} animationType = 'fade'>
        <View style = {Styles.modalView}>
          <Text style = {Styles.modalText}>Welcome Back, {firstName}!</Text>
        </View>
      </Modal>

    </View>
  );
};

export default SplashScreen;