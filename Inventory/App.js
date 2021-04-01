import React, {useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RootStackScreen from './screens/RootStacks/RootStackScreen';
import DrawerContent from './screens/Drawer/DrawerContent';
import HomeTabNav from './navigation/HomeTabNav';
import SettingsNav from './navigation/SettingsNav';
import UsersNav from './navigation/UsersNav';
import VendorsNav from './navigation/VendorsNav';
import SalesNav from './navigation/SalesNav';
import QuotationNav from './navigation/QuotationNav';

const Drawer = createDrawerNavigator();

const App = () => {
  const[loginstate,setLoginState]=useState(true
  );
  return(
    <NavigationContainer>
      {loginstate ? 
      <Drawer.Navigator drawerContent={ props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component = { HomeTabNav } />
        <Drawer.Screen name="Users" component = { UsersNav } />
        <Drawer.Screen name="Vendors" component = { VendorsNav } />
        <Drawer.Screen name="Sales" component = { SalesNav } />
        <Drawer.Screen name="Settings" component = { SettingsNav } />
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