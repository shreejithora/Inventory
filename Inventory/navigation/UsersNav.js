import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import UsersScreen from '../screens/UsersScreen';

import { createStackNavigator } from '@react-navigation/stack';
const UsersStack = createStackNavigator();

const UsersNav = ({navigation}) =>{
   return(
      <UsersStack.Navigator screenOptions= { {
         headerStyle: {
            backgroundColor: '#078bab',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold'
         }
      }}>
         <UsersStack.Screen name="UsersScreen" component = {UsersScreen}
            options= {{ 
            title: 'Users ',
            headerLeft: () => (
               <Icon.Button 
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
               )
            }}
         />
      </UsersStack.Navigator>
   
   )
 }

export default UsersNav;
