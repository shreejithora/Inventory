import React, {useState, useEffect} from "react";

import { 
   Text,
   View,
   StyleSheet, 
   Image,
   ActivityIndicator,
   FlatList,
   TextInput,
   TouchableOpacity,
   Alert
} from "react-native";


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from "react-native-animatable";
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from "react-native-gesture-handler";
import { cos } from "react-native-reanimated";

let SuppliersList = [];

const UpdateSupplierInfo = ({item, handleUpdateSuppliers, updatingProducts}) => {  

   const [supplier_name, setSupplierName] = useState({
      supplier_name: '',
      isValidSupplier: true
   })
   const [phone, setPhone] = useState({
      phone: '',
      isValidPhone: true
   });
   const [email, setEmail] = useState({
      email: '',
      isvalidEmail: true
   })
   const [address, setAddress] = useState('')
   const [status, setStatus] = useState(null)   

    useEffect( () => {
      setSupplierName({
         supplier_name: item.supplier_name,
         isValidSupplier: true
      })
      setPhone({
         phone: item.phone,
         isValidPhone: true
      })
      setEmail({
         email: item.email,
         isValidEmail: true
      })
      setAddress(item.address)
      setStatus(item.status)    

      setTimeout( async() => {
         try{
            SuppliersList = [];
            await firestore()
               .collection('Suppliers')
               .get()
               .then( querySnapshot => {
                  querySnapshot.forEach( documentSnapshot => {                   
                     SuppliersList.push(documentSnapshot.data().supplier_name);
                  })                  
               })          
         } catch(e) {
            console.log(e);
         }
      }, 1000)
   }, []);
   
   const handleSupplierNameChange = (val) => {     
      const foundSupplier = SuppliersList.filter( item => {     
         return item.toLowerCase() == val.toLowerCase()
      })

      if( foundSupplier.length == 0  || val.toLowerCase() == item.supplier_name.toLowerCase()){
         setSupplierName({
            ...supplier_name,
            supplier_name: val,
            isValidSupplier: true
         })
      } else {
          setSupplierName({
            ...supplier_name,
            supplier_name: val,
            isValidSupplier: false
         })
      }            
   }

   const handlePhoneChange = (val) => {
      const regexWithValidPhone = /(\+\d{3})[-]\d{10}/
      if ( val.match(regexWithValidPhone)) {
         setPhone({
            ...phone,
            phone: val,
            isValidPhone: true
         })
      } else {
          setPhone({
            ...phone,
            phone: val,
            isValidPhone: false
         })
      }   
   }

   const handleEmailChange = (email) => {
      const regexEmail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      
      if( regexEmail.test(String(email).toLowerCase())){
         setEmail({
            email: email,
            isValidEmail: true
         })
      } else {
         setEmail({
            email: email,
            isValidEmail: false
         })
      }
   }

   const handleUpdateSupplier = () => {
      if ( supplier_name.supplier_name != '' && phone.phone != '' && email.email != '' && address != ''){
         if ( supplier_name.isValidSupplier ) {
            if ( phone.isValidPhone ) {
               if(  email.isValidEmail ) {                  
                  handleUpdateSuppliers(supplier_name.supplier_name, phone.phone, email.email, address)                                       
               } else {
                  Alert.alert('Invalid Input!','Please enter a Valid Email', [{text: 'Ok'}]);                  
               }
            } else {
               Alert.alert('Invalid input', 'Please enter a Valid Phone Number', [{text: 'Ok'}]);
            }
         } else {
            Alert.alert('Invalid input', 'Please enter a Valid Supplier Name', [{text: 'Ok'}]);
         }        
      } else {
         Alert.alert('Invalid input', 'All fields should filled.', [{text: 'Ok'}]);
      }
   }      

   return(
      <View  style={styles.productInfo}>
         <View style={styles.productDesc}>
            {  
               supplier_name.isValidSupplier ?
               null :
               <Animatable.Text 
                  animation="fadeIn"
                  style={styles.errMsg}>Such Supplier already exists.</Animatable.Text> 
            }
            {  
               phone.isValidPhone ?
               null :
               <Animatable.Text 
                  animation="fadeIn"
                  style={styles.errMsg}>Invalid Phone Number</Animatable.Text> 
            }   
            {  
               email.isValidEmail ?
               null :
               <Animatable.Text 
                  animation="fadeIn"
                  style={styles.errMsg}>Invalid Email</Animatable.Text> 
            }                
            <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Supplier Code: {item.supplier_code}</Text></Text>   
            <View style={{flexDirection: 'row'}}>
               <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>*Supplier:</Text> </Text>
               <TextInput
                  value={supplier_name.supplier_name}
                  style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                  keyboardType="ascii-capable"  
                  onChangeText={ (text) => handleSupplierNameChange(text)}    
                  onEndEditing = { (e) => handleSupplierNameChange(e.nativeEvent.text)}        
               />
            </View>

            <View style={styles.infoPrice}>
               <View style={{flexDirection: 'row', marginVertical: 1}}>
                  <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>*Phone:</Text> </Text>
                  <TextInput
                     value={phone.phone}
                     placeholder="eg... +977-0123456789"
                     style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                     keyboardType= "phone-pad" 
                     onChangeText={ val =>  handlePhoneChange(val)}            
                  />
               </View>
            </View>
            <View style={styles.infoPrice}>
               <View style={{flexDirection: 'row', marginVertical: 1}}>
                  <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>*Email:</Text> </Text>
                  <TextInput
                     value={email.email}
                     style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                     keyboardType="ascii-capable"  
                     onChangeText={ val => handleEmailChange(val)}            
                  />
               </View>
            </View>

            <View style={styles.infoPrice}>
               <View style={{flexDirection: 'row', marginVertical: 1}}>
                  <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>*Address:</Text> </Text>
                  <TextInput
                     value={address}
                     style={{borderBottomWidth: 1, borderColor: 'grey', borderRadius: 10,height: 35}}
                     keyboardType="ascii-capable"  
                     onChangeText={ val => setAddress(val)}            
                  />
               </View>
            </View>                     
         </View>         
         
         <TouchableOpacity 
            style={styles.button1}
            onPress={() => handleUpdateSupplier()}
         >
            <Icon name="check" size={20} color='#078bab' />
            <Text style={[styles.texts,{color: '#078bab', fontWeight: 'bold', marginLeft: 5, fontSize: 15}]}>Update Supplier</Text>
            {/* {
               updatingProducts ?
               <ActivityIndicator size="small" color="#078bab" />:
               null
            } */}
         </TouchableOpacity>               
      </View> 
   )
}

export default UpdateSupplierInfo;

const styles = StyleSheet.create({
   productInfo: {
      flex: 1,
      padding: 10,
   },
   productDesc:{
      backgroundColor:'#e6f1fa',
      borderRadius: 15
   },
   desc:{
      backgroundColor:'#e6f1fa',
      marginTop:10,
      borderRadius:15
   },
   infoTexts: {
      padding: 5,
      textAlign: 'left',
      fontSize: 18,
      color: '#078bab'
   },
   infoPrice:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginRight:25
   },
   barcode: {
      marginTop: 15,
      height: 70,
      width: 100,
      alignSelf: 'center'
   },
   SuppliersList: {
      flexDirection: 'row',
      marginVertical: 2,
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,      
      borderColor: '#078bab',
      backgroundColor: '#fafafa'
   },
   modal: {
      marginTop: 200,
      justifyContent: 'flex-end'
   },
   button1: {
      marginTop: 10,
      alignSelf: 'flex-end',
      flexDirection: 'row',
      backgroundColor: '#fafafa',
      // margin: 20,
      marginRight: 20,
      padding: 10,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center'
   },
   button: {
     marginHorizontal: 5,
     borderRadius: 20,
     backgroundColor: '#e6f1fa',
     padding: 15,
     width: '40%',
     alignItems: 'center'
  },
   buttonIcon1: {
      marginTop: 15, 
      padding: 3, 
      alignSelf: 'center', 
      backgroundColor: "#c7e6ff", 
      borderRadius: 50,
      marginBottom: 5
   },
   modalView: {
      // flex: 1,
      // position: 'relative',    
   },
   texts: {
      fontSize: 20,
      color: '#078bab'
   },
   texts1: {
      color: '#078bab',
      fontWeight: 'normal',
      fontSize: 18
   },
   modal3: {
      flex: 1,
      justifyContent: 'flex-start',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 600,
      backgroundColor: '#fff',
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
  },
   errMsg: {
      color: 'red',
      fontSize: 12
   },
})