
import React, { useEffect } from "react";
import { 
   Text,
   View,
   StyleSheet, 
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useState } from "react";
import { CurrentRenderContext } from "@react-navigation/core";

let ProductsList = [];

const SupplierInfo = ({item}) => {   

   const [productInfo, setProductInfo] = useState([])
   // [{
   //    product_name: '',
   //    cost_price: ''
   // }]

   let size = 0;

   useEffect( () => {      
      ProductsList = [];
      const ok = async() => {         
         try{
             await firestore()
               .collection('Products')
               .where('supplier', '==', item.supplier_name)
               .get()
               .then( querySnapshot => {
                  size = querySnapshot.size
                  querySnapshot.forEach( documentSnapshot => {
                     ProductsList.push(documentSnapshot.data())   
                     setProductInfo( currentItem => {
                        return [documentSnapshot.data().product_name, ...currentItem]
                     })                     
                  })               
               })
               // console.log(ProductsList)
         } catch(e) {
            console.log(e)
         }         
      }
      ok();
   }, [])

   

   return(
      <View  style={styles.SupplierInfo}>      
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Supplier ID:</Text> {item.supplier_code}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Supplier:</Text> {item.supplier_name}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Phone:</Text> {item.phone}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Email:</Text> {item.email}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Address:</Text> {item.address}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Status:</Text> <Text style={{color: item.status == 'pending' ? 'red' : 'green', fontStyle: 'italic'}}>{item.supply_status}</Text></Text>          
         {
            productInfo.forEach( product => {
               <Text>{product}</Text>
            })
         }
         {/* <Text>{productInfo.product_name}</Text>
         <Text>{productInfo.cost_price}</Text> */}

      </View>
   )
}

export default SupplierInfo;

const styles = StyleSheet.create({
   SupplierInfo: {
      flex: 1,
      padding: 10,
   },
   infoTexts: {
      padding: 10,
      textAlign: 'left',
      fontSize: 20,
      color: '#078bab'
   },
   barcode: {
      marginTop: 15,
      height: 100,
      width: 150,
      alignSelf: 'center'
   }
})