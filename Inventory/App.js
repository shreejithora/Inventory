import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from './screens/Drawer/DrawerContent';
<<<<<<< HEAD
import { useState } from 'react';
import RootStackScreen from './screens/RootStacks/RootStackScreen';
=======
import HomeTabNav from './navigation/HomeTabNav';
import UsersNav from './navigation/UsersNav';
import VendorsNav from './navigation/VendorsNav';
import SalesNav from './navigation/SalesNav';
import QuotationNav from './navigation/QuotationNav';
>>>>>>> 970429957535fa0576e65ddb70ad3d6ff44d9dd4

const Drawer = createDrawerNavigator();

const App = () => {
  const[loginstate,setLoginState]=useState(false);
  return(
    <NavigationContainer>
      {loginstate ? 
      <Drawer.Navigator drawerContent={ props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component = { HomeTabNav } />
        <Drawer.Screen name="Users" component = { UsersNav } />
        <Drawer.Screen name="Vendors" component = { VendorsNav } />
        <Drawer.Screen name="Sales" component = { SalesNav } />
        <Drawer.Screen name="Quotation" component = { QuotationNav } />
      </Drawer.Navigator>
    :
    <RootStackScreen/>
}
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