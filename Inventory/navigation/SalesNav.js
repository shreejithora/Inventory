import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SalesScreen from '../screens/SalesScreen';

import { createStackNavigator } from '@react-navigation/stack';
const SalesStack = createStackNavigator();

const SalesNav = ({navigation}) =>{
   return(
      <SalesStack.Navigator headerMode="none">
         <SalesStack.Screen name="SalesScreen" component = {SalesScreen}/>
      </SalesStack.Navigator>
   
   )
 }

export default SalesNav;
