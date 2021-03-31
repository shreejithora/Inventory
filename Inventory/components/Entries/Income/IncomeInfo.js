import React from "react";
import { 
   Text,
   View,
   StyleSheet, 
   Image
} from "react-native";

const IncomeInfo = ({item}) => {
   return(
      <View  style={styles.IncomeInfo}>
         <Image style={styles.barcode} source={require('../../../assets/barcodes/1113.png')} />

         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>ProductID:</Text> {item.product_id}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product:</Text> {item.name}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Sold Quantity:</Text> {item.sold_quantity}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Price:</Text> {item.price}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Income:</Text> {item.price * item.sold_quantity}</Text>
         <Text style={[styles.infoTexts, { fontSize: 15, fontStyle: 'italic'}]}><Text style={{fontWeight: '700'}}>Last Updated:</Text> {item.last_updated}</Text>

      </View>
   )
}

export default IncomeInfo;

const styles = StyleSheet.create({
   IncomeInfo: {
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