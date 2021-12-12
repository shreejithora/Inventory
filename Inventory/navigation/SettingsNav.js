import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import PreferencesScreen from '../screens/SettingsScreen/PreferencesScreen';
import SecurityScreen from '../screens/SettingsScreen/SecurityScreen';
import AppearanceScreen from '../screens/SettingsScreen/AppearanceScreen';
import NotificationsScreen from '../screens/SettingsScreen/NotificationsScreen';

import { createStackNavigator } from '@react-navigation/stack';
const SettingsStack = createStackNavigator();

const SettingsNav = ({navigation}) =>{
   return(
      <SettingsStack.Navigator headerMode="none">
         <SettingsStack.Screen name="SettingsScreen" component = {SettingsScreen}/>
         <SettingsStack.Screen name="PreferancesScreen" component = {PreferencesScreen}
            options={{
               title: 'Preferences Screen'
            }}
         />
         <SettingsStack.Screen name="SecurityScreen" component = {SecurityScreen}
            options={{
               title: 'Security Screen'
            }}
         />
         <SettingsStack.Screen name="AppearanceScreen" component = {AppearanceScreen}
            options={{
               title: 'Appearance Screen'
            }}
         />
         <SettingsStack.Screen name="NotificationsScreen" component = {NotificationsScreen}
            options={{
               title: 'Notifications Screen'
            }}
         />
      </SettingsStack.Navigator>
   
   )
 }

export default SettingsNav;
