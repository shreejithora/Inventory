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

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IncomeScreen = () => { 

   const [state, setState] = useState({
      status: 'today'
   })

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

   const handleStatusChange = (val) => {

      setState({
         status: val
      })
   }

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
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}> ID</Text> 
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'center', fontWeight: '700'}]}>Product</Text>             
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'center', fontWeight: '700'}]}>Income (In Rs.)</Text>
            </View>             
            {/* { 
               productData.filteredProducts == null ?
               <View opacity={0.5} style={styles.errorDisplay}>
                  <Icon name="clipboard-alert-outline" size={30} color='#078bab'/>
                  <Text style={styles.errorMsg}>No Match Found</Text>  
                                 
               </View> :
               <FlatList 
                  data = {productData.filteredProducts}
                  keyExtractor = {item => item.product_id}
                  renderItem = { ({item}) =>                  
                     <ProductCard items={item}/>                                    
                  }
               />
            }             */}
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