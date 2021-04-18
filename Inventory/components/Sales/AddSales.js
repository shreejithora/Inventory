import React, {useState, useEffect} from "react";
import {
   View, 
   Text, 
   StyleSheet, 
   TouchableOpacity, 
   TextInput,
   Alert,
   FlatList,
   ActivityIndicator,
   } from 'react-native';

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from "react-native-gesture-handler";
import firestore from '@react-native-firebase/firestore';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { withSafeAreaInsets } from "react-native-safe-area-context";

let ProductsList = [];
let CustomersList = [];

const AddSales = (props) => {   

   const myTextInput = React.createRef();

   const mySoldQuantity = React.createRef();

   const [productName, setProductName] = useState('')
   const [price, setPrice] = useState('')
   const [total, setTotal] = useState(0)

   const [productQuantity, setProductQuantity] = useState({
      sold_quantity: 1,
      isValidProductQuantity: true
   })    

   const [CustomersData, setCustomersData] = useState(CustomersList);

   const [customer, setCustomer] = useState({
      customerName: ''
   });   

   const [validCustomer, setValidCustomer] = useState(true)

   const [ProductsData, setProductsData] = useState(ProductsList);

  const [product, setProduct]  = useState('')

  const [validProduct, setValidProduct] = useState(true)

  const [discount, setDiscount] = useState({
     discount: '',
     validDiscount: true
  })

  const [costPrice, setCostPrice] = useState('')

   const [list, setList] = useState(false)

   const [proList, setProList] = useState(false)

   const [addedList, setAddedList] = useState(false)

   const [selectedProduct, setSelectedProduct] = useState([]);  

   const [productID, setProductID] = useState('');

   const [customerID, setCustomerID] = useState('');

   // const [salesID, setSalesID] = useState('');

   const [addingSales, setAddingSales] = useState(false);

   const [stock, setStock] = useState(0);

   useEffect( () => {
      setTimeout( async() =>{
         ProductsList = [];
         CustomersList = [];
         try{            
            await firestore()
               .collection('Products')
               .get()
               .then( querySnapshot => {
                  querySnapshot.forEach( documentSnapshot => {
                     const data = documentSnapshot.data();
                     data.product_id = documentSnapshot.id
                     ProductsList.push(data)
                  })
               })
            await firestore()            
               .collection('Customers')
               .get()
               .then( querySnapshot => {
                  querySnapshot.forEach( documentSnapshot => {
                     const data = documentSnapshot.data();
                     data.customer_id = documentSnapshot.id;
                     CustomersList.push(data)
                  })
               })              
         } catch(e) {
            console.log(e)
         }
      }, 1000);   
   }, [])
   
   const handleCustomerChange = (val) => {     

      const foundCustomer = CustomersList.filter( item => {
         return (
            item.customer_name.toLowerCase().includes(val.toLowerCase()) ||
            item.customer_code.toString().includes(val.toString())
         )
      })

      const isValidCustomer = CustomersList.filter( item => {
         return item.customer_name == val
      })

      const len = foundCustomer.length;
      const cuslen = isValidCustomer.length
      if ( cuslen == 1) {
         setCustomer({
            ...customer, 
            customerName: val,
         })
         // console.log(isValidCustomer[0].customer_id)
         setCustomerID(isValidCustomer[0].customer_id)
         setValidCustomer(true)         
      }  else {
         setValidCustomer(false)
      }

      if( len == 0 ){
         setCustomersData(CustomersList)
      } else {
          setCustomersData(foundCustomer)
      }             

      setCustomer({customerName: val});
   }

   const handleDiscountChange = val => {
      if( /\D/.test(val) || parseInt(val) < 0 ){
         setDiscount({
            ...discount,
            discount: val,
            validDiscount: false
         })
      } else {
          setDiscount({
            ...discount,
            discount: val,
            validDiscount: true
         })
      }
   }

   const handleProductCodeChange = (val) => {

      const foundProduct = ProductsList.filter( item => {
         return (
            item.product_name.toLowerCase().includes(val.toLowerCase()) ||
            item.product_code.toString().includes(val.toString())
         )
      })

      const isValidProduct = ProductsList.filter( item => {
         return item.product_name == val
      })

      const len = foundProduct.length;
      const cuslen = isValidProduct.length
      if ( cuslen == 1) {
         setProduct(val)
         setProductName(isValidProduct[0].product_name)
         setPrice(isValidProduct[0].selling_price) 
         setStock(isValidProduct[0].quantity) 
         setCostPrice(isValidProduct[0].cost_price)   
         setProductID(isValidProduct[0].product_id)    
         setValidProduct(true)
      }  else {
         setValidProduct(false)
      }

      if( len == 0 ){
         setProductsData([])
         setValidProduct(false)
      } else {
          setProductsData(foundProduct)
      }             

      setProduct(val);
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

   const handleAddProduct = async() => {
      if ( product != '' && productQuantity.sold_quantity > 0 ) {
         if( validProduct ) {  
            if( parseInt(stock) < parseInt(productQuantity.sold_quantity) ){
                setProductQuantity({
                  ...productQuantity,
                  isValidProductQuantity: false
               })
            } else {
               try {
                  await setSelectedProduct( (currItem) => {
                     return [{
                        product_id: productID,
                        product_name: productName, 
                        sold_qty: productQuantity.sold_quantity,
                        cost_price: costPrice,
                        price: price,
                        discount: discount.discount,
                        total: price * productQuantity.sold_quantity,
                     }, ...currItem];
                  });    
                  const eachTotal = price * productQuantity.sold_quantity
                  setTotal(total + eachTotal)                       
               } catch(e) {
                  console.log(e);
               }                                    
               setAddedList(true);
               // myTextInput.current.clear();
               // mySoldQuantity.current.clear();
               setProductName('');
               setProduct('');
               setProductQuantity({sold_quantity: 1, isValidProductQuantity: true})
               setStock(null);
               setPrice(0);
            }               
         } else {
            Alert.alert('Invalid !', 'The Product code or name is invalid');     
         }
      } else {
         Alert.alert('Invalid !', 'Please Select a product and fill Sold Quantity');
      }
   }
   
   const handleAddSales = async() => {
      setAddingSales(true)
      if (customer.customerName != '' && selectedProduct.length != 0 ){             
         if ( validCustomer ){
            try{
               let salesID = "";
               await firestore()
                  .collection('Sales')
                  .add({
                     customer: customer.customerName,
                     customer_id: customerID,
                     discount: discount.discount,
                     total: total,
                     grand_total: total - ((discount.discount/100) * total),
                     uploaded_at: new Date()
                  })
                  .then( doc => {                     
                     salesID = doc.id
                  })
               selectedProduct.forEach( item => {                                      
                  firestore()
                     .collection('SalesProducts')
                     .add({
                        sales_id: salesID,
                        customer: customer.customerName,
                        customer_id: customerID,
                        product_id: item.product_id,
                        product: item.product_name,
                        cost_price: item.cost_price,
                        selling_price: item.price,
                        sold_quantity: item.sold_qty,
                        discount: discount.discount,
                        total: item.total,
                        last_updated: new Date()
                     })                                                  
                  })    
                  setAddingSales(false)                            
            } catch(e) {
               console.log(e);
            }
            props.onAddSales(false);
            props.stateChange();            
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
                  {
                     validCustomer ? 
                     null :
                     <Animatable.Text animation="fadeIn" style={styles.errMsg}>Invalid Customer
                     </Animatable.Text> 
                  } 
                  <Text style={styles.texts}>Customer*</Text>                  
                  <TextInput
                     value={customer.customerName}
                     keyboardType='ascii-capable'
                     style={styles.textInputs}
                     placeholder="Customer...(eg. Hari Products..)" 
                     onFocus = {() => setList(true)}
                     onChangeText={ (val) => handleCustomerChange(val)}
                     onEndEditing = { (e) => handleCustomerChange(e.nativeEvent.text)}
                  />                  
                  <View style={{display: list ? 'flex' : 'none'}}>
                     <FlatList 
                        data={CustomersData}
                        keyExtractor = { item => item.customer_code}
                        renderItem = { ({item}) => {
                           return (
                              <TouchableOpacity style={styles.customerList} onPress={() => handleCustomerChange(item.customer_name)}>
                                 <Text>{item.customer_name}</Text>
                              </TouchableOpacity>
                           )                              
                        }}
                     />
                  </View>                              
               </View>
               <View style={styles.inputs}>
                  {
                     discount.validDiscount ? 
                     null :
                     <Animatable.Text animation="fadeIn" style={styles.errMsg}>Invalid Number
                     </Animatable.Text> 
                  } 
                  <Text style={styles.texts}>Discount(%) (Optional)</Text>                  
                  <TextInput
                     keyboardType='numeric'
                     style={styles.textInputs}
                     placeholder="eg. 2.1 or 2..." 
                     onFocus = {() => setList(true)}
                     onChangeText={ (val) => handleDiscountChange(val)}
                     onEndEditing = { (e) => handleDiscountChange(e.nativeEvent.text)}
                  />                                                                 
               </View>
               <View style={[styles.inputs, {display: addedList ? 'flex' : "none", backgroundColor: '#e6f1fa'}]}>
                  <View style={{flexDirection: 'row', padding: 5}}>
                     <Text style={{flex: 2, color: '#078bab', fontWeight: '700'}}>Name</Text>
                     <Text style={{flex: 1, color: '#078bab', fontWeight: '700', textAlign: 'center'}}>Qty</Text>
                     <Text style={{flex: 1, color: '#078bab', fontWeight: '700'}}>Price</Text>
                     <Text style={{flex: 1, color: '#078bab', fontWeight: '700'}}>Total</Text>
                  </View>
                  <FlatList 
                     data={selectedProduct}
                     keyExtractor = { item => item.product_code}
                     renderItem = { ({item}) => {
                        return (
                           <View>
                              <TouchableOpacity style={{flexDirection: 'row', padding: 5}} onPress={() => {}}>                                 
                                 <Text style={{flex: 2, color: '#078bab'}}>{item.product_name}</Text>
                                 <Text style={{flex: 1, color: '#078bab', fontStyle: 'italic', fontWeight: '700', textAlign: 'center'}}>{item.sold_qty}</Text>
                                 <Text style={{flex: 1, color: '#078bab'}}>{item.price}</Text>
                                 <Text style={{flex: 1, color: '#078bab'}}>{item.total}</Text>
                              </TouchableOpacity>                                 
                           </View>
                        )                              
                     }}
                  />
                  <View style={{borderWidth: 1, borderColor: '#078bab'}}></View> 
                  <View style={{flexDirection: 'row', padding: 5}}>
                     <Text style={{flex: 4, color: '#078bab', fontWeight: '700'}}>Total</Text>  
                     <Text style={{flex: 1, color: '#078bab'}}>{total}</Text>
                  </View>  
                  <View style={{flexDirection: 'row', padding: 5}}>
                     <Text style={{flex: 4, color: '#078bab', fontWeight: '700'}}>Discount</Text>  
                     <Text style={{flex: 1, color: '#078bab'}}>{discount.discount} %</Text>
                  </View>   
                  <View style={{borderWidth: 1, borderColor: '#078bab'}}></View> 
                  <View style={{flexDirection: 'row', padding: 5}}>
                     <Text style={{flex: 4, color: '#078bab', fontWeight: '700'}}>Grand Total</Text>  
                     <Text style={{flex: 1, color: '#078bab'}}>{discount.discount != 0 ? (parseFloat(total) - (parseFloat(total) * (discount.discount /100)) ): total}</Text>
                  </View>
               </View>                            
               <View style={styles.inputs}>
                  {  
                     validProduct ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid Code
                     </Animatable.Text> 
                  }     
                  <Text style={styles.texts}>Product code*</Text>                  
                  <TextInput
                     ref={myTextInput}
                     value={product}
                     keyboardType='ascii-capable'
                     style={styles.textInputs}
                     onFocus= { () => setProList(true)}
                     placeholder="Product code...(eg. 111.001)"                    
                     onChangeText={ (val) => handleProductCodeChange(val)}
                     onEndEditing = { (e) => handleProductCodeChange(e.nativeEvent.text)}
                  />     
                  <View style={{display: proList ? 'flex' : 'none'}}>
                     <FlatList 
                        data={ProductsData}
                        keyExtractor = { item => item.supplier_code}
                        renderItem = { ({item}) => {
                           return (
                              <TouchableOpacity style={styles.customerList} onPress={() => handleProductCodeChange(item.product_name)}>
                                 <Text>{item.product_name}</Text>                                 
                              </TouchableOpacity>
                           )                              
                        }}
                     />
                  </View>                                             
               </View>                 
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Sold Quantity</Text>
                  <TextInput
                     defaultValue='1'
                     ref={mySoldQuantity}
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
                     <Text style={[styles.texts, {fontSize: 15, color: productQuantity.isValidProductQuantity ? '#078bab' : 'red'}]}>Stock: <Text style={{fontWeight: '700'}}>{stock}</Text></Text>
                  </View>
                  <View style={styles.inputs} >
                     <Text style={styles.texts}>Product Name: <Text style={{fontWeight: '700'}}>{productName}</Text></Text>
                  </View>
                  <View style={styles.inputs} >
                     <Text style={styles.texts}>Selling Price: Rs. {price}</Text>
                  </View>
                  <View style={styles.inputs} >
                     <Text style={styles.texts}><Text style={{fontWeight: '700'}}>Total: Rs. {
                     productQuantity.sold_quantity == 0 ?
                     price * 1 :
                     price * productQuantity.sold_quantity}</Text></Text>
                  </View>                  
               </View> 
               <TouchableOpacity 
                  style={styles.button1}
                  onPress={handleAddProduct}
               >
                  <Icon name="cart-plus" size={20} color='#078bab' />
                  <Text style={[styles.texts,{color: '#078bab', fontWeight: 'bold', marginLeft: 5, fontSize: 15}]}>Add Product</Text>
               </TouchableOpacity>                
               <TouchableOpacity 
                  style={styles.button}
                  onPress={ () => handleAddSales()}
               >
                  <Icon name="cart-plus" size={30} color='#fff' />
                  <Text style={[styles.texts,{color: '#fff', fontWeight: 'bold', marginLeft: 5}]}>Add Sales </Text>
                  {
                     addingSales ?
                     <ActivityIndicator size="small" color="#fff" /> :
                     null
                  }                  
               </TouchableOpacity>   
            </View>                           
         </View>                                                                  
      </ScrollView>
   )
}

export default AddSales;

const styles = StyleSheet.create({
   modalForm: {
      padding: 15,
      marginBottom: 30
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
      color: '#078bab'
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
   button1: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
      backgroundColor: '#fafafa',
      // margin: 20,
      marginRight: 20,
      padding: 10,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center'
   },
   customerList: {
      flexDirection: 'row',
      marginVertical: 5,
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#078bab',
      backgroundColor: '#fafafa'
   },
   errMsg: {
      color: 'red',
      fontSize: 12
   },
})