import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: 'rgba(255, 120, 0, 1)',
    borderRightColor: 'rgba(255, 120, 0, 1)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 20,
    marginRight: 10,
  },
  backButton: {},
  trashButton: {
    padding: 10,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    paddingBottom: 50,
  },
  textBox: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'rgba(255, 120, 0, 1)',
    width: 325,
    marginLeft: 5,
  },
  inputButton: {
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 30,
    width: 50,
  },
  userTextBubble: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  botTextBubble: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  messageText: {
    fontSize: 16, fontWeight : 'bold'
  },
});

export default Styles;