import {StyleSheet} from 'react-native'

const stylesLogin = StyleSheet.create({
    linearGradient:{
      flex:1
    },
    containerChange:{
      flex:1,
      justifyContent:'space-around'
    },
    container:{
      padding: 20,
      flex: 1,
      justifyContent:'space-around'
    },
    titleContainer:{
      alignItems:'center',
    },
    title:{
      fontSize:24,
      alignContent:'center',
      fontWeight:'bold',
      color:'black'
    },
    imagePalomita:{
      width:'60%',
      height:140,
      marginLeft:'20%',
      opacity:0.8,
      resizeMode: 'stretch'
    }
});

export default stylesLogin;