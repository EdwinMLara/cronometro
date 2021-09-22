import React, { useState,useContext,useEffect} from 'react'
import { Text, View,Image,Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { List,ActivityIndicator } from 'react-native-paper'
import stylesControl from './styleControl'
import foco_apagado from '../../assest/foco_apagado.png'
import foco_encendido from'../../assest/foco_encendido.png'
import Cronometro from './Cronometro'
import ControlOnOff from './ControlOnOff'
import {Context} from '../context/Context';

function Control() {
    const [expanded,setExpanded] = useState(false);
    const handleExpandedList = () => setExpanded(!expanded);

    const [selected ,setSelected] = useState(false);
    const handlePressedList = (select) =>{
        setSelected(select);
        setExpanded(false);
    }
    const [error,setError] = useState(false);
    const [context, setContext] = useContext(Context);
    const {control1,tempo} = context.appResponse;
    const {url,requestAxios} = context.appRequest;
    const {appState} = context;
    const {reRender} = appState;
    let renderImage = control1 ? foco_encendido : foco_apagado;

    useEffect(async () =>{
        await setContext({...context,appState:{...appState,loading:true}});
        console.log("Control");
        let res;
        try{
            res = await requestAxios(url);
            console.log(res);
            await setContext({
                ...context,
                appResponse:res.response,
                appState:{
                    ...appState,
                    reRender:reRender+1,
                    loading:false
                }
            });
        }catch(error){
            console.log(error);
            Alert.alert(
                "Error",
                "Error al intentar conectar con el servidor consulte al desarrollador",
                [
                    { text: "Aceptar", onPress: () => setError(true) }
                ]
            )
        }
    },[]);

    return (
        <LinearGradient colors={['#ffffffc0', '#e57373c0']} style={stylesControl.linearGradient}>
            <ActivityIndicator animating={appState.loading} color="#9a0007"  style={stylesControl.activityIncator}/>
            <View style={!error ? stylesControl.container : stylesControl.containerError}  pointerEvents={error ? 'none' : 'auto'}>
                <View style={stylesControl.titleContainer}>
                    <Text style={stylesControl.title}>
                        Control de Iluminacion
                    </Text>
                </View>

                <Image style={stylesControl.imageFoco} 
                        source={renderImage}/>
                
                <List.Accordion
                    title="Tipos de control"
                    expanded={expanded}
                    onPress={handleExpandedList}
                    theme={{colors:{text:"#9a0007",primary:"#9a0007"}}}>
                        <List.Item 
                            title="Control Manual"
                            onPress={()=>handlePressedList(false)}
                            />
                        <List.Item 
                            title="Temporizador"
                            onPress={()=>handlePressedList(true)}
                        />
                </List.Accordion>

                {(selected ) ? <Cronometro/> : (tempo.state) ? <Cronometro/> : <ControlOnOff/>}
                
            </View>
        </LinearGradient>
    )
}

export default Control
