import React,{useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import IncomeScreen from './IncomeScreen';
import ExpenseScreen from './ExpenseScreen';

const EntriesScreen = ({navigation}) => {

   const [state, setState] = useState({
      activeIncome: 0,
      activeExpense: 1,
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
                  style={[styles.tab1, {backgroundColor: state.activeIncome ? '#078bab' : '#fff'}]}
                  onPress={() => handleIncome()}
               >               
               <Text style={{color: state.activeIncome ? '#fff' : '#078bab', fontSize: 17} }>Income</Text>
               </TouchableOpacity>                                
               <TouchableOpacity 
                  style={[styles.tab2, {backgroundColor: state.activeExpense ? '#078bab' : '#fff'}]}
                  onPress={() => handleExpense()}
               >               
               <Text style={{color: state.activeExpense ? '#fff' : '#078bab', fontSize: 17} }>Expense</Text>
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
      borderColor: '#078bab',
      borderWidth: 1,
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
      borderColor: '#078bab',
      borderWidth: 1,
      borderRadius: 5,
      borderLeftWidth: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      padding: 12,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
});