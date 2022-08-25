import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet,
    View,
    Image
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    value: number;
}

export function CardItem ({title, value,...rest} : ButtonProps) {

    return(
        <View style={styleButton.containerButton}>
            <TouchableOpacity 
                style={styleButton.button}
                activeOpacity={.7}
                {...rest}
                >
                <Image style={styleButton.imgAdjust} source={require('../img/plus.png')} />
                <Text style={styleButton.buttonFont}>{title}</Text>
                <Text style={styleButton.buttonFont}>{value}</Text>
                <EvilIcons name={'trash'} size={30} color="#F04" />
                <MaterialIcons name="mode-edit" size={30} />
            </ TouchableOpacity>
        </View>
    );
}

const styleButton = StyleSheet.create({
    button: {
        backgroundColor: '#F01',
        fontSize: 20,
        padding:15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        width: 120,
        height: 50,
        flexDirection: 'row',

    },
    buttonFont: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    containerButton: {
        justifyContent: 'flex-end'
    },
    imgAdjust: {
        marginHorizontal: 5,
        width: 15,
        height: 15,
    }
});