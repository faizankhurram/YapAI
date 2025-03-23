import {React} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './Styling.js';

import SignUp from '../SignUpScreen/SignUp.jsx';
import Login from '../LoginScreen/Login.jsx';
import Home from '../HomeScreen/Home.jsx';
import SplashScreen from '../SplashScreen/SplashScreen.jsx';
import Profile from '../ProfileScreen/Profile.jsx';
import Settings from '../SettingsScreen/Settings.jsx';
import Chat from '../ChatScreen/Chat.jsx';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const Parent = () => {

  const darkTheme = useSelector((state) => state.darkTheme.value);

  const getTabBarIcon = (routeName, focused, color, size) => {
    let iconName = '';
    if(routeName === 'Home Page'){
      iconName = focused ? "home" : "home-outline";
    }
    else if(routeName === 'Profile Page'){
      iconName = focused ? "person" : "person-outline";
    }
    else if(routeName === 'Settings Page'){
      iconName = focused ? "settings" : "settings-outline";
    }
    return <Icon name = {iconName} size = {size} color = {color}/>
  }

  const mainMenuNavigator = () => {
    return(
      <BottomTab.Navigator screenOptions = {
        ({route}) => ({
          tabBarIcon : ({focused, color, size}) => getTabBarIcon(route.name, focused, color, 30),
          tabBarIconStyle : Styles.tabNavigatorTabBarIcon,
          animation : "fade",
          headerShown : false,
          tabBarShowLabel : false,
          tabBarStyle : [Styles.tabNavigatorTabBarStyle, {backgroundColor : darkTheme ? "black" : "white"}],
          tabBarActiveTintColor : "rgba(255, 0, 255, 1)",
          tabBarInactiveTintColor : "rgba(255, 0, 255, 0.5)",
        })
      }>
  
      <BottomTab.Screen name = 'Home Page' component = {Home}/>
      <BottomTab.Screen name = 'Profile Page' component = {Profile}/>
      <BottomTab.Screen name = 'Settings Page' component = {Settings}/>
  
      </BottomTab.Navigator>
    );
  };

  return(
    <NavigationContainer>

      <Stack.Navigator screenOptions = {{
        headerShown : false
      }}>

        <Stack.Screen name = 'Splash Screen' component = {SplashScreen}/>
        <Stack.Screen name = 'SignUp Page' component = {SignUp}/>
        <Stack.Screen name = 'Login Page' component = {Login}/>
        <Stack.Screen name = 'Main Menu' component = {mainMenuNavigator}/>
        <Stack.Screen name = 'Chat Page' component = {Chat}/>

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default Parent;