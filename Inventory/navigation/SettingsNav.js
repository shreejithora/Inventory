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
      <SettingsStack.Navigator screenOptions= { {
         headerStyle: {
            backgroundColor: '#078bab',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold'
         }
      }}>
         <SettingsStack.Screen name="SettingsScreen" component = {SettingsScreen}
            options= {{ 
            title: 'Settings ',
            headerLeft: () => (
               <Icon.Button 
               name="menu"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.openDrawer()}} ></Icon.Button>
               ),
            headerRight: () => (
               <Icon.Button 
               name="home"
               size={25}   
               backgroundColor= "#078bab"
               onPress = {  () => {navigation.navigate('HomeTab')}} ></Icon.Button>
            )
            }}
         />
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
