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
  firstNameView : {
    paddingLeft : 20, paddingBottom : 20,
    marginTop : 30,
    borderBottomWidth : 2, borderBottomColor : 'rgba(255, 120, 0, 0.3)'
  },
  firstNameViewSectionHeader : {
    fontSize : 25, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)'
  },
  firstNameViewInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    paddingLeft : 20, paddingRight : 50,
  },
  firstNameViewInnerViewText : {
    fontSize : 25, color : 'rgba(200, 0, 255, 1)', paddingTop : 5,
  },
  firstNameViewButton : {
    borderRadius : 40, padding : 5,
    width : 100, alignItems : "center", height : 36
  },
  lastNameView : {
    paddingLeft : 20, paddingBottom : 20,
    marginTop : 20,
    borderBottomWidth : 2, borderBottomColor : 'rgba(255, 120, 0, 0.3)'
  },
  lastNameViewSectionHeader : {
    fontSize : 25, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)'
  },
  lastNameViewInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    paddingLeft : 20, paddingRight : 50,
  },
  lastNameViewInnerViewText : {
    fontSize : 25, color : 'rgba(200, 0, 255, 1)', paddingTop : 5,
  },
  lastNameViewButton : {
    borderRadius : 40, padding : 5,
    width : 100, alignItems : "center", height : 36
  },
  userIDView : {
    paddingLeft : 20, paddingBottom : 20,
    marginTop : 20,
    borderBottomWidth : 2, borderBottomColor : 'rgba(255, 120, 0, 0.3)'
  },
  userIDViewSectionHeader : {
    fontSize : 25, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)'
  },
  userIDViewInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    paddingLeft : 20, paddingRight : 50,
  },
  userIDViewInnerViewText : {
    fontSize : 15, color : 'rgba(200, 0, 255, 1)', paddingTop : 5,
  },
  emailView : {
    paddingLeft : 20, paddingBottom : 20,
    marginTop : 20,
    borderBottomWidth : 2, borderBottomColor : 'rgba(255, 120, 0, 0.3)'
  },
  emailViewSectionHeader : {
    fontSize : 25, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)'
  },
  emailViewInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    paddingLeft : 20, paddingRight : 50,
  },
  emailViewInnerViewText : {
    fontSize : 18, color : 'rgba(200, 0, 255, 1)', paddingTop : 5,
  },
  accountView : {
    paddingLeft : 20, paddingBottom : 20,
    marginTop : 20,
    borderBottomWidth : 2, borderBottomColor : 'rgba(255, 120, 0, 0.3)'
  },
  accountViewSectionHeader : {
    fontSize : 25, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)'
  },
  accountViewInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    paddingLeft : 20, paddingRight : 50,
  },
  accountViewInnerViewText : {
    fontSize : 18, color : 'rgba(200, 0, 255, 1)', paddingTop : 5,
  },
  messagesView : {
    paddingLeft : 20, paddingBottom : 20,
    marginTop : 20,
  },
  messagesViewSectionHeader : {
    fontSize : 25, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)'
  },
  messagesViewInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    paddingLeft : 20, paddingRight : 50,
  },
  messagesViewInnerViewText : {
    fontSize : 18, color : 'rgba(200, 0, 255, 1)', paddingTop : 5,
  },
  modalView : {
    flex : 1, flexDirection : 'column', marginTop : 150, marginBottom : 200, marginHorizontal : 30,
    justifyContent : "center", alignItems : 'center',
    borderWidth : 3, borderRadius : 20, borderColor : "rgba(200, 0, 255, 1)"
  },
  modalTitle : {
    fontSize : 30, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)', marginBottom : 40,
  },
  modalInnerView : {
    flexDirection : 'row', alignItems : 'center',
    borderWidth : 3, borderColor : "rgba(200, 0, 255, 1)", borderRadius : 10, width : 300,
    paddingRight : 5, marginBottom : 30
  },
  modalTextBox : {
    flex : 1, padding : 10
  },
  modalButtonsView : {
    flexDirection : 'row', justifyContent : 'space-between',
  },
  modalButton : {
    padding : 15, borderRadius : 30, width : 120,
    alignItems : 'center',
    marginTop : 20, marginHorizontal : 10,
  },
  modalButtonText : {
    fontSize : 16, fontWeight : 'bold', textAlign : 'center'
  },
});

export default Styles;