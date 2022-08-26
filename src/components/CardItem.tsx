import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet,
    View,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {removeItem} from '../service/Crud';
import { DataItem, RootStackParams } from '../utils/Utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface ButtonProps extends TouchableOpacityProps {
    title: string;
    value: number;
    item: DataItem;
}

export function CardItem ({title, value, item,...rest} : ButtonProps) : JSX.Element  {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
        <View style={styleButton.containerButton}>
            <TouchableOpacity 
                style={styleButton.button}
                activeOpacity={1}
                {...rest}
                >
                {/* <Image style={styleButton.imgAdjust} source={require('../img/plus.png')} /> */}
                <View style={styleButton.itemsText}>
                    <Text style={styleButton.titileFont}>{title}</Text>
                    <Text>R$ {value}</Text>
                </View>
                <View style={styleButton.iconsAdjust}>
                    <FontAwesome.Button backgroundColor="#FFFF" 
                        name={'trash-o'} onPress={() => handleDelete(title, item.id)}
                        size={25} color="#F04" />
                    <MaterialCommunityIcons.Button backgroundColor="#FFFF" 
                        name="pencil" onPress={() => navigation.navigate("ItemForm", {item})}
                        size={25} color="#000"/>
                </View>
            </ TouchableOpacity>
        </View>
    );
}

const styleButton = StyleSheet.create({
    button: {
        backgroundColor: '#FFFF',
        fontSize: 20,
        padding:15,
        borderRadius: 20,
        marginTop: 15,
        width:'100%',
        height: 150,
        shadowColor: '#001',
        shadowOpacity: 0.6,
        marginBottom: 10,
        flexDirection: "column",
    },
    titileFont: {
        color: '#000A',
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerButton: {
        justifyContent: 'flex-end'
    },
    iconsAdjust: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        paddingTop: '10%',
        paddingHorizontal: 1,
    },
    itemsText: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});