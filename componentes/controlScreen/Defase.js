import React,{useState,useContext} from 'react'
import {View,TextInput} from 'react-native'
import stylesDesfase from './styleDesfase';
import {Context} from '../context/Context';
import {Button} from 'react-native-paper';


function Defase() {
    const [context, setContext] = useContext(Context);
    const {appState} = context;
    const {defase} = appState;
    const [desfaseText,setDesfaseText] = useState('30');
    const {url,bodyRequest,requestAxios} = context.appRequest;
   
    const handleDefaseControl = async () => {
        console.log("Defasamiento",desfaseText);
        try{
            let aux = parseInt(desfaseText);
            if(aux > 0 && aux <= 60){ 
                let res = await requestAxios(url,{...bodyRequest,control:'9901',des:aux});
                console.log(res);
                await setContext({
                    ...context,
                    appResponse:res.response,
                    appState:{
                        ...appState,
                        defase:defase+1
                    }
                });
            }else{
                console.log('EL numero es invalido, tiene que se mayor a 0 menor que 60');
            }
        }
        catch(error){
            console.log(error)
        }
    }
    

    return (
        <View style={stylesDesfase.container}>
            <TextInput
                value={desfaseText}
                onChangeText={text => setDesfaseText(text)}
                keyboardType="numeric"
                theme={{colors:{text:"#9a0007",primary:"#9a0007"}}}
            />
            <Button mode="contained" color="#9a0007" onPress={handleDefaseControl}>defase</Button>        
        </View>
    )
}

export default Defase;
