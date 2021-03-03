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

   const handleCustomerIDChange = (val) => {

   }

   const handleCustomerNameChange = (val) => {

   }

   const handlePhoneChange = (val) => {
      
   }

   const handleAddressChange = (val) => {
      
   }

   const handleAddCustomer = () => {
      props.onAddCustomerModal(false)
      // props.onAddCustomer()

   }

   return (
      <ScrollView>
         <View style={styles.modalForm}>           
            <View style={styles.fields}>                         
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Customer ID</Text>
                  <TextInput
                     keyboardType='numeric'
                     style={styles.textInputs}
                     placeholder="Customer ID..." 
                     maxLength={10}
                     onChangeText={ (val) => handleCustomerIDChange(val)}
                     onEndEditing = { (e) => handleCustomerIDChange(e.nativeEvent.text)}
                  />                                     
               </View>  
               <View style={styles.inputs}>
                  <Text style={styles.texts}>Customer Name</Text>
                  <TextInput
                     style={styles.textInputs}
                     keyboardType="ascii-capable"
                     placeholder="Customer Name..." 
                     onChangeText={ (val) => handleCustomerNameChange(val)}
                     onEndEditing = { (e) => handleCustomerNameChange(e.nativeEvent.text)}
                  /> 
                  {/* {  
                     CustomerName.exists ?
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