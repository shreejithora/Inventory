import React from "react";
import { 
   Text,
   View,
   StyleSheet, 
   Image
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SalesInfo = ({item}) => {

   const date = item.last_updated.toDate();

   return(
      <View  style={styles.SalesInfo}>
         <View style={styles.header}>
         <Image style={styles.barcode} source={require('../../assets/barcodes/1113.png')} />         
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product:</Text> {item.product}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Customer:</Text> {item.customer}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Sold Quantity:</Text> {item.sold_quantity}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Price:</Text>Rs. {item.price}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Total:</Text>Rs. {item.sold_quantity * item.price}</Text>         
         <Text style={[styles.infoTexts, {fontStyle: 'italic', fontSize: 15}]}>{date.toDateString()}</Text>
         
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
   barcode: {
      marginTop: 15,
      height: 60,
      width: 150,
      alignSelf: 'center'
   },
   header:{
      backgroundColor:'#e6f1fa',
      borderRadius:30
   }
})