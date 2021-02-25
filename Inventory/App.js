import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabNav from './navigation/HomeTabNav';
import DrawerContent from './screens/Drawer/DrawerContent';

const Drawer = createDrawerNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Drawer.Navigator drawerContent={ props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component = { HomeTabNav } />
        {/* <Drawer.Screen name="Users" component = { UsersNav } />
        <Drawer.Screen name="Traders" component = { TradersNav } />
        <Drawer.Screen name="Products" component = { ProductsNav } />
        <Drawer.Screen name="Sales" component = { SalesNav } />
        <Drawer.Screen name="Entries" component = { EntriesNav } />
        <Drawer.Screen name="Quotation" component = { QuotationNav } /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})