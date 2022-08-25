import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';

export interface DataItem {
    id: string;
    nome: string;
    preco: number;
}

export async function saveData  (data : DataItem) {
    try {
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem(data.id, jsonValue);
        Alert.alert("Salvo");
    } catch (e : any) {
        Alert.alert(e);
    }
    console.log("saveData:", data);
}

export async function getMultiple () {
    let values : readonly KeyValuePair[] = [];
    try {
        const keys = await AsyncStorage.getAllKeys();  
        values = await AsyncStorage.multiGet(keys);
    } catch(e : any) {
        Alert.alert(e);
    }
    console.log("getAllKeysData:", values);
    return values;
}