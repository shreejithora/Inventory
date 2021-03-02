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

const ProductsList = require('../models/Products.json');

const AddProduct = (props) => {

   const [productID, setProductID] = useState({
      product_id: '',
      isValidID: true,
      exists: false,
   })

  const [productName, setProductName] = useState({
     product_name: '',
     exists: false
  })

  const [productQuantity, setProductQuantity] = useState({
     product_quantity: '',
     isValidProductQuantity: true
  })

  const [productPrice, setProductPrice] = useState({
     product_price: '',
     isValidProductPrice: true
  })

   const handleProductIDChange = (val) => {

      const foundProduct = ProductsList.filter( item => {
         return item.product_id == val
      })    

      if( /\D/.test(val) ){   
         setProductID({
            ...productID,
            product_id: val,
            isValidID: false,
         })         
      } else {
         setProductID({
            ...productID,
            product_id: val,
            isValidID: true
         })
      }   

      if (foundProduct.length == 0 || /\D/.test(val) ) {
         if ( foundProduct.length == 0 ) {
            setProductID({
               ...productID,
               product_id: val,
               exists: false
            })
         } else {
            setProductID({
               ...productID,
               product_id: val,
               exists: true
            })
         }
         if ( /\D/.test(val) ) {
             setProductID({
               ...productID,
               product_id: val,
               isValidID: false,
            })  
         } 
      } else {
         setProductID({
            ...productID,
            product_id: val,
            isValidID: true,
            exists: true
         })
      }
   }

   const handleProductNameChange = (val) => { 
      const foundProduct = ProductsList.filter( item => {
         return item.name == val
      })
console.log(foundProduct);
      if( foundProduct.length == 0  ){
         setProductName({
            ...productName,
            product_name: val,
            exists: false
         })
      } else {
         setProductName({
            ...productName,
            product_name: val,
            exists: true
         })
      }
   }

   const handleQuantityChange = (val) => {   

      if( /\D/.test(val) ){
         setProductQuantity({
            ...productQuantity,
            product_quantity: val,
            isValidProductQuantity: false
         })
      } else {
          setProductQuantity({
            ...productQuantity,
            product_quantity: val,
            isValidProductQuantity: true
         })
      }
   }

   const handlePriceChange = (val) => {   
      if( /\D/.test(val) ){
         setProductPrice({
            ...productPrice,
            product_price: val,
            isValidProductPrice: false
         })
      } else {
          setProductPrice({
            ...productPrice,
            product_price: val,
            isValidProductPrice: true
         })
      }
   }
   const handleAddProduct = () => {
      if (productName != '' && productID.product_id != '' && productQuantity.product_quantity != '' && productPrice.product_price != '' && productName.product_name != ''){
         if( productID.isValidID || productID.exists){
            if ( !productName.exists ) {
               if ( productQuantity.isValidProductQuantity ) {
                  if(  productPrice.isValidProductPrice ) {
                     props.onAddProduct(false);
                     Alert.alert('Product Added!','Product ID:'+productID.product_id+'  with Product Name: '+productName, [{text: 'Ok'}]);
                  } else {
                     Alert.alert('Invalid Input!','Please enter a Valid Price for the product', [{text: 'Ok'}]);                  
                  }
               } else {
                  Alert.alert('Invalid input', 'Please enter a Valid Quantity', [{text: 'Ok'}]);
               }
            } else {
               Alert.alert('Invalid input', 'Please enter a Valid Product Name. Such name already exists', [{text: 'Ok'}]);
            }
         } else {
            Alert.alert('Invalid input', 'Please enter a Valid Product ID', [{text: 'Ok'}]);
         }
      } else {
         Alert.alert('Invalid input', 'All fields should filled.', [{text: 'Ok'}]);
      }                  
   }

   return (
      <ScrollView>
         <View style={styles.modalForm}>           
            <View style={styles.fields}>                         
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Product ID</Text>
                  <TextInput
                     keyboardType='numeric'
                     style={styles.textInputs}
                     placeholder="Product ID..." 
                     maxLength={10}
                     onChangeText={ (val) => handleProductIDChange(val)}
                     onEndEditing = { (e) => handleProductIDChange(e.nativeEvent.text)}
                  />
                  {  
                     productID.exists ?
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Product ID already exists
                     </Animatable.Text> :
                     null 
                  } 
                  {  
                     productID.isValidID ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid ID</Animatable.Text> 
                  } 
                  
               </View>  
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Product Name</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="ascii-capable"
                     placeholder="Product Name..." 
                     onChangeText={ (val) => handleProductNameChange(val)}
                     onEndEditing = { (e) => handleProductNameChange(e.nativeEvent.text)}
                  /> 
                  {  
                     productName.exists ?
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Product name already exists
                     </Animatable.Text> :
                     null
                  }                 
               </View>
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Quantity</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="numeric"
                     placeholder="Quantity..." 
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
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Price</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="numeric"
                     placeholder="Price..." 
                     onChangeText={ (val) => handlePriceChange(val)}
                     onEndEditing = { (e) => handlePriceChange(e.nativeEvent.text)}
                  />      
                  {  
                     productPrice.isValidProductPrice ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid Price</Animatable.Text> 
                  }            
               </View>   
               <TouchableOpacity 
                  style={styles.button}
                  onPress={ () => handleAddProduct()}
               >
                  <Icon name="cart-plus" size={30} color='#fff' />
                  <Text style={[styles.texts,{color: '#fff', fontWeight: 'bold', marginLeft: 5}]}>Add Product </Text>
               </TouchableOpacity>                                
            </View> 
         </View>                                                
      </ScrollView>
   )
}

export default AddProduct;

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