import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import UsersScreen from '../screens/UsersScreen/UsersScreen';

import { createStackNavigator } from '@react-navigation/stack';
const UsersStack = createStackNavigator();

const UsersNav = ({navigation, route}) =>{
   return(
      <UsersStack.Navigator 
         initialRouteName='UsersScreen'
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
         <UsersStack.Screen name="UsersScreen" children = {() => <UsersScreen admin={route.params.admin} staff={route.params.staff}/>}
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
