import React, { useState, useEffect }  from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList, //Muitos elementos
    Alert,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {getMultiple, DataItem} from '../service/Crud';
import {Button} from '../components/Button';
import {CardItem} from '../components/CardItem';

export function Home () {
    const navigation = useNavigation();
    const [valueList, setValueList] = useState<DataItem[]>([]);
    const [messageItem, setMessageItem] = useState(
        <Text style={[stylesCustom.title]}> List Items: </Text>
    );

    useEffect(
        () => {
            
            getMultiple().then(
                listValues => listValues.map(elem => console.log(JSON.parse(elem[1] || '')))
            );

            if (valueList.length <= 0)
                setMessageItem(<Text style={[stylesCustom.title]}> Não há items </Text>);
            else
                setMessageItem(<Text style={[stylesCustom.title]}> List Items: </Text>);

            // console.log(valueList.length);
            // console.log(messageItem);
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