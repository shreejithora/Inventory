import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import QuotationScreen from '../screens/QuotationScreen';

import { createStackNavigator } from '@react-navigation/stack';
const QuotationStack = createStackNavigator();

const QuotationNav = ({navigation}) =>{
   return(
      <QuotationStack.Navigator headerMode="none">
         <QuotationStack.Screen name="QuotationScreen" component = {QuotationScreen}/>
      </QuotationStack.Navigator>   
   )
 }

export default QuotationNav;
