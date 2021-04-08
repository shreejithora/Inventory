import React, {useState} from "react";
import {
   View, 
   Text, 
   StyleSheet, 
   TouchableOpacity, 
   TextInput,
   Alert,
   } from 'react-native';

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from "react-native-gesture-handler";

const ProductsList = require('../../models/Products.json');

const AddSales = (props) => {

   const [productID, setProductID] = useState({
      product_id: '',
      isValidID: true,
   })

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('0');

  const [productQuantity, setProductQuantity] = useState({
     sold_quantity: '1',
     isValidProductQuantity: true
  })  

   const handleProductCodeChange = (val) => {

      const foundProduct = ProductsList.filter( item => {
         return item.product_id == val
      })       
      
      if (foundProduct.length == 0 ) {
         setProductID({
            ...productID,
            product_id: val,
            isValidID: false,
         })              
      } else {
         setProductID({
            ...productID,
            product_id: val,
            isValidID: true,            
         })                  
         setProductName(foundProduct[0].name)   
         setProductPrice(foundProduct[0].price) 
      }
   }

   const handleQuantityChange = (val) => {   

      if( /\D/.test(val) || parseInt(val) < 1 ){
         setProductQuantity({
            ...productQuantity,
            sold_quantity: val,
            isValidProductQuantity: false
         })
      } else {
          setProductQuantity({
            ...productQuantity,
            sold_quantity: val,
            isValidProductQuantity: true
         })
      }
   }

   
   const handleAddSales = () => {
      if (productID.product_id != '' && productQuantity.sold_quantity !='' ){    
         if( productID.isValidID && productQuantity.isValidProductQuantity){
            props.onAddSales(false);
            Alert.alert('Sales Info Added!','Product ID:'+productID.product_id+'                                      Product Name: '+productName+'                                                            Sold Quantity: '+productQuantity.sold_quantity+'                                            Total: Rs. '+productPrice*productQuantity.sold_quantity, [{text: 'Ok'}]);
         } else {
            Alert.alert('Invalid Input!','Please enter a Valid Product ID', [{text: 'Ok'}]);   
         }       
      } else {
         Alert.alert('Invalid Input!','All files should be filled.', [{text: 'Ok'}]);                                                      
      }                
   }

   return (
      <ScrollView>
         <View style={styles.modalForm}>           
            <View style={styles.fields}>  
               <View style={styles.inputs}>
                     <Text style={styles.texts}>Customer*</Text>                  
                     <TextInput
                        keyboardType='numeric'
                        style={styles.textInputs}
                        placeholder="Customer...(eg. Hari Products..)" 
                        onChangeText={ (val) => handleProductCodeChange(val)}
                        onEndEditing = { (e) => handleProductCodeChange(e.nativeEvent.text)}
                     />                  
                     {  
                        productID.isValidID ?
                        null :
                        <Animatable.Text 
                           animation="fadeIn"
                           style={styles.errMsg}>Invalid Code
                        </Animatable.Text> 
                     }                   
                  </View>

               <View style={styles.inputs}>
                  <Text style={styles.texts}>Product code*</Text>                  
                  <TextInput
                     keyboardType='numeric'
                     style={styles.textInputs}
                     placeholder="Product code...(eg. 111.001)" 
                     maxLength={10}
                     onChangeText={ (val) => handleProductCodeChange(val)}
                     onEndEditing = { (e) => handleProductCodeChange(e.nativeEvent.text)}
                  />                  
                  {  
                     productID.isValidID ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid Code
                     </Animatable.Text> 
                  }                   
               </View>                 
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Sold Quantity</Text>
                  <TextInput
                     defaultValue='1'
                     style={styles.textInputs}
                     keyboardType="numeric"
                     placeholder="Quantity...(eg. 1 or eg. 200)" 
                     onChangeText={ (val) => handleQuantityChange(val)}
                     onEndEditing = { (e) => handleQuantityChange(e.nativeEvent.text)}
                  />   
                  {  
                     productQuantity.isValidProductQuantity ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid Quantity</Animatable.Text> 
                  }               
               </View> 
               <View>
                  <View style={styles.inputs} >
                     <Text style={styles.texts}>Product Name: <Text style={{fontWeight: '700'}}>{productName}</Text></Text>
                  </View>
                  <View style={styles.inputs} >
                     <Text style={styles.texts}>Price: Rs. {productPrice}</Text>
                  </View>
                  <View style={styles.inputs} >
                     <Text style={styles.texts}><Text style={{fontWeight: '700'}}>Total: Rs. {productPrice * productQuantity.sold_quantity}</Text></Text>
                  </View>                  
               </View>                
               <TouchableOpacity 
                  style={styles.button}
                  onPress={ () => handleAddSales()}
               >
                  <Icon name="cart-plus" size={30} color='#fff' />
                  <Text style={[styles.texts,{color: '#fff', fontWeight: 'bold', marginLeft: 5}]}>Add Sales </Text>
               </TouchableOpacity>                                
            </View> 
         </View>                                                
      </ScrollView>
   )
}

export default AddSales;

const styles = StyleSheet.create({
   modalForm: {
      padding: 15
   },
   modalText: {   
      marginTop: 50,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#065ba1',
      textAlign: 'center'
   },
   fields: {
      margin: 20,
      flexDirection: 'column'
   }, 
   inputs: {
      flexDirection: 'column',
      paddingHorizontal: 15,
      paddingVertical: 10
   },
   texts: {
      fontSize: 20,
      color: '#065ba1'
   },
   textInputs: {
      height: 40,
      borderRadius: 5,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      marginTop: 5,
   },  
   button: {
      flexDirection: 'row',
      backgroundColor: '#078bab',
      margin: 20,
      marginBottom: 10,
      padding: 15,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center'
   },
   errMsg: {
      color: 'red',
      fontSize: 12
   },
})