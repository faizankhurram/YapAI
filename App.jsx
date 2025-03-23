import 'react-native-url-polyfill/auto.js';
import Parent from "./src/screens/ParentScreen/Parent.jsx";

import {Provider} from 'react-redux';
import {store} from './src/redux/store.js';

const App = () => {
  return(
    <Provider store = {store}>
      <Parent/>
    </Provider>
  );
};

export default App;