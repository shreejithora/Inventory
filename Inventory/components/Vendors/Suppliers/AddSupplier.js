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

   const handleSupplierIDChange = (val) => {

   }

   const handleSupplierNameChange = (val) => {

   }

   const handlePhoneChange = (val) => {
      
   }

   const handleAddressChange = (val) => {
      
   }

   const handleAddSupplier = () => {
      props.onAddSupplier(false)
   }

   return (
      <ScrollView>
         <View style={styles.modalForm}>           
            <View style={styles.fields}>                         
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Supplier ID</Text>
                  <TextInput
                     keyboardType='numeric'
                     style={styles.textInputs}
                     placeholder="Supplier ID..." 
                     maxLength={10}
                     onChangeText={ (val) => handleSupplierIDChange(val)}
                     onEndEditing = { (e) => handleSupplierIDChange(e.nativeEvent.text)}
                  />                                     
               </View>  
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Supplier Name</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="ascii-capable"
                     placeholder="Supplier Name..." 
                     onChangeText={ (val) => handleSupplierNameChange(val)}
                     onEndEditing = { (e) => handleSupplierNameChange(e.nativeEvent.text)}
                  /> 
                  {/* {  
                     SupplierName.exists ?
                     <Animatable.Text 
                        animation="fadeIn"
                        style={styles.errMsg}>Product name already exists
                     </Animatable.Text> :
                     null
                  }                  */}
               </View>
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Phone</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="numeric"
                     placeholder="Phone..." 
                     onChangeText={ (val) => handlePhoneChange(val)}
                     onEndEditing = { (e) => handlePhoneChange(e.nativeEvent.text)}
                  />               
               </View> 
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Address</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="numeric"
                     placeholder="Address..." 
                     onChangeText={ (val) => handleAddressChange(val)}
                     onEndEditing = { (e) => handleAddressChange(e.nativeEvent.text)}
                  />             
               </View>   
               <TouchableOpacity 
                  style={styles.button}
                  onPress={ () => handleAddSupplier()}
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