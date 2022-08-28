import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    TouchableOpacity,
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
import { TagsCards } from '../components/TagsCards';

type Props = NativeStackScreenProps<RootStackParams, "ItemForm">;

const MAX_LENGTH = 18;

export function ItemForm ( {route} : Props) : JSX.Element  {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    //Valores dos campos a serem salvos
    const [valueInputNome, setValueInputNome] = useState('');
    const [valueInputPreco, setValueInputPreco] = useState(0);
    const [optionCategoria, setOptionCategoria] = useState('');
    const [valuesTags, setValuesTags] = useState<string[]>([]);

    //Placeholder values
    const [placeholderNome, setPlaceholderNome] = useState('');
    const [placeholderPreco, setPlaceholderPreco] = useState(0);
    const [placeholderTags, setPlaceholderTags] = useState<string[]>([]);

    useEffect(
        () => {
            if (route.params.item !== undefined) {
                console.log("route.params: ", route.params);
                console.log("route.params.item: ", route.params.item);
                setPlaceholderNome(route.params.item?.nome || '');
                setPlaceholderPreco(route.params.item?.preco || 0);
                setOptionCategoria(route.params.item?.categoria || '');
                setPlaceholderTags(route.params.item?.tags || []);
            }   
        }
    , [valueInputNome, valueInputPreco, placeholderTags]);

    function handleSave() : void {
        const data : DataItem = {
            id: String(new Date().getTime()),
            nome: valueInputNome,
            preco: valueInputPreco,
            categoria: optionCategoria,
            tags: valuesTags
        };
        console.log("save: ", data);
        saveData(data);
        Alert.alert("Salvo", 
            "",
            [{
                text: "Sim", onPress: () => navigation.navigate("Home", {item: data})
            }]
        );
    }

    function handleOnTagPress (tags : string[]) : void {
        console.log("tags.length: ", tags.length);
        let ultimateTag : string = tags[tags.length-1];
        let tempCount : number = 0;
        tags.forEach(elem => {tempCount+=elem.length});
        if ((tempCount < MAX_LENGTH) && ((ultimateTag.length+tempCount) > MAX_LENGTH)) {
            Alert.alert("Essa tag ultrapassa o limite (18).");
            tags.pop();
        } else if (tempCount === MAX_LENGTH){
            Alert.alert("Limite atingido (18), exclua uma tag.");
            tags.pop();
        } else if (tempCount < MAX_LENGTH) {
            setValuesTags(tags);
        }
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
                    activeOpacity={1}
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

                <Text style={stylesCustom.title}>Título do produto</Text>
                <TextInput
                    style={stylesCustom.input}
                    placeholder={(placeholderNome !== '')? placeholderNome : "Meu Produto"}
                    placeholderTextColor="#000"
                    onChangeText={setValueInputNome}
                />

                <Text style={stylesCustom.title}>Categoria</Text>
                <SelectDropdownProps
                    data={["Eletrônicos", "Livros", "Actions Figures", "Ferramentas", "Academia"]}
                    onSelect={ (selectedItem) => setOptionCategoria(selectedItem) }
                    defaultButtonText={(optionCategoria !== '')? optionCategoria : 'Selecione a categoria'}
                    buttonTextAfterSelection={(selectedItem: string) => selectedItem}
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

                <Text style={stylesCustom.title}>Valor</Text>
                <TextInput
                    style={stylesCustom.input}
                    placeholder={(placeholderPreco !== 0)? String(placeholderPreco) : "R$ 99, 99"}
                    placeholderTextColor="#000"
                    onChangeText={value => setValueInputPreco(Number(value))}
                />

                {/* {console.log("placeholderTags: ", placeholderTags,"placeholderTags.length: ", placeholderTags.length)
                } */}
                <Text style={stylesCustom.title}>Tags</Text>
                <Tags
                    textInputProps={{
                        placeholder: "Digite uma tag"
                    }}
                    initialTags={(placeholderTags.length !== 0)? placeholderTags : []}
                    onChangeTags={handleOnTagPress}
                    renderTag={({ tag, onPress }) => (
                        <TagsCards tag={tag} onPress={onPress} />
                    )}
                    containerStyle={stylesCustom.inputContainerTag}
                    inputStyle={stylesCustom.inputInnerTag}
                    inputContainerStyle={{ borderTopWidth: 0, color:'#000'}}
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
            paddingHorizontal: 30
        },
        title: {
            color: 'black',
            fontWeight: 'bold',
            padding: 5
        },
        input: {
            backgroundColor: '#EEEEEE',
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
        inputInnerTag: {
            backgroundColor: '#FFF9',
            borderTopWidth: 0,
            color: '#000',
            
        },
        inputContainerTag: {
            backgroundColor: '#EEEEEE',
            borderColor: '#000A',
            color: '#000',
            fontSize: 18,
            padding: 10,
            borderRadius: 7,
            height: 50,
            width: "100%",
            borderWidth: 1,
            flexDirection: 'row',
            
        },
        buttonGoBack: {
            // width: 580,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            backgroundColor: '#EEEEEE'
        },

    }
);