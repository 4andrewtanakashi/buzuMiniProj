import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

export function Top () : JSX.Element {
    return(
        <>
            <View style={stylesCustom.topScreen}>
                <Image style={stylesCustom.imgBuzuAdjust} 
                    source={require('../img/buzu.png')} />
            </View>
            <Text style={stylesCustom.fontTitle}>Meus Produtos</Text>
        </>
    );
}

const stylesCustom = StyleSheet.create(
    {
        imgBuzuAdjust: {
            flex: 1,
            width: 80,
        },
        topScreen: {
            backgroundColor: "#DA0D1E",
            height: 50
        },
        fontTitle: {
            backgroundColor: '#EEEEEE',
            paddingTop: 20,
            paddingBottom: 20,
            paddingHorizontal: 30,
            fontWeight: 'bold',
            fontSize: 18
        }
    }
);