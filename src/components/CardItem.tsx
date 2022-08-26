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
                style={[styleButton.button, styleButton.boxShadow]}
                activeOpacity={1}
                {...rest}
                >
                {/* <Image style={styleButton.imgAdjust} source={require('../img/plus.png')} /> */}
                <FontAwesome style={styleButton.picture}
                    name={'picture-o'} color="#000" size={70} />
                <View style={styleButton.itemsText}>
                    <Text style={styleButton.titileFont}>{title}</Text>
                    <Text>R$ {value}</Text>
                    <Text style={styleButton.fontCategoria}>Categoria</Text>
                </View>
                <View style={styleButton.iconsAdjust}>
                    <FontAwesome.Button backgroundColor="#FFFF" 
                        name={'trash-o'} onPress={() => handleDelete(title, item.id)}
                        size={25} color="#DA0D1E" />
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
        // padding:20,
        borderRadius: 10,
        marginTop: 15,
        width:'100%',
        height: 190,
        marginBottom: 10,
        flexDirection: "row",
    },
    boxShadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5
    },
    titileFont: {
        color: '#000A',
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerButton: {
        // justifyContent: 'flex-end',
    },
    iconsAdjust: {
        // flex: 3,
        flexDirection: "row",
        justifyContent: 'flex-end',
        paddingTop: '40%',
        paddingHorizontal: 2,
    },
    itemsText: {
        justifyContent: 'flex-start',
        flex: 1,
        paddingTop: '5%',
    },
    picture: {
        // flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 50,
        alignItems: 'center',
    },
    fontCategoria: {
        fontWeight: 'bold',
        fontSize: 18
    }
});