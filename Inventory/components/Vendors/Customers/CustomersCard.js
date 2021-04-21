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
import CustomerInfo from "./CustomerInfo";
import UpdateCustomerInfo from './UpdateCustomerInfo';

const CustomersCard = ({items}) => {   

   const [state, setState] = useState({
      customer_name: '',
      phone: '',
      email: '',
      address: '',      
   })

   const [customerDetailModal, setCustomerDetailModal] = useState(false);

   const [updateCustomer, setUpdateCustomer] = useState(false)

   const [updateCustomerModal, setUpdateCustomerModal] = useState(false)

   const [updatingCustomer, setUpdatingCustomer] = useState(false)

   const [ deleteCustomerModal, setDeleteCustomerModal] = useState(false) 

   const [showAlert, setShowAlert] = useState(false)

   const handleDelete = async(id) => {
      setDeleteCustomerModal(false)
      try{
         await firestore()
            .collection('Customers')
            .doc(id)
            .delete()
            .then( () =>{
                  setCustomerDetailModal(false) 
                  Alert.alert('Deleted Successfully!', 'Customer: '+items.customer_name, [{text: 'Ok'}]);
            })
      } catch(e) {
         console.log(e)
      } 
   }

   const handleUpdateCustomer = (customer_name, phone, email, address) => {
      setUpdateCustomerModal(true)
      setState({
         customer_name: customer_name,
         phone: phone,
         email: email,
         address: address
      })
   }

   const handleUpdate = async() => {
      setUpdateCustomerModal(false)
      setUpdateCustomer(true)
      try{
         await firestore()
            .collection('Customers')
            .doc(items.id)
            .update({
               customer_name: state.customer_name,
               phone: state.phone,
               email: state.email,
               address: state.address,
            })
            .then( () => {                                 
               setUpdateCustomer(false)    
               setCustomerDetailModal(false)
               // setShowAlert(true)
               Alert.alert('Updated Successfully!', 'Customer: '+items.customer_name+'\n Phone: '+items.phone+'\n Email: '+items.email+'\n Address: '+items.address, [{text: 'Ok'}]);
            })
      } catch(e) {
         console.log(e)
      }
   }

   return(
      <View>
         <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
            <TouchableOpacity onPress={() => setCustomerDetailModal(!customerDetailModal)}>
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
                              {items.customer_name}
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
         {/* <AwesomeAlert
            show={showAlert}
            showProgress={false}
            message={`Customer Updated \n `+state.customer_name}
            messageStyle={styles.textStyle}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            contentContainerStyle={styles.alertStyle}
        /> */}
         <Modal 
            style={styles.detailModal}
            isVisible={customerDetailModal} 
            onBackButtonPress = {() => setCustomerDetailModal(!customerDetailModal)}
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutUp'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={300}
            animationInTiming={500}
            animationOutTiming={300}> 
            <View style={styles.modalView}>                         
               {
                  updateCustomer ?
                  <UpdateCustomerInfo item={items} handleUpdateCustomers={handleUpdateCustomer} updatingCustomer={updatingCustomer} /> :
                  <CustomerInfo item={items}/> 
               } 
               <View style={{flexDirection: 'row',justifyContent: 'space-between', bottom: 0, right: 0}}>
                     {
                        updateCustomer ?
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
                                 onPress={ () => setUpdateCustomer(false)}
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
                                 onPress = {() => setDeleteCustomerModal(true)}
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
                                 onPress={()  => {setUpdateCustomer(true)}}
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
                     }
               </View>                                  
            </View>                                           
         </Modal>

         <Modal 
            style={styles.modal3}
            isVisible={deleteCustomerModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setDeleteCustomerModal(!deleteProductModal)}
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
                  onPress={ () => setDeleteCustomerModal(false)}
               />     
               <Text style={[styles.texts, {fontWeight: '700', marginVertical: 10}]}>Delete ?</Text>
               <View style={{flexDirection: 'row', marginTop: 15}}>
                  <TouchableOpacity style={styles.button} onPress={() => setDeleteCustomerModal(false)}>
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
            isVisible={updateCustomerModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setUpdateCustomerModal(false)}
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
                  onPress={ () => setUpdateCustomerModal(false)}
               />     
               <Text style={[styles.texts, {fontWeight: '700', marginVertical: 10}]}>Update ?</Text>
               <View style={{flexDirection: 'row', marginTop: 15}}>
                  <TouchableOpacity style={styles.button} onPress={() => setUpdateCustomerModal(false)}>
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

export default CustomersCard;

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
   alertStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white', 
      height: 100,
      width: '80%',
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 7,
      color: 'red'
   },
   textStyle: {
      fontSize: 14,
      color: 'black',
      textAlign: 'center'
   }
})