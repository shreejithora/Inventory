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
import SupplierInfo from "./SupplierInfo";

const SuppliersCard = ({items}) => {

   const [supplierDetailModal, setSupplierDetailModal] = useState(false);

   return(
      <View>
         <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
            <TouchableOpacity onPress={() => setSupplierDetailModal(!supplierDetailModal)}>
               <View style={styles.cardContent}>  
               <View style={{flex: 1}}>
                     <Icon
                          name="account" 
                          color="#078bab" 
                          size={30}
                     />                     
                  </View>
               <View style={{flexDirection: 'column', flex: 4, marginRight: 10}}> 
                        <View>
                        <Text style={[styles.cardTitle, {flex: 3, textAlign: 'left'}]}>
                           { items.name}
                  </Text>                  
                        </View>
                        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                           <Text style={{fontStyle:'italic',fontSize:15,color:'#078bab'}} >
                                 <Icon
                                       name="email"
                                       size={20}
                                       color='#078bab'
                                 />
                                 {items.email}
                           </Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontStyle:'italic',fontSize:15,color:'#078bab'}} >
                                 <Icon
                                       name="map-marker-radius"
                                       size={20}
                                       color='#078bab'
                                 />
                                 {items.address}
                           </Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                           <Text style={{fontStyle:'italic',fontSize:15,color:'#078bab',fontWeight:'700'}} >
                                 <Icon
                                       name="phone"
                                       size={20}
                                       color='#078bab'
                                 />
                                 {items.phone}
                           </Text>
                        </View>
                     </View> 
               </View>         
            </TouchableOpacity>
            
         </Animatable.View>  
         <Modal 
            style={styles.detailModal}
            isVisible={supplierDetailModal} 
            onBackButtonPress = {() => setSupplierDetailModal(!supplierDetailModal)}
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutUp'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={300}
            animationInTiming={500}
            animationOutTiming={300}> 
            <View style={styles.modalView}>                         
               <SupplierInfo item={items}/> 
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
                           onPress={()  => {}}
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
                           onPress={ () => setSupplierDetailModal(false)}
                        />
                     </Animatable.View>                  
                  </View>
               </View>                                  
            </View>                                           
         </Modal>
      </View>             
   )
}

export default SuppliersCard;

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
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1,   
      
   },
   cardContent: {
      flex: 1,
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