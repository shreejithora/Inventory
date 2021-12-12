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

let SuppliersCodes = [];

let SupplierNames = [];

const AddSupplier = (props) => {

   const [supplier_code, setSupplier_code] = useState(1000.1)   

   useEffect(() =>{
      SuppliersCodes = [];
      SupplierNames = [];
      const ok = async() => {         
         let size = 0;
         try{
            await firestore()
            .collection('Suppliers')
            .get()
            .then( querySnapshot => {
               size = querySnapshot.size
               querySnapshot.forEach( documentSnapshot => {
                  SuppliersCodes.push(documentSnapshot.data().supplier_code)                  
                  SupplierNames.push(documentSnapshot.data().supplier_name)
               })
            })
         } catch (e) {
            console.log(e)
         }
         
         let temp = 0
         for(let i = 0; i<size; i++){
            for( let j = 0; j < size; j++){
               if( SuppliersCodes[i] > SuppliersCodes[j])
               temp = SuppliersCodes[i]
               SuppliersCodes[i] = SuppliersCodes[j]
               SuppliersCodes[j] = temp
            }
         }
         if(size == 0){
            setSupplierCode({supplier_code: supplier_code})
         } else {
            temp = SuppliersCodes[0] + 0.1
            setSupplier_code(temp.toFixed(1))
            setSupplierCode({supplier_code: temp.toFixed(1)})
         }
      }
      ok();
   }, []);

   const [ supplierCode, setSupplierCode ] = useState({
      supplier_code: '',
   })
   const [ supplierName, setSupplierName ] = useState({
      supplier_name: '',
      isValidName: true
   })
   const [ supplierPhone, setSupplierPhone ] = useState({
      supplier_phone: '',
      isValidPhone: true
   })
   const [ supplierAddress, setSupplierAddress ] = useState('')

   const [ supplierEmail, setSupplierEmail ] = useState({
      supplier_email: '',
      isValidEmail: true
   })

   const handleSupplierNameChange = (val) => {     
      const foundSupplier = SupplierNames.filter( item => {     
         return item.toLowerCase() == val.toLowerCase()
      })
            
      setSupplierName({
         ...supplierName,
         supplier_name: val,
         isValidName: foundSupplier.length != 0 ? false : true
      })
   }

   const handlePhoneChange = (val) => {
      const regexWithValidPhone = /(\+\d{3})[-]\d{10}/
      if ( val.match(regexWithValidPhone)) {
         setSupplierPhone({
            ...supplierPhone,
            supplier_phone: val,
            isValidPhone: true
         })
      } else {
          setSupplierPhone({
            ...supplierPhone,
            supplier_phone: val,
            isValidPhone: false
         })
      }   
   }

   const handleAddressChange = (val) => {
      setSupplierAddress(val)
   }

   const handleEmailChange = (email) => {
      const regexEmail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      
      if( regexEmail.test(String(email).toLowerCase())){
         setSupplierEmail({
            supplier_email: email,
            isValidEmail: true
         })
      } else {
         setSupplierEmail({
            supplier_email: email,
            isValidEmail: false
         })
      }
   }

   const handleAddSupplier = async() => {
      if ( supplierCode.supplier_code != '' && supplierName.supplier_name != '' &&  supplierAddress != '' && supplierPhone.supplier_phone != '' && supplierEmail.supplier_email != '') {        
         if ( supplierName.isValidName ) {
            if ( supplierPhone.isValidPhone ) {
               if ( supplierEmail.isValidEmail ) {
                  try{
                  await firestore()
                     .collection('Suppliers')
                     .add({
                        supplier_name: supplierName.supplier_name,
                        supplier_code: Number(supplierCode.supplier_code),
                        address: supplierAddress,
                        email: supplierEmail.supplier_email,
                        phone: supplierPhone.supplier_phone,
                        supply_status: true 
                     })
                     .then( () => {
                        props.stateChange(supplierName.supplier_name, supplierCode.supplier_code)
                     })
                  } catch(e) {
                     console.log(e)
                  }
               } else {
                  Alert.alert('Invalid Input!', 'The Suppliers Email ID is not Valid', [{text: 'Ok'}])
               }                                                    
            } else {
               Alert.alert('Invalid Input!', 'The Suppliers Phone Number is not Valid', [{text: 'Ok'}])
            }
         } else {
            Alert.alert('Invalid Input!', 'The Suppliers Name is not Valid', [{text: 'Ok'}])
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
                  <Text style={styles.texts}>Supplier Name*</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="ascii-capable"
                     placeholder="Supplier Name..." 
                     onChangeText={ (val) => handleSupplierNameChange(val)}
                     onEndEditing = { (e) => handleSupplierNameChange(e.nativeEvent.text)}
                  /> 
                  {  
                     supplierName.isValidName ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Supplier name already exists
                     </Animatable.Text>
                  }                 
               </View>
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Supplier code* : {supplierCode.supplier_code}</Text>
               </View>
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Phone*</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="phone-pad"
                     placeholder="Phone...(eg: +977-0123456789)" 
                     onChangeText={ (val) => handlePhoneChange(val)}
                     onEndEditing = { (e) => handlePhoneChange(e.nativeEvent.text)}
                  /> 
                  {  
                     supplierPhone.isValidPhone ?
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
                     keyboardType="ascii-capable"
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
                     supplierEmail.isValidEmail ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid Email 
                     </Animatable.Text>
                  }          
               </View>
               <TouchableOpacity 
                  style={styles.button}
                  onPress={handleAddSupplier}
               >
                  <Icon name="account-plus" size={30} color='#fff' />
                  <Text style={[styles.texts,{color: '#fff', fontWeight: 'bold', marginLeft: 10}]}>Add Supplier </Text>
               </TouchableOpacity>                                
            </View> 
         </View>                                                
      </ScrollView>
   )
}

export default AddSupplier;

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