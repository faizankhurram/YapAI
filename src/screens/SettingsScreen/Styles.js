import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container : {
    flex : 1, flexDirection : 'column',
    borderLeftWidth : 2, borderRightWidth : 2, borderLeftColor : "rgba(255, 120, 0, 1)", borderRightColor : "rgba(255, 120, 0, 1)"
  },
  screenTitleView : {
    marginTop : 65, paddingLeft : 20, paddingBottom : 10,
  },
  screenTitle : {
    fontSize : 60, fontWeight : 'bold', color : 'rgba(200, 0, 255, 1)',
  },
  appAppearanceView : {
    marginTop : 30, paddingLeft : 20, paddingBottom : 20,
    borderBottomWidth : 2, borderBottomColor : 'rgba(255, 120, 0, 0.3)'
  },
  appAppearanceSectionHeader : {
    fontSize : 30, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)'
  },
  appAppearanceFirstInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    marginTop : 20, paddingLeft : 20, paddingRight : 35
  },
  appAppearanceFirstInnerViewText : {
    fontSize : 20, color : 'rgba(200, 0, 255, 1)', paddingTop : 5,
  },
  appAppearanceFirstInnerViewButton : {
    borderRadius : 40, padding : 5,
    width : 100, alignItems : "center", height : 36
  },
  accountView : {
    marginTop : 25, paddingLeft : 20, paddingBottom : 20,
    borderBottomWidth : 2, borderBottomColor : 'rgba(255, 120, 0, 0.3)'
  },
  accountSectionHeader : {
    fontSize : 30, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)'
  },
  accountFirstInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    marginTop : 20, paddingLeft : 20, paddingRight : 35
  },
  accountFirstInnerViewText : {
    fontSize : 20, color : 'rgba(200, 0, 255, 1)', paddingTop : 5
  },
  accountFirstInnerViewButton : {
    borderRadius : 40, padding : 5,
    width : 100, alignItems : "center", height : 36
  },
  accountSecondInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    marginTop : 30, paddingLeft : 20, paddingRight : 35
  },
  accountSecondInnerViewText : {
    fontSize : 20, color : 'rgba(200, 0, 255, 1)', paddingTop : 5
  },
  accountSecondInnerViewButton : {
    borderRadius : 40, padding : 5,
    width : 100, alignItems : "center", height : 36
  },
  accountThirdInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    marginTop : 30, paddingLeft : 20, paddingRight : 35
  },
  accountThirdInnerViewText : {
    fontSize : 20, color : 'rgba(200, 0, 255, 1)', paddingTop : 5
  },
  accountThirdInnerViewButton : {
    borderRadius : 40, padding : 5,
    width : 100, alignItems : "center", height : 36
  },
  accountFourthInnerView : {
    flexDirection : 'row', justifyContent : 'space-between',
    marginTop : 30, paddingLeft : 20, paddingRight : 35
  },
  accountFourthInnerViewText : {
    fontSize : 20, color : 'rgba(200, 0, 255, 1)', paddingTop : 5
  },
  accountFourthInnerViewButton : {
    borderRadius : 40, padding : 5,
    width : 100, alignItems : "center", height : 36
  },
  modalView : {
    flex : 1, flexDirection : 'column', marginTop : 150, marginBottom : 200, marginHorizontal : 30,
    justifyContent : "center", alignItems : 'center',
    borderWidth : 3, borderRadius : 20, borderColor : "rgba(200, 0, 255, 1)"
  },
  modalTitle : {
    fontSize : 30, fontWeight : 'bold', color : 'rgba(255, 120, 0, 1)', marginBottom : 40,
  },
  passwordModalFirstInnerView : {
    flexDirection : 'row', alignItems : 'center',
    borderWidth : 3, borderColor : "rgba(200, 0, 255, 1)", borderRadius : 10, width : 300,
    paddingRight : 5, marginBottom : 30
  },
  passwordModalSecondInnerView : {
    flexDirection : 'row', alignItems : 'center',
    borderWidth : 3, borderColor : "rgba(200, 0, 255, 1)", borderRadius : 10, width : 300,
    paddingRight : 5, marginBottom : 30
  },
  emailModalInnerView : {
    flexDirection : 'row', alignItems : 'center',
    borderWidth : 3, borderColor : "rgba(200, 0, 255, 1)", borderRadius : 10, width : 300,
    paddingRight : 5, marginBottom : 30
  },
  secureEntryButton : {
    padding : 5
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