import React, {useState} from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductInfo from "./ProductInfo";

const ProductsList = require('../../models/Products.json');

const ProductCard = ({items}) => {

   const [productDetailModal, setProductDetailModal] = useState(false);

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
                        <Text style={styles.texts}>{items.name} <Text style={[styles.texts, {fontSize: 15, color: '#39bcdb', fontStyle: 'italic'}]}>( {items.category} )</Text></Text>                     
                     </View>
                     <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text 
                           style={[styles.texts, 
                              {
                                 fontStyle: 'italic', 
                                 fontSize: 16, 
                                 color: items.quantity <= 50 ? 'red' : 'green'
                              }]}>
                              Stocks: {items.quantity}  
                           <Icon 
                              name={ items.quantity <= 50 ? "arrow-down" : "arrow-up"} 
                              color={items.quantity <= 50 ? "red" : "green"}
                              size={15}
                           />
                           {
                              items.quantity <= 50 ?
                              <View style={{paddingHorizontal: 5, borderRadius: 20, backgroundColor: 'red'}}>
                                 <Text style={[styles.texts, {fontStyle: 'italic', color: '#fff', fontSize: 12, fontWeight: '700'}]}>Low</Text>
                              </View> :
                              null
                           }
                           </Text>
                        <Text style={[styles.texts, {fontWeight: '700'}]}>Rs. {items.price}</Text>
                     </View>
                  </View> 
                  {/* <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'left'}]}>{items.product_id}</Text> 
                  <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left'}]}>
                     {items.name.length > 12 ? items.name.slice(0,11)+'...' : items.name}
                  </Text>  
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.quantity}</Text>            
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.price}</Text> */}
               </View>         
            </TouchableOpacity>
            
         </Animatable.View>  
         <Modal 
            style={styles.detailModal}
            isVisible={productDetailModal} 
            onBackButtonPress = {() => setProductDetailModal(!productDetailModal)}
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutUp'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={300}
            animationInTiming={500}
            animationOutTiming={300}> 
            <View style={styles.modalView}>                         
               <ProductInfo item={items}/> 
               <View style={{flexDirection: 'row',justifyContent: 'space-between', bottom: 0, right: 0}}>
                     <Animatable.View 
                        animation="fadeInLeft"
                        duration={1000}
                        style={styles.history}>    
                        <Icon                         
                           name="progress-clock" 
                           color="#078bab" 
                           size={20} 
                        />              
                        <Text style={[styles.cardTitle, {marginLeft: 5, fontWeight: '700', fontSize: 18}]}>View History</Text>
                     </Animatable.View>
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