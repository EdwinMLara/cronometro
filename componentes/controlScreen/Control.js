import React, { useState } from 'react'
import { Text, View,Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { List } from 'react-native-paper'
import stylesControl from './styleControl'
import foco_apagado from '../../assest/foco_apagado.png'
import Cronometro from './Cronometro'
import ControlOnOff from './ControlOnOff'

function Control() {
    const [expanded,setExpanded] = useState(false);
    const handleExpandedList = () => setExpanded(!expanded);

    const [valueList,setValueList] = useState(false);
    const handlePressedList = (selected) => { 
        setValueList(selected)
        setExpanded(false); 
    }
    return (
        <LinearGradient colors={['#ffffffc0', '#e57373c0']} style={stylesControl.linearGradient}>
            <View style={stylesControl.container}>
                <View style={stylesControl.titleContainer}>
                    <Text style={stylesControl.title}>
                        Control de Iluminacion
                    </Text>
                </View>

                <Image style={stylesControl.imageFoco} source={foco_apagado}/>
                
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

                {valueList ? <Cronometro/> : <ControlOnOff/> }
                
            </View>
        </LinearGradient>
    )
}

export default Control
