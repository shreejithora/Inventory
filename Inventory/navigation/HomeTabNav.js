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
         activeColor="#fff"
         shifting={true}
      >
         <Tab.Screen
            name="Home"
               component={HomeStackScreen}               
               options={{
               tabBarLabel: 'Home',
               tabBarColor:'#078bab',
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
               tabBarColor:'#078bab',
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
               tabBarColor:'#078bab',
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
   <HomeStack.Navigator screenOptions= { {
      headerStyle: {
         backgroundColor: '#078bab',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
         fontWeight: 'bold'
      }
   }}>
      <HomeStack.Screen name="HomeTab" component = {HomeScreen}
         options= {{ 
         title: 'Inventory ',
         headerLeft: () => (
               <Icon.Button 
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
            )
         }}
      />
   </HomeStack.Navigator>
   )

}

const EntriesStackScreen=({navigation, route})=>{

   return(
   <EntriesStack.Navigator       
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
      <EntriesStack.Screen name="EntriesScreen" children = {() => <EntriesScreen income={route.params == null ? 1 : route.params.income} expense={route.params == null ? 0 : route.params.expense} />}
         options= {{ 
         title: 'Entries ',
         headerLeft: () => (
               <Icon.Button 
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
            )
         }}
      />
   </EntriesStack.Navigator>
   )
}

const ProductsStackScreen=({navigation})=>{
   return(
   <ProductsStack.Navigator screenOptions= { {
      headerStyle: {
         backgroundColor: '#078bab',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
         fontWeight: 'bold'
      }
   }}>
      <ProductsStack.Screen name="ProductsScreen" component = {ProductsScreen}
         options= {{ 
         title: 'Products ',
         headerLeft: () => (
               <Icon.Button 
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
            )
         }}
      />
   </ProductsStack.Navigator>
   )
}