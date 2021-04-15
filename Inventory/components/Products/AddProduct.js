import React, {useState, useEffect} from "react";
import {
   View, 
   Text, 
   StyleSheet, 
   TouchableOpacity, 
   TextInput,
   FlatList,
   Alert,
   } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from 'react-native-dropdown-picker';

let SuppliersList =[];

const AddProduct = (props) => {

   useEffect( () => {
      const ok = async() => {
         SuppliersList = [];
         try{            
            await firestore()
               .collection('Suppliers')
               .get()
               .then( querySnapshot => {
                  querySnapshot.forEach( documentSnapshot => {
                     SuppliersList.push(documentSnapshot.data())
                  })
               })                         
         } catch(e) {
            console.log(e)
         }         
      }
      ok();
   })

   const categoryData = 
   [
      {
         label: 'Clothing', 
         value: 'clothing', 
         icon: () => <Icon 
            name="tshirt-crew-outline" 
            size={18} 
            color= '#078bab' 
         />
      },
      {
         label: 'Electronics', 
         value: 'electronics', 
         icon: () => <Icon 
            name="laptop-chromebook" 
            size={18} 
            color= '#078bab' 
         />
      },
      {
         label: 'Accessories', 
         value: 'accessories', 
         icon: () => <Icon 
            name="account-tie-outline" 
            size={18} 
            color= '#078bab' 
         />
      },
      {
         label: 'Stationery', 
         value: 'stationery', 
         icon: () => <Icon 
            name="book-open-page-variant" 
            size={18} 
            color= '#078bab' 
         />
      },
      {
         label: 'Bags', 
         value: 'bag', 
         icon: () => <Icon 
            name="bag-personal-outline" 
            size={18} 
            color= '#078bab' 
         />
      },
      {
         label: 'Cosmetics', 
         value: 'cosmetics', 
         icon: () => <Icon 
            name="auto-fix" 
            size={18} 
            color= '#078bab' 
         />
      },
   ]

   const [state, setState] = useState({
      Catstatus: '',
   })

   const [productCode, setProductCode] = useState({
      product_code: null,
      isValidID: true,
   })

  const [productName, setProductName] = useState({
     product_name: '',
     exists: false
  })  

  const [description, setDescription] = useState('')

  const [subCategory, setSubCategory] = useState('');

  const [productQuantity, setProductQuantity] = useState({
     product_quantity: 0,
     isValidProductQuantity: true
  })

  const [marketPrice, setMarketPrice] = useState({
     market_price: null,
     isValidMarketPrice: true
  })

  const [margin, setMargin] = useState({
     margin: null,
     isValidMargin: true
  })

  const [costPrice, setCostPrice] = useState({
     cost_price: null,
     isValidCostPrice: true
  })

  const [list, setList] = useState(false)

   const [supplier, setSupplier] = useState({
      supplierName: ''
   });  

   const [validSupplier, setValidSupplier] = useState(true)

   const [SuppliersData, setSuppliersData] = useState(SuppliersList);

  const [ codes, setCodes] = useState({
     clothing: 100.001,
     electronics: 200.001,
     accessories: 300.001,
     stationery: 400.001,
     bag: 500.001,
     cosmetics: 600.001,
  })

   const handleProductNameChange = (val) => { 
      // const foundProduct = ProductsList.filter( item => {
      //    return item.name == val
      // })
      // if( foundProduct.length == 0  ){
         setProductName({
            ...productName,
            product_name: val,
            exists: false
         })
      // } else {
      //    setProductName({
      //       ...productName,
      //       product_name: val,
      //       exists: true
      //    })
      // }
   }   

   const handleSubCategory = (val) => {
      setSubCategory(val)
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

   const handleMarketPriceChange = (val) => {  
      const regexWithValidPrice = /^\d{0,8}(\.\d{1,4})?$/ 
      if( val.match(regexWithValidPrice) ) {
         setMarketPrice({
            ...marketPrice,
            market_price: val,
            isValidMarketPrice: true
         })
      } else {
          setMarketPrice({
            ...marketPrice,
            market_price: val,
            isValidMarketPrice: false
         })
      }
   }

   const handleMargin = (val) => {  
      const regexWithValidPrice = /^\d{0,8}(\.\d{1,4})?$/ 
      if( val.match(regexWithValidPrice) ) {
         setMargin({
            ...margin,
            margin: val,
            isValidMargin: true
         })
      } else {
          setMargin({
            ...margin,
            margin: val,
            isValidMargin: false
         })
      }
   }

   const handleCostPriceChange = (val) => {  
      const regexWithValidPrice = /^\d{0,8}(\.\d{1,4})?$/ 
      if( val.match(regexWithValidPrice) ) {
         setCostPrice({
            ...costPrice,
            cost_price: val,
            isValidCostPrice: true
         })
      } else {
          setCostPrice({
            ...costPrice,
            cost_price: val,
            isValidCostPrice: false
         })
      }
   }

   const handleSupplierChange = (val) => {     

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
         setSupplier({
            ...supplier, 
            supplierName: val,
         })
         setValidSupplier(true)         
      }  else {
         setValidSupplier(false)
      }

      if( len == 0 ){
         setSuppliersData([])
      } else {
         setSuppliersData(foundSupplier)
      }             

      setSupplier({supplierName: val});
   }

   let code = [];   

   const handleStatusChange = async(val)=> {
      setState({
         Catstatus: val
      })

      let len = 0;

      try{
         await firestore()
            .collection('Products')
            .where('category', '==', val)
            .get()
            .then( querySnapshot => {
               querySnapshot.forEach( documentSnapshot => {
                  code.push(documentSnapshot.data().product_code)                  
                  len++;               
               })
            })
         let temp = 0;
         if( len == 0){
            temp = null;
         }
         else if( len == 1){                      
            temp = code[0]
         } else{
            for(let i = 0; i < len; i++ ){
               for( let j = 0; j < len; j++){
                  if(code[i] > code[j]){
                     temp = code[i];
                     code[i] = code[j];
                     code[j] = temp;
                  }
               }
            }
         }
         if( val == "clothing" ){
            if( temp == null ){
               setProductCode({product_code: codes.clothing.toFixed(3)})
            } else {
               temp = code[0] + 0.001
               setCodes({clothing: temp.toFixed(3)})
               setProductCode({product_code: temp.toFixed(3)})
            }   
         }
         if( val == "electronics"){
            if( temp == null ){
               temp = codes.electronics + 0.001
               setProductCode({product_code: codes.electronics.toFixed(3)})
            } else {
               temp = code[0] + 0.001
               setCodes({electronics: temp.toFixed(3)})
               setProductCode({product_code: temp.toFixed(3)})
            }            
         }
         if( val == "accessories"){
            if( temp == null ){
               setProductCode({product_code: codes.accessories.toFixed(3)})
            } else {
               temp = code[0] + 0.001
               setCodes({accessories: temp.toFixed(3)})
               setProductCode({product_code: temp.toFixed(3)})
            }  
         }                  
         if( val == "stationery"){
            if( temp == null ){
               setProductCode({product_code: codes.stationery.toFixed(3)})
            } else {
               temp = code[0] + 0.001
               setCodes({stationery: temp.toFixed(3)})
               setProductCode({product_code: temp.toFixed(3)})
            }  
         }
         if( val == "bag"){
            if( temp == null ){
               setProductCode({product_code: codes.bag.toFixed(3)})
            } else {
               temp = code[0] + 0.001
               setCodes({bag: temp.toFixed(3)})
               setProductCode({product_code: temp.toFixed(3)})
            }              
         }
         if( val == "cosmetics"){
            if( temp == null ){              
               setProductCode({product_code: codes.cosmetics.toFixed(3)})
            } else {
               temp = code[0] + 0.001
               setCodes({cosmetics: temp.toFixed(3)})
               setProductCode({product_code: temp.toFixed(3)})
            }  
         }
      } catch (e) {
         console.log(e)
      }
   }

   const handleDescription = (val) => {
      setDescription(val)
   }

   const handleAddProduct = () => {
      if ( productName.product_name != '' && productCode.product_code != null && costPrice.cost_price != null && margin.margin != null && marketPrice.market_price != null && state.Catstatus != ''){
         if( productCode.product_code != null){
            if ( !productName.exists ) {
               if ( productQuantity.isValidProductQuantity ) {
                  if(  costPrice.isValidCostPrice ) {
                     if( margin.isValidMargin ) {
                        if( marketPrice.isValidMarketPrice ) {
                           props.onAddProduct(false);
                           try{                        
                              firestore()
                                 .collection('Products')
                                 .add({
                                    category: state.Catstatus,
                                    sub_category: subCategory,
                                    product_name: productName.product_name,
                                    product_code: Number(productCode.product_code),
                                    cost_price: Number(costPrice.cost_price),
                                    margin: Number(margin.margin),
                                    market_price: Number(marketPrice.market_price),
                                    description: description,
                                    quantity: productQuantity.product_quantity,
                                    supplier: supplier.supplierName,
                                    product_updated: [new Date()]
                                 }). then( () => {
                                    // Alert.alert('Product Added!','Product Code:'+productCode.product_code+'  with Product Name: '+productName.product_name, [{text: 'Ok'}]);
                                    // setProductAddedModal(true)
                                    props.stateChange(productName.product_name, productCode.product_code)
                                 })
                           } catch(e) {
                              console.log(e)
                           }
                           
                        } else {
                           Alert.alert('Invalid Input!','Please enter a Valid Market Price for the product', [{text: 'Ok'}]);
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
                  <Text style={styles.texts}>Product Name*</Text>
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
               <View style={styles.picker}>
                     <DropDownPicker 
                        items={categoryData}
                        placeholder="Category"
                        defaultValue={state.CatStatus}
                        containerStyle={{height: 40, width: '100%', alignSelf: 'center'}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                           justifyContent: 'center'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa', width: '100%'}}
                        onChangeItem={item => handleStatusChange(item.value)}
                     />
                  </View>
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Product code* : {productCode.product_code}</Text>
               </View>  
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Sub-Category(Optional)</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="ascii-capable"
                     placeholder="Mobile/Woolen/gold/colors(red,yellow etc)..." 
                     onChangeText={ (val) => handleSubCategory(val)}
                     onEndEditing = { (e) => handleSubCategory(e.nativeEvent.text)}
                  />                 
               </View>  
                <View style={styles.inputs}>
                  <Text style={styles.texts}>Supplier*</Text>
                  <TextInput
                     value={supplier.supplierName}
                     style={styles.textInputs}
                     keyboardType="ascii-capable"
                     onFocus = {() => setList(true)}
                     placeholder="eg. Hari Products Pvt. Ltd. or Supplier Code " 
                     onChangeText={ (val) => handleSupplierChange(val)}
                     onEndEditing = { (e) => handleSupplierChange(e.nativeEvent.text)}
                  />         
                  <View style={{display: list ? 'flex' : 'none'}}>
                     <FlatList 
                        data={SuppliersData}
                        keyExtractor = { item => item.supplier_code}
                        renderItem = { ({item}) => {
                           return (
                              <TouchableOpacity style={styles.SuppliersList} onPress={() => handleSupplierChange(item.supplier_name)}>
                                 <Text>{item.supplier_name}</Text>
                              </TouchableOpacity>
                           )                              
                        }}
                     />
                  </View>        
               </View>             
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Quantity</Text>
                  <TextInput
                     defaultValue='0'
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
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Cost Price* (In Rs.)</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="numeric"
                     placeholder="Price...(eg. 200 or eg. 200.12)" 
                     onChangeText={ (val) => handleCostPriceChange(val)}
                     onEndEditing = { (e) => handleCostPriceChange(e.nativeEvent.text)}
                  />      
                  {  
                     costPrice.isValidCostPrice ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid Price</Animatable.Text> 
                  }            
               </View>
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Margin* (%)</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="numeric"
                     placeholder="Price...(eg. 3 or eg. 5.12)" 
                     onChangeText={ (val) => handleMargin(val)}
                     onEndEditing = { (e) => handleMargin(e.nativeEvent.text)}
                  />      
                  {  
                     margin.isValidMargin ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid Price</Animatable.Text> 
                  }            
               </View>
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Market Price* (In Rs.)</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="numeric"
                     placeholder="Price...(eg. 200 or eg. 200.12)" 
                     onChangeText={ (val) => handleMarketPriceChange(val)}
                     onEndEditing = { (e) => handleMarketPriceChange(e.nativeEvent.text)}
                  />      
                  {  
                     marketPrice.isValidMarketPrice ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid Price</Animatable.Text> 
                  }            
               </View>   
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Description(Optional)</Text>
                  <TextInput
                     style={[styles.textInputs, {height: 100}]}
                     multiline
                     numberOfLines={5}
                     keyboardType="ascii-capable"
                     onChangeText={ (val) => handleDescription(val)}
                     onEndEditing = { (e) => handleDescription(e.nativeEvent.text)}
                  />                                  
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
      padding: 15,
      marginBottom: 30,
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
   SuppliersList: {
      flexDirection: 'row',
      marginVertical: 5,
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#078bab',
      backgroundColor: '#fafafa'
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
   picker: {
      width: '100%',
      paddingHorizontal: 8,
      paddingTop: 8
   },
   modal: {
      flex: 1,
      justifyContent: 'flex-start',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 100,
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