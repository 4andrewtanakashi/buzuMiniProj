import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';
import {saveData} from '../service/Crud';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../utils/Utils';
import { Top } from '../interface/Top';

type Props = NativeStackScreenProps<RootStackParams, "ItemForm">;

export function ItemForm ( {route} : Props) : JSX.Element  {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    //Valores dos campos a serem salvos
    const [valueInputNome, setValueInputNome] = useState('');
    const [valueInputPreco, setValueInputPreco] = useState(0);

    useEffect(
        () => {
            if (route.params !== undefined) {
                console.log("route.params: ", route.params);
                console.log("route.params.item: ", route.params.item);
                setValueInputNome(route.params.item?.nome || '');
                setValueInputPreco(route.params.item?.preco || 0);
            }   
        }
    );

    function handleSave() : void {
        const data = {
            id: String(new Date().getTime()),
            nome: valueInputNome,
            preco: valueInputPreco
        };

        saveData(data);
    }

    return (
        <>
            <Top/>
            <View style={stylesCustom.container}>
                <AntDesign.Button
                    name="close"
                    color="black"
                    backgroundColor="#FFFA"
                    style={stylesCustom.buttonGoBack}
                    onPress={_ => {
                        Alert.alert(
                            "Você deseja cancelar a operação?",
                            "",
                            [
                            {
                                text: "Cancelar",
                                onPress: () => console.log("Operação foi cancelada"),
                                style: "cancel"
                            },
                            { text: "Sim", onPress: () => navigation.navigate("Home") }
                            ]
                        );
                    }}
                />

                <Text>Título do produto</Text>
                <TextInput
                    style={stylesCustom.input}
                    placeholder={(valueInputNome !== '')? valueInputNome : "Meu Produto"}
                    placeholderTextColor="#000"
                    onChangeText={value => {value !== ''? setValueInputNome(value) : Alert.alert('Digite algo')}}
                />

                <Text>Valor</Text>
                <TextInput
                    style={stylesCustom.input}
                    placeholder={(valueInputPreco !== 0)? String(valueInputPreco) : "R$ 99, 99"}
                    placeholderTextColor="#000"
                    onChangeText={value => {value !== ''? setValueInputPreco(Number(value)) : Alert.alert('Digite algo')}}
                />
                <Button
                    value={"Salvar"}
                    onPress={handleSave}
                />
            </View>
        </>
    );
}

const stylesCustom = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#EEEEEE',
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