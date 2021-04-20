import React from "react";
import { 
   Text,
   View,
   StyleSheet, 
   Image
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ProductInfo = ({item}) => {

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

   const date = item.product_updated[0].toDate();
   return(
      <View  style={styles.productInfo}>
         <View style={styles.productDesc}>
               <Image style={styles.barcode} source={require('../../assets/barcodes/1113.png')} />
               <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product Code:</Text> {item.product_code}</Text>
               <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product:</Text> {item.product_name}</Text>

               <View style={styles.infoPrice}>
                     <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Quantity:</Text> {numbering(item.quantity)}</Text>
                     <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Cost Price:</Text> Rs. {numbering(item.cost_price)}</Text>
               </View>

               <View style={styles.infoPrice}>
                     <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Margin:</Text> {item.margin}%</Text>
                     <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Selling Price:</Text> Rs. {numbering(item.selling_price)}</Text>                     
               </View>

               <View style={styles.infoPrice}>                  
                  <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Market Price:</Text> Rs. {numbering(item.market_price)}</Text>
               </View>

               <View style={{marginRight:20}}>
                     <Text style={styles.infoTexts}><Text style={{fontWeight:'700'}}>Supplier: </Text>{item.supplier}</Text>
               </View>

               <View style={{marginRight:20}}>
                     <Text style={[styles.infoTexts, { fontSize: 15, fontStyle: 'italic'}]}><Text style={{fontWeight: '700'}}>Last Updated:</Text> {date.toDateString()}</Text>
               </View>
         </View>

             <View style={styles.desc}>
               <ScrollView style={{marginRight:20}}>
                     <Text style={[styles.infoTexts,{fontWeight:'700'}]}>Product Description</Text>
                     <Text style={styles.infoTexts}>{item.description}</Text>
               </ScrollView>
             </View>
        
      </View> 
   )
}

export default ProductInfo;

const styles = StyleSheet.create({
   productInfo: {
      flex: 1,
      padding: 10,
   },
   productDesc:{
      backgroundColor:'#e6f1fa',
      borderRadius: 15
   },
   desc:{
      backgroundColor:'#e6f1fa',
      marginTop:10,
      borderRadius:15
   },
   infoTexts: {
      padding: 5,
      textAlign: 'left',
      fontSize: 18,
      color: '#078bab'
   },
   infoPrice:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginRight:25
   },
   barcode: {
      marginTop: 15,
      height: 70,
      width: 100,
      alignSelf: 'center'
   }
})