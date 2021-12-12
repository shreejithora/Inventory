import React from "react";
import { 
   Text,
   View,
   StyleSheet, 
   Image
} from "react-native";

const IncomeInfo = ({item, profit, date}) => {

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

   const time = item.last_updated.toDate();

   return(
      <View  style={styles.IncomeInfo}>
         <Image style={styles.barcode} source={require('../../../assets/barcodes/1113.png')} />
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product:</Text> {item.product_name}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Sold Quantity:</Text> {item.sold_quantity}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Cost Price:</Text> Rs. {item.cost_price}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Selling Price:</Text> Rs. {numbering(item.selling_price)}</Text>         
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Total:</Text> Rs. {numbering(item.selling_price * item.sold_quantity)}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Discount: </Text>{ item.discount}%</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Income: </Text> Rs. {numbering(profit)}</Text>
         <Text style={[styles.infoTexts, {fontSize: 13, fontStyle: 'italic'}]}>{time.toDateString()} | {date}</Text>
         {/* <Text style={[styles.infoTexts, { fontSize: 15, fontStyle: 'italic'}]}><Text style={{fontWeight: '700'}}>Last Updated:</Text> {item.last_updated}</Text> */}

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