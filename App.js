import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import ControlOnOff from './componentes/ControlOnOff';
import Cronometro from './componentes/Cronometro';
import axios from 'axios'

const bodyRequest = {
  control:'1100',
  cT:3216,
  des:23
}

const requestAxios = async (url,body) => {
  let result = false;
  let confBodyRequest = (body === undefined) ?
      {
          method:'GET',
          url:url,
          timeout:5000,
      } : 
      {
          method:'POST',
          url:url,
          data:body,
          headers:{
              'Content-type': 'text/plain'
          },
          timeout:5000,
      }
  result = await axios(confBodyRequest)
      .then(response => {
          return response.data;
      })
      .catch(error =>{
          return error;
      });
  return result;
} 


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Cronometro bodyRequest={bodyRequest} requestAxios={requestAxios}/>
      <ControlOnOff bodyRequest={bodyRequest} requestAxios={requestAxios}/>
    </SafeAreaView>
  );
};

export default App;
