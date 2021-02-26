import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import QuotationScreen from '../screens/TabScreens/HomeScreen';

import { createStackNavigator } from '@react-navigation/stack';
const QuotationStack = createStackNavigator();

const QuotationNav = ({navigation}) =>{
   return(
      <QuotationStack.Navigator screenOptions= { {
         headerStyle: {
            backgroundColor: '#078bab',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold'
         }
      }}>
         <QuotationStack.Screen name="QuotationScreen" component = {QuotationScreen}
            options= {{ 
            title: 'Quotation ',
            headerLeft: () => (
               <Icon.Button 
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
               )
            }}
         />
      </QuotationStack.Navigator>
   
   )
 }

export default QuotationNav;
