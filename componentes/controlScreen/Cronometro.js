import React,{useState,useContext,useEffect} from 'react'
import {Context} from '../context/Context';
import { View,Text } from 'react-native';
import stylesCronometro from './styleCronometro';
import ConfiguracionTempo from './ConfiguracionTempo'; 
/**typografia es gotam */

function Cronometro() {
    const [context, setContext] =  useContext(Context);
    const {seconds2Time,defase} = context.appState;
    console.log(context);
    const [timeText,setTimeText] =  useState('APAGADO');
    
    
    useEffect(()=>{
        let {tempo} = context.appResponse;
        let {state,time} = tempo;
        time = parseInt(time/1000);
        state ? setTimeText(seconds2Time(time)) : null ;
    },[defase]);

    /*useInterval(() => {
        setTime(time + 1);
        let strTime = props.seconds2Time(time);
        console.log(strTime);
        setTimeText(strTime);
    }, 1000,context.appResponse.tempo.state); */ 
    
    return (
        <View style={stylesCronometro.container}>
            <Text style={stylesCronometro.textCronometro}>{timeText}</Text>
            <ConfiguracionTempo/>
        </View>
    )
}


export default Cronometro;
