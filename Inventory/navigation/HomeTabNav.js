import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/TabScreens/HomeScreen';
import EntriesScreen from '../screens/TabScreens/EntriesScreen/EntriesScreen';
import ProductsScreen from '../screens/TabScreens/ProductsScreen';
import { useState } from 'react';

const HomeStack = createStackNavigator();
const EntriesStack = createStackNavigator();
const ProductsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const HomeTabNav = () =>{
   return(
      <Tab.Navigator
         initialRouteName="Home"
         activeColor="#078bab"
         inactiveColor="#39bcdb"
         shifting={true}
      >
         <Tab.Screen
            name="Home"
               component={HomeStackScreen}               
               options={{
               tabBarLabel: 'Home',
               tabBarColor:'#e6f1fa',
               tabBarIcon: ({ color }) => (
                  <Icon name="home" color={color} size={26} />               
               ),
            }}
         />      
         <Tab.Screen
            name="Entries"
            component={EntriesStackScreen}
            options={{
               tabBarLabel: 'Entries',
               tabBarColor:'#fafafa',
               tabBarIcon: ({ color }) => (
                  <Icon name="clipboard-text-multiple-outline" color={color} size={26} />
               ),
            }}
         />
         <Tab.Screen
            name="Products"
            component={ProductsStackScreen}
            options={{
               tabBarLabel: 'Products',
               tabBarColor:'#e6f1fa',
               tabBarIcon: ({ color }) => (
                  <Icon name="cart-outline" color={color} size={26} />
               ),
            }}
         />
    </Tab.Navigator>
   )
 }

export default HomeTabNav;

const HomeStackScreen=({navigation})=>{
   return(
   <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="HomeTab" component = {HomeScreen}/>
   </HomeStack.Navigator>
   )

}

const EntriesStackScreen=({navigation, route})=>{

   return(
   <EntriesStack.Navigator headerMode="none">
      <EntriesStack.Screen name="EntriesScreen" children = {() => <EntriesScreen income={route.params == null ? 1 : route.params.income} expense={route.params == null ? 0 : route.params.expense} />}/>
   </EntriesStack.Navigator>
   )
}

const ProductsStackScreen=({navigation})=>{
   return(
   <ProductsStack.Navigator headerMode="none">
      <ProductsStack.Screen name="ProductsScreen" component = {ProductsScreen}/>
   </ProductsStack.Navigator>
   )
}