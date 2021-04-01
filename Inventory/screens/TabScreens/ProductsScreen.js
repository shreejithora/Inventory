import React, { useState } from 'react';
import { 
   Text,
   View, 
   TextInput,
   TouchableOpacity, 
   ScrollView, 
   StyleSheet,
   FlatList,
} from 'react-native';

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

import ProductCard from '../../components/Products/ProductCard';
import AddProduct from "../../components/Products/AddProduct";
// import CategoryData from '../../models/CategoryData';
const ProductsList = require('../../models/Products.json');

const ProductsScreen = () => {

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

   const [addProductModal, setAddProductModal] = useState(false);   

   const [state, setState] = useState({
      status: ''
   })

   const [productData, setProductData] = useState({
      allProducts: ProductsList,
      filteredProducts: ProductsList
   })

   const handleStatusChange = (val) => {
      setState({
         status: val
      })
      const foundProduct = ProductsList.filter( item => {
         return val == item.category
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

   const handleSearchText = textToSearch => {
      const foundProduct = ProductsList.filter( item => {
         return ( 
            item.product_id.toLowerCase().includes(textToSearch.toLowerCase()) || 
            item.name.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.quantity.toLowerCase().includes(textToSearch.toLowerCase())  ||
            item.price.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.last_updated.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.category.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.sub_category.toLowerCase().includes(textToSearch.toLowerCase()) 
         )
      })
      
      setProductData({
         ...productData,
         filteredProducts: foundProduct.length == 0 ? null : foundProduct         
      })      
   }

   return(
      <View style={styles.container}>
         <View style={styles.mainActitivity}> 
            <View style={styles.searchBar}>
               <Icon style={{marginLeft: 10}} name="text-box-search-outline" size={20} color="#078bab" />
               
               <TextInput style={{flex: 1, marginLeft: 5, color: '#000'}} 
                  placeholder="Search" 
                  onChangeText={ (val) => handleSearchText(val)} 
               />            
            </View>          
            <View style={styles.picker}>
               <DropDownPicker 
                  items={CategoryData}
                  placeholder="Category"
                  defaultValue={state.status}
                  containerStyle={{height: 40, width: '40%', alignSelf: 'flex-end'}}
                  style={{backgroundColor: '#fafafa'}}
                  itemStyle={{
                     justifyContent: 'flex-start'
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={item => handleStatusChange(item.value)}
               />
            </View>   
            <View style={styles.cardContent}>  
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}>ID</Text> 
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left', fontWeight: '700'}]}>Name</Text>  
               <Text style={[styles.cardTitle, {flex: 1, textAlign: 'left', fontWeight: '700'}]}>Qty</Text>            
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'center', fontWeight: '700'}]}>Price (In Rs.)</Text>
            </View> 
            { 
               productData.filteredProducts == null ?
               <View opacity={0.5} style={styles.errorDisplay}>
                  <Icon name="clipboard-alert-outline" size={30} color='#078bab'/>
                  <Text style={styles.errorMsg}>No Match Found</Text>  
                                 
               </View> :
               <FlatList 
                  data = {productData.filteredProducts}
                  keyExtractor = {item => item.product_id}
                  renderItem = { ({item}) =>                  
                     <ProductCard items={item}/>                                    
                  }
               />
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
               <AddProduct onAddProduct={setAddProductModal}/>                                   
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
   picker: {
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
   searchBar: {
      marginHorizontal: 10,
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
   buttonIcon: {
    marginTop: 15, 
    padding: 3, 
    alignSelf: 'center', 
    backgroundColor: "#c7e6ff", 
    borderRadius: 50
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