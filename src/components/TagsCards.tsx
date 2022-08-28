import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ButtonProps extends TouchableOpacityProps {
    tag: string;
}

export function TagsCards ({tag, ...rest} : ButtonProps) : JSX.Element {
    return(
        <TouchableOpacity 
            {...rest}
            style={ styleCustom.buttonTag }
            >
            <Text style={{color: '#000A'}}>{tag}{' '}
            <AntDesign name="close" color="black" size={13}/></Text>
        </TouchableOpacity>
    );
}

const styleCustom = StyleSheet.create(
    {
        buttonTag: {
            borderWidth: 1,
            borderColor: '#000A', 
            borderRadius: 7, 
            marginRight: 4
        }
    }
);
