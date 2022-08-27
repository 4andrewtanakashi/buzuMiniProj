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
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import SelectDropdownProps from 'react-native-select-dropdown'

import { Button } from '../components/Button';
import {saveData} from '../service/Crud';
import { DataItem, RootStackParams } from '../utils/Utils';
import { Top } from '../interface/Top';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tags from 'react-native-tags';

type Props = NativeStackScreenProps<RootStackParams, "ItemForm">;

export function ItemForm ( {route} : Props) : JSX.Element  {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    //Valores dos campos a serem salvos
    const [valueInputNome, setValueInputNome] = useState('');
    const [valueInputPreco, setValueInputPreco] = useState(0);
    const [optionCategoria, setOptionCategoria] = useState('');

    useEffect(
        () => {
            if (route.params.item !== undefined) {
                console.log("route.params: ", route.params);
                console.log("route.params.item: ", route.params.item);
                setValueInputNome(route.params.item?.nome || '');
                setValueInputPreco(route.params.item?.preco || 0);
                setOptionCategoria(route.params.item?.categoria || '');
            }   
        }
    );

    function handleSave() : void {
        const data : DataItem = {
            id: String(new Date().getTime()),
            nome: valueInputNome,
            preco: valueInputPreco,
            categoria: optionCategoria
        };
        saveData(data);
        Alert.alert("Salvo", 
            "",
            [{
                text: "Sim", onPress: () => navigation.navigate("Home", {item: data})
            }]
        );
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
                                { text: "Sim", onPress: () => navigation.navigate("Home", {item: undefined}) }
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

                <Text>Categoria</Text>
                <SelectDropdownProps
                    data={["Eletrônicos", "Livros", "Actions Figures", "Ferramentas", "Academia"]}
                    onSelect={ (selectedItem) => setOptionCategoria(selectedItem) }
                    defaultButtonText={(optionCategoria !== '')? optionCategoria : 'Selecione a categoria'}
                    buttonTextAfterSelection={(selectedItem) => selectedItem}
                    rowTextForSelection={(item) => item }
                    buttonStyle={stylesCustom.input}
                    buttonTextStyle={{textAlign: 'left'}}
                    renderDropdownIcon={isOpened =>
                        <FontAwesome 
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'} size={18}
                        />
                    }
                    dropdownIconPosition={'right'}
                />

                {/* <Text>Tags</Text>
                <Tags
                    initialText="Nome da tag"
                    initialTags={["dog", "cat", "chicken"]}
                    onChangeTags={(tags : any) => console.log(tags)}
                    onTagPress={
                        (index : any, tagLabel : any, event : any) =>
                            console.log(index, tagLabel, event)}
                    inputStyle={{ backgroundColor: "white" }}
                /> */}

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
            color: '#000',
            fontSize: 18,
            padding: 10,
            mariginTop: 30,
            borderRadius: 7,
            height: 50,
            width: "100%",
            borderWidth: 1,
        },
        buttonGoBack: {
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },

    }
);