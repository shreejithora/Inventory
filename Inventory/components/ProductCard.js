import React, {useState} from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  FlatList,  
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductInfo from "./ProductInfo";

const ProductsList = require('../models/Products.json');

const ProductCard = ({items}) => {

   const [productDetailModal, setProductDetailModal] = useState(false);

   return(
      <View>
         <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
            <TouchableOpacity onPress={() => setProductDetailModal(!productDetailModal)}>
               <View style={styles.cardContent}>  
                  <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'left'}]}>{items.product_id}</Text> 
                  <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left'}]}>{items.name}</Text>  
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.quantity}</Text>            
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.price}</Text>
               </View>         
            </TouchableOpacity>
            
         </Animatable.View>  
         <Modal 
            style={styles.detailModal}
            isVisible={productDetailModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutUp'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={300}
            animationInTiming={500}
            animationOutTiming={300}> 
            <View style={styles.modalView}>                         
               <ProductInfo item={items}/> 
               <View style={{alignSelf: 'flex-end', position: 'absolute', bottom: 20, right: 20 }}>
                  <Icon 
                     style={styles.buttonIcon}
                     name="close"
                     size={30}
                     color="#078bab"                                   
                     onPress={ () => setProductDetailModal(false)}
                  />
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
   card: {
      padding: 15,
      backgroundColor: '#fff',
      flex: 1,
      // marginVertical: 5,
      marginLeft: 5,
      marginRight: 5,   
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1,   
      
   },
   cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      borderRadius: 30,
      marginVertical: 100,
      backgroundColor: '#fff',
      marginHorizontal: 20,
   },
   buttonIcon: {   
      alignSelf: 'flex-end',
      padding: 3, 
      backgroundColor: "#c7e6ff", 
      borderRadius: 50
   },
   modalView: {
      flex: 1,
      position: 'relative',      
   },
})