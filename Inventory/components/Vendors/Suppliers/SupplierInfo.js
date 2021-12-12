
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

const SupplierInfo = ({item}) => {   

   const [productInfo, setProductInfo] = useState({
      allProducts: ProductsList
   })

   const numbering = num => {
      let x = num;
      x=x.toString();
      // x=x.split('.')[0];
      let y = 0;
      if(x.includes('.')){
         y = '.'+x.split('.')[1]
         x = x.split('.')[0]
         let lastThree = x.substring(x.length-3);
         const otherNumbers = x.substring(0,x.length-3);
         if(otherNumbers != '')
            lastThree = ',' + lastThree;
         const val = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree; 
         return (val+y);
      } else {
         let lastThree = x.substring(x.length-3);
         const otherNumbers = x.substring(0,x.length-3);
         if(otherNumbers != '')
            lastThree = ',' + lastThree;
         const val = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree; 
         return (val);
      }
   }    

   let [size, setSize] = useState(0)

   useEffect( () => {           
      const ok = async() => {         
          ProductsList = [];
         try{
             await firestore()
               .collection('Products')
               .where('supplier', '==', item.supplier_name)
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
      <View  style={styles.SupplierInfo}>    
         <Animatable.View animation="fadeInUpBig" duration={1000} style={styles.Suppliers}>
            <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Supplier Code:</Text> {item.supplier_code}</Text>
            <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Supplier:</Text> {item.supplier_name}</Text>
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
                     <Text style={[styles.infoTexts, {flex: 1.5}]}>Rs. {numbering(item.cost_price)}</Text>
                  </View>
               }
            />
         </Animatable.View>   

      </View>
   )
}

export default SupplierInfo;

const styles = StyleSheet.create({
   SupplierInfo: {
      flex: 1,
      padding: 10,
   },
   Suppliers: {
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