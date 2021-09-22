import { StyleSheet} from "react-native";

const stylesControl = StyleSheet.create({
    linearGradient:{
        flex:1
    },
    container:{
        flex:1,
        padding:10
    },
    containerError:{
        flex:1,
        padding:10,
        backgroundColor:'black',
        opacity:0.5,
        zIndex:10
    },
    titleContainer:{
        alignItems:'center'
    },
    title:{
        fontSize:24,
        alignContent:'center'
    },
    imageFoco:{
        width:'50%',
        height:165,
        marginLeft:'25%',
        marginTop:20,
        marginBottom:20,
        resizeMode:'stretch' 
    },
    activityIncator:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default stylesControl;