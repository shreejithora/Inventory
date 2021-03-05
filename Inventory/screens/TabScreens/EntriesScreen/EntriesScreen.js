import React,{useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import IncomeScreen from './IncomeScreen';
import ExpenseScreen from './ExpenseScreen';
import { useEffect } from 'react';

const EntriesScreen = (props) => {
   
   useEffect( () => {
      setState({
         activeIncome: props.income,
         activeExpense: props.expense
      })
   }, [props])

   const [state, setState] = useState({
      activeIncome: 1,
      activeExpense: 0,
   })

   const handleIncome = () => {
      {
         state.activeIncome ? 
         null : 
         setState({activeIncome: !state.activeIncome})
      }  
   }

   const handleExpense = () => {
      {
         state.activeExpense ? 
         null : 
         setState({activeExpense: !state.activeExpense})
      }  
   }

   return (
      <View style={styles.container}>
         <View style={styles.transact}>
            <View style={styles.tabs}>      
               <TouchableOpacity 
                  style={[styles.tab1, {
                     borderBottomWidth: 2, 
                     borderBottomColor: state.activeIncome ? '#078bab' : '#e6f1fa'
                  }]}
                  onPress={() => handleIncome()}
               >               
               <Text 
                  style={{
                     color: '#078bab', 
                     fontSize: state.activeIncome ? 20 : 17,
                     fontWeight: state.activeIncome ? '700' : null
                  }}
               >
                  Income</Text>
               </TouchableOpacity>                                
               <TouchableOpacity 
                  style={[styles.tab2, {
                     borderBottomWidth: 2, borderBottomColor: state.activeExpense ? '#078bab' : '#e6f1fa'}]}                              
                  onPress={() => handleExpense()}
               >               
               <Text 
                  style={{
                     color: '#078bab', 
                     fontSize: state.activeExpense ? 20 : 17,
                     fontWeight: state.activeExpense ? '700' : null
                  }}
               >
               Expense
               </Text>
               </TouchableOpacity>
            </View>
         </View>
         {
            state.activeIncome 
            ? 
            <IncomeScreen />
            : 
            <ExpenseScreen />
         }
      </View>
   )
}

export default EntriesScreen;

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