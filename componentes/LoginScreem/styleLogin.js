import {StyleSheet} from 'react-native'

const stylesLogin = StyleSheet.create({
    linearGradient:{
      flex: 1
    },
    containerChange:{
      flex:1
    },
    inner: {
      padding: 20,
      flex: 1,
      justifyContent: "space-around"
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
      width:'70%',
      height:165,
      marginLeft:'15%',
      marginTop:30,
      opacity:0.9,
      resizeMode: 'stretch'
    }
});

export default stylesLogin;