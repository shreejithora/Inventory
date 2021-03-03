import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AdminScreen from '../screens/UsersScreen/AdminScreen';
import StaffScreen from '../screens/UsersScreen/StaffScreen';

import { createStackNavigator } from '@react-navigation/stack';
const UsersStack = createStackNavigator();

const UsersNav = ({navigation, route}) =>{
   return(
      <UsersStack.Navigator 
         initialRouteName={route.params.screen}
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
         <UsersStack.Screen name="AdminScreen" component = {AdminScreen}
            options= {{ 
            title: 'Users ',
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
         <UsersStack.Screen name="StaffScreen" component = {StaffScreen}
            options= {{ 
            title: 'Users ',
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
      </UsersStack.Navigator>
   
   )
 }

export default UsersNav;
