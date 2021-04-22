import React, {useState, useEffect} from "react";
import { 
   Text,
   View,
   StyleSheet, 
   Image,
   FlatList
} from "react-native";

import firestore from '@react-native-firebase/firestore';

let SalesProductsList = [];

const SalesInfo = ({items}) => {

   const [soldProducts, setSoldProducts] = useState({
      allSales: SalesProductsList,
      filteredSales: SalesProductsList,
   })

   useEffect( () => {
      setTimeout( async() => {
         try{
            SalesProductsList = [];
            await firestore()
               .collection('SalesProducts')
               .get()
               .then( querySnapshot => {
                  querySnapshot.forEach( documentSnapshot => {
                     const data = documentSnapshot.data();
                     data.id = documentSnapshot.id;
                     if( items.id == data.sales_id){
                        SalesProductsList.push(data);
                     }                     
                  })
                  setSoldProducts({
                     allSales: SalesProductsList,
                     filteredSales: SalesProductsList
                  })
               })
         } catch(e) {
            console.log(e);
         }
      })
   }, [])

   const date = items.uploaded_at.toDate();

   return(
      <View  style={styles.SalesInfo}>
         <View style={styles.header}>         
            <Text style={[styles.infoTexts, {textAlign: 'center', fontSize: 22, fontWeight: '700', backgroundColor: '#fafafa'}]}> {items.customer}</Text>         
         </View>
         <Text style={[styles.infoTexts, {fontSize: 14, fontStyle: 'italic', textAlign: 'right'}]}>{date.toDateString()}</Text>
         <View style={styles.salesTable}>
            <View style={styles.tableHeader}>
               <Text style={[styles.infoTexts, {fontWeight: '700', fontSize: 18, flex: 2}]}>Product</Text>
               <Text style={[styles.infoTexts, {fontWeight: '700', fontSize: 18, flex: 1}]}>Price</Text>
               <Text style={[styles.infoTexts, {fontWeight: '700', fontSize: 18, flex: 1}]}>Qty</Text>
               <Text style={[styles.infoTexts, {fontWeight: '700', fontSize: 18, flex: 1}]}>Total</Text>
            </View>            
            <FlatList 
               data={soldProducts.filteredSales}
               keyExtractor={ item => item.id}
               renderItem={ ({item}) => {
                  return (
                     <View style={{flexDirection: 'column'}}>
                        <View style={styles.SalesDetail}>                  
                           <Text style={[styles.salesInfoTexts, {flex: 2}]}>{item.product}</Text>
                           <Text style={[styles.salesInfoTexts, {flex: 1}]}>{item.selling_price}</Text>
                           <Text style={[styles.salesInfoTexts, {flex: 1}]}>{item.sold_quantity}</Text>
                           <Text style={[styles.salesInfoTexts, {flex: 1}]}>{item.total}</Text>
                        </View>                     
                     </View>
                  )
               }               
               }
            />   
            <View style={styles.line}></View>
            <View style={{flexDirection: 'row', padding: 5}}>
               <Text style={{flex: 4, color: '#078bab', fontWeight: '700'}}>Total</Text>  
               <Text style={{flex: 1, color: '#078bab'}}>{items.total}</Text>
            </View>  
            <View style={{flexDirection: 'row', padding: 5}}>
               <Text style={{flex: 4, color: '#078bab', fontWeight: '700'}}>Discount</Text>  
               <Text style={{flex: 1, color: '#078bab'}}>{items.discount} %</Text>
            </View>   
            <View style={styles.line}></View> 
            <View style={{flexDirection: 'row', padding: 5}}>
               <Text style={{flex: 4, color: '#078bab', fontWeight: '700'}}>Grand Total</Text>  
               <Text style={{flex: 1, color: '#078bab', fontWeight: '700'}}>{items.grand_total}</Text>
            </View>    
         </View>      
      </View>
   )
}

export default SalesInfo;

const styles = StyleSheet.create({
   SalesInfo: {
      flex: 1,
      padding: 10,
   },
   infoTexts: {
      padding: 8,
      textAlign: 'left',
      fontSize: 18,
      color: '#078bab'
   },
   salesInfoTexts: {
      padding: 8,
      textAlign: 'left',
      fontSize: 16,
      color: '#078bab'
   },
   salesTable: {   
      backgroundColor: '#e6f1fa',
      padding: 5,
      borderRadius: 15
   },
   SalesDetail: {
      alignItems: 'center',
      flexDirection: 'row'
   },
   line: {
      borderWidth: 1,
      borderColor: '#078bab',      
   }, 
   tableHeader: {
      paddingVertical: 5,
      flexDirection: "row",
      alignItems: 'center'
   },
})