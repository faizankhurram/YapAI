import 'react-native-url-polyfill/auto.js';
import {LogBox} from 'react-native';
import Parent from "./src/screens/ParentScreen/Parent.jsx";

import {Provider} from 'react-redux';
import {store} from './src/redux/store.js';

LogBox.ignoreAllLogs(true);

const App = () => {
  return(
    <Provider store = {store}>
      <Parent/>
    </Provider>
  );
};

export default App;