import React, { useState } from 'react';
import { 
   Text, 
   View, 
   TextInput,
   TouchableOpacity, 
   ScrollView, 
   StyleSheet,
   FlatList,
   RefreshControl
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import firestore from "@react-native-firebase/firestore";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import ExpenseCard from '../../../components/Entries/Expense/ExpenseCard';

let ExpenseList = [];

const ExpenseScreen = () => { 

   const [state, setState] = useState({
      status: 'today'
   })

   const [expenseData, setExpenseData] = useState({
      allExpenses: ExpenseList,
      filteredExpenses: ExpenseList
   })

   useEffect( () => {
      setTimeout( async() => {
         ExpenseList = [];
         try{
            await firestore()
               .collection('Expense')
               .orderBy('updated', 'desc')
               .get()
               .then( querySnapshot => {
                  querySnapshot.forEach( documentSnapshot => {
                     const data = documentSnapshot.data()
                     data.id = documentSnapshot.id
                     ExpenseList.push(data);
                  })
                  setExpenseData({
                     allExpenses: ExpenseList,
                     filteredExpenses: ExpenseList
                  })
               })
         } catch(e) {
            console.log(e)
         }
      }, 1000)
   }, []);

   const dateData = 
   [
      {
         label: 'Today', 
         value: 'today', 
         icon: () => <Icon 
            name="timer-sand-empty" 
            size={18} 
            color= '#078bab' 
         />
      },
      {
         label: 'This Month', 
         value: 'thismonth', 
         icon: () => <Icon 
            name="timer-sand" 
            size={18} 
            color= 'green' 
         />
      },
      {
         label: 'This Year', 
         value: 'thisyear', 
         icon: () => <Icon 
            name="timer-sand-full" 
            size={18} 
            color= 'red' 
         />
      },
   ]

   const [refreshing, setRefreshing] = useState(false)

   const handleStatusChange = (val) => {

      setState({
         status: val
      })
   }

   const onRefresh = React.useCallback( async() => {
      setRefreshing(true);           
      const today = new Date(); 
      try{
         ExpenseList = []; 
         await firestore()
         .collection('Expense')
         .orderBy('updated', 'desc')
         .get()
         .then( querySnapshot => {
            querySnapshot.forEach( documentSnapshot => {                    
               const data = documentSnapshot.data();
               // const dbDate = data.last_updated.toDate().toDateString();
               // if( dbDate == today.toDateString()){
                  data.id = documentSnapshot.id;                                
                  ExpenseList.push(data); 
               // }                    
            });       
            setRefreshing(false) 
            setExpenseData({
               allExpenses: ExpenseList,
               filteredExpenses: ExpenseList
            })          
         });
      } catch(e){
         console.log(e)
      }
      
   }, [refreshing]);

   return(
      <View style={styles.container}>
         <View style={styles.mainActitivity}>
            <View style={styles.picker}>
               <DropDownPicker 
                  items={dateData}
                  defaultValue={state.status}
                  containerStyle={{height: 40, width: '40%', alignSelf: 'flex-end'}}
                  style={{backgroundColor: '#fafafa'}}
                  itemStyle={{
                     justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={item => handleStatusChange(item.value)}
               />
            </View>             
            <View style={styles.cardContent}>                 
               <Text style={[styles.cardTitle, {flex: 3, textAlign: 'left', fontWeight: '700'}]}>Product</Text>   
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}>Cost Price</Text> 
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}> Qty </Text>           
               <Text style={[styles.cardTitle, {flex: 2, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}>Expense (In Rs.)</Text>
            </View> 
            { 
               expenseData.filteredExpenses == null ?
               <View opacity={0.5} style={styles.errorDisplay}>
                  <Icon name="clipboard-alert-outline" size={30} color='#078bab'/>
                  <Text style={styles.errorMsg}>No Match Found</Text>  
                                 
               </View> :
               <FlatList 
                  data = {expenseData.filteredExpenses}
                  keyExtractor = {item => item.id}
                  renderItem = { ({item}) =>                  
                     <ExpenseCard items={item}/>  
                     // <Text>{item.product_name}</Text>                                  
                  }
                  refreshControl={
                     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
               />
            }            
         </View>                               
      </View>    
   )
}

export default ExpenseScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   mainActitivity: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#e6f1fa',
   },
   picker: {
      paddingHorizontal: 8,
      paddingTop: 8
   },
   activityView: {
      borderRadius: 15,
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '90%',
      shadowColor: "#000",
      shadowOffset: {
         width:  2,
         height: 3,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,

      elevation: 7,
   },
   cardContent: {
      flexDirection: 'row',
      // justifyContent: 'space-around',
      marginHorizontal: 10,
      padding: 5,
      marginTop: 10
   },
   cardTitle:{
      marginHorizontal: 5,
      color: '#078bab',
      fontSize: 18,
   },
   searchBar: {
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      borderColor: '#078bab',
      borderWidth: 1,
      borderRadius: 50,
      height: 40      
   },
   activityTopicText: {
      fontSize: 20,
      fontWeight: '700'
   },
   icon: {
      padding: 20,      
      backgroundColor: '#078bab', 
      borderRadius: 50 ,
      shadowColor: "#000",
      shadowOffset: {
         width:  2,
         height: 3,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,

      elevation: 12,
   },
   errorDisplay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',            
   },
   errorMsg: {
      color: '#078bab',
      fontSize: 20
   }
})