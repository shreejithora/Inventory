import React, { useState } from 'react';
import { 
   Text, 
   View, 
   TextInput,
   TouchableOpacity, 
   ScrollView, 
   StyleSheet,
   FlatList,
   Button
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ExpenseScreen = () => { 

   return(
      <View style={styles.container}>
         <View style={styles.mainActitivity}> 
            {/* <View style={styles.searchBar}>
               <Icon style={{marginLeft: 10}} name="text-box-search-outline" size={20} color="#078bab" />
               
               <TextInput style={{flex: 1, marginLeft: 5, color: '#000'}} 
                  placeholder="Search" 
                  onChangeText={ (val) => handleSearchText(val)} 
               />            
            </View>              */}
            <View style={styles.cardContent}>  
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}> ID</Text> 
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'center', fontWeight: '700'}]}>Product</Text>             
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'center', fontWeight: '700'}]}>Expense (In Rs.)</Text>
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