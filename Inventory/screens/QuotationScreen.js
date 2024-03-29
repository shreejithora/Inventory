import React, { useState } from 'react';
import { 
   Text, 
   TextInput,
   View,
   StyleSheet,
   FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Heads from '../components/Heads';
import QuotationCard from '../components/Quotations/QuotationCard';

const ProductsList = require('../models/Products.json');

const QuotationScreen = ({navigation}) => {

   const [productData, setProductData] = useState({
      allProducts: ProductsList,
      filteredProducts: ProductsList
   })

   const handleSearchText = textToSearch => {
      const foundProduct = ProductsList.filter( item => {
         return ( 
            item.product_id.toLowerCase().includes(textToSearch.toLowerCase()) || 
            item.name.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.quantity.toLowerCase().includes(textToSearch.toLowerCase())  ||
            item.price.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.last_updated.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.category.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.sub_category.toLowerCase().includes(textToSearch.toLowerCase()) 
         )
      })
      
      setProductData({
         ...productData,
         filteredProducts: foundProduct.length == 0 ? null : foundProduct         
      })      
   }

   return(
      <View style={styles.container}>
         <Heads nav={navigation} title="Quotation" tabBool={0} />
         <View style={styles.mainActitivity}> 
            <View style={styles.searchBar}>
               <Icon style={{marginLeft: 10}} name="text-box-search-outline" size={20} color="#078bab" />
               
               <TextInput style={{flex: 1, marginLeft: 5, color: '#000'}} 
                  placeholder="Search" 
                  onChangeText={ (val) => handleSearchText(val)} 
               />            
            </View>             
            <View style={styles.cardContent}>  
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'left', fontWeight: '700'}]}>ID</Text> 
               <Text style={[styles.cardTitle, {flex: 3, textAlign: 'left', fontWeight: '700'}]}>Name</Text>  
               
            </View> 
            { 
               productData.filteredProducts == null ?
               <View opacity={0.5} style={styles.errorDisplay}>
                  <Icon name="clipboard-alert-outline" size={30} color='#078bab'/>
                  <Text style={styles.errorMsg}>No Match Found</Text>  
                                 
               </View> :
               <FlatList 
                  data = {productData.filteredProducts}
                  keyExtractor = {item => item.product_id}
                  renderItem = { ({item}) =>                  
                     <QuotationCard items={item}/>                                    
                  }
               />
            }           
         </View>               
      </View>
   )
}

export default QuotationScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   mainActitivity: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#e6f1fa',
      justifyContent: 'center',
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