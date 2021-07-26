import React,{useState,useContext,useEffect} from 'react'
import {Context} from '../context/Context';
import { View,Text } from 'react-native';
import stylesCronometro from './styleCronometro';
import ConfiguracionTempo from './ConfiguracionTempo'; 
import useInterval from '../customHooks/useInterval';
/**typografia es gotam */

function Cronometro() {
    const [context] =  useContext(Context);
    const {seconds2Time} = context.appState;
    const [timeText,setTimeText] =  useState('APAGADO');
    const [auxTime, setAuxTime] = useState(0);
    const [stateTempo,setStateTempo] = useState(false);
    
    
    useEffect(async ()=>{
        let {tempo} = context.appResponse;
        let control = {...tempo};
        await setAuxTime(parseInt(control.time/1000));
        control.state ? setStateTempo(true) : setStateTempo(false);
        
    },[]);

    useInterval(() => {
        let time = parseInt(auxTime);
        setTimeText(seconds2Time(time));
        setAuxTime(auxTime + 1);
    }, 1000,stateTempo); 
    
    return (
        <View style={stylesCronometro.container}>
            <Text style={stylesCronometro.textCronometro}>{timeText}</Text>
            <ConfiguracionTempo/>
        </View>
    )
}


export default Cronometro;
