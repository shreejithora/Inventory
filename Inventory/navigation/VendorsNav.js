import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import VendorsScreen from '../screens/VendorsScreen';

import { createStackNavigator } from '@react-navigation/stack';
const VendorsStack = createStackNavigator();

const VendorsNav = ({navigation}) =>{
   return(
      <VendorsStack.Navigator screenOptions= { {
         headerStyle: {
            backgroundColor: '#078bab',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold'
         }
      }}>
         <VendorsStack.Screen name="VendorsScreen" component = {VendorsScreen}
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
