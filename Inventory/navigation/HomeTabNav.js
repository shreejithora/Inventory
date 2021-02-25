import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';

const HomeStack = createStackNavigator();
// const EntriesStack = createStackNavigator();
// const ProductsStack = createStackNavigator();

const HomeTabNav = ({navigation}) => {
   return(
      <HomeStack.Navigator screenOptions= { {
         headerStyle: {
            backgroundColor: '#065ba1',
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
                  backgroundColor= "#065ba1"
                  onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>)}}/>
      </HomeStack.Navigator>
   )
}

export default HomeTabNav;