import React from 'react'
import { View,Text} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import styleConfTempo from './styleConfTempo'

function ConfiguracionTempo() {
    return (
        <View style={styleConfTempo.container}>
            <Text style={styleConfTempo.title}>
                Configuracion de Temporizador
            </Text>
            <View style={styleConfTempo.containerRow}>
                <View style={styleConfTempo.subContainer}>
                    <Text>Tiempo Encendido</Text>
                    <TextInput keyboardType="numeric"/>
                </View>
                <View style={styleConfTempo.subContainer}>
                    <Text>Timepo de Apagado</Text>
                    <TextInput keyboardType="numeric"/>
                </View>
            </View>
            <Button mode="contained" color="#9a0007">Temporizar</Button>
        </View>
    )
}

export default ConfiguracionTempo
