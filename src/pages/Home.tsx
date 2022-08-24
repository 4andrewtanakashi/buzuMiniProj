import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList, //Muitos elementos
    Alert,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Button} from '../components/Button';

export function Home () {
    const navigation = useNavigation();

    return(
        <View style={stylesCustom.container}>
            <Button 
                value={"Cadastrar"} 
                onPress={_ => navigation.navigate("FormEdit" as never)}
            />
            <EvilIcons name={'trash'} size={30} color="#F04" />
            <MaterialIcons name="mode-edit" size={30} />
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
            color: 'white',
            fontSize:24,
            fontWeight: 'bold',
            padding:15
        },
    
    }
);