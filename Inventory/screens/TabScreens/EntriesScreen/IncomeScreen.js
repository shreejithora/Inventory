
import React, { useState } from 'react';
import { 
   Text, 
   View, 
   TextInput,
   TouchableOpacity, 
   ScrollView, 
   StyleSheet,
   FlatList
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IncomeCard from '../../../components/Entries/Income/IncomeCard';
import IncomeChart from '../../../components/Entries/Income/IncomeChart';

const IncomeList = require('../../../models/Entries.json');

const IncomeScreen = () => { 

   const [state, setState] = useState({
      status: ''
   });

   const [value, setValue] = useState('0');

   const [IncomeData, setIncomeData] = useState({
      allIncomes: IncomeList,
      filteredIncomes: IncomeList
   })

   const [graph, setGraph] = useState(false)

   const [picker, setPicker] = useState({
      all: true,
      day: false,
      week: false,
      month: false,
      year: false
   })

   const dateData = 
   [
      {
         label: 'All', 
         value: 'all', 
         icon: () => <Icon 
            name="circle" 
            size={18} 
            color= '#078bab' 
         />
      },
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

   const handleStatusChange = (val) => {

      setState({
         status: val
      })

      const newDate = new Date();
      let DateVal = 0;

      if(val == 'all') {         
         setIncomeData({
            filteredIncomes: IncomeList
         })         
      }

      if(val == 'today') {
         const date = newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate();        
         const todayValue = IncomeList.filter( item => {
            return item.last_updated == String(date)
         })
         setIncomeData({
            filteredIncomes: todayValue
         })
         const len = todayValue.length;
         for( let i=0; i<len; i++){
            DateVal = (todayValue[i].sold_quantity * todayValue[i].price)+DateVal;
         }
         setValue(DateVal);
      }

      if(val == 'thismonth') {
         const date = newDate.getFullYear()+'-'+(newDate.getMonth()+1);    
         console.log(date);    
         const monthValue = IncomeList.filter( item => {
            return item.last_updated.substring(0,6) == String(date)
         })
         setIncomeData({
            filteredIncomes: monthValue
         })
         const len = monthValue.length;
         for( let i=0; i<len; i++){
            DateVal = (monthValue[i].sold_quantity * monthValue[i].price)+DateVal;
         }
         setValue(DateVal);
      }

      if(val == 'thisyear') {
         const date = newDate.getFullYear();    
         console.log(date);    
         const yearValue = IncomeList.filter( item => {
            return item.last_updated.substring(0,4) == String(date)
         })
         setIncomeData({
            filteredIncomes: yearValue
         })
         const len = yearValue.length;
         for( let i=0; i<len; i++){
            DateVal = (yearValue[i].sold_quantity * yearValue[i].price)+DateVal;
         }
         setValue(DateVal);
      }
   }

   const handlePickerchange = val => {

      const newDate = new Date();
      let DateVal = 0;

      if(val == "all"){
          setIncomeData({
            filteredIncomes: IncomeList
         }) 
         setPicker({ 
            all: true,
            day: false,
            week: false,
            month: false,
            year: false
         })
      } else if(val == "day"){
         setPicker({ 
            all: false,
            day: true,
            week: false,
            month: false,
            year: false
         })
         const date = newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate();        
         const todayValue = IncomeList.filter( item => {
            return item.last_updated == String(date)
         })
         setIncomeData({
            filteredIncomes: todayValue
         })
         const len = todayValue.length;
         for( let i=0; i<len; i++){
            DateVal = (todayValue[i].sold_quantity * todayValue[i].price)+DateVal;
         }
         setValue(DateVal);
      }  
      else if(val == "week"){
         setPicker({ 
             all: false,
            day: false,
            week: true,
            month: false,
            year: false
         });         
      }  
      else if(val == "month"){
         setPicker({ 
             all: false,
            day: false,
            week: false,
            month: true,
            year: false
         });
         const date = newDate.getFullYear()+'-'+(newDate.getMonth()+1); 
         const monthValue = IncomeList.filter( item => {
            return item.last_updated.substring(0,6) == String(date)
         })
         setIncomeData({
            filteredIncomes: monthValue
         })
         const len = monthValue.length;
         for( let i=0; i<len; i++){
            DateVal = (monthValue[i].sold_quantity * monthValue[i].price)+DateVal;
         }
         setValue(DateVal);
      }  
      else if(val == "year"){
         setPicker({ 
             all: false,
            day: false,
            week: false,
            month: false,
            year: true
         });
         const date = newDate.getFullYear();    
         const yearValue = IncomeList.filter( item => {
            return item.last_updated.substring(0,4) == String(date)
         })
         setIncomeData({
            filteredIncomes: yearValue
         })
         const len = yearValue.length;
         for( let i=0; i<len; i++){
            DateVal = (yearValue[i].sold_quantity * yearValue[i].price)+DateVal;
         }
         setValue(DateVal);
      } 
   }

   return(
      <View style={styles.container}>
         <View style={styles.mainActitivity}> 
            {/* <View style={styles.picker}>
               <DropDownPicker 
                  items={dateData}
                  placeholder="Time Period"
                  defaultValue={state.status}
                  containerStyle={{height: 40, width: '40%', alignSelf: 'flex-end'}}
                  style={{backgroundColor: '#fafafa'}}
                  itemStyle={{
                     justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={item => handleStatusChange(item.value)}
               />
            </View> */}
            {
               state.status == 'today' ?
               <View style={styles.IncomeSection}>
                  <Text style={styles.IncomeDisplay}>
                     Today's Income: {value}
                  </Text>
                  <View style={{display: graph ? 'flex' : 'none' }}>
                     <IncomeChart /> 
                  </View>
                  <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}} onPress={() => setGraph(!graph)}>   
                      <Text style={{color: '#078bab'}}>{graph ? "Close Graph" : "See Graph"}</Text>                                         
                     <Icon  
                        style={{padding: 5}}                       
                        name={
                           graph ? 
                           "arrow-up-drop-circle-outline" : 
                           "arrow-down-drop-circle-outline"
                        } 
                        size={30} 
                        color="#078bab" 
                     />                                        
                  </TouchableOpacity>
               </View> :
               <View style={styles.IncomeSection}>
                  <Text style={styles.IncomeDisplay}>
                     Income: NRs. {value}
                  </Text>
                  <View style={{display: graph ? 'flex' : 'none' }}>
                     <IncomeChart /> 
                  </View>
                  <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}} onPress={() => setGraph(!graph)}>   
                      <Text style={{color: '#078bab'}}>{graph ? "Close Graph" : "See Graph"}</Text>                                         
                     <Icon  
                        style={{padding: 5}}                       
                        name={
                           graph ? 
                           "arrow-up-drop-circle-outline" : 
                           "arrow-down-drop-circle-outline"
                        } 
                        size={30} 
                        color="#078bab" 
                     />                                        
                  </TouchableOpacity>
               </View>
            }
            {
               state.status == 'thismonth' ?
               <View style={styles.IncomeSection}>
                  <Text style={styles.IncomeDisplay}>
                     This Month's Income: {value}
                  </Text>
               </View> :
               null
            }
            {
               state.status == 'thisyear' ?
               <View style={styles.IncomeSection}>
                  <Text style={styles.IncomeDisplay}>
                     This Year's Income: {value}
                  </Text>
               </View> :
               null
            }      
            <View style={styles.pickDate}>
               <TouchableOpacity style={{padding: 8, borderRadius: 50 ,backgroundColor: picker.all ? '#fafafa' : null}} onPress={() => handlePickerchange("all")}>
                  <Text style={styles.DateTexts}>All</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{padding: 8, borderRadius: 50 ,backgroundColor: picker.day ? '#fafafa' : null}} onPress={() => handlePickerchange("day")}>
                  <Text style={styles.DateTexts}>1D</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{padding: 8, borderRadius: 50 ,backgroundColor: picker.week ? '#fafafa' : null}} onPress={() => handlePickerchange("week")}>
                  <Text style={styles.DateTexts}>1W</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{padding: 8, borderRadius: 50 ,backgroundColor: picker.month ? '#fafafa' : null}} onPress={() => handlePickerchange("month")}>
                  <Text style={styles.DateTexts}>1M</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{padding: 8, borderRadius: 50 ,backgroundColor: picker.year ? '#fafafa' : null}} onPress={() => handlePickerchange("year")}>
                  <Text style={styles.DateTexts}>1Y</Text>
               </TouchableOpacity>
            </View>                
            <View style={styles.cardContent}>  
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}> ID</Text> 
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left', fontWeight: '700'}]}>Product</Text>             
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'center', fontWeight: '700'}]}>Income (In Rs.)</Text>
            </View>             
            { 
               IncomeData.filteredIncomes == null ?
               <View opacity={0.5} style={styles.errorDisplay}>
                  <Icon name="clipboard-alert-outline" size={30} color='#078bab'/>
                  <Text style={styles.errorMsg}>No Match Found</Text>  
                                 
               </View> :
               <FlatList 
                  data = {IncomeData.filteredIncomes}
                  keyExtractor = {item => item.product_id}
                  renderItem = { ({item}) =>                  
                     <IncomeCard items={item}/>                                    
                  }
               />
            }            
         </View>                               
      </View>    
   )
}

export default IncomeScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   picker: {      
      paddingHorizontal: 8,
      paddingTop: 8
   },
   IncomeSection: {
      borderRadius: 5,
      alignSelf: 'center',
      marginTop: 10,
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#fafafa',
   },
   IncomeDisplay: {
      color: '#078bab',
      fontWeight: '700',
      fontSize: 18,
      paddingHorizontal: 20, 
   },
   pickDate: {
      marginTop: 10,
      flexDirection: 'row', 
      justifyContent: 'space-around',
      paddingVertical: 10
   },
   DateTexts: {
      color: '#078bab',
      fontSize: 18,      
   },
   mainActitivity: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#e6f1fa',
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
      justifyContent: 'space-between',
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