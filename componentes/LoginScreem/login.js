import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import stylesLogin from './styleLogin';
import palomita from '../../assest/palomita.png';

import LinearGradient from 'react-native-linear-gradient';
const user = {
  username:'Informatica',
  password:'control2018'
}

function Login({navigation}) {
  const [text, setText] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  return (
    
      <LinearGradient
        colors={['#ffffffc0', '#e57373c0']}
        style={stylesLogin.linearGradient}>
        
          <View style={stylesLogin.container}>
            <Image style={stylesLogin.imagePalomita} source={palomita} />

            <View style={stylesLogin.titleContainer}>
              <Text style={stylesLogin.title}>
                Uriangato te viste de Orgullo
              </Text>
            </View>

            <TextInput
              label="Nombre de Usuario"
              theme={{colors: {text: '#9a0007', primary: '#9a0007'}}}
            />

            <TextInput
              label="Password"
              secureTextEntry={showPassword}
              theme={{colors: {text: '#9a0007', primary: '#9a0007'}}}
              right={<TextInput.Icon name="eye" color="#9a0007" onPress={()=>{setShowPassword(!showPassword)}} />}
            />

            <Button
              mode="contained"
              color="#9a0007"
              onPress={() => navigation.navigate('Control')}>
              Login
            </Button>
          </View>
      </LinearGradient>
  );
}

export default Login;
