import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SalesScreen from '../screens/SalesScreen';

import { createStackNavigator } from '@react-navigation/stack';
const SalesStack = createStackNavigator();

const SalesNav = ({navigation}) =>{
   return(
      <SalesStack.Navigator headerMode="none"
         // screenOptions= { {
         //    headerStyle: {
         //       backgroundColor: '#078bab',
         //    },
         //    headerTintColor: '#fff',
         //    headerTitleStyle: {
         //       fontWeight: 'bold'
         //    }
         // }}
      >
         <SalesStack.Screen name="SalesScreen" component = {SalesScreen}
            // options= {{
            // title: 'Sales ',
            // headerLeft: () => (
            //    <Icon.Button 
            //    name="menu"
            //    size={25}   
            //    backgroundColor= "#078bab"
            //    onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
            //    ),
            // headerRight: () => (
            //    <Icon.Button 
            //    name="home"
            //    size={25}   
            //    backgroundColor= "#078bab"
            //    onPress = {  () => {navigation.navigate('HomeTab')}} ></Icon.Button>
            // )
            // }}
         />
      </SalesStack.Navigator>
   
   )
 }

export default SalesNav;
