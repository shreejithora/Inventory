import React, {useState} from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SalesInfo from './SalesInfo';
const SalesList = require('../../models/Sales.json');

const SalesCard = ({items}) => {

   const [soldProductDetailModal, setSoldProductDetailModal] = useState(false);

   return(
      <View>
         <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
            <TouchableOpacity onPress={() => setSoldProductDetailModal(!soldProductDetailModal)}>
               <View style={styles.cardContent}>  
                  <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'left'}]}>{items.product_id}</Text> 
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.name}</Text>  
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.sold_quantity}</Text>            
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.price}</Text>
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.price * items.sold_quantity}</Text>
               </View>         
            </TouchableOpacity>
            
         </Animatable.View>  
         <Modal 
            style={styles.detailModal}
            isVisible={soldProductDetailModal} 
            onBackButtonPress = {() => setSoldProductDetailModal(!soldProductDetailModal)}
            onBackdropPress={() => setSoldProductDetailModal(!soldProductDetailModal)}
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutUp'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={300}
            animationInTiming={500}
            animationOutTiming={300}> 
            <View style={styles.modalView}>                         
               <SalesInfo item={items}/>                
               <View style={{alignSelf: 'flex-end', position: 'absolute', bottom: 20, right: 20 }}>
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
                        onPress={ () => setSoldProductDetailModal(false)}
                     />
                  </Animatable.View>
               </View>                                  
            </View>                                           
         </Modal>
      </View>             
   )
}

export default SalesCard;

const styles = StyleSheet.create({
   cardTitle:{
      color: '#078bab',
      fontSize: 18,
   },
   card: {
      padding: 10,
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
      alignItems: 'center'
   },
   detailModal: {
      position: 'relative',
      flex: 1,
      borderRadius: 30,
      marginVertical: 100,
      backgroundColor: '#e6f1fa',
      marginHorizontal: 20,
      bottom: 0
   },
   buttonIcon: {   
      alignSelf: 'flex-end',
      padding: 3, 
      backgroundColor: "#c7e6ff", 
      borderRadius: 50
   },
   modalView: {
      flex: 1,
      // position: 'relative',      
   },
})