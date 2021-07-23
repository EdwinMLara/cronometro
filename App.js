import React,{useState} from 'react';
import {View} from 'react-native'

import {
  ActivityIndicator,
  StatusBar,
  ImageBackground
} from 'react-native';

import {Context,appStateContext} from './componentes/context/Context'
import stylesApp from './stylesApp';
import plaza from './assest/plaza.jpg';
import Login from './componentes/LoginScreem/login';
import Control from './componentes/controlScreen/Control';



const App = () => {
  const [context, setContext] = useState(appStateContext);

  return (
    <View style={stylesApp.mainContainer}>
      <StatusBar backgroundColor="#9a0007"/>
      <ImageBackground 
        style={stylesApp.imageBackground} 
        source={plaza}
        resizeMode="cover">
      <Context.Provider value={[context,setContext]}>
          <Control/>
          {/*<Login/>
        <ActivityIndicator animating={context.appState.loading} style={stylesApp.spinner}size="large" color="red" />*/}
      </Context.Provider>
      </ImageBackground>
    </View>
  );
};

export default App;