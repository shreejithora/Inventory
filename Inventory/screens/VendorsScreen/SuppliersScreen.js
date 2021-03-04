import React, { useState } from 'react';
import { 
   Text, 
   View, 
   TextInput,
   TouchableOpacity, 
   StyleSheet,
   FlatList,  
   Button, 
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SuppliersCard from "../../components/Vendors/Suppliers/SuppliersCard";
import Modal from "react-native-modal";
import AddSupplier from '../../components/Vendors/Suppliers/AddSupplier';
const SuppliersList = require('../../models/Suppliers.json');

const SuppliersScreen = ({navigation}) => {

   const [AddSupplierModal, setAddSupplierModal] = useState(false);   

   const [suppliersData, setSuppliersData] = useState({
      allSuppliers: SuppliersList,
      filteredSuppliers: SuppliersList
   })



   const handleSearchText = textToSearch => {
      const foundSupplier = SuppliersList.filter( item => {
         return ( 
            item.supplier_id.toLowerCase().includes(textToSearch.toLowerCase()) || 
            item.name.toLowerCase().includes(textToSearch.toLowerCase()) ||
            item.phone.toLowerCase().includes(textToSearch.toLowerCase())  ||
            item.address.toLowerCase().includes(textToSearch.toLowerCase())             
         )
      })
      
      setSuppliersData({
         ...suppliersData,
         filteredSuppliers: foundSupplier.length == 0 ? null : foundSupplier         
      })      
   }

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
            <View style={styles.cardContent}>  
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'left', fontWeight: '700', marginLeft: 10}]}>ID</Text> 
               <Text style={[styles.cardTitle, {flex: 3, textAlign: 'left', fontWeight: '700'}]}>Name</Text>  
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left', fontWeight: '700'}]}>Status</Text> 
            </View> 
            { 
               suppliersData.filteredSuppliers == null ?
               <View opacity={0.5} style={styles.errorDisplay}>
                  <Icon name="clipboard-alert-outline" size={30} color='#078bab'/>
                  <Text style={styles.errorMsg}>No Match Found</Text>  
                                 
               </View> :
               <FlatList 
                  data = {suppliersData.filteredSuppliers}
                  keyExtractor = {item => item.supplier_id}
                  renderItem = { ({item}) =>                  
                     <SuppliersCard items={item}/>                                           
                  }
               />
            }           
         </View>      
         <TouchableOpacity          
            style={{position: 'absolute', bottom: 25, right: 25,}}
            onPress={() => setAddSupplierModal(true) }
         >            
            <Icon name="plus" size={30} color='#e6f1fa' style={styles.icon}/>              
         </TouchableOpacity>  
         <Modal 
            style={styles.modal}
            isVisible={AddSupplierModal} 
            onBackButtonPress = {() => setAddSupplierModal(!AddSupplierModal)}
            onBackdropPress={() => setAddSupplierModal(!AddSupplierModal)}
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            animationInTiming={500}
            animationOutTiming={500}> 
            <View style={styles.modalView}>       
               <Icon 
                  style={styles.buttonIcon}
                  name="close"
                  size={30}
                  color="#078bab"                                   
                  onPress={ () => setAddSupplierModal(false)}
               />   
               <AddSupplier onAddSupplier={setAddSupplierModal}/>                                   
            </View>                                           
         </Modal>                      
      </View>    
   )
}

export default SuppliersScreen;

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