import React,{useState,useContext} from 'react'
import { View,Text, Alert} from 'react-native'
import {TextInput,Button, Modal} from 'react-native-paper'
import styleConfTempo from './styleConfTempo'
import Defase from './Defase'
import {Context} from '../context/Context'

function checkError(error,auxStr,control){
    switch(error){
        case 1:
            Alert.alert("Error","No se aceptan numero negativos");
            break;
        case 2:
            auxStr += '0' + control;
            break;
        default:
            auxStr += control;    
    } 
    return auxStr;
}

function ConfiguracionTempo() {
    const [visible, setVisible] = useState(false);
    const [context,setContext] = useContext(Context);
    const {appState} = context;
    const {starTempo} = appState;
    const {url,bodyRequest,requestAxios} = context.appRequest;
    const [confTempo,setConfigTempo] = useState({te:'11',ta:'13'});
    
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleTemporizar = async () =>{
        await setContext({...context,appState:{...appState,loading:true}});
        console.log("Temporizar")
        try{
            let error = 0;
            let error2 = 0;
            
            let auxTe = parseInt(confTempo.te);
            auxTe < 0 ? error = 1 : auxTe < 10 ? error  = 2 : null;
            let auxStr = checkError(error,'',confTempo.te);
            if(error == 1){
                return;
            }
            let auxTa = parseInt(confTempo.ta);
            auxTa < 0 ? error2 = 1 : auxTa < 10 ? error2  = 2 : null;
            auxStr = checkError(error2,auxStr,confTempo.ta);
            if(error2 == 1){
                return;
            }

            let res =await requestAxios(url,{...bodyRequest,control:'9910',cT:auxStr});
            res !== undefined && await setContext({...context,
                appResponse:res.response,
                appState:{...appState,
                    starTempo:starTempo+1,
                    loading:false
                }
            });
            console.log(res);
        }catch(error){
            console.log(error)
        }
    }

    const handleOffControl = async () =>{
        let res = await requestAxios(url,{...bodyRequest,control:'1000'});
        console.log(res);
        res !== undefined && await setContext({...context,appResponse:res.response});
        console.log("OFF");
    }

    return (
        <View style={styleConfTempo.container}>
            <Text style={styleConfTempo.title}>
                Configuracion de Temporizador
            </Text>
            <View style={styleConfTempo.containerRow}>
                <View style={styleConfTempo.subContainer}>
                    <Text>Tiempo Encendido</Text>
                    <TextInput
                        value={confTempo.te}
                        keyboardType="numeric"
                        selectionColor="#9a0007"
                        onChangeText={text => setConfigTempo({...confTempo,te:text})}
                        theme={{colors:{text:"#9a0007",primary:"#9a0007"}}}/>
                </View>
                <View style={styleConfTempo.subContainer}>
                    <Text>Timepo de Apagado</Text>
                    <TextInput
                        value={confTempo.ta}
                        keyboardType="numeric"
                        selectionColor="#9a0007"
                        onChangeText={text => setConfigTempo({...confTempo,ta:text})}
                        theme={{colors:{text:"#9a0007",primary:"#9a0007"}}}/>
                </View>
            </View>
            <Modal visible={visible} onDismiss={hideModal} >
                <Defase/>
            </Modal>
            {!visible ? <View style={styleConfTempo.containerRow}>
                <Button 
                    mode="contained" 
                    color="#9a0007"
                    onPress={handleTemporizar}>On</Button>
                <Button 
                    mode="contained" 
                    color="#9a0007"
                    onPress={handleOffControl}>Off</Button>
                <Button 
                    mode="contained" 
                    color="#9a0007" 
                    onPress={showModal}>Defasar</Button>
            </View> : null}
        </View>
    )
}

export default ConfiguracionTempo
