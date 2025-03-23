import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container : {
    flex : 1, flexDirection : 'column', flexGrow : 1,
    justifyContent : 'center', alignItems : 'center',
    borderWidth : 3, borderLeftColor : 'rgba(255, 120, 0, 1)',  borderRightColor : 'rgba(255, 120, 0, 1)', borderRadius : 10
  },
  themeButton : {
    padding : 5,
    position : 'absolute',
    top : 70, left : 20
  },
  mainHeading : {
    fontSize : 70, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)',
    textDecorationColor : 'rgba(200, 0, 255, 1)', textDecorationLine : 'underline',
    position : 'absolute', top : 180,
  },
  subMainHeading : {
    fontSize : 25, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)',
    marginBottom : 15, marginTop : 5,
    alignSelf : 'center'
  },
  textBox : {
    padding : 10, borderWidth : 3, borderColor : 'rgba(200, 0, 255, 1)', borderRadius : 10,
    marginBottom : 40,
    width : 300
  },
  passwordContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3, borderColor: 'rgba(200, 0, 255, 1)', borderRadius: 10,
    marginBottom: 40, width: 300
  },
  passwordInput : {
    flex: 1,
    padding: 10
  },
  secureTextEntryButton : {
    padding : 5,
    position : "absolute",
    top : 460, right : 55
  },
  ordinaryLoginButton: {
    padding: 15, width: 225,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 30,
  },
  loginButtonText : {
    fontSize : 16, fontWeight : 'bold',
    textAlign : 'center'
  },
  nonExistingAccountButton : {
    padding : 10,
    position : 'absolute', top : 590,
    marginTop : 20
  },
  nonExistingAccountButtonText : {
    fontWeight : 'bold', fontSize : 14
  }
});

export default Styles;