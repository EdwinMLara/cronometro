import {StyleSheet} from 'react-native'

const stylesDesfase = StyleSheet.create({
    container:{
        marginTop:10,
        flexDirection:'column',
        alignItems:'center'
    },
    subContainer:{
        justifyContent:'center'
    },
    textCronometro:{
        color:'red',
        fontSize:36,
        fontWeight:'bold',
        fontFamily:'Helvetica-BoldOblique'
    },
    defaseContainer:{
        flexDirection:'row'
    },
    text:{
        textAlign:'center',
        flex:2,
        backgroundColor:'#ffffff',
        margin:10
    },
    upDownContainer:{
        marginBottom:5
    }
});

export default stylesDesfase;