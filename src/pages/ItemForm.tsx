import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList, //Muitos elementos
    Alert,
} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Button } from '../components/Button';
import {saveData} from '../service/Crud';

export function ItemForm() {
    const navigation = useNavigation();

    //Valores dos campos
    const [valueInputNome, setValueInputNome] = useState('');
    const [valueInputPreco, setValueInputPreco] = useState(0);

    function handleSave() {
        const data = {
            id: String(new Date().getTime()),
            nome: valueInputNome,
            preco: valueInputPreco
        };

        saveData(data);
    }

    return (
        <View style={stylesCustom.container}>
            <AntDesign.Button
                name="close"
                color="black"
                backgroundColor="#FFFA"
                style={stylesCustom.buttonGoBack}
                onPress={_ => navigation.navigate("Home" as never)}
            />

            <Text>Título do produto</Text>
            <TextInput
                style={stylesCustom.input}
                placeholder="Meu Produto"
                placeholderTextColor="#000"
                onChangeText={value => {value !== ''? setValueInputNome(value) : Alert.alert('Digite algo')}}
            />

            <Text>Valor</Text>
            <TextInput
                style={stylesCustom.input}
                placeholder="R$ 99, 99"
                placeholderTextColor="#000"
                onChangeText={value => {value !== ''? setValueInputPreco(Number(value)) : Alert.alert('Digite algo')}}
            />
            <Button
                value={"Salvar"}
                onPress={handleSave}
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
            fontSize: 24,
            fontWeight: 'bold',
            padding: 15
        },
        input: {
            backgroundColor: '#FFF9',
            borderColor: '#000A',
            borderWidth: 1.5,
            color: '#000',
            fontSize: 18,
            padding: 10,
            mariginTop: 30,
            borderRadius: 7
        },
        buttonGoBack: {
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        }
    }
);