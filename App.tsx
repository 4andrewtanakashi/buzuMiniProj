import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Home} from './src/pages/Home';
import {ItemForm} from './src/pages/ItemForm';
import { RootStackParams } from './src/utils/Utils';
import { DataItemsContextProvider } from './src/contexts/DataItems';

const Stack = createNativeStackNavigator<RootStackParams>();

export default function App () {
  return (
       <>
          <StatusBar barStyle="light-content" />
          <NavigationContainer>
                <DataItemsContextProvider>
                  <Stack.Navigator initialRouteName="Home" 
                    screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="Home" component={Home}/>
                      <Stack.Screen name="ItemForm" component={ItemForm}/>
                  </Stack.Navigator>
                </DataItemsContextProvider>
          </NavigationContainer>
       </>
  );
}