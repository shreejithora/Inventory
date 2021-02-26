import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import EntriesScreen from '../screens/EntriesScreen';
import ProductsScreen from '../screens/ProductsScreen';

const HomeStack = createStackNavigator();
 const EntriesStack = createStackNavigator();
 const ProductsStack = createStackNavigator();

 const Tab= createMaterialBottomTabNavigator();

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
                  tabBarColor:'lightblue',
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
               tabBarColor:'lightblue',
               tabBarIcon: ({ color }) => (
                  <Icon name="person" color={color} size={26} />
               ),
        }}
      />

     <Tab.Screen
            name="Products"
            component={ProductsStackScreen}
            options={{
               tabBarLabel: 'Products',
               tabBarColor:'lightblue',
               tabBarIcon: ({ color }) => (
                  <Icon name="settings" color={color} size={26} />
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
      <HomeStack.Screen name="Home" component = {HomeScreen}
         options= {{ 
         title: 'Inventory ',
         headerLeft: () => (
               <Icon.Button 
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>)}}/>
   </HomeStack.Navigator>
   )

}

const EntriesStackScreen=({navigation})=>{
   return(
   <EntriesStack.Navigator screenOptions= { {
      headerStyle: {
         backgroundColor: '#078bab',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
         fontWeight: 'bold'
      }
   }}>
      <EntriesStack.Screen name="Home" component = {EntriesScreen}
         options= {{ 
         title: 'Inventory ',
         headerLeft: () => (
               <Icon.Button 
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>)}}/>
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
      <ProductsStack.Screen name="Home" component = {ProductsScreen}
         options= {{ 
         title: 'Inventory ',
         headerLeft: () => (
               <Icon.Button 
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>)}}/>
   </ProductsStack.Navigator>
   )
}