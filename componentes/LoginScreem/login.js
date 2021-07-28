import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import stylesLogin from './styleLogin';
import palomita from '../../assest/palomita.png';

import LinearGradient from 'react-native-linear-gradient';
const userDefault = {
  username:'Informatica',
  password:'Control2021'
}

function Login({navigation}) {
  const [user, setUser] = useState({username:'',password:''});
  const [showPassword, setShowPassword] = useState(true);


  const handleLongin = () =>{
    let error = 0;
    console.log(user);
    console.log(userDefault);
    if(user.username !== userDefault.username){
      error = 1;
    }else if(user.password !== userDefault.password){
      error = 2
    }

    error ? Alert.alert(
      "Error",
      "Usuario o constraseña invalidos",
      [
          { text: "Aceptar", onPress: () => {console.log("error de usuario")} }
      ]) : navigation.navigate('Control');
  }

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
              value={user.username}
              onChangeText={text => setUser({...user,username:text})}
              theme={{colors: {text: '#9a0007', primary: '#9a0007'}}}
            />

            <TextInput
              label="Password"
              secureTextEntry={showPassword}
              value={user.password}
              onChangeText={text=>setUser({...user,password:text})}
              theme={{colors: {text: '#9a0007', primary: '#9a0007'}}}
              right={<TextInput.Icon name="eye" color="#9a0007" onPress={()=>{setShowPassword(!showPassword)}} />}
            />

            <Button
              mode="contained"
              color="#9a0007"
              onPress={handleLongin}>
              Login
            </Button>
          </View>
      </LinearGradient>
  );
}

export default Login;
