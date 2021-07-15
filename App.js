import React,{useState} from 'react';
import {View} from 'react-native'

import {
  ActivityIndicator,
  StatusBar,
  ImageBackground
} from 'react-native';

import {Context,appStateContext} from './componentes/context/Context'
import stylesApp from './stylesApp';
import Cronometro from './componentes/Cronometro';
import ControlOnOff from './componentes/ControlOnOff';
import plaza from './assest/plaza.jpg';



const App = () => {
  const [context, setContext] = useState(appStateContext);


 //const focoState = context.appResponse.control1 ? stylesApp.resultadoOn : stylesApp.resultadoOff;

  return (
    <View style={stylesApp.mainContainer}>
      <ImageBackground 
        style={stylesApp.imageBackground} 
        source={plaza}
        resizeMode="cover">
      <Context.Provider value={[context,setContext]}>
        <StatusBar/>
        
        <ActivityIndicator animating={context.appState.loading} style={stylesApp.spinner}size="large" color="red" />
        <Cronometro/>
        {/*<ControlOnOff bodyRequest={bodyRequest} requestAxios={requestAxios}/>
        <View style={focoState}>
                <Text style={stylesApp.textButton}>Resultado</Text>
  </View>*/}
      </Context.Provider>
      </ImageBackground>
    </View>
  );
};

export default App;