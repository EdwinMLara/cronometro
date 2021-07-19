import React,{useContext} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {Context} from '../context/Context';
import stylesControlOnOFF from './styleControlOnOff';
import { Button } from 'react-native-paper'
function ControlOnOff() {

    const [context, setContext] = useContext(Context);
    
    const onControl = async () =>{
        console.log("ON");
        console.log(bodyRequest);
        let res = await requestAxios('http://192.168.69.93/',bodyRequest);
        setContext(res.response);
    }

    const offControl = async () =>{
        console.log("OFF");
        const newBodyRequest = {...bodyRequest,control:'1000'};
        console.log(newBodyRequest);
        let res = await requestAxios('http://192.168.69.93/',newBodyRequest);
        setContext(res.response);
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