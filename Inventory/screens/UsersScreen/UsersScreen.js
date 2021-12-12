import React,{useState} from 'react';
import { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Heads from '../../components/Heads';
import StaffScreen from './StaffScreen';
import AdminScreen from './AdminScreen';

const UsersScreen = ({navigation, admin, staff}) => {
   const [state, setState] = useState({
      activeAdmin: 1,
      activeStaff: 0,
   })

   useEffect( () => {
      setState({
         activeAdmin: admin,
         activeStaff: staff
      })
   }, [])

   const handleAdmin = () => {
      {
         state.activeAdmin ? 
         null : 
         setState({activeAdmin: !state.activeAdmin})
      }  
   }

   const handleStaff = () => {
      {
         state.activeStaff ? 
         null : 
         setState({activeStaff: !state.activeStaff})
      }  
   }

   return (
      <View style={styles.container}>
         <Heads nav={navigation} title="Users" tabBool={0} />
         <View style={styles.transact}>
            <View style={styles.tabs}>      
               <TouchableOpacity 
                  style={[styles.tab1, {
                     borderBottomWidth: 2, 
                     borderBottomColor: state.activeAdmin ? '#078bab' : '#e6f1fa'
                  }]}
                  onPress={() => handleAdmin()}
               >               
               <Text 
                  style={{
                     color: '#078bab', 
                     fontSize: state.activeAdmin ? 20 : 17,
                     fontWeight: state.activeAdmin ? '700' : null
                  }}
               >
                  Admin</Text>
               </TouchableOpacity>                                
               <TouchableOpacity 
                  style={[styles.tab2, {
                     borderBottomWidth: 2, borderBottomColor: state.activeStaff ? '#078bab' : '#e6f1fa'}]}                              
                  onPress={() => handleStaff()}
               >               
               <Text 
                  style={{
                     color: '#078bab', 
                     fontSize: state.activeStaff ? 20 : 17,
                     fontWeight: state.activeStaff ? '700' : null
                  }}
               >
               Staff
               </Text>
               </TouchableOpacity>
            </View>
         </View>
         {
            state.activeAdmin 
            ? 
            <AdminScreen />
            : 
            <StaffScreen />
         }
      </View>
   )
}

export default UsersScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   transact: {
      paddingHorizontal: 15,
      marginTop: 20,
      marginBottom: 15,
   },
   tabs: {
      flexDirection: 'row',
      alignSelf: 'center',   
   },
   tab1: {
      position: 'relative',
      borderRadius: 5,
      borderRightWidth: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      padding: 12,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'      
   },
   tab2: {
      position: 'relative',
      borderLeftWidth: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      padding: 12,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
});