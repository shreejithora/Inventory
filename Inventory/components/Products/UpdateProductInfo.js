import React, {useState, useEffect} from "react";

import { 
   Text,
   View,
   StyleSheet, 
   Image,
   ActivityIndicator,
   FlatList,
   TextInput,
   TouchableOpacity,
   Alert
} from "react-native";


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from "react-native-animatable";
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from "react-native-gesture-handler";
import { cos } from "react-native-reanimated";

let ProductsList = [];
let SuppliersList = [];

const UpdateProductInfo = ({item, handleUpdateProducts, update, onUpdateProduct}) => {  

   const [product_name, setProductName] = useState({
      product_name: '',
      isValid: false
   })
   const [quantity, setQuantity] = useState({
      quantity: '',
      isValidProductQuantity: false
   });
   const [cost_price, setCostPrice] = useState({
      cost_price: '',
      isValidCostPrice: true
   })
   const [margin, setMargin] = useState({
      margin: '',
      isvalidMargin: true
   })
   const [selling_price, setSellingPrice] = useState('')
   const [market_price, setMarketPrice] = useState({
      market_price: '',
      isvalidMarketPrice: true
   })
   const [supplier, setSupplier] = useState('')
   const [description, setDescription] = useState('')   

   const [suppliersData, setSuppliersData] = useState({
      allSuppliers: SuppliersList,
      filteredSuppliers: SuppliersList
   })   

   const [listLoading, setListLoading] = useState(false)

   const [list, setList] = useState(false)

   const [validSupplier, setValidSupplier] = useState(true)

   const [updatingProducts, setUpdatingProducts] = useState(false)

   const [updateProductModal, setUpdateProductModal] = useState(false)

    useEffect( () => {
      setProductName({
         product_name: item.product_name,
         isValid: true
      })
      setQuantity({
         quantity: String(item.quantity),
         isValidProductQuantity: true
      })
      setCostPrice({
         cost_price: String(item.cost_price),
         isValidCostPrice: true
      })
      setMargin({
         margin: String(item.margin),
         isValidMargin: true
      })
      setSellingPrice(String(item.selling_price))
      setMarketPrice({
         market_price: String(item.market_price),
         isvalidMarketPrice: true
      })
      setSupplier(item.supplier)
      setDescription(item.description)

      setTimeout( async() => {
         try{
            ProductsList = [];
            SuppliersList = [];
            await firestore()
               .collection('Suppliers')
               .get()
               .then( querySnapshot => {
                  querySnapshot.forEach( documentSnapshot => {
                     const data = documentSnapshot.data();
                     data.id = documentSnapshot.id;
                     SuppliersList.push(data);
                  })
                  setSuppliersData({
                     allSuppliers: SuppliersList,
                     filteredSuppliers: SuppliersList
                  })
               })
            await firestore()
            .collection('Products')
            .get()
            .then( querySnapshot => {
               querySnapshot.forEach( documentSnapshot => {                  
                  ProductsList.push(documentSnapshot.data().product_name);
               })              
            })
         } catch(e) {
            console.log(e);
         }
      }, 1000)
   }, []);

   const handleProductNameChange = (val) => {    
      const foundProduct = ProductsList.filter( items => {
         return items.toLowerCase() == val.toLowerCase()
         // return val.toLowerCase() == items.product_name
         // return console.log(items)
      })
      console.log(foundProduct.length)
      if( foundProduct.length == 0  || val.toLowerCase() == item.product_name.toLowerCase()){
         setProductName({
            ...product_name,
            product_name: val,
            isValid: true
         })
      } else {
         setProductName({
            ...product_name,
            product_name: val,
            isValid: false
         })
      }
   }

   const handleQuantityChange = (val) => {   

      if( /\D/.test(val) || parseInt(val) <= 0 || val.length == 0){
         setQuantity({
            ...quantity,
            quantity: val,
            isValidProductQuantity: false
         })
      } else {
          setQuantity({
            ...quantity,
            quantity: val,
            isValidProductQuantity: true
         })        
      }
   }

   const handleCostPriceChange = (val) => {  
      const regexWithValidPrice = /^\d{0,8}(\.\d{1,4})?$/ 
      if( val.match(regexWithValidPrice) && val.length != 0 && parseFloat(val) > 0) {
         setCostPrice({
            ...cost_price,
            cost_price: val,
            isValidCostPrice: true
         })
         const sp = parseFloat(val) + ((parseInt(margin.margin)/100) * parseFloat(val)) 
         setSellingPrice(String(sp))
      } else {
          setCostPrice({
            ...cost_price,
            cost_price: val,
            isValidCostPrice: false
         })
         setSellingPrice('0')
      }
   }

   const handleMargin = (val) => {  
      const regexWithValidPrice = /^\d{0,8}(\.\d{1,4})?$/ 
      if( val.match(regexWithValidPrice) && val.length != 0 && parseInt(val) > 0) {
         setMargin({
            ...margin,
            margin: val,
            isValidMargin: true
         })
         const sp = parseFloat(cost_price.cost_price) + ((parseInt(val)/100) * parseFloat(cost_price.cost_price)) 
         setSellingPrice(String(sp))
      } else {
          setMargin({
            ...margin,
            margin: val,
            isValidMargin: false
         })
         setSellingPrice('0')
      }
   }

    const handleMarketPriceChange = (val) => {  
      const regexWithValidPrice = /^\d{0,8}(\.\d{1,4})?$/ 
      if( val.match(regexWithValidPrice)) {
         setMarketPrice({
            ...market_price,
            market_price: val,
            isValidMarketPrice: true
         })
      } else {
          setMarketPrice({
            ...market_price,
            market_price: val,
            isValidMarketPrice: false
         })
      }
   }

   const handleSupplierChange = (val) => {     
      setList(true)
      const foundSupplier = SuppliersList.filter( item => {
         return (
            item.supplier_name.toLowerCase().includes(val.toLowerCase()) ||
            item.supplier_code.toString().includes(val.toString())
         )
      })

      const isValidSupplier = SuppliersList.filter( item => {
         return item.supplier_name == val
      })

      const len = foundSupplier.length;
      const cuslen = isValidSupplier.length
      if ( cuslen == 1) {
         setSupplier(val)
         setSuppliersData({
            ...suppliersData,
            allSuppliers: isValidSupplier,
            filteredSuppliers: isValidSupplier,
         })
         setValidSupplier(true)         
      }  else {
         setValidSupplier(false)
      }

      if( len == 0 ){
         setSuppliersData({
            allSuppliers: [],
            filteredSuppliers: []
         })
      } else {
         setSuppliersData({
            allSuppliers: foundSupplier,
            filteredSuppliers: foundSupplier
         })
      }             
      setSupplier(val);
   }

   const handleDescription = (val) => {
      setDescription(val)
   }

   const handleUpdateProduct = () => {
      if ( product_name.product_name != '' && cost_price.cost_price != '' && margin.margin != '' &&quantity.quantity != '' && supplier != ''){
         if ( product_name.isValid ) {
            if ( quantity.isValidProductQuantity ) {
               if(  cost_price.isValidCostPrice ) {
                  if( margin.isValidMargin ) {
                     if( validSupplier ) {
                        handleUpdateProducts(product_name.product_name, quantity.quantity, cost_price.cost_price, margin.margin, selling_price, market_price.market_price, supplier, description)
                     } else {
                        Alert.alert('Invalid Input!','Please enter a Valid Supplier', [{text: 'Ok'}]);
                     }
                  }  else {
                     Alert.alert('Invalid Input!','Please enter a Valid Margin Price for the product', [{text: 'Ok'}]);
                  }                   
               } else {
                  Alert.alert('Invalid Input!','Please enter a Valid Cost Price for the product', [{text: 'Ok'}]);                  
               }
            } else {
               Alert.alert('Invalid input', 'Please enter a Valid Quantity', [{text: 'Ok'}]);
            }
         } else {
            Alert.alert('Invalid input', 'Please enter a Valid Product Name. Such name already exists', [{text: 'Ok'}]);
         }        
      } else {
         Alert.alert('Invalid input', 'All fields should filled.', [{text: 'Ok'}]);
      }
   }      

   const date = item.product_updated[0].toDate();
   return(
      <View  style={styles.productInfo}>
         <View style={styles.productDesc}>
               <Image style={styles.barcode} source={require('../../assets/barcodes/1113.png')} />
               {  
                  quantity.isValidProductQuantity ?
                  null :
                  <Animatable.Text 
                     animation="fadeIn"
                     style={styles.errMsg}>Invalid Quantity</Animatable.Text> 
               } 
               {  
                  cost_price.isValidCostPrice ?
                  null :
                  <Animatable.Text 
                     animation="fadeIn"
                     style={styles.errMsg}>Invalid Cost Price</Animatable.Text> 
               } 
               {  
                  margin.isValidMargin ?
                  null :
                  <Animatable.Text 
                     animation="fadeIn"
                     style={styles.errMsg}>Invalid Margin</Animatable.Text> 
               } 
               {  
                  market_price.isvalidMarketPrice ?
                  null :
                  <Animatable.Text 
                     animation="fadeIn"
                     style={styles.errMsg}>Invalid market Price</Animatable.Text> 
               } 
               {  
                  validSupplier ?
                  null :
                  <Animatable.Text 
                     animation="fadeIn"
                     style={styles.errMsg}>Invalid Supplier</Animatable.Text> 
               }
               {  
                  product_name.isValid ?                 
                  null :
                   <Animatable.Text 
                     animation="fadeIn"
                     style={styles.errMsg}>Product name already exists
                  </Animatable.Text>   
               }
               <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Product Code: {item.product_code}</Text></Text>   
               <View style={{flexDirection: 'row'}}>
                  <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>*Product:</Text> </Text>
                  <TextInput
                     value={product_name.product_name}
                     style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                     keyboardType="ascii-capable"  
                     onChangeText={ (text) => handleProductNameChange(text)}    
                     onEndEditing = { (e) => handleProductNameChange(e.nativeEvent.text)}        
                  />
               </View>

               <View style={styles.infoPrice}>
                  <View style={{flexDirection: 'row', marginVertical: 1}}>
                     <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>*Quantity:</Text> </Text>
                     <TextInput
                        value={quantity.quantity}
                        style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                        keyboardType="numeric"  
                        onChangeText={ val =>  handleQuantityChange(val)}            
                     />
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 1}}>
                     <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>*Cost Price:</Text> </Text>
                     <TextInput
                        value={cost_price.cost_price}
                        style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                        keyboardType="numeric"  
                        onChangeText={ val => handleCostPriceChange(val)}            
                     />
                  </View>
               </View>

              <View style={styles.infoPrice}>
                     <View style={{flexDirection: 'row', marginVertical: 1}}>
                        <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>*Margin:</Text> </Text>
                        <TextInput
                           value={margin.margin}
                           style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                           keyboardType="numeric"  
                           onChangeText={ val => handleMargin(val)}            
                        />
                     </View>
                     <View style={{flexDirection: 'row', marginVertical: 1}}>
                        <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Selling Price:</Text> </Text>
                        <TextInput
                           editable={false}
                           value={selling_price}
                           style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                           keyboardType="numeric"  
                           onChangeText={ () =>  {}}           
                        />
                     </View>              
               </View>

               <View style={{flexDirection: 'row', marginVertical: 1}}>
                  <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>*Market Price:</Text> </Text>
                  <TextInput
                     value={market_price.market_price}
                     style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                     keyboardType="numeric"  
                     onChangeText={ val => handleMarketPriceChange(val)}            
                  />
               </View>

               <View style={{flexDirection: 'row', marginVertical: 1}}>
                  <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>*Supplier :</Text> </Text>
                  <TextInput
                     value={supplier}
                     style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                     keyboardType="ascii-capable"  
                     onFocus = {() => setList(true)}
                     onSubmitEditing={ () => setListLoading(true)}
                     onChangeText={ val => handleSupplierChange(val)}            
                  />
               </View>
               {
                     listLoading ?
                     <ActivityIndicator size="small" color="#078bab" /> :
                     <View style={{display: list ? 'flex' : 'none'}}>
                        <FlatList 
                           data={suppliersData.filteredSuppliers}
                           keyExtractor = { item => item.id}
                           renderItem = { ({item}) => {
                              return (
                                 <TouchableOpacity style={styles.SuppliersList} onPress={() => handleSupplierChange(item.supplier_name)}>
                                    <Text>{item.supplier_name}</Text>
                                 </TouchableOpacity>
                              )                              
                           }}
                        />
                     </View> 
                  }

               <View style={{marginRight:20}}>
                     <Text style={[styles.infoTexts, { fontSize: 15, fontStyle: 'italic'}]}><Text style={{fontWeight: '700'}}>Last Updated:</Text> {date.toDateString()}</Text>
               </View>
         </View>         

         <View style={styles.desc}>
         <ScrollView style={{marginRight:20}}>
               <Text style={[styles.infoTexts,{fontWeight:'700'}]}>*Product Description</Text>
               <TextInput
                  style={[styles.textInputs, {height: 120}]}
                  multiline
                  numberOfLines={10}
                  value={description}
                  keyboardType="ascii-capable"
                  onChangeText={ (val) => handleDescription(val)}
                  onEndEditing = { (e) => handleDescription(e.nativeEvent.text)}
               />  
         </ScrollView>
         </View>
         <TouchableOpacity 
            style={styles.button1}
            onPress={() => handleUpdateProduct()}
         >
            <Icon name="check" size={20} color='#078bab' />
            <Text style={[styles.texts,{color: '#078bab', fontWeight: 'bold', marginLeft: 5, fontSize: 15}]}>Update Product</Text>
            {
               updatingProducts ?
               <ActivityIndicator size="small" color="#078bab" />:
               null
            }
         </TouchableOpacity>               
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
   },
   SuppliersList: {
      flexDirection: 'row',
      marginVertical: 2,
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,      
      borderColor: '#078bab',
      backgroundColor: '#fafafa'
   },
   modal: {
      marginTop: 200,
      justifyContent: 'flex-end'
   },
   button1: {
      marginTop: 10,
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
   button: {
     marginHorizontal: 5,
     borderRadius: 20,
     backgroundColor: '#e6f1fa',
     padding: 15,
     width: '40%',
     alignItems: 'center'
  },
   buttonIcon1: {
      marginTop: 15, 
      padding: 3, 
      alignSelf: 'center', 
      backgroundColor: "#c7e6ff", 
      borderRadius: 50,
      marginBottom: 5
   },
   modalView: {
      // flex: 1,
      // position: 'relative',    
   },
   texts: {
      fontSize: 20,
      color: '#078bab'
   },
   texts1: {
      color: '#078bab',
      fontWeight: 'normal',
      fontSize: 18
   },
   modal3: {
      flex: 1,
      justifyContent: 'flex-start',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 600,
      backgroundColor: '#fff',
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
  },
   errMsg: {
      color: 'red',
      fontSize: 12
   },
})