import React, { useState, useEffect, useContext }  from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList, //Muitos elementos
    Alert,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getMultiple, removeItem} from '../service/Crud';
import {Button} from '../components/Button';
import {CardItem} from '../components/CardItem';
import {DataItem, RootStackParams} from '../utils/Utils';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Top } from '../interface/Top';

type Props = NativeStackScreenProps<RootStackParams, "Home">;

export function Home ( {route} : Props) : JSX.Element  {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [valueList, setValueList] = useState<DataItem[]>([]);
    const [messageItem, setMessageItem] = useState(<></>);

    useEffect(
        () => {
            
            let tempList : DataItem[] = [];
            getMultiple().then(
                listValues => {
                    listValues.map(elem => tempList.push(JSON.parse(elem[1] || '')));
                    
                    if (tempList.length > 0) {
                        setMessageItem(<></>);
                    } else {
                        setMessageItem(<Text style={[stylesCustom.title]}> 
                            <AntDesign name={'warning'} color="#991" size={30}/>{' '}
                            Não há items </Text>);
                    }
                    if ((tempList.length !== valueList.length) ||
                        ( !tempList.every( (elem, i) => valueList[i] === elem )) ) {
                        setValueList(tempList);
                    }
                }
            ).catch(
                () => {
                        setMessageItem(<Text style={[stylesCustom.title]}>
                            <AntDesign name={'warning'} color="#991" size={30}/>{' '}
                                Não há items </Text>
                        );
                        if (tempList !== valueList)
                            setValueList(tempList);
                    }
            );
            if (valueList.length <= 0)
                setMessageItem(<Text style={[stylesCustom.title]}> 
                    <AntDesign name={'warning'} color="#991" size={30}/>{' '}
                        Não há items </Text>
                    );

        },
    [valueList, route]); // Toda vez que atualizar o valueInput o useEffect é chamado

    function handleDelete (nomeItem : string, id : string) : void {
        Alert.alert(
            "Você deseja remove esse item?",
            nomeItem,
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Operação de remoção cancelada"),
                style: "cancel"
              },
              { text: "Sim", onPress: () => removeItem(id) }
            ]
          );
    }


    return(
        <>
            <Top/>
            <View style={stylesCustom.container}>
                
                <Button 
                    value={"Cadastrar"} 
                    onPress={_ => navigation.navigate("ItemForm", {item: undefined})}
                />

                {messageItem}

                <FlatList
                    data={valueList}
                    keyExtractor={ (item : any)  => item.id  }
                    renderItem={({item}) => (
                        <CardItem
                            item={item}
                            onPress={() => handleDelete(item.nome, item.id)}
                        />
                    ) }
                    extraData={valueList}
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
            fontSize:24,
            fontWeight: 'bold',
            padding:15,
            marginTop: 10
        },
    }
);