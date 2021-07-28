import React,{useState,useContext,useEffect} from 'react'
import {Context} from '../context/Context';
import { View,Text } from 'react-native';
import stylesCronometro from './styleCronometro';
import ConfiguracionTempo from './ConfiguracionTempo'; 
import useInterval from '../customHooks/useInterval';
/**typografia es gotam */

function Cronometro() {
    const [context] =  useContext(Context);
    const {seconds2Time,defase,starTempo} = context.appState;
    const [timeText,setTimeText] =  useState('APAGADO');
    const [auxTime, setAuxTime] = useState(0);
    const [stateTempo,setStateTempo] = useState(false);
    
    
    useEffect(async ()=>{
        console.log("Lanzando tempo");
        let {tempo} = context.appResponse;
        let control = {...tempo};
        let actualTime = parseInt(control.time/1000);
        console.log(actualTime);
        setAuxTime(actualTime);
        control.state ? setStateTempo(true) : setStateTempo(false);
        
    },[defase,starTempo]);

    useInterval(() => {
        setAuxTime(auxTime + 1);
        setTimeText(seconds2Time(auxTime));
    }, 1000,stateTempo); 
    
    return (
        <View style={stylesCronometro.container}>
            <Text style={stylesCronometro.textCronometro}>{timeText}</Text>
            <ConfiguracionTempo/>
        </View>
    )
}


export default Cronometro;
