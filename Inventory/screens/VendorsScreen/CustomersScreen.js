import React, { useState, useEffect } from 'react';
import { 
   Text, 
   View, 
   TextInput,
   TouchableOpacity, 
   StyleSheet,
   FlatList,
   RefreshControl
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomersCard from "../../components/Vendors/Customers/CustomersCard";
import Modal from "react-native-modal";

import AddCustomer from '../../components/Vendors/Customers/AddCustomer';
let CustomersList = [];

const CustomersScreen = ({navigation}) => {

   const [addCustomerModal, setAddCustomerModal] = useState(false);   

   const [customerAddedModal, setCustomerAddedModal] = useState(false)

   const [refreshing, setRefreshing] = useState(false)

   const [stateChange, setStateChange] = useState({
      customer_name: '',
      customer_code: ''
   })

   useEffect( () => {      
      const ok = async() => {
         CustomersList = [];
         await firestore()
            .collection('Customers')
            .get()
            .then( querySnapshot => {
               querySnapshot.forEach( documentSnapshot => {
                  CustomersList.push(documentSnapshot.data())
               })
            })
         setCustomersData({
            allCustomers: CustomersList,
            filteredCustomers: CustomersList
         })
      }
      ok();
   }, [])

   const [customersData, setCustomersData] = useState({
      allCustomers: CustomersList,
      filteredCustomers: CustomersList
   })

   const handleSearchText = textToSearch => {
      const foundCustomer = CustomersList.filter( item => {
         return ( 
            item.customer_id.toLowerCase().includes(textToSearch.toLowerCase()) || 
            item.name.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.phone.toLowerCase().includes(textToSearch.toLowerCase())  ||
            item.address.toLowerCase().includes(textToSearch.toLowerCase())             
         )
      })
      
      setCustomersData({
         ...customersData,
         filteredCustomers: foundCustomer.length == 0 ? null : foundCustomer         
      })      
   }

   const handleStateChange = (name, code) => {
      setAddCustomerModal(false)
      setCustomerAddedModal(true)
      setStateChange({
         customer_name: name,
         customer_code: code
      })
   }

    const onRefresh = React.useCallback( async() => {
      setRefreshing(true);
      CustomersList = [];
      try{         
         await firestore()
            .collection('Customers')
            .get()
            .then( querySnapshot => {
               querySnapshot.forEach( documentSnapshot => {                  
                  CustomersList.push(documentSnapshot.data());   
               });       
               setRefreshing(false) 
               setCustomersData({
                  allCustomers: CustomersList,
                  filteredCustomers: CustomersList
               })          
            });          
      } catch(e) {
         console.log(e)
      }
   }, [refreshing]);


   return(
      <View style={styles.container}>
         <View style={styles.mainActitivity}>          
            <View style={styles.searchBar}>
               <Icon style={{marginLeft: 10}} name="text-box-search-outline" size={20} color="#078bab" />
               
               <TextInput style={{flex: 1, marginLeft: 5, color: '#000'}} 
                  placeholder="Search" 
                  onChangeText={ (val) => handleSearchText(val)} 
               />            
            </View>                                    
            { 
               customersData.filteredCustomers == null ?
               <View opacity={0.5} style={[styles.errorDisplay, {fontSize: 16}]}>
                  <Icon name="clipboard-alert-outline" size={30} color='#078bab'/>
                  <Text style={styles.errorMsg}>No Match Found</Text>  
                                 
               </View> :
               <Animatable.View 
                animation="fadeInUpBig"
                duration={800}
                style={{flex: 1,backgroundColor: '#fafafa', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 20}}>
                  <FlatList 
                     data = {customersData.filteredCustomers}
                     keyExtractor = {item => item.customer_code.toString()}
                     renderItem = { ({item}) =>                  
                        <CustomersCard items={item}/>                                           
                     }
                     refreshControl={
                           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                     }
                  />
                  
                   {/* <FlatList
                     bounces={false}
                     getItemLayout={(data, index) => (
                           { length: width, offset: width * index, index }
                     )}
                     showsHorizontalScrollIndicator={false}
                     pagingEnabled={true}
                     horizontal={true}
                     style={{ flex: 1 }}
                     data={customersData.filteredCustomers}
                     keyExtractor = {item => item.customer_code.toString()}
                     renderItem = { ({item}) =>                  
                        <CustomersCard items={item}/>                                           
                     }
                     refreshControl={
                           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                     }
                  /> */}
               </Animatable.View>
            }           
         </View>      
         <TouchableOpacity          
            style={{position: 'absolute', bottom: 25, right: 25,}}
            onPress={() => setAddCustomerModal(true) }
         >            
            <Icon name="plus" size={30} color='#e6f1fa' style={styles.icon}/>              
         </TouchableOpacity>  
         <Modal 
            style={styles.modal}
            isVisible={addCustomerModal} 
            onBackButtonPress = {() => setAddCustomerModal(!addCustomerModal)}
            onBackdropPress={() => setAddCustomerModal(!addCustomerModal)}
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            animationInTiming={500}
            animationOutTiming={500}>       
            <Icon 
               style={styles.buttonIcon}
               name="close"
               size={30}
               color="#078bab"                                   
               onPress={ () => setAddCustomerModal(false)}
            />   
            <AddCustomer onAddCustomerModal={setAddCustomerModal} stateChange={handleStateChange}/>                                          
         </Modal>                
         <Modal 
            style={styles.modal1}
            isVisible={customerAddedModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setCustomerAddedModal(false)}
            onBackdropPress = {() => setCustomerAddedModal(false)}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            animationInTiming={500}
            animationOutTiming={500}> 
               
            <View style={styles.modalView}>                        
               <View style={styles.confirmModal}>
                  <Text style={styles.texts}>
                     <Icon name="text-box-check" size={25} color="green"/>
                     <Text style={{marginLeft: 5, fontWeight: '700'}}>Added Successfully !</Text>
                  </Text>
                  <View style={{marginTop: 10}}>
                     <Text style={styles.texts}>Code: {stateChange.customer_code}</Text>
                     <Text style={styles.texts}>Name: {stateChange.customer_name}</Text>
                  </View>
               </View>                                                                
               <Icon 
                  style={styles.buttonIcon}
                  name="close"
                  size={30}
                  color="#078bab"                                   
                  onPress={ () => setCustomerAddedModal(false)}
               /> 
            </View>                                           
         </Modal>      
      </View>    
   )
}

export default CustomersScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   navigate: {
      marginRight: 5,
      marginTop: 5,
      padding: 5,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
   }, 
   mainActitivity: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#e6f1fa',
      justifyContent: 'center',
   },
   activityView: {
      borderRadius: 15,
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '90%',
      shadowColor: "#000",
      shadowOffset: {
         width:  2,
         height: 3,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,

      elevation: 7,
   },
   cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginTop: 10
   },
   cardTitle:{
      // marginHorizontal: 5,
      color: '#078bab',
      fontSize: 18,
   },
   searchBar: {
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      borderColor: '#078bab',
      borderWidth: 1,
      borderRadius: 50,
      height: 40      
   },
   activityTopicText: {
      fontSize: 20,
      fontWeight: '700'
   },
   icon: {
      padding: 20,      
      backgroundColor: '#078bab', 
      borderRadius: 50 ,
      shadowColor: "#000",
      shadowOffset: {
         width:  2,
         height: 3,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,

      elevation: 12,
   },
   modal: {
      flex: 1,
      justifyContent: 'flex-start',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 100,
      backgroundColor: '#fff',
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
  },
    modal1: {
      flex: 1,
      justifyContent: 'flex-start',
      borderRadius: 10,
      marginVertical: 320,
      backgroundColor: '#fff',   
      marginLeft: 50,
      marginRight: 50
  },
  modalView: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
  },
   confirmModal: {
      padding: 10,
      alignItems: 'center'
   },
   texts: {
      color: '#078bab',
      fontSize: 20
   },
   buttonIcon: {
    marginTop: 15, 
    padding: 3, 
    alignSelf: 'center', 
    backgroundColor: "#c7e6ff", 
    borderRadius: 50
  },
   errorDisplay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',            
   },
   errorMsg: {
      color: '#078bab',
      fontSize: 20
   }
})