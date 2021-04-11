
import React, { useEffect, useState } from "react";
import { 
   Text,
   View,
   StyleSheet,
   FlatList, 
} from "react-native";

import * as Animatable from 'react-native-animatable';

import firestore from '@react-native-firebase/firestore';

let ProductsList = [];

const CustomerInfo = ({item}) => {   

   const [productInfo, setProductInfo] = useState({
      allProducts: ProductsList
   })
   

   let [size, setSize] = useState(0)

   useEffect( () => {           
      const ok = async() => {         
         ProductsList = [];
         try{
             await firestore()
               .collection('Products')
               .get()
               .then( querySnapshot => {
                  setSize(querySnapshot.size)
                  querySnapshot.forEach( documentSnapshot => {
                     ProductsList.push(documentSnapshot.data())
                  })               
               })
               setProductInfo({
                  allProducts: ProductsList
               })
         } catch(e) {
            console.log(e)
         }         
      }
      ok();
   }, [])

   

   return(
      <View  style={styles.CustomerInfo}>    
         <Animatable.View animation="fadeInUpBig" duration={1000} style={styles.Customers}>
            <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Customer Code:</Text> {item.customer_code}</Text>
            <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Customer:</Text> {item.customer_name}</Text>
            <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Phone:</Text> {item.phone}</Text>
            <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Email:</Text> {item.email}</Text>
            <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Address:</Text> {item.address}</Text>
            <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Status:</Text> <Text style={{color: item.status == 'pending' ? 'red' : 'green', fontStyle: 'italic'}}>{item.supply_status}</Text></Text> 
         </Animatable.View>  
         <Animatable.View animation="fadeInUpBig" duration={1100} style={styles.productsList}>
            <Text style={[styles.infoTexts, {fontWeight: '700', fontSize: 20}]}>Products <Text>({size})</Text></Text>      

            <View style={styles.productsHeader}>
                     <Text style={[styles.infoTexts, {flex: 1, fontWeight: '700'}]}>Code</Text>
                     <Text style={[styles.infoTexts, {flex: 2, fontWeight: '700'}]}>Name</Text>
                     <Text style={[styles.infoTexts, {flex: 1.5, fontWeight: '700'}]}>Cost Price</Text>
                  </View>    

            <FlatList 
               data={productInfo.allProducts}
               keyExtractor = { item => item.product_code.toString()}
               renderItem = { ({item}) => 
                  <View style={styles.productsDetail}>
                     <Text style={[styles.infoTexts, {flex: 1, fontSize: 15}]}>{item.product_code}</Text>
                     <Text style={[styles.infoTexts, {flex: 2}]}>{item.product_name}</Text>
                     <Text style={[styles.infoTexts, {flex: 1.5}]}>Rs. {item.cost_price}</Text>
                  </View>
               }
            />
         </Animatable.View>   

      </View>
   )
}

export default CustomerInfo;

const styles = StyleSheet.create({
   CustomerInfo: {
      flex: 1,
      padding: 10,
   },
   Customers: {
      backgroundColor: '#e6f1fa',
      borderRadius: 15
   },
   productsHeader: {
      flexDirection: 'row',
   }, 
   productsList: {
      marginTop: 10,
      backgroundColor: '#e6f1fa',
      borderRadius: 15
   },
   productsDetail: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   infoTexts: {
      padding: 8,
      textAlign: 'left',
      fontSize: 18,
      color: '#078bab'
   },  
})