import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList, //Muitos elementos
    Alert,
} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import {Button} from '../components/Button';

export function Home () {
    const navigation = useNavigation();

    return(
        <View style={stylesCustom.container}>
            <Button 
                value={"Cadastrar"} 
                onPress={_ => navigation.navigate("FormEdit" as never)}
            />
        </View>
    );
}

const stylesCustom = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#FFFA',
            paddingVertical: 70,
            paddingHorizontal: 30
        },
        title: {
            color: 'white',
            fontSize:24,
            fontWeight: 'bold',
            padding:15
        },
    
    }
);