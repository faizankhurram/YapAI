import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container : {
    flex : 1, flexDirection : 'column',
    borderLeftWidth : 2, borderRightWidth : 2, borderLeftColor : "rgba(255, 120, 0, 1)", borderRightColor : "rgba(255, 120, 0, 1)"
  },
  screenTitleView : {
    flexDirection : 'row', justifyContent : 'space-between',
    marginTop : 65, marginRight : 25, paddingLeft : 15,
  },
  refreshButton : {
    padding : 10, marginTop : 15,
  },
  screenTitle : {
    fontSize : 60, fontWeight : 'bold', color : 'rgba(200, 0, 255, 1)',
  },
  tagLine : {
    marginTop : 70, textAlign : 'center',
    fontSize : 45, fontWeight : 'bold', color : "rgba(255, 120, 0, 1)",
  },
  button : {
    flexDirection : 'row', justifyContent : 'space-evenly',
    marginBottom : 40,
    padding : 18, borderRadius : 30, width : 270,
    alignItems : 'center',
  },
  buttonText : {
    fontWeight : 'bold', fontSize : 18
  }
});

export default Styles;