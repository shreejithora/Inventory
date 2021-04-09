import React from "react";
import { 
   Text,
   View,
   StyleSheet, 
   Image
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ProductInfo = ({item}) => {
   return(
      <View  style={styles.productInfo}>
         <View style={styles.productDesc}>
               <Image style={styles.barcode} source={require('../../assets/barcodes/1113.png')} />
               <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product Code:</Text> {item.product_code}</Text>
               <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product:</Text> {item.product_name}</Text>

               <View style={styles.infoPrice}>
                     <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Quantity:</Text> {item.quantity}</Text>
                     <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Cost Price:</Text> {item.cost_price}</Text>
               </View>

               <View style={styles.infoPrice}>
                     <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Margin:</Text> {item.margin}</Text>
                     <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Market Price:</Text> {item.market_price}</Text>
               </View>

               <View style={{marginRight:20}}>
                     <Text style={styles.infoTexts}><Text style={{fontWeight:'700'}}>Supplier: </Text>{item.supplier}</Text>
               </View>

               <View style={{marginRight:20}}>
                     <Text style={[styles.infoTexts, { fontSize: 15, fontStyle: 'italic'}]}><Text style={{fontWeight: '700'}}>Last Updated:</Text> {item.last_updated}</Text>
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
      backgroundColor:'#fafafa',
      borderRadius: 15
   },
   desc:{
      backgroundColor:'#fafafa',
      marginTop:10,
      borderRadius:10
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