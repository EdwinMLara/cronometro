import React,{ useReducer, 
    useState,useEffect,useContext } from 'react'
import { StyleSheet, Text,
     View, TouchableOpacity,
    TextInput} from 'react-native'
import useInterval from './customHooks/useInterval';
import {Context} from './context/Context';
/**typografia es gotam */
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

const t = {t1:'1',t2:'1',t3:'1',t4:'1'};

function Cronometro() {
    const [context, setContext] = useContext(Context);
    const {bodyRequest,url,requestAxios} = context.appRequest;
    
    const [defase, dispatch] = useReducer(reducer,{countDesfase:'0'});

    const [ct,setCT] = useState(t);

    const onChangeDefase = (text) =>{
        dispatch({type:'desfase',value:text});
    }  
   
    const [time,setTime] = useState(0);
    const [desfase,setDefase] = useState(false);
    const [timeText,setTimeText] = useState('00:00:00');

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
            <Text style={stylesCronometro.textCronometro}>{timeText}</Text>
            <View style={stylesCronometro.controlContainer}>
                <TouchableOpacity 
                    style={stylesCronometro.controlRow}
                    onPress={() => dispatch({type: 'increment'})}
                    >
                    <Text style={stylesCronometro.textButton}>+</Text>
                </TouchableOpacity>

                <View style={stylesCronometro.controlRow2}>
                <TextInput
                    style={stylesCronometro.text}
                    value={defase.countDesfase}
                    onChangeText={onChangeDefase}
                    keyboardType="numeric"
                />
                </View>
                
                <TouchableOpacity 
                    style={stylesCronometro.controlRow}
                    onPress={() => dispatch({type: 'decrement'})}
                    >
                    <Text style={stylesCronometro.textButton}>-</Text> 
                </TouchableOpacity>
            </View> 
            <TouchableOpacity 
                onPress={onDefaseControl}
                >
                <Text style={stylesCronometro.textButton}>Desfasar</Text>
            </TouchableOpacity>

            <Text>Ciclo temporizador</Text>

            <View style={stylesCronometro.controlContainer}>
                <View style={stylesCronometro.controlRow2}>
                    <TextInput
                        style={stylesCronometro.text}
                        value={ct.t1}
                        onChangeText={(text)=>{setCT({...ct,t1:text})}}
                        keyboardType="numeric"
                    />
                </View>

                <View style={stylesCronometro.controlRow2}>
                    <TextInput
                        style={stylesCronometro.text}
                        value={ct.t2}
                        onChangeText={(text)=>{setCT({...ct,t2:text})}}
                        keyboardType="numeric"
                    />
                </View>
                
                <View style={stylesCronometro.controlRow2}>
                    <TextInput
                        style={stylesCronometro.text}
                        value={ct.t3}
                        onChangeText={(text)=>{setCT({...ct,t3:text})}}
                        keyboardType="numeric"
                    />
                </View>

                <View style={stylesCronometro.controlRow2}>
                    <TextInput
                        style={stylesCronometro.text}
                        value={ct.t4}
                        onChangeText={(text)=>{setCT({...ct,t4:text})}}
                        keyboardType="numeric"
                    />
                </View>
            </View> 

            {/*<TouchableOpacity 
                onPress={tempoControl}>
                    <Text style={stylesCronometro.textButton}>Temporizar</Text>
            </TouchableOpacity>*/}
        </View>

    )
}

const stylesCronometro = StyleSheet.create({
    container:{
        height:280,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#DA735Dc0'
    },
    textCronometro:{
        color:'red',
        fontSize:36,
        fontWeight:'bold',
        fontFamily:'Helvetica-BoldOblique'
    },
    controlContainer:{
        flex: 1,
        flexDirection:'row',
    },
    controlRow:{
        flex:1,
    },
    controlRow2:{
        flex:2,      
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
    }
})
export default Cronometro;
