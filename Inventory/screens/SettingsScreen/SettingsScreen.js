import React, {useState} from 'react';
import { 
   View,     
   StyleSheet,
   Button,
   Platform,
   TouchableOpacity
} from 'react-native';

import { 
   Caption,
   Text, 
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = ({navigation}) => {

   return (
   <View style={styles.container}>
         <TouchableOpacity onPress={() => navigation.navigate('PreferancesScreen')}>
            <View style={styles.settingsOption}>
               <Icon name="account-outline" size={25} color='#078bab' />
               <View style={styles.settingText}>
                  <Text style={styles.settingsTitle}>Account Preferences</Text>
                  <Caption style={styles.settingsCaption}>The Basics of your Profile and experience  </Caption>
               </View>
            </View>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('SecurityScreen')}>
            <View  style={styles.settingsOption}>
               <Icon name="account-lock-outline" size={25} color='#078bab' />
               <View style={styles.settingText}>
                  <Text style={styles.settingsTitle}>SignIn and Security</Text>
                  <Caption style={styles.settingsCaption}>Controls to keep your account safe</Caption>
               </View>
            </View>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('AppearanceScreen')}>
            <View  style={styles.settingsOption}>
               <Icon name="animation-outline" size={25} color='#078bab' />
               <View style={styles.settingText}>
                  <Text style={styles.settingsTitle}>Appearance</Text>
                  <Caption style={styles.settingsCaption}>How you App Looks and feels for better User Experience</Caption>
               </View>
            </View>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen')}>
            <View  style={styles.settingsOption}>
               <Icon name="bell-outline" size={25} color='#078bab' />
               <View style={styles.settingText}>
                  <Text style={styles.settingsTitle}>Notifications</Text>
                  <Caption style={styles.settingsCaption}>Control your Notification Preferences</Caption>
               </View>
            </View>
         </TouchableOpacity>
   </View>
   );
}

export default SettingsScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 10
   },
   settingsOption: {
      flexDirection: 'row', 
      alignItems: 'center',      
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1
   },
   settingText: {
      padding: 12,
   },
   settingsTitle: {
      fontSize: 20,
      color: '#078bab',
      fontWeight: 'bold',
      padding: 5
   },
   settingsCaption: {
      marginLeft: 10,
      fontSize: 12,
      marginTop: 0
   }
});

