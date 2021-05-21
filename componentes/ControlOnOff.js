import React,{useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import {Picker} from '@react-native-picker/picker';


function ControlOnOff(props) {

    const {bodyRequest,requestAxios} = props; 
    console.log(bodyRequest);

    const onControl = async () =>{
        console.log("ON");
        let res = await requestAxios('http://192.168.69.93/',bodyRequest);
        res ? console.log('jalo') : console.log('no jalo');
    }

    const offControl = async () =>{
        console.log("OFF");
        let res = await requestAxios('http://192.168.69.93/',{...bodyRequest,control:'1000'});
        res ? console.log('jalo') : console.log('no jalo');
    }

    const tempoControl = async () => {
        console.log("TEMPORIZAR");
        let res = await requestAxios('http://192.168.69.93/',{...bodyRequest,control:'9910'});
        res ? console.log('jalo') : console.log('no jalo');
    }

    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View style={stylesOnOFF.container}>
            <Picker style={stylesOnOFF.picker}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue) =>{
                    console.log(itemValue);
                    setSelectedLanguage(itemValue);
                }}>
                <Picker.Item  label="Control 1" value="c1" />
                <Picker.Item  label="Control 2" value="c2" />
            </Picker>
            <View style={stylesOnOFF.controlOnOff}>
                <TouchableOpacity 
                    style={stylesOnOFF.controlRow}
                    onPress={onControl}>
                    <Text style={stylesOnOFF.textButton}>On</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={stylesOnOFF.controlRow}
                    onPress={offControl}>
                    <Text style={stylesOnOFF.textButton}>Off</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                onPress={tempoControl}>
                    <Text style={stylesOnOFF.textButton}>Temporizar</Text>
            </TouchableOpacity>
            <View>
                <Text style={stylesOnOFF.textButton}>Resultado</Text>
            </View>
        </View>
    )
}

export default ControlOnOff

const stylesOnOFF = StyleSheet.create({
    container:{
        height:250
    },
    controlOnOff:{
        flex:1,
        flexDirection:'row',
        
    },
    controlRow:{
        flex:1,
        padding:1,
        justifyContent:'center'
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
    },
    picker:{
        color:'red',
        fontWeight:'bold',
        paddingRight:5,
        paddingLeft:5
    }
});