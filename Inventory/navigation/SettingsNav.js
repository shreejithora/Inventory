import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SettingsScreen from '../screens/SettingsScreen';

import { createStackNavigator } from '@react-navigation/stack';
const SettingsStack = createStackNavigator();

const SettingsNav = ({navigation}) =>{
   return(
      <SettingsStack.Navigator screenOptions= { {
         headerStyle: {
            backgroundColor: '#078bab',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold'
         }
      }}>
         <SettingsStack.Screen name="SettingsScreen" component = {SettingsScreen}
            options= {{ 
            title: 'Settings ',
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
      </SettingsStack.Navigator>
   
   )
 }

export default SettingsNav;
