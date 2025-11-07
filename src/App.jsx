import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DataProvider } from './context/DataProvider';
import BusinessesList from './screens/BusinessesList';
import AddBusiness from './screens/AddBusiness';
import BusinessDetails from './screens/BusinessDetails';
import AddArticle from './screens/AddArticle';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Businesses" component={BusinessesList} />
          <Stack.Screen name="AddBusiness" component={AddBusiness} />
          <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
          <Stack.Screen name="AddArticle" component={AddArticle} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
