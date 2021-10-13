import React, {useState} from 'react';
import {View} from 'react-native';

import {StatusBar, ImageBackground} from 'react-native';

import {Context, appStateContext} from './componentes/context/Context';
import stylesApp from './stylesApp';
import plaza from './assest/plaza.jpg';
import Login from './componentes/LoginScreem/login';
import Control from './componentes/controlScreen/Control';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  const [context, setContext] = useState(appStateContext);

  return (
    <View style={stylesApp.mainContainer}>
      <StatusBar backgroundColor="#9a0007" />
      <ImageBackground
        style={stylesApp.imageBackground}
        source={plaza}
        resizeMode="cover">
        <NavigationContainer headerMode="none">
          <Context.Provider value={[context, setContext]}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Control" component={Control} />
            </Stack.Navigator>
          </Context.Provider>
        </NavigationContainer>
      </ImageBackground>
    </View>
  );
};

export default App;
