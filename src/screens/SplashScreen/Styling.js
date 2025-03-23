import {StyleSheet} from "react-native";

const Styles = StyleSheet.create({
  container : {
    flex : 1, flexDirection : 'column',
    alignItems : 'center',
    backgroundColor : 'white',
    borderWidth : 3, borderColor : 'rgba(255, 120, 0, 1)', borderRadius : 10
  },
  mainHeading : {
    fontSize : 120, color : 'rgba(255, 120, 0, 1)', fontWeight : 'bold',
    textDecorationColor : 'rgba(200, 0, 255, 1)', textDecorationLine : 'underline',
    marginBottom : 150, marginTop : 250
  },
  modalView : {
    flex : 1, flexDirection : 'column',
    justifyContent : 'center', alignItems : 'center',
    marginTop : 120
  },
  modalText : {
    fontSize : 30, fontWeight : 'bold', color : 'rgba(200, 0, 255, 1)'
  }
});

export default Styles;