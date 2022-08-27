import React, { useState, useEffect }  from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList, //Muitos elementos
    Image,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getMultiple, clearAll} from '../service/Crud';
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
            console.log("Home->route.params: ", route.params);
            let tempList : DataItem[] = [];
            getMultiple().then(
                listValues => {
                    listValues.map(elem => tempList.push(JSON.parse(elem[1] || '')));
                    if (tempList.length > 0) {
                        setValueList(tempList);
                        setMessageItem(<></>);
                    }
                       
                }
            ).catch(
                () => setMessageItem(<Text style={[stylesCustom.title]}> Não há items </Text>)
            );
            if (valueList.length <= 0)
                setMessageItem(<Text style={[stylesCustom.title]}> Não há items </Text>);

        },
    [valueList, route]); // Toda vez que atualizar o valueInput o useEffect é chamado

    return(
        <>
            <Top/>
            <View style={stylesCustom.container}>
                
                <Button 
                    value={"Cadastrar"} 
                    onPress={_ => navigation.navigate("ItemForm", {item: undefined})}
                />

                {/* <MaterialIcons.Button backgroundColor="#FFFF" 
                    name={'cleaning-services'} onPress={
                        () => Alert.alert(
                            "Você deseja realiza a limpeza?",
                                "",
                            [
                                {
                                text: "Cancelar",
                                onPress: () => console.log("Operação de limpeza cancelada"),
                                style: "cancel"
                                },
                                { text: "Sim", onPress: () => clearAll() }
                            ]
                            ) 
                    }
                    size={40} color="#F00"
                /> */}

                {messageItem}

                <FlatList
                    data={valueList}
                    keyExtractor={ (item : any)  => item.id  }
                    renderItem={({item}) => (
                        <CardItem
                            title={item.nome}
                            value={item.preco}
                            item={item}
                        />
                    ) }
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