import React, { useEffect } from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet,
    View,
    Alert,
    DevSettings
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { DataItem, RootStackParams } from '../utils/Utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Tags from 'react-native-tags';
import AntDesign from 'react-native-vector-icons/AntDesign';


interface ButtonProps extends TouchableOpacityProps {
    title: string;
    value: number;
    item: DataItem;
    funcDel: () => void;
}

export function CardItem ({title, value, item, funcDel,...rest} : ButtonProps) : JSX.Element  {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();


    return(
        <View>
            <TouchableOpacity 
                style={[styleButton.button, styleButton.boxShadow]}
                activeOpacity={1}
                {...rest}
                >
                <FontAwesome style={styleButton.picture}
                    name={'picture-o'} color="#000" size={70} />
                <View style={styleButton.itemsText}>
                    <Text style={styleButton.titileFont}>{title}</Text>
                    <Text style={styleButton.priceFont}>R$ {value}</Text>
                    <Text style={styleButton.fontCategoria}>{item.categoria}</Text>
                    <Tags initialTags={item.tags}
                        renderTag={({ tag, index, onPress }) => (
                            <TouchableOpacity 
                                key={`${tag}-${index}`} onPress={onPress}
                                style={ styleButton.buttonTag }
                                >
                                <Text style={{color: '#000A'}}>{tag}{' '}
                                <AntDesign name="close" color="black" size={13}/></Text>
                            </TouchableOpacity>
                        )}
                        deleteTagOnPress={false}
                        inputStyle={{backgroundColor: '#FFFF'}}
                    />
                </View>
                <View style={styleButton.iconsAdjust}>
                    <FontAwesome.Button backgroundColor="#FFFF" 
                        name={'trash-o'} onPress={funcDel}
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
    priceFont: {
        color: '#000A',
        fontSize: 15,
    },
    titileFont: {
        color: '#000A',
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconsAdjust: {
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
        flexDirection:'column',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 50,
        alignItems: 'center',
    },
    fontCategoria: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000'
    },
    buttonTag: {
        borderWidth: 1,
        borderColor: '#000A', 
        borderRadius: 7, 
        marginRight: 4
    }
});