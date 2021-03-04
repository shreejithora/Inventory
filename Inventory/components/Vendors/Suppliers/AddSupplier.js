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

const SuppliersList = require('../../../models/Suppliers.json');

const AddSupplier = (props) => {

   const [ supplierID, setSupplierID ] = useState({
      supplier_id: '',
      isValidId: true,
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

   const handleSupplierIDChange = (val) => {
      const foundSupplier = SuppliersList.filter( item => {
         return item.supplier_id == val;
      })

      if( foundSupplier.length != 0 || /\D/.test(val) ){        
         setSupplierID({
            ...supplierID,
            supplier_id: val,
            isValidId: false,
         })    
      } else {
         setSupplierID({
            ...supplierID,
            supplier_id: val,
            isValidId: true      
         })
      }
   }

   const handleSupplierNameChange = (val) => {
      const foundSupplier = SuppliersList.filter( item => {
         return item.name.toLowerCase() == val.toLowerCase();
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

   const handleAddSupplier = () => {
      if ( supplierID.supplier_id != '' && supplierName.supplier_name != '' &&  supplierAddress != '' && supplierPhone.supplier_phone != '' ) {
         if( supplierID.isValidId ) {
            if ( supplierName.isValidName ) {
               if ( supplierPhone.isValidPhone ) {
                  Alert.alert('Added Successfully!', 'Supplier '+supplierName.supplier_name+' with ID: '+supplierID.supplier_id, [{text: 'Ok'}])
                  props.onAddSupplier(false)                  
               } else {
                  Alert.alert('Invalid Input!', 'The Suppliers Phone Number is not Valid', [{text: 'Ok'}])
               }
            } else {
               Alert.alert('Invalid Input!', 'The Suppliers Name is not Valid', [{text: 'Ok'}])
            }
         } else {
            Alert.alert('Invalid Input!', 'The Suppliers ID is not Valid', [{text: 'Ok'}])
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
                  <Text style={styles.texts}>Supplier ID*</Text>
                  <TextInput
                     keyboardType='numeric'
                     style={styles.textInputs}
                     placeholder="Supplier ID...(eg: 1012)" 
                     maxLength={10}
                     onChangeText={ (val) => handleSupplierIDChange(val)}
                     onEndEditing = { (e) => handleSupplierIDChange(e.nativeEvent.text)}
                  />   
                  {
                     supplierID.isValidId ?
                     null :
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Invalid ID or Supplier ID already exists
                     </Animatable.Text>
                  }                                  
               </View>  
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