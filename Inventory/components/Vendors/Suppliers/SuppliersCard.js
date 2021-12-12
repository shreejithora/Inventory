import React, {useState} from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import firestore from '@react-native-firebase/firestore';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SupplierInfo from "./SupplierInfo";
import UpdateSupplierInfo from './UpdateSupplierInfo';

const SuppliersCard = ({items}) => {

   const [state, setState] = useState({
      supplier_name: '',
      phone: '',
      email: '',
      address: '',      
   })

   const [supplierDetailModal, setSupplierDetailModal] = useState(false);

   const [updateSupplier, setUpdateSupplier] = useState(false)

   const [updateSupplierModal, setUpdateSupplierModal] = useState(false)

   const [updatingSupplier, setUpdatingSupplier] = useState(false)

   const [ deleteSupplierModal, setDeleteSupplierModal] = useState(false) 

   const handleDelete = async(id) => {
      setDeleteSupplierModal(false)
      try{
         await firestore()
            .collection('Suppliers')
            .doc(id)
            .delete()
            .then( () =>{
                  setSupplierDetailModal(false) 
                  Alert.alert('Deleted Successfully!', 'Supplier: '+items.supplier_name, [{text: 'Ok'}]);
            })
      } catch(e) {
         console.log(e)
      } 
   }

   const handleUpdateSupplier = (supplier_name, phone, email, address) => {
      setUpdateSupplierModal(true)
      setState({
         supplier_name: supplier_name,
         phone: phone,
         email: email,
         address: address
      })
   }

   const handleUpdate = async() => {
      setUpdateSupplierModal(false)
      setUpdateSupplier(true)
      try{
         await firestore()
            .collection('Suppliers')
            .doc(items.id)
            .update({
               supplier_name: state.supplier_name,
               phone: state.phone,
               email: state.email,
               address: state.address,
            })
            .then( () => {                                 
               setUpdateSupplier(false)    
               setSupplierDetailModal(false)
               Alert.alert('Supplier Updated', 'Supplier: '+state.supplier_name, [{text: 'Ok'}]);
            })
      } catch(e) {
         console.log(e)
      }
   }

   return(
      <View>
         <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
            <TouchableOpacity onPress={() => setSupplierDetailModal(!supplierDetailModal)}>
               <View style={styles.cardContent}>  
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 2,borderRightColor: '#078bab'}}>
                     <Icon                     
                        name="badge-account-outline" 
                        color="#078bab" 
                        size={35}
                     />                     
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
               {
                  updateSupplier ?
                  <UpdateSupplierInfo item={items} handleUpdateSuppliers={handleUpdateSupplier} updatingSupplier={updatingSupplier} /> :
                  <SupplierInfo item={items}/> 
               } 
               <View style={{flexDirection: 'row',justifyContent: 'space-between', bottom: 0, right: 0}}>
                     {/* <Animatable.View 
                        animation="fadeInLeft"
                        duration={1000}
                        style={styles.history}>    
                        <Icon                         
                           name="progress-clock" 
                           color="#078bab" 
                           size={20} 
                        />              
                        <Text style={[styles.cardTitle, {marginLeft: 5, fontWeight: '700', fontSize: 18}]}>View History</Text>
                     </Animatable.View> */}
                     {
                        updateSupplier ?
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
                                 onPress={ () => setUpdateSupplier(false)}
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
                                 onPress = {() => setDeleteSupplierModal(true)}
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
                                 onPress={()  => {setUpdateSupplier(true)}}
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
                     }                  
               </View>                                  
            </View>                                           
         </Modal>
         <Modal 
            style={styles.modal3}
            isVisible={deleteSupplierModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setDeleteSupplierModal(!deleteProductModal)}
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
                  onPress={ () => setDeleteSupplierModal(false)}
               />     
               <Text style={[styles.texts, {fontWeight: '700', marginVertical: 10}]}>Delete ?</Text>
               <View style={{flexDirection: 'row', marginTop: 15}}>
                  <TouchableOpacity style={styles.button} onPress={() => setDeleteSupplierModal(false)}>
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
            isVisible={updateSupplierModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setUpdateSupplierModal(false)}
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
                  onPress={ () => setUpdateSupplierModal(false)}
               />     
               <Text style={[styles.texts, {fontWeight: '700', marginVertical: 10}]}>Update ?</Text>
               <View style={{flexDirection: 'row', marginTop: 15}}>
                  <TouchableOpacity style={styles.button} onPress={() => setUpdateSupplierModal(false)}>
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

export default SuppliersCard;

const styles = StyleSheet.create({
   cardTitle:{
      // marginHorizontal: 5,
      color: '#078bab',
      fontSize: 18,
   },
   card: {
      paddingVertical: 10,
      backgroundColor: '#fafafa',
      flex: 1, 
      borderRadius: 50,
      marginHorizontal: 17
   },
   cardContent: {
      padding: 5,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // borderRadius: 15,
   },
   cardInfo: {      
      marginLeft: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   detailModal: {
      position: 'relative',
      flex: 1,
      backgroundColor: '#fff',
      margin: 0
   },
    button: {
     marginHorizontal: 5,
     borderRadius: 20,
     backgroundColor: '#e6f1fa',
     padding: 15,
     width: '40%',
     alignItems: 'center'
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
   buttonIcon1: {
      marginTop: 15, 
      padding: 3, 
      alignSelf: 'center', 
      backgroundColor: "#c7e6ff", 
      borderRadius: 50,
      marginBottom: 5
   },
   texts: {
      color: '#078bab',
      fontWeight: 'normal',
      fontSize: 18
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