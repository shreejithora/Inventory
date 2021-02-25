import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';

const HomeStack = createStackNavigator();
// const EntriesStack = createStackNavigator();
// const ProductsStack = createStackNavigator();

const HomeTabNav = ({navigation}) => {
   return(
      <HomeStack.Navigator >
         <HomeStack.Screen name="Home" component = {HomeScreen}/>
      </HomeStack.Navigator>
   )
}

export default HomeTabNav;