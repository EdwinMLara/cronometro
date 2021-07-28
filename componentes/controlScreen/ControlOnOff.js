import React,{useContext} from 'react'
import {Text,View} from 'react-native'
import {Context} from '../context/Context';
import stylesControlOnOFF from './styleControlOnOff';
import { Button } from 'react-native-paper'
function ControlOnOff() {
    console.log("Control On Off");

    const [context, setContext] = useContext(Context);
    const {url,bodyRequest,requestAxios} = context.appRequest;
    
    const onControl = async () =>{
        let res = await requestAxios(url,{...bodyRequest,control:'1100'});
        console.log(res );
        res !== undefined && await setContext({...context,appResponse:res.response});
        console.log("ON");
    }

    const offControl = async () =>{
        let res = await requestAxios(url,{...bodyRequest,control:'1000'});
        console.log(res);
        res !== undefined && await setContext({...context,appResponse:res.response});
        console.log("OFF");
    }

    return (
        <View style={stylesControlOnOFF.container}>
            <Button 
                mode="contained" 
                color="#9a0007"
                style={stylesControlOnOFF.buttonMargin}
                onPress={onControl}>
                <Text style={stylesControlOnOFF.textButton}>On</Text>
            </Button>

            <Button 
                mode="contained" 
                color="#9a0007"
                onPress={offControl}>
                <Text style={stylesControlOnOFF.textButton}>Off</Text>
            </Button>
        </View>
    )
}

export default ControlOnOff