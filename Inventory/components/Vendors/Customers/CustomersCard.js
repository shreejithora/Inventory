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
import CustomersInfo from './CustomerInfo';

const CustomersCard = ({items}) => {

   const [customerDetailModal, setCustomerDetailModal] = useState(false);

   return(
      <View>
         <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
            <TouchableOpacity onPress={() => setCustomerDetailModal(!customerDetailModal)}>
               <View style={styles.cardContent}>  
                  <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'left'}]}>{items.customer_id}</Text> 
                  <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left'}]}>{items.name}</Text> 
               </View>         
            </TouchableOpacity>
            
         </Animatable.View>  
         <Modal 
            style={styles.detailModal}
            isVisible={customerDetailModal} 
            onBackButtonPress = {() => setCustomerDetailModal(!customerDetailModal)}
            onBackdropPress={() => setCustomerDetailModal(!customerDetailModal)}
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutUp'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={300}
            animationInTiming={500}
            animationOutTiming={300}> 
            <View style={styles.modalView}>                         
               <CustomersInfo item={items}/> 
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
                           onPress={ () => setCustomerDetailModal(false)}
                        />
                     </Animatable.View>                  
                  </View>                                  
               </View>
            </View>                                           
         </Modal>
      </View>             
   )
}

export default CustomersCard;

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