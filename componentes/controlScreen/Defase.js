import React,{useState,useReducer,useEffect,useContext} from 'react'
import {Text,View,TextInput} from 'react-native'
import { Button } from 'react-native-paper'
import stylesDesfase from './styleDesfase';
import useInterval from '../customHooks/useInterval'
import {Context} from '../context/Context';

const seconds2Time = (seconds) => {
    let hours = Math.floor(seconds/3600);
    let min = Math.floor((seconds - (hours * 3600)) / 60);
    let sec = seconds - (hours * 3600) - (min * 60);
    if (hours   < 10) {hours   = "0"+hours;}
    if (min < 10) {min = "0" + min;}
    if (sec < 10) {sec = "0" + sec;}
    return hours+':'+min+':'+sec;
}
 
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

function Defase() {
    const [context, setContext] = useContext(Context);
    const [timeText,setTimeText] = useState('00:00:00');
    const [defase, dispatch] = useReducer(reducer,{countDesfase:'0'});
    const [time,setTime] = useState(0);

    const [desfase,setDefase] = useState(false);
    const onChangeDefase = (text) =>{
        dispatch({type:'desfase',value:text});
    }  
   
    const onDefaseControl = async () => {
        console.log("Defasamiento");
        let aux = parseInt(defase.countDesfase);
        if(aux > 0 && aux < 60){ 
            let res = await requestAxios(url,{...bodyRequest,control:'9901',des:aux});
            setContext({...context,appResponse});
            setDefase(true);
            
        }else{
            console.log('EL numero es invalido, tiene que se mayor a 0 menor que 60');
        }
    }

    useInterval(() => {
        setTime(time + 1);
        let strTime = seconds2Time(time);
        console.log(strTime);
        setTimeText(strTime);
    }, 1000,context.appResponse.tempo.state);   


    useEffect(async ()=>{
        console.log("cargando estatus");
        let res = await requestAxios(url);
        console.log(res);
        if(res["response"] !== undefined){
            setContext({...context,appResponse});
            let seconds = res.response.tempo.time;
            setTime(parseInt(seconds/1000));
            let strTime  = seconds2Time(seconds);
            setTimeText(strTime);
            setDefase(false);
        }else{
            Alert.alert(
                "Error",
                "No se encontro el servidor",
                [
                    {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                    },
                    { text: "Aceptar", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
    },[desfase]);

    return (
        <View style={stylesDesfase.container}>
            <Text style={stylesDesfase.textCronometro}>{timeText}</Text>
            <View style={stylesDesfase.defaseContainer}>
                <View>
                    <Button mode="contained" color="#9a0007" style={stylesDesfase.upDownContainer}>+</Button>
                    <Button mode="contained" color="#9a0007" >-</Button>
                </View>

                <TextInput
                    style={stylesDesfase.text}
                    value={defase.countDesfase}
                    keyboardType="numeric"
                />
                <View style={stylesDesfase.subContainer}>
                    <Button mode="contained" color="#9a0007">Defase</Button>
                </View>                
            </View> 
        </View>
    )
}

export default Defase
