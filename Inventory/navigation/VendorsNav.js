import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import SuppliersScreen from '../screens/VendorsScreen/SuppliersScreen';
// import CustomersScreen from '../screens/VendorsScreen/CustomersScreen';

import { createStackNavigator } from '@react-navigation/stack';
import VendorsScreen from '../screens/VendorsScreen/VendorsScreen';
const VendorsStack = createStackNavigator();

const VendorsNav = ({navigation, route}) =>{
   return(
      <VendorsStack.Navigator headerMode="none">         
         <VendorsStack.Screen name="VendorsScreen" children = { () => <VendorsScreen cus={route.params.cus} sup={route.params.sup} navigation={navigation} /> } />
      </VendorsStack.Navigator>
   )
 }

export default VendorsNav;
