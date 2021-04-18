import React, { useState } from 'react';
import { 
   Text,
   View, 
   TextInput,
   TouchableOpacity,    
   StyleSheet,
   FlatList,
   RefreshControl,
   ActivityIndicator
} from 'react-native';

import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

import firestore from '@react-native-firebase/firestore';

import Heads from '../../components/Heads';
import TotalProducts from '../../components/Products/ProductsStatus/TotalProducts';
import Stocks from '../../components/Products/ProductsStatus/Stocks';
import ProductCard from '../../components/Products/ProductCard';
import AddProduct from "../../components/Products/AddProduct";
import { useEffect } from 'react';
// const ProductsList = require('../../models/Products.json');

let ProductsList = [];

const ProductsScreen = ({navigation}) => {

   const FilterData = 
   [
      {
         label: 'All', 
         value: 'all', 
         icon: () => <Icon 
            name="circle" 
            size={18} 
            color= '#078bab' 
         />
      },
      {
         label: 'Low Stock', 
         value: 'low', 
         icon: () => <Icon 
            name="arrow-down" 
            size={18} 
            color= 'red' 
         />
      },
      {
         label: 'High Stock', 
         value: 'high', 
         icon: () => <Icon 
            name="arrow-up" 
            size={18} 
            color= 'green' 
         />
      }
   ]

   const CategoryData = 
   [
      {
         label: 'All', 
         value: 'all', 
         icon: () => <Icon 
            name="circle" 
            size={18} 
            color= '#078bab' 
         />
      },
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

   const [isLoading, setIsLoading] = useState(true)

   const [addProductModal, setAddProductModal] = useState(false);   

   const [productAddedModal, setProductAddedModal] = useState(false)

   const [productCounter, setProductCounter] = useState(0);

   const [stockCounter, setStockCounter] = useState(0);

   const [refreshing, setRefreshing] = useState(false);

   const [state, setState] = useState({
      Catstatus: '',
      FilterStatus: ''
   })

   const [stateChange, setStateChange] = useState({
      product_name: '',
      product_code: ''
   })

   // const a =0;

   const [productData, setProductData] = useState({
      allProducts: null,
      filteredProducts: null
   })

   useEffect( () => {    
      const ok = async() => {
         ProductsList = [];
            try{
            await firestore()
               .collection('Products')
               .get()
               .then( querySnapshot => {
                  setProductCounter(querySnapshot.size)  
                  let temp = 0;
                  querySnapshot.forEach( documentSnapshot => {
                     const data = documentSnapshot.data();
                     data.id = documentSnapshot.id;;
                     ProductsList.push(data);                        
                     temp = Number(documentSnapshot.data().quantity) + Number(temp);     
                  })                  
                  setStockCounter(temp);
               });            
            setProductData({
               allProducts: ProductsList,
               filteredProducts: ProductsList
            })
            setIsLoading(false)
            setRefreshing(false)
         } catch (e) {
            console.log(e)
         }
      }      
      ok();

   }, []);   

   const handleStatusChange = (val) => {
      setState({
         CatStatus: val
      })
      const foundProduct = ProductsList.filter( item => {
         return val.toLowerCase() == item.category.toLowerCase()
      })

      if(val == 'all'){
         setProductData({
            filteredProducts: ProductsList
         })
      } else {
          setProductData({
            filteredProducts: foundProduct
         })
      }     
   }

   const handleFilterChange = (val) => {
      setState({
         FilterStatus: val
      })
      const foundProduct = ProductsList.filter( item => {         
               if( val == "low"){
                  return parseInt(item.quantity) <= 50
               } else {
                  return parseInt(item.quantity) > 50
               }
      })

      if(val == 'all'){
         setProductData({
            filteredProducts: ProductsList
         })
      } else {
          setProductData({
            filteredProducts: foundProduct
         })
      }     
   }

   const handleSearchText = async(textToSearch) => {

      try{
         const foundProduct = await ProductsList.filter( item => {
            return ( 
               item.product_code.toString().includes(textToSearch) || 
               item.product_name.toString().toLowerCase().includes(textToSearch.toLowerCase()) ||
               item.quantity.toString().includes(textToSearch)  ||
               item.category.toLowerCase().includes(textToSearch.toLowerCase()) 
            )
         })
      
         await setProductData({
            ...productData,
            filteredProducts: foundProduct.length == 0 ? null : foundProduct         
         })      
      } catch(e) {
         console.log(e)
      } 
   }

   const handleStateChange = (name, code) => {
      console.log(name, code)
      setStateChange({
         product_name: name,
         product_code: code
      })
      setProductAddedModal(true);
   }

   const onRefresh = React.useCallback( async() => {
      setRefreshing(true);
      ProductsList = [];
      try{         
         await firestore()
            .collection('Products')
            .get()
            .then( querySnapshot => {
               setProductCounter(querySnapshot.size) 
               let temp = 0;
               querySnapshot.forEach( documentSnapshot => {    
                  const data = documentSnapshot.data();
                  data.id = documentSnapshot.id              
                  ProductsList.push(data);   
                  temp = Number(documentSnapshot.data().quantity) + Number(temp); 
               });    
               setStockCounter(temp)    
               setRefreshing(false) 
               setProductData({
                  allProducts: ProductsList,
                  filteredProducts: ProductsList
               })          
            });          
      } catch(e) {
         console.log(e)
      }
   }, [refreshing]);

   return(
      <View style={styles.container}>
         <Heads nav={navigation} title="Products" tabBool={1} />            
         <View style={styles.mainActitivity}>             
            <View style={styles.status}>
               <Animatable.View animation="bounce" duration={1000} style={styles.total}>
                  <TotalProducts totalproducts={productCounter} />
               </Animatable.View>
               <Animatable.View animation="bounce" duration={1000} style={styles.stocks}>
                  <Stocks totalstocks={stockCounter}/>
               </Animatable.View>
            </View>  
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 10}}> */}
               <View style={styles.searchBar}>
                  <Icon style={{marginLeft: 10}} name="text-box-search-outline" size={20} color="#078bab" />
                  
                  <TextInput style={{ marginLeft: 5, width: '100%' ,color: '#000'}} 
                     placeholder="Search" 
                     onChangeText={ (val) => handleSearchText(val)} 
                  />            
               </View>   
               <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                  <View style={styles.picker}>
                     <DropDownPicker 
                        items={FilterData}
                        placeholder="Sort By"
                        defaultValue={state.FilterStatus}
                        containerStyle={{height: 40, width: '100%', alignSelf: 'flex-start'}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                           justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => handleFilterChange(item.value)}
                     />
                  </View>      
                  <View style={styles.picker}>
                     <DropDownPicker 
                        items={CategoryData}
                        placeholder="Category"
                        defaultValue={state.CatStatus}
                        containerStyle={{height: 40, width: '100%', alignSelf: 'flex-start'}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                           justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => handleStatusChange(item.value)}
                     />
                  </View> 
               </View>
            {/* </View>   */}
            {/* <View style={styles.cardContent}>  
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}>ID</Text> 
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left', fontWeight: '700'}]}>Name</Text>  
               <Text style={[styles.cardTitle, {flex: 1, textAlign: 'left', fontWeight: '700'}]}>Qty</Text>            
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'center', fontWeight: '700'}]}>Price (In Rs.)</Text>
            </View>  */}
            {
               isLoading ?
               <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size="large" color="#078bab" />
               </View> :
               null            
            }
            { 
               productData.filteredProducts == null ?
               <View opacity={0.5} style={styles.errorDisplay}>
                  <Icon name="clipboard-alert-outline" size={30} color='#078bab'/>
                  <Text style={styles.errorMsg}>No Match Found</Text>  
                                 
               </View> :
               <Animatable.View 
                  animation="fadeInUpBig"
                  duration={800}
                  style={{flex: 1,backgroundColor: '#fafafa', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 20}}>
                  <FlatList 
                     data = {productData.filteredProducts}
                     keyExtractor = {item => item.id}
                     renderItem = { ({item}) =>          
                        <ProductCard items={item}/>            
                     }
                     refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                     }
                  />
               </Animatable.View>
            }           
         </View>      
         <TouchableOpacity          
            style={{position: 'absolute', bottom: 25, right: 25,}}
            onPress={() => setAddProductModal(true)}
         >            
            <Icon name="plus" size={30} color='#e6f1fa' style={styles.icon}/>              
         </TouchableOpacity>    

         <Modal 
            style={styles.modal}
            isVisible={addProductModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setAddProductModal(!addProductModal)}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            animationInTiming={500}
            animationOutTiming={500}> 
            <View style={styles.modalView}>       
               <Icon 
                  style={styles.buttonIcon}
                  name="close"
                  size={30}
                  color="#078bab"                                   
                  onPress={ () => setAddProductModal(false)}
               />   
               <AddProduct onAddProduct={setAddProductModal} stateChange={handleStateChange}/>                                   
            </View>                                           
         </Modal>         
         <Modal 
            style={styles.modal1}
            isVisible={productAddedModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setProductAddedModal(false)}
            onBackdropPress = {() => setProductAddedModal(false)}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            animationInTiming={500}
            animationOutTiming={500}> 
               
            <View style={styles.modalView}>                        
               <View style={styles.confirmModal}>
                  <Text style={styles.texts}>
                     <Icon name="text-box-check" size={25} color="green"/>
                     <Text style={{marginLeft: 5, fontWeight: '700'}}>Added Successfully !</Text>
                  </Text>
                  <View style={{marginTop: 10}}>
                     <Text style={styles.texts}>Code: {stateChange.product_code}</Text>
                     <Text style={styles.texts}>Name: {stateChange.product_name}</Text>
                  </View>
               </View>                                                                
               <Icon 
                  style={styles.buttonIcon}
                  name="close"
                  size={30}
                  color="#078bab"                                   
                  onPress={ () => setProductAddedModal(false)}
               /> 
            </View>                                           
         </Modal>
      </View>    
   )
}

export default ProductsScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   status: {
      flexDirection: 'row',
      padding: 10,
      paddingHorizontal: 20,
   },
   total: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',      
   },
   stocks: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   picker: {
      width: '40%',
      paddingHorizontal: 8,
      paddingTop: 8
   },
   mainActitivity: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#e6f1fa',
      justifyContent: 'center',
   },
   activityView: {
      borderRadius: 15,
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '90%',
      shadowColor: "#000",
      shadowOffset: {
         width:  2,
         height: 3,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,

      elevation: 7,
   },
   cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginTop: 10
   },
   cardTitle:{
      marginHorizontal: 5,
      color: '#078bab',
      fontSize: 18,
   },
   confirmModal: {
      padding: 10,
      alignItems: 'center'
   },
   texts: {
      color: '#078bab',
      fontSize: 20
   },
   searchBar: {
      marginHorizontal: 40,
      // width: '95%',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      borderColor: '#078bab',
      borderWidth: 1,
      borderRadius: 50,
      height: 40      
   },
   activityTopicText: {
      fontSize: 20,
      fontWeight: '700'
   },
   icon: {
      padding: 20,      
      backgroundColor: '#078bab', 
      borderRadius: 50 ,
      shadowColor: "#000",
      shadowOffset: {
         width:  2,
         height: 3,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,

      elevation: 12,
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
  modal1: {
      flex: 1,
      justifyContent: 'flex-start',
      borderRadius: 10,
      marginVertical: 320,
      backgroundColor: '#fff',   
      marginLeft: 50,
      marginRight: 50
  },
  modalView: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
  },
   buttonIcon: {
    marginTop: 15, 
    padding: 3, 
    alignSelf: 'flex-end', 
    backgroundColor: "#c7e6ff", 
    borderRadius: 50,
    marginRight: 15,
    marginBottom: 5
  },
//   modalView: {
//       marginTop: 0
//   },
   errorDisplay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',            
   },
   errorMsg: {
      color: '#078bab',
      fontSize: 20
   }
})