import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SuppliersScreen from '../screens/VendorsScreen/SuppliersScreen';
import CustomersScreen from '../screens/VendorsScreen/CustomersScreen';

import { createStackNavigator } from '@react-navigation/stack';
const VendorsStack = createStackNavigator();

const VendorsNav = ({navigation, route}) =>{
   return(
      <VendorsStack.Navigator 
         initialRouteName={route.params == null ? 'SuppliersScreen' : route.params.screen}
         screenOptions= { {
            headerStyle: {
               backgroundColor: '#078bab',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
               fontWeight: 'bold'
            }
         }}
      >
         <VendorsStack.Screen name="SuppliersScreen" component = {SuppliersScreen}
            options= {{ 
            title: 'Vendors',
            headerLeft: () => (
               <Icon.Button
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
               )
            }}
         />
         <VendorsStack.Screen name="CustomersScreen" component = {CustomersScreen}
            options= {{ 
            title: 'Vendors',
            headerLeft: () => (
               <Icon.Button
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
               )
            }}
         />
      </VendorsStack.Navigator>

   )
 }

export default VendorsNav;