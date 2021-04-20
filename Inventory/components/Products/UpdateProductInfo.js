import React, {useState, useEffect} from "react";

import { 
   Text,
   View,
   StyleSheet, 
   Image,
   TextInput
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const UpdateProductInfo = ({item}) => {  

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

   const [product_name, setProductName] = useState('')
   const [quantity, setQuantity] = useState('');
   const [cost_price, setCostPrice] = useState('')
   const [margin, setMargin] = useState('')
   const [selling_price, setSellingPrice] = useState('')
   const [market_price, setMarketPrice] = useState('')
   const [supplier, setSupplier] = useState('')
   const [description, setDescription] = useState('')   

    useEffect( () => {
      setProductName(item.product_name)
      setQuantity(String(item.quantity))
      setCostPrice(String(item.cost_price))
      setMargin(String(item.margin))
      setSellingPrice(String(item.selling_price))
      setMarketPrice(String(item.market_price))
      setSupplier(item.supplier)
      setDescription(item.description)
   }, []);

   

   const date = item.product_updated[0].toDate();
   return(
      <View  style={styles.productInfo}>
         <View style={styles.productDesc}>
               <Image style={styles.barcode} source={require('../../assets/barcodes/1113.png')} />
               <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product Code: {item.product_code}</Text></Text>   
               <View style={{flexDirection: 'row'}}>
                  <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product:</Text> </Text>
                  <TextInput
                     value={product_name}
                     style={{borderWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                     keyboardType="ascii-capable"  
                     onChangeText={ (text) =>  {setProductName({product_name: text})}}            
                  />
               </View>

               <View style={styles.infoPrice}>
                     <View style={{flexDirection: 'row', marginVertical: 1}}>
                        <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Quantity:</Text> </Text>
                        <TextInput
                           value={quantity}
                           style={{borderWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                           keyboardType="ascii-capable"  
                           onChangeText={ (text) =>  {setQuantity({quantity: text})}}            
                        />
                     </View>
                     <View style={{flexDirection: 'row', marginVertical: 1}}>
                        <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Cost Price:</Text> </Text>
                        <TextInput
                           value={cost_price}
                           style={{borderWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                           keyboardType="ascii-capable"  
                           onChangeText={ (text) =>  {setCostPrice({cost_price: text}), setSellingPrice({selling_price: String(parseFloat(cost_price) + (parseFloat(margin)/100) * parseFloat(cost_price))})}}            
                        />
                     </View>
               </View>

              <View style={styles.infoPrice}>
                     <View style={{flexDirection: 'row', marginVertical: 1}}>
                        <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Margin:</Text> </Text>
                        <TextInput
                           value={margin}
                           style={{borderWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                           keyboardType="ascii-capable"  
                           onChangeText={ (text) =>  {setMargin({margin: text}), setSellingPrice({selling_price: String(parseFloat(cost_price) + (parseFloat(margin)/100) * parseFloat(cost_price))})}}            
                        />
                     </View>
                     <View style={{flexDirection: 'row', marginVertical: 1}}>
                        <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Selling Price:</Text> </Text>
                        <TextInput
                           editable={false}
                           value={selling_price}
                           style={{borderWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                           keyboardType="ascii-capable"  
                           onChangeText={ () =>  {}}           
                        />
                     </View>              
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

export default UpdateProductInfo;

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