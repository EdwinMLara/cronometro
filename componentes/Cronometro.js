import React,{ useReducer, 
    useState,useEffect } from 'react'
import { StyleSheet, Text,
     View, TouchableOpacity,
    TextInput} from 'react-native'
import useInterval from './customHooks/useInterval'

function reducer(state,action){
    let aux = parseInt(state.countDesfase);
    switch(action.type){
        case 'increment':
            aux+=1;
            break;
        case 'decrement':
            aux-=1;
            break;
        case 'desfase':
            return {countDesfase : action.value}
        default:
            throw new Error("su puta madre");
    }
    return {countDesfase : aux.toString()};
}

function Cronometro(props) {

    const {bodyRequest,requestAxios} = props; 
    const [defase, dispatch] = useReducer(reducer,{countDesfase:'0'});
    const [desfaseRequest,setDesfaseRequest] = useState(false);
    
    const onChangeDefase = (text) =>{
        dispatch({type:'desfase',value:text});
    }  
    
    const seconds2Time = (seconds) => {
        let hours = Math.floor(seconds/3600);
        let min = Math.floor((seconds - (hours * 3600)) / 60);
        let sec = seconds - (hours * 3600) - (min * 60);
        if (hours   < 10) {hours   = "0"+hours;}
        if (min < 10) {min = "0" + min;}
        if (sec < 10) {sec = "0" + sec;}
        return hours+':'+min+':'+sec;
    }
   
    const [time,setTime] = useState(0);
    const [timeText,setTimeText] = useState('00:00:00');

    

    const onDefaseControl = async () => {
        console.log("Defasamiento");
        let aux = parseInt(defase.countDesfase);
        if(aux > 0 && aux < 60){ 
            let res = await requestAxios('http://192.168.69.93/',{...bodyRequest,control:'9901',des:aux});
            setDesfaseRequest(true);
            res ? console.log('jalo') : console.log('no jalo');
        }else{
            console.log('EL numero es invalido, tiene que se mayor a 0 menor que 60');
        }
    }

    useEffect(async () => {
        let result  = await requestAxios('http://192.168.69.93/');
        if(result["response"] != undefined){
            let seconds = result.response.tempo.time;
            setTime(seconds);
            let strTime  = seconds2Time(seconds);
            setTimeText(strTime);
            setDesfaseRequest(false);
            
        }else{
            console.log("Error");
        }
    }, [desfaseRequest]);

    useInterval(() => {
        setTime(time + 1);
        let strTime = seconds2Time(time);
        console.log(strTime);
        setTimeText(strTime);
    }, 1000);

    return (
        <View style={stylesCronometro.container}>
            <Text style={stylesCronometro.textCronometro}>{timeText}</Text>
            <View style={stylesCronometro.controlContainer}>
                <TouchableOpacity 
                    style={stylesCronometro.controlRow}
                    onPress={() => dispatch({type: 'increment'})}
                    >
                    <Text style={stylesCronometro.textButton}>+</Text>
                </TouchableOpacity>

                <View style={stylesCronometro.controlRow2}>
                <TextInput
                    style={stylesCronometro.text}
                    value={defase.countDesfase}
                    onChangeText={onChangeDefase}
                    keyboardType="numeric"
                />
                </View>
                
                <TouchableOpacity 
                    style={stylesCronometro.controlRow}
                    onPress={() => dispatch({type: 'decrement'})}
                    >
                    <Text style={stylesCronometro.textButton}>-</Text> 
                </TouchableOpacity>
            </View> 
            <TouchableOpacity 
                onPress={onDefaseControl}
                >
                <Text style={stylesCronometro.textButton}>Desfasar</Text>
            </TouchableOpacity>
        </View>

    )
}

const stylesCronometro = StyleSheet.create({
    container:{
        height:180,
        justifyContent:'center',
        alignItems:'center'
    },
    textCronometro:{
        color:'red',
        fontSize:36,
        fontWeight:'bold'
    },
    controlContainer:{
        flex: 1,
        flexDirection:'row',
    },
    controlRow:{
        flex:1,
    },
    controlRow2:{
        flex:2,      
    },
    textButton:{
        textAlign:'center',
        borderColor:'black',
        borderWidth:1,
        height:50,
        textAlignVertical:'center'
    },
    text:{
        textAlign:'center'
    }
})
export default Cronometro;
