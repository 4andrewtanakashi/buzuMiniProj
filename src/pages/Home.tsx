import React, { useState, useEffect }  from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList, //Muitos elementos
    Alert,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {getMultiple} from '../service/Crud';
import {Button} from '../components/Button';
import {CardItem} from '../components/CardItem';
import {DataItem, DataItemConst} from '../utils/Utils';

export function Home () {
    const navigation = useNavigation();
    const [valueList, setValueList] = useState<DataItem[]>([]);
    const [messageItem, setMessageItem] = useState(
        <Text style={[stylesCustom.title]}> List Items: </Text>
    );

    useEffect(
        () => {

            let tempList : DataItem[] = [];
            getMultiple().then(
                listValues => {
                    listValues.map(elem => tempList.push(JSON.parse(elem[1] || '')));
                    if (tempList.length > 0) {
                        tempList.map( elemTemp => {
                            console.log("elemTemp: ", elemTemp, typeof(elemTemp));
                            console.log("elemTemp.id: ", elemTemp.id);
                        });
                        setValueList(tempList);
                    }

                }
            );

            if (valueList.length <= 0)
                setMessageItem(<Text style={[stylesCustom.title]}> Não há items </Text>);
            else
                setMessageItem(<Text style={[stylesCustom.title]}> Lista de Itens: </Text>);

        },
    [valueList]); // Toda vez que atualizar o valueInput o useEffect é chamado

    return(
        <View style={stylesCustom.container}>
            
            <Button 
                value={"Cadastrar"} 
                onPress={_ => navigation.navigate("FormEdit" as never)}
            />

            {messageItem}

            <FlatList
                data={valueList}
                keyExtractor={ (item : any)  => item.id  }
                renderItem={({item}) => (
                    <CardItem
                        title={item.nome}
                        value={item.preco}
                        //onPress={() => handleDelete(item)}
                    />
                ) }
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
            color: 'black',
            fontSize:24,
            fontWeight: 'bold',
            padding:15,
            marginTop: 50
        },
    
    }
);