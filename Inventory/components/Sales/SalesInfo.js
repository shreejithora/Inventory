import React from "react";
import { 
   Text,
   View,
   StyleSheet, 
   Image
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SalesInfo = ({item}) => {
   return(
      <View  style={styles.SalesInfo}>
         <Image style={styles.barcode} source={require('../../assets/barcodes/1113.png')} />         
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>ProductID:</Text> {item.product_id}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product:</Text> {item.name}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Sold Quantity:</Text> {item.sold_quantity}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Price:</Text> {item.price}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Total:</Text> {item.sold_quantity * item.price}</Text>

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