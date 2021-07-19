import React,{useState,useContext } from 'react'
import {Context} from '../context/Context';
import { View } from 'react-native';
import stylesCronometro from './styleCronometro';
import Defase from './Defase';
import ConfiguracionTempo from './ConfiguracionTempo';
/**typografia es gotam */

const t = {t1:'1',t2:'1',t3:'1',t4:'1'};

function Cronometro() {
    const [context, setContext] = useContext(Context);
    const {bodyRequest,url,requestAxios} = context.appRequest;
    

    const [ct,setCT] = useState(t);

    const tempoControl = async () => {
        console.log("TEMPORIZAR");
        let confTempo = ct.t1+ct.t2+ct.t3+ct.t4;
        try {
            const newBodyRequest = {control:'9910',cT:confTempo,des:5};           
            let res = await requestAxios(url,newBodyRequest);
            console.log(res.response);
            setContext({...context,appResponse});
            let seconds = res.response.tempo.time;
            setTime(parseInt(seconds));
            let strTime  = seconds2Time(seconds);
            setTimeText(strTime);
        } catch (error) {
            Alert.alert(
                "Error",
                "No encontro el servidor",
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
    }

    return (
        <View style={stylesCronometro.container}>
             <ConfiguracionTempo/>
             <Defase/>
        </View>
    )
}


export default Cronometro;
