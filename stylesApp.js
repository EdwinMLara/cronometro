import {StyleSheet} from 'react-native'

const stylesApp = StyleSheet.create({
    mainContainer:{
      flex:1,
      justifyContent:'center'
    },
    imageBackground:{
        flex:1,
        justifyContent:"center"
    },
    resultadoOn:{
        backgroundColor:'#6BFF33'
    },
    resultadoOff:{
        backgroundColor: '#F10000'
    },
    spinner:{
      flex: 1,
      position:'absolute',
      alignSelf:'center'
    }
});

export default stylesApp;