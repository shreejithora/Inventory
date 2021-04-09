import React, {useState, useEffect} from "react";
import {
   View, 
   Text, 
   StyleSheet, 
   TouchableOpacity, 
   TextInput,
   Alert,
   } from 'react-native';

import * as Animatable from 'react-native-animatable';

import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from "react-native-gesture-handler";

let CustomerCodes = [];

let CustomerNames = [];

const AddCustomer = (props) => {

   const [customer_code, setCustomer_code] = useState(2000.1)   

   useEffect(() =>{
      CustomerCodes = [];
      CustomerNames = [];
      const ok = async() => {         
         let size = 0;
         try{
            await firestore()
            .collection('Customers')
            .get()
            .then( querySnapshot => {
               size = querySnapshot.size
               querySnapshot.forEach( documentSnapshot => {
                  CustomerCodes.push(documentSnapshot.data().customer_code)  
                  CustomerNames.push(documentSnapshot.data().customer_name)
               })
            })
         } catch (e) {
            console.log(e)
         }                  
         if(size == 0){
            setCustomerCode({customer_code: customer_code})
         } else if( size == 1){            
            temp = customer_code + 0.1
            setCustomer_code(temp.toFixed(1))
            setCustomerCode({customer_code: temp.toFixed(1)})  
         } else {
            let temp = 0
            for(let i = 0; i<size; i++){
               for( let j = 0; j < size; j++){
                  if( CustomerCodes[i] > CustomerCodes[j]){
                     temp = CustomerCodes[i]
                     CustomerCodes[i] = CustomerCodes[j]
                     CustomerCodes[j] = temp
                  }                  
               }
            }
            temp = CustomerCodes[0] + 0.1
            setCustomer_code(temp.toFixed(1))
            setCustomerCode({customer_code: temp.toFixed(1)})  
         }                  
      }
      ok();
   }, []);

   const [ customerCode, setCustomerCode ] = useState({
      customer_code: ''
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

   const [ customerEmail, setCustomerEmail ] = useState({
      customer_email: '',
      isValidEmail: true
   })   

   const handleCustomerNameChange = (val) => {
      const foundCustomer = CustomerNames.filter( item => {     
         return item.toLowerCase() == val.toLowerCase()
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

   const handleEmailChange = (email) => {
      const regexEmail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      
      if( regexEmail.test(String(email).toLowerCase())){
         setCustomerEmail({
            customer_email: email,
            isValidEmail: true
         })
      } else {
         setCustomerEmail({
            customer_email: email,
            isValidEmail: false
         })
      }
   }

   const handleAddCustomer = async() => {
      if ( customerCode.customer_code != '' && customerName.customer_name != '' &&  customerAddress != '' && customerPhone.customer_phone != '' && customerEmail.customer_email != '' ) {      
         if ( customerName.isValidName ) {
            if ( customerPhone.isValidPhone ) {
               if ( customerEmail.isValidEmail ) {
                  try{
                  await firestore()
                     .collection('Customers')
                     .add({
                        customer_name: customerName.customer_name,
                        customer_code: Number(customerCode.customer_code),
                        address: customerAddress,
                        email: customerEmail.customer_email,
                        phone: customerPhone.customer_phone,
                        supply_status: true 
                     })
                     .then( () => {
                        props.stateChange(customerName.customer_name, customerCode.customer_code)
                     })
                  } catch(e) {
                     console.log(e)
                  }
               } else {
                  Alert.alert('Invalid Input!', 'The Customers Email ID is not Valid', [{text: 'Ok'}])
               }                  
            } else {
               Alert.alert('Invalid Input!', 'The Customers Phone Number is not Valid', [{text: 'Ok'}])
            }
         } else {
            Alert.alert('Invalid Input!', 'The Customers Name is not Valid', [{text: 'Ok'}])
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
                  <Text style={styles.texts}>Customer Code* : {customerCode.customer_code}</Text>
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
                <View style={styles.inputs}>
                  <Text style={styles.texts}>Email*</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="ascii-capable"
                     placeholder="Email...(eg. abc@gmail.com)" 
                     onChangeText={ (val) => handleEmailChange(val)}
                     onEndEditing = { (e) => handleEmailChange(e.nativeEvent.text)}
                  />   
                  {  
                     customerEmail.isValidEmail ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid Email 
                     </Animatable.Text>
                  }          
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
      color: '#078bab'
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