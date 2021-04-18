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

const SalesCard = ({items}) => {

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

   const [soldProductDetailModal, setSoldProductDetailModal] = useState(false);

   const date = items.uploaded_at.toDate();

   // let profit = null;
   // if(items.discount == null){
   //    profit = (parseFloat(items.cost_price) - parseFloat(items.selling_price)) * parseInt(items.sold_quantity)
   // } else {
   //    profit = (parseFloat(items.cost_price) - ((parseFloat(items.discount)/100) * parseInt(items.cost_price) )) * parseInt(items.sold_quantity)
   // }

   return(
      <View>
         <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
            <TouchableOpacity onPress={() => setSoldProductDetailModal(!soldProductDetailModal)}>
               <View style={styles.cardContent}>  
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 2,borderRightColor: '#078bab'}}>
                     <Icon                     
                        name="cart-arrow-up" 
                        color="#078bab" 
                        size={35}
                     />                     
                  </View>
                  <View style={{flexDirection: 'column', flex: 4, marginLeft: 10, padding: 5}}> 
                        <View style={{marginBottom: 5}}>
                           <Text style={[styles.cardTitle, {flex: 3, textAlign: 'left', fontWeight: '700'}]}>
                              {items.customer}
                           </Text>                  
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>                             
                              <Text style={[styles.texts,{marginRight:10}]}>Rs. {numbering(items.grand_total)}</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={[styles.texts, {fontStyle: 'italic'}]}>{date.toDateString()}</Text>
                              
                        </View>
                     </View> 
               </View>         
            </TouchableOpacity>
         </Animatable.View>  
         <Modal 
            style={styles.detailModal}
            isVisible={soldProductDetailModal} 
            onBackButtonPress = {() => setSoldProductDetailModal(!soldProductDetailModal)}
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutUp'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={300}
            animationInTiming={500}
            animationOutTiming={300}> 
            <View style={styles.modalView}>                         
               <SalesInfo item={items}/>  
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
                           onPress={ () => setSoldProductDetailModal(false)}
                        />
                     </Animatable.View>
                  </View> 
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
      paddingVertical: 10,
      backgroundColor: '#fafafa',
      flex: 1,
      marginHorizontal: 17,
      marginTop:5
   },
   cardContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   detailModal: {
      position: 'relative',
      flex: 1,
      borderRadius: 30,
      backgroundColor: '#fafafa',
      margin:0
   },
   buttonIcon: {      
      padding: 3, 
      backgroundColor: "#c7e6ff", 
      borderRadius: 50
   },
   modalView: {
      flex: 1,     
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
   },
   texts:{
      fontSize:15,
      color:'#078bab'
   }
})