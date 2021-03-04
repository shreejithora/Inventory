import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import SuppliersScreen from '../screens/VendorsScreen/SuppliersScreen';
// import CustomersScreen from '../screens/VendorsScreen/CustomersScreen';

import { createStackNavigator } from '@react-navigation/stack';
import VendorsScreen from '../screens/VendorsScreen/VendorsScreen';
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
         {/* <VendorsStack.Screen name="SuppliersScreen" component = {SuppliersScreen}
            options= {{ 
            title: 'Vendors',
            headerLeft: () => (
               <Icon.Button
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
               ),
            headerRight: () => (
               <Icon.Button 
               name="home"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.navigate('HomeTab')}} ></Icon.Button>
            )
            }}
         /> */}
         <VendorsStack.Screen name="VendorsScreen" children = { () => <VendorsScreen cus={route.params.cus} sup={route.params.sup} /> }
            options= {{ 
            title: 'Vendors',
            headerLeft: () => (
               <Icon.Button
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
               ),
            headerRight: () => (
               <Icon.Button 
               name="home"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.navigate('HomeTab')}} ></Icon.Button>
            )
            }}
         />
      </VendorsStack.Navigator>

   )
 }

export default VendorsNav;
