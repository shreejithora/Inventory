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

   const [soldProductDetailModal, setSoldProductDetailModal] = useState(false);

   return(
      <View>
         <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
            <TouchableOpacity onPress={() => setSoldProductDetailModal(!soldProductDetailModal)}>
               <View style={styles.cardContent}>  
                  {/* <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'left'}]}>{items.product_id}</Text> 
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>
                     {items.name.length > 6 ? items.name.slice(0,6)+'...' : items.name}
                  </Text>  
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.sold_quantity}</Text>            
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.price}</Text>
                  <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.price * items.sold_quantity}</Text> */}
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 2,borderRightColor: '#078bab'}}>
                     {/* <Icon                     
                        name="badge-account-outline" 
                        color="#078bab" 
                        size={35}
                     />                      */}
                   <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'left'}]}>{items.product_id}</Text> 
                  </View>
                  <View style={{flexDirection: 'column', flex: 4, marginLeft: 10, padding: 5}}> 
                        <View style={{marginBottom: 5}}>
                           <Text style={[styles.cardTitle, {flex: 3, textAlign: 'left', fontWeight: '700'}]}>
                              {items.supplier_name}
                           </Text>                  
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center'}}>
                           <Icon
                              name="email-outline"
                              size={18}
                              color='#078bab'
                           />
                           <Text style={{fontStyle:'italic',fontSize:15,color:'#078bab', marginLeft: 5}} >{items.email}</Text>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center'}}>
                           <Icon
                              name="home-outline"
                              size={18}
                              color='#078bab'
                           />
                           <Text style={{fontStyle:'italic',fontSize:15,color:'#078bab', marginLeft: 5}} >{items.address}</Text>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center'}}>
                           <Icon
                              name="phone-outline"
                              size={18}
                              color='#078bab'
                           />
                           <Text style={{fontStyle:'italic',fontSize:15,color:'#078bab', marginLeft: 5}} >{items.phone}</Text>
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
      padding: 10,
      backgroundColor: '#fafafa',
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
      backgroundColor: '#fafafa',
      marginHorizontal: 20,
      bottom: 0
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
   }
})