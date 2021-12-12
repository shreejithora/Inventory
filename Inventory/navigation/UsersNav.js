import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import UsersScreen from '../screens/UsersScreen/UsersScreen';

import { createStackNavigator } from '@react-navigation/stack';
const UsersStack = createStackNavigator();

const UsersNav = ({navigation, route}) =>{
   return(
      <UsersStack.Navigator headerMode="none">
         <UsersStack.Screen name="UsersScreen" children = {() => <UsersScreen admin={route.params.admin} staff={route.params.staff} navigation={navigation}/>}/>           
      </UsersStack.Navigator>
   
   )
 }

export default UsersNav;
