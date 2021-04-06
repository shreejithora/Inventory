import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
import { useEffect } from 'react';

const Drawer = createDrawerNavigator();

const App = () => {
  const[loginState,setLoginState]=useState({
    isLoading: true,
    display: false
  });

  useEffect(() => {
    setTimeout( () => {
      setLoginState({
        isLoading: false,
        display: true,
      })
    }, 5000);
  }, [loginState.isLoading])

  if( loginState.isLoading ) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#078bab'}}>
          <Image 
            animation="fadeIn"
            source={require('./assets/logo.png')}
            style={{height: 200, width: 200, borderRadius: 100}}
          />
        </View>
    )
  }
  return(
    <NavigationContainer>
      {loginState.display ? 
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