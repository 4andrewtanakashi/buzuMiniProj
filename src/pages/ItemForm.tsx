import React, { useState, useEffect, useContext } from 'react';
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
import {saveData, setItemData} from '../service/Crud';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tags from 'react-native-tags';

import { DataItem, RootStackParams } from '../utils/Utils';
import { Top } from '../interface/Top';
import { DataItemsContext } from '../contexts/DataItems';

type Props = NativeStackScreenProps<RootStackParams, "ItemForm">;

export function ItemForm ( {route} : Props) : JSX.Element  {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    //Valores dos campos a serem salvos
    const [valueInputNome, setValueInputNome] = useState('');
    const [valueInputPreco, setValueInputPreco] = useState('');
    const [optionCategoria, setOptionCategoria] = useState('');
    const [valuesTags, setValuesTags] = useState<string[]>([]);
    
    const [activeUpdateOnchange, setActiveUpdateOnchange] = useState(true);
    const {state} = useContext(DataItemsContext);

    useEffect(
        () => {
            if ((route.params.item !== undefined) && 
                (route.params.item?.nome !== valueInputNome) && (activeUpdateOnchange)) {
               
                setOptionCategoria(route.params.item?.categoria || '');
                setValueInputNome(route.params.item?.nome || '');
                setValueInputPreco(route.params.item?.preco || '');
                setValuesTags(route.params.item?.tags || []);

                setActiveUpdateOnchange(false);
            }
            
        }
    );

    function handleSave() : void {
        const data : DataItem = {
            id: route.params.item?.id || String(new Date().getTime()),
            nome: valueInputNome,
            preco: valueInputPreco,
            categoria: optionCategoria,
            tags: valuesTags
        };
        
        if (route.params.item?.id !== undefined) {
            setItemData(data);
        } else   
            saveData(data);
        console.log("save: ", data);
        setActiveUpdateOnchange(true);
        Alert.alert("Salvo", 
            "",
            [{
                text: "Sim", onPress: () => navigation.navigate("Home", {item: data})
            }]
        );
    }

    function handleOnchangeNumber (value : string) : void {
        let regex : RegExp = new RegExp(/[0-9]+(,[0-9]*)?/g);
        if (regex.test(value)){
            setValueInputPreco(value);
        } else {
            Alert.alert("Não segue o padrão (111 ou 112,33)");
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
                    placeholder={(state.nome !== '' && route.params.item !== undefined)?
                         state.nome : "Meu Produto"}
                    placeholderTextColor="#000"
                    onChangeText={setValueInputNome}
                />

                <Text style={stylesCustom.title}>Categoria</Text>
                <SelectDropdownProps
                    data={["Eletrônicos", "Livros", "Actions Figures", "Ferramentas", "Academia"]}
                    onSelect={ (selectedItem) => setOptionCategoria(selectedItem) }
                    defaultButtonText={(state.categoria !== ''  && route.params.item !== undefined)?
                        state.categoria : 'Selecione a categoria'}
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
                    placeholder={(state.preco !== '' && route.params.item !== undefined)?
                         String(state.preco) : "99,99"}
                    placeholderTextColor="#000"
                    onChangeText={handleOnchangeNumber}
                />

                <Text style={stylesCustom.title}>Tags</Text>
                <Tags
                    initialText="tag"
                    initialTags={(state.tags !== [] && route.params.item !== undefined)?
                        state.tags :  []}
                    onChangeTags={setValuesTags}
                    renderTag={({ tag, index, onPress }) => (
                        <TouchableOpacity 
                                key={`${tag}-${index}`} onPress={onPress}
                                style={ stylesCustom.buttonTag }
                            >
                            <Text style={{color: '#000A'}}>{tag}{' '}
                            <AntDesign name="close" color="black" size={13}/></Text>
                        </TouchableOpacity>
                    )}
                    maxNumberOfTags={5}
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
        buttonTag: {
            borderWidth: 1,
            borderColor: '#000A', 
            borderRadius: 7, 
            marginRight: 4
        },
        buttonGoBack: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            backgroundColor: '#EEEEEE'
        },

    }
);