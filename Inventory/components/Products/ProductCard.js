import React, {useState} from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Image,
  Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import ProductInfo from "./ProductInfo";
import UpdateProductInfo from './UpdateProductInfo';

// const ProductsList = require('../../models/Products.json');

const ProductCard = ({items}) => {

   const [state, setState] = useState({
      product_name: '',
      quantity: '',
      cost_price: '',
      margin: '',
      selling_price: '',
      market_price: '',
      supplier: '',
      description: '',
      date: new Date()
   })

   const [productDetailModal, setProductDetailModal] = useState(false);  

   const [deleteProductModal, setDeleteProductModal] = useState(false) 

   const [updateProduct, setUpdateProduct] = useState(false)

   const [updateProductModal, setUpdateProductModal] = useState(false)

   const [updatingProducts, setUpdatingProducts] = useState(false)

   const [update, setUpdate] = useState(false)

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

   const handleDelete = async(id) => {
      setDeleteProductModal(false)
      try{
         await firestore()
            .collection('Products')
            .doc(id)
            .delete()
            .then( () =>{
                  setProductDetailModal(false) 
                  Alert.alert('Deleted Successfully!', 'Product: '+items.product_name, [{text: 'Ok'}]);
            })
      } catch(e) {
         console.log(e)
      }           
   }

   const handleBackButton = () => {
      setProductDetailModal(false)
      setUpdateProduct(false)
   }

   const handleUpdateProduct = (product_name, quantity, cost_price, margin, selling_price, market_price, supplier, description) => {
      setUpdateProductModal(true)
      setState({
         ...state,
         product_name: product_name,
         quantity: quantity,
         cost_price: cost_price,
         margin: margin,
         selling_price: selling_price,
         market_price: market_price,
         supplier: supplier,
         description: description
      })      
   }

   const handleUpdate = async() => {
      setUpdateProductModal(false)
      setUpdatingProducts(false)
      try{
         await firestore()
            .collection('Products')
            .doc(items.id)
            .update({
               product_name: state.product_name,
               cost_price: Number(state.cost_price),
               margin: Number(state.margin),
               market_price: Number(state.market_price),
               selling_price: Number(parseFloat(state.cost_price) + ( parseFloat(state.cost_price) * (parseFloat(state.margin)/100))),
               description: state.description,
               quantity: state.quantity,
               supplier: state.supplier,
               product_updated: firestore.FieldValue.arrayUnion(state.date)
            })
            .then( () => {                                 
               setUpdatingProducts(false)               
               setUpdateProduct(false);
               setProductDetailModal(false)
               Alert.alert('Product Updated', 'Product: '+state.product_name, [{text: 'Ok'}]);
            })
      } catch(e) {
         console.log(e)
      }
   }

   const handleCancel = () => {
      setUpdateProductModal(false)
      setUpdate(false)
   }

   const onUpdateProduct = () => {
      setUpdateProduct(false)
   }

   return(
      <View>
         <Animatable.View animation="fadeInUp" duration={1200} style={styles.card}>
            <TouchableOpacity onPress={() => setProductDetailModal(!productDetailModal)}>
               <View style={styles.cardContent}>  
                  <View style={{flex: 1}}>
                     <Image 
                        source={require('../../assets/logo.png')}
                        style={{height: 40, width: 40, borderRadius: 50, borderColor:'#078bab', borderWidth: 1, padding: 5}}
                     />                     
                  </View>
                   <View style={{flexDirection: 'column', flex: 4, marginRight: 10}}> 
                     <View>
                        <Text style={styles.texts}>{items.product_name} <Text style={[styles.texts, {fontSize: 15, color: '#39bcdb', fontStyle: 'italic'}]}>( {items.category} )</Text></Text>                     
                     </View>
                     <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text 
                           style={[styles.texts, 
                              {
                                 fontStyle: 'italic', 
                                 fontSize: 16, 
                                 color: items.quantity <= 20 ? '#f04149' : '#06c452'
                              }]}>
                              Stocks: {numbering(items.quantity)}  
                           <Icon 
                              name={ items.quantity <= 20 ? "arrow-down" : "arrow-up"} 
                              color={items.quantity <= 20 ? "#f04149" : "#06c452"}
                              size={15}
                           />
                           {
                              items.quantity <= 20 ?
                              <View style={{paddingHorizontal: 5, borderRadius: 20, backgroundColor: '#f04149'}}>
                                 <Text style={[styles.texts, {fontStyle: 'italic', color: '#fff', fontSize: 12, fontWeight: '700'}]}>Low</Text>
                              </View> :
                              null
                           }
                           </Text>
                        <Text style={[styles.texts, {fontWeight: '700'}]}>Rs. {numbering(items.cost_price)}</Text>
                     </View>
                  </View>                 
               </View>         
            </TouchableOpacity>
            
         </Animatable.View>  
         <Modal 
            style={styles.detailModal}
            isVisible={productDetailModal} 
            onBackButtonPress = {handleBackButton}
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutUp'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={300}
            animationInTiming={500}
            animationOutTiming={300}> 
            <View style={styles.modalView}>  
               {
                  updateProduct ?
                  <UpdateProductInfo item={items} handleUpdateProducts={handleUpdateProduct} updatingProducts={updatingProducts} /> :
                  <ProductInfo item={items}/> 
               }                                      
               <View style={{flexDirection: 'row',justifyContent: 'space-between', bottom: 0, right: 0}}>        
                  {
                     updateProduct ?
                     <View style={{alignSelf: 'flex-end', position:'absolute', bottom: 20, right: 20 }}>                                                             
                        <Animatable.View
                           animation = "fadeInUpBig"
                           duration = {600}
                        >
                           <Icon 
                              style={styles.buttonIcon}
                              name="close"
                              size={30}
                              color="#078bab"                                   
                              onPress={ () => setUpdateProduct(false)}
                           />
                        </Animatable.View>                  
                     </View> :
                     <View style={{alignSelf: 'flex-end', position:'absolute', bottom: 20, right: 20 }}>                  
                        <Animatable.View 
                           animation = "fadeInUpBig"
                           duration = {1000}
                        >
                           <Icon 
                              style={[styles.buttonIcon, {marginBottom: 10}]} 
                              name="delete-outline" 
                              color="#078bab" 
                              size={30}  
                              onPress={() => setDeleteProductModal(true)}
                           />
                        </Animatable.View>
                        <Animatable.View 
                           animation = "fadeInUpBig"
                           duration = {800}
                        >
                           <Icon 
                              style={[styles.buttonIcon, {marginBottom: 10}]} 
                              name="pencil-outline" 
                              color="#078bab" 
                              size={30}  
                              onPress={ () => setUpdateProduct(true)}
                           />
                        </Animatable.View>
                        <Animatable.View
                           animation = "fadeInUpBig"
                           duration = {600}
                        >
                           <Icon 
                              style={styles.buttonIcon}
                              name="close"
                              size={30}
                              color="#078bab"                                   
                              onPress={ () => setProductDetailModal(false)}
                           />
                        </Animatable.View>                  
                     </View>                   
                  }                                
               </View>                                
            </View>                                           
         </Modal>
         <Modal 
            style={styles.modal3}
            isVisible={deleteProductModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setDeleteProductModal(!deleteProductModal)}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            animationInTiming={500}
            animationOutTiming={500}> 
            <View style={[styles.modalView, {alignItems: 'center'  }]}>       
               <Icon 
                  style={styles.buttonIcon1}
                  name="close"
                  size={30}
                  color="#078bab"                                   
                  onPress={ () => setDeleteProductModal(false)}
               />     
               <Text style={[styles.texts, {fontWeight: '700', marginVertical: 10}]}>Delete ?</Text>
               <View style={{flexDirection: 'row', marginTop: 15}}>
                  <TouchableOpacity style={styles.button} onPress={() => setDeleteProductModal(false)}>
                     <Text style={[styles.texts, {fontWeight: '700', color: '#078bab'}]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, {backgroundColor: '#078bab'}]} onPress={ () => handleDelete(items.id)}>
                     <Text style={[styles.texts, {fontWeight: '700', color: '#fff'}]}>Delete</Text>
                  </TouchableOpacity>
               </View>               
            </View>                                           
         </Modal>
         <Modal 
            style={styles.modal3}
            isVisible={updateProductModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setUpdateProductModal(false)}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            animationInTiming={500}
            animationOutTiming={500}> 
            <View style={[styles.modalView, {alignItems: 'center'  }]}>       
               <Icon 
                  style={styles.buttonIcon1}
                  name="close"
                  size={30}
                  color="#078bab"                                   
                  onPress={ () => setUpdateProductModal(false)}
               />     
               <Text style={[styles.texts, {fontWeight: '700', marginVertical: 10}]}>Update ?</Text>
               <View style={{flexDirection: 'row', marginTop: 15}}>
                  <TouchableOpacity style={styles.button} onPress={() => handleCancel()}>
                     <Text style={[styles.texts, {fontWeight: '700', color: '#078bab'}]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, {backgroundColor: '#078bab'}]} onPress={ () => handleUpdate()}>
                     <Text style={[styles.texts, {fontWeight: '700', color: '#fff'}]}>Update</Text>
                  </TouchableOpacity>
               </View>               
            </View>                                           
         </Modal>   
      </View>             
   )
}

export default ProductCard;

const styles = StyleSheet.create({
   cardTitle:{
      // marginHorizontal: 5,
      color: '#078bab',
      fontSize: 18,
   },
   texts: {
      color: '#078bab',
      fontWeight: 'normal',
      fontSize: 18
   },
   card: {
      padding: 15,
      
      flex: 1,
      // marginVertical: 5,
      margin: 5,   
     borderRadius: 20 
   },
   cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fafafa',
      borderRadius: 15,
   },
   cardInfo: {      
      marginLeft: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   detailModal: {
      position: 'relative',
      flex: 1,
      // borderRadius: 30,
      margin: 0,
      backgroundColor: '#fff',
   },
   buttonIcon: {   
      alignSelf: 'center',
      padding: 3, 
      backgroundColor: "#c7e6ff", 
      borderRadius: 50
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
      flex: 1,
      position: 'relative',    
   },
   texts: {
      color: '#078bab',
      fontSize: 20
   },
   modal3: {
      // flex: 1,
      justifyContent: 'flex-start',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 600,
      backgroundColor: '#fff',
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
  },
  button: {
     marginHorizontal: 5,
     borderRadius: 20,
     backgroundColor: '#e6f1fa',
     padding: 15,
     width: '40%',
     alignItems: 'center'
  },
    history: {
      padding: 5,
      alignItems: 'center',
      flexDirection: 'row', 
      position:'absolute', 
      bottom: 20, 
      left: 20, 
      backgroundColor: '#c7e6ff',
      borderRadius: 30
   }
})