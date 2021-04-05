import React,{useState} from 'react';
import { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Heads from '../../components/Heads';
import CustomersScreen from './CustomersScreen';
import SuppliersScreen from './SuppliersScreen';

const VendorsScreen = ({navigation, sup, cus}) => {
   const [state, setState] = useState({
      activeSuppliers: 1,
      activeCustomers: 0,
   })

   useEffect( () => {
      setState({
         activeSuppliers: sup,
         activeCustomers: cus
      })
   }, [sup, cus])

   const handleSuppliers = () => {
      {
         state.activeSuppliers ? 
         null : 
         setState({activeSuppliers: !state.activeSuppliers})
      }  
   }

   const handleCustomers = () => {
      {
         state.activeCustomers ? 
         null : 
         setState({activeCustomers: !state.activeCustomers})
      }  
   }

   return (
      <View style={styles.container}>
         <Heads nav={navigation} title="Vendors" tabBool={0} />
         <View style={styles.transact}>
            <View style={styles.tabs}>      
               <TouchableOpacity 
                  style={[styles.tab1, {
                     borderBottomWidth: 2, 
                     borderBottomColor: state.activeSuppliers ? '#078bab' : '#e6f1fa'
                  }]}
                  onPress={() => handleSuppliers()}
               >               
               <Text 
                  style={{
                     color: '#078bab', 
                     fontSize: state.activeSuppliers ? 20 : 17,
                     fontWeight: state.activeSuppliers ? '700' : null
                  }}
               >
                  Suppliers</Text>
               </TouchableOpacity>                                
               <TouchableOpacity 
                  style={[styles.tab2, {
                     borderBottomWidth: 2, borderBottomColor: state.activeCustomers ? '#078bab' : '#e6f1fa'}]}                              
                  onPress={() => handleCustomers()}
               >               
               <Text 
                  style={{
                     color: '#078bab', 
                     fontSize: state.activeCustomers ? 20 : 17,
                     fontWeight: state.activeCustomers ? '700' : null
                  }}
               >
               Customers
               </Text>
               </TouchableOpacity>
            </View>
         </View>
         {
            state.activeSuppliers 
            ? 
            <SuppliersScreen />
            : 
            <CustomersScreen />
         }
      </View>
   )
}

export default VendorsScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   transact: {
      paddingHorizontal: 15,
      marginVertical: 10
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