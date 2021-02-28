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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductCard from '../../components/ProductCard';
const ProductsList = require('../../models/Products.json');

const ProductsScreen = () => {

   const [productData, setProductData] = useState({
      allProducts: ProductsList,
      filteredProducts: ProductsList
   })

   const [foundProduct, setFoundProduct] = useState(true)

   const handleSearchText = textToSearch => {
      const foundProduct = ProductsList.filter( item => {
          return ( item.product_id.toLowerCase().includes(textToSearch.toLowerCase()) || 
                  item.name.toLowerCase().includes(textToSearch.toLowerCase()) ||
                  item.quantity.toLowerCase().includes(textToSearch.toLowerCase())  ||
                  item.price.toLowerCase().includes(textToSearch.toLowerCase()) )
      })

      console.log(foundProduct);
      
      setProductData({
         ...productData,
         filteredProducts: foundProduct.length == 0 ? null : foundProduct
         // ProductsList.filter( item => {
         //    if(!item.product_id.toLowerCase().(textToSearch.toLowerCase()) && 
         //       !item.name.toLowerCase().includes(textToSearch.toLowerCase()) &&
         //       !item.quantity.toLowerCase().includes(textToSearch.toLowerCase())  &&
         //       !item.price.toLowerCase().includes(textToSearch.toLowerCase()) ) {
         //       return null 
         //    } else {
         //       return (                
         //          item.product_id.toLowerCase().includes(textToSearch.toLowerCase()) || 
         //          item.name.toLowerCase().includes(textToSearch.toLowerCase()) ||
         //          item.quantity.toLowerCase().includes(textToSearch.toLowerCase())  ||
         //          item.price.toLowerCase().includes(textToSearch.toLowerCase()) 
         //       )
         //    }                        
         // })
      })      
   }

   return(
      <View style={styles.container}>
         <View style={styles.mainActitivity}> 
            <View style={styles.searchBar}>
               <Icon style={{marginLeft: 10}} name="text-box-search-outline" size={20} color="#078bab" />
               
               <TextInput style={{flex: 1, marginLeft: 5, color: '#000'}} 
                  placeholder="Search" 
                  onChangeText={ (val) => handleSearchText(val)} 
               />            
            </View>             
            <View style={styles.cardContent}>  
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}>ID</Text> 
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left', fontWeight: '700'}]}>Name</Text>  
               <Text style={[styles.cardTitle, {flex: 1, textAlign: 'left', fontWeight: '700'}]}>Qty</Text>            
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'center', fontWeight: '700'}]}>Price (In Rs.)</Text>
            </View> 
            <FlatList 
               data = {productData.filteredProducts}
               keyExtractor = {item => item.product_id}
               renderItem = { ({item}) => 
                  productData.filteredProducts == null ?
                  <Text style={{color: 'black', fontSize: 20}}>No Match found</Text> :
                  <ProductCard items={item}/> 
                                   
               }
            />
         </View>      
            <TouchableOpacity style={{position: 'absolute', bottom: 25, right: 25,}}>
               <Icon name="plus" size={30} color='#e6f1fa' style={styles.icon}/>              
            </TouchableOpacity>   
      </View>
   )
}

export default ProductsScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   mainActitivity: {
      position: 'relative',
      marginBottom: 50,
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
      marginTop: 20
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
      // position: 'absolute',
      // bottom: 70,
      // right: 25,
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
   }
})