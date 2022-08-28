import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import {DataItem, dataItemNew} from '../utils/Utils';

export async function saveData  (data : DataItem) : Promise<void> {
    try {
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem(data.id, jsonValue);
    } catch (e : any) {
        console.log("Erro: ", e);
    }
    console.log("saveData:", data);
}

export async function setItemData (data : DataItem) : Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(data.id, jsonValue);
    } catch (e : any) {
        console.log("Erro: ", e);
    }
  
    console.log("setItemData:", data);
}

export async function getMultiple () : Promise<readonly KeyValuePair[]> {
    let values : readonly KeyValuePair[] = [];
    try {
        const keys = await AsyncStorage.getAllKeys();  
        values = await AsyncStorage.multiGet(keys);
    } catch (e : any) {
        console.log("Erro: ", e);
    }
    //console.log("getMultiple:", values);
    return values;
}

export async function getMyObject (id: string) : Promise<DataItem> {
    let value : DataItem = dataItemNew();
    try {
        const jsonValue = await AsyncStorage.getItem(id)
        value = jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e : any) {
        console.log("Erro: ", e);
    }

    console.log("getMyObject:", value);
    return value;
}

export async function removeItem (id: string) : Promise<void> {
    try {
        await AsyncStorage.removeItem(id)
    } catch(e : any) {
        Alert.alert("Erro: ", e);
    }
    console.log('Elemento removido com sucesso')
}