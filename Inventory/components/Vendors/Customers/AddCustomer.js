import React, {useState} from "react";
import {
   View, 
   Text, 
   StyleSheet, 
   TouchableOpacity, 
   TextInput,
   Alert,
   } from 'react-native';

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from "react-native-gesture-handler";

const CustomersList = require('../../../models/Customers.json');

const AddCustomer = (props) => {

   const [ customerID, setCustomerID ] = useState({
      customer_id: '',
      isValidId: true,
   })
   const [ customerName, setCustomerName ] = useState({
      customer_name: '',
      isValidName: true
   })
   const [ customerPhone, setCustomerPhone ] = useState({
      customer_phone: '',
      isValidPhone: true
   })
   const [ customerAddress, setCustomerAddress ] = useState('')


   const handleCustomerIDChange = (val) => {
      const foundCustomer = CustomersList.filter( item => {
         return item.customer_id == val;
      })

      if( foundCustomer.length != 0 || /\D/.test(val) ){        
         setCustomerID({
            ...customerID,
            customer_id: val,
            isValidId: false,
         })    
      } else {
         setCustomerID({
            ...customerID,
            customer_id: val,
            isValidId: true      
         })
      }
   }

   const handleCustomerNameChange = (val) => {
      const foundCustomer = CustomersList.filter( item => {
         return item.name.toLowerCase() == val.toLowerCase();
      })

      setCustomerName({
         ...customerName,
         customer_name: val,
         isValidName: foundCustomer.length != 0 ? false : true
      })
   }

   const handlePhoneChange = (val) => {
      const regexWithValidPhone = /(\+\d{3})[-]\d{10}/
      if ( val.match(regexWithValidPhone)) {
         setCustomerPhone({
            ...customerPhone,
            customer_phone: val,
            isValidPhone: true
         })
      } else {
          setCustomerPhone({
            ...customerPhone,
            customer_phone: val,
            isValidPhone: false
         })
      }
   }

   const handleAddressChange = (val) => {
      setCustomerAddress(val)
   }

   const handleAddCustomer = () => {
      if ( customerID.customer_id != '' && customerName.customer_name != '' &&  customerAddress != '' && customerPhone.customer_phone != '' ) {
         if( customerID.isValidId ) {
            if ( customerName.isValidName ) {
               if ( customerPhone.isValidPhone ) {
                  Alert.alert('Added Successfully!', 'Customer '+customerName.customer_name+' with ID: '+customerID.customer_id, [{text: 'Ok'}])
                  props.onAddCustomerModal(false)                  
               } else {
                  Alert.alert('Invalid Input!', 'The Customers Phone Number is not Valid', [{text: 'Ok'}])
               }
            } else {
               Alert.alert('Invalid Input!', 'The Customers Name is not Valid', [{text: 'Ok'}])
            }
         } else {
            Alert.alert('Invalid Input!', 'The Customers ID is not Valid', [{text: 'Ok'}])
         }
      } else {
         Alert.alert('Invalid Input!', 'All Fields Should be filled Compulsorily.', [{text: 'Ok'}])
      }
   }

   return (
      <ScrollView>
         <View style={styles.modalForm}>           
            <View style={styles.fields}>                         
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Customer ID*</Text>
                  <TextInput
                     keyboardType='numeric'
                     style={styles.textInputs}
                     placeholder="Customer ID...(eg: 1012)" 
                     maxLength={10}
                     onChangeText={ (val) => handleCustomerIDChange(val)}
                     onEndEditing = { (e) => handleCustomerIDChange(e.nativeEvent.text)}
                  />        
                  {
                     customerID.isValidId ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid ID or Customer ID already exists
                     </Animatable.Text>
                  }                              
               </View>  
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Customer Name*</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="ascii-capable"
                     placeholder="Customer Name..." 
                     onChangeText={ (val) => handleCustomerNameChange(val)}
                     onEndEditing = { (e) => handleCustomerNameChange(e.nativeEvent.text)}
                  /> 
                  {  
                     customerName.isValidName ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Customer name already exists
                     </Animatable.Text>
                  }
               </View>
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Phone*</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType='phone-pad'
                     placeholder="Phone...(eg: +977-0123456789)" 
                     onChangeText={ (val) => handlePhoneChange(val)}
                     onEndEditing = { (e) => handlePhoneChange(e.nativeEvent.text)}
                  />      
                  {  
                     customerPhone.isValidPhone ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid Phone Number
                     </Animatable.Text>
                  }                 
               </View> 
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Address*</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType='ascii-capable'
                     placeholder="Address..." 
                     onChangeText={ (val) => handleAddressChange(val)}
                     onEndEditing = { (e) => handleAddressChange(e.nativeEvent.text)}
                  />             
               </View>   
               <TouchableOpacity 
                  style={styles.button}
                  onPress={ () => handleAddCustomer()}
               >
                  <Icon name="account-plus" size={30} color='#fff' />
                  <Text style={[styles.texts,{color: '#fff', fontWeight: 'bold', marginLeft: 5}]}>Add Customer </Text>
               </TouchableOpacity>                                
            </View> 
         </View>                                                
      </ScrollView>
   )
}

export default AddCustomer;

const styles = StyleSheet.create({
   modalForm: {
      padding: 15
   },
   modalText: {   
      marginTop: 50,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#065ba1',
      textAlign: 'center'
   },
   fields: {
      margin: 20,
      flexDirection: 'column'
   }, 
   inputs: {
      flexDirection: 'column',
      paddingHorizontal: 15,
      paddingVertical: 10
   },
   texts: {
      fontSize: 20,
      color: '#065ba1'
   },
   textInputs: {
      height: 40,
      borderRadius: 5,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      marginTop: 5,
   },  
   button: {
      flexDirection: 'row',
      backgroundColor: '#078bab',
      margin: 20,
      marginBottom: 10,
      padding: 15,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center'
   },
   errMsg: {
      color: 'red',
      fontSize: 12
   },
})