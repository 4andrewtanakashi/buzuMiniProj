import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet,
    View,
    Image
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    value: string;
}

export function Button ({value, ...rest} : ButtonProps) : JSX.Element {
    return(
        <View style={styleButton.containerButton}>
            <TouchableOpacity 
                style={styleButton.button}
                activeOpacity={.7}
                {...rest}
                >
                <Image style={styleButton.imgAdjust} source={require('../img/plus.png')} />
                <Text style={styleButton.buttonFont}>{value}</Text>
            </ TouchableOpacity>
        </View>
    );
}

const styleButton = StyleSheet.create({
    button: {
        backgroundColor: '#DA0D1E',
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
        justifyContent: 'flex-end',
    },
    imgAdjust: {
        marginHorizontal: 5,
        width: 15,
        height: 15,
    }
});