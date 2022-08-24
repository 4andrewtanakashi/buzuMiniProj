import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList, //Muitos elementos
    Alert,
} from 'react-native';

import {Button} from '../components/Button';
import { useNavigation } from "@react-navigation/native";

interface ValueList {
    id: string;
    name: string;
}

export function ItemForm () {
    const navigation = useNavigation();
    const [valueInput, setValueInput] = useState('');
    const [valueList, setValueList] = useState<ValueList[]>([]);
    const [messageItem, setMessageItem] = useState('none');

    return(
        <View style={stylesCustom.container}>
            <Text>Título do produto</Text>
            <TextInput 
                style={stylesCustom.input}
                placeholder="Meu Produto"
                placeholderTextColor="#000"
                //onChangeText={value => {value !== ''? setValueInput(value) : Alert.alert('Digite algo')}}
            />

            <Text>Valor</Text>
            <TextInput 
                style={stylesCustom.input}
                placeholder="R$ 99, 99"
                placeholderTextColor="#000"
                //onChangeText={value => {value !== ''? setValueInput(value) : Alert.alert('Digite algo')}}
            />
            <Button 
                value={"Salvar"} 
                onPress={_ => navigation.navigate("Home" as never)}
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
        input: {
            backgroundColor: '#FFF9',
            borderColor: '#000A',
            borderWidth: 1.5,
            color: '#FFF',
            fontSize: 18,
            padding:10,
            mariginTop:30,
            borderRadius: 7
        },
    
    }
);