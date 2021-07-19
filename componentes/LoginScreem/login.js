import React,{useState} from 'react'
import { View,Image,Text } from 'react-native';
import { TextInput,Button} from 'react-native-paper';

import stylesLogin from './styleLogin'
import { useTheme } from 'react-native-paper';
import palomita from '../../assest/palomita.png';

import LinearGradient from 'react-native-linear-gradient';

function Login() {
    const [text, setText] = useState('');
    const { colors } = useTheme();
    console.log(colors)

    return (

      <LinearGradient colors={['#ffffffc0', '#e57373c0']} style={stylesLogin.linearGradient}>
        
        <View style={stylesLogin.container}>

          <Image
            style={stylesLogin.imagePalomita}
            source={palomita}
          />

          <View style={stylesLogin.titleContainer}>
            <Text style={stylesLogin.title}>
              Uriangato te viste de Orgullo
            </Text>
          </View>
          
          <View style={stylesLogin.box}>
            <TextInput 
              label="Nombre de Usuario"
              selectionColor="#9a0007"
              theme={{colors:{text:"#9a0007",primary:"#9a0007"}}}
              />
          </View>
          

          <TextInput
            label="Password"
            secureTextEntry
            selectionColor="#9a0007"
            theme={{colors:{text:"#9a0007",primary:"#9a0007"}}}
            
            right={<TextInput.Icon name="eye" color="#9a0007"/>}
            style={stylesLogin.box} />

            <Button  
              mode="contained"
              color="#9a0007" 
              onPress={() => console.log('Pressed')}>
                Login
            </Button>
          </View>
          
        </LinearGradient>
    );
}

export default Login
