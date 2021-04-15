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

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import firestore from '@react-native-firebase/firestore';

import AddSales from '../components/Sales/AddSales';
import Heads from '../components/Heads';
import SalesCard from '../components/Sales/SalesCard';

let SalesList = [];

const SalesScreen = ({navigation}) => {

   const [refreshing, setRefreshing] = useState(false)

   useEffect( () => {
      SalesList = [];
      const ok = async() => {
         await firestore()
            .collection('Sales')
            .get()
            .then( querySnapshot => {
               querySnapshot.forEach( documentSnapshot => {
                  SalesList.push(documentSnapshot.data());
               })
               setsalesData({
                  allSales: SalesList,
                  filteredSales: SalesList
               })
            })                         
      }
      ok();
   }, []);

   const [addSalesModal, setAddSalesModal] = useState(false);   

   const [salesAddedModal, setSalesAddedModal] = useState(false);

   const [salesData, setsalesData] = useState({
      allSales: SalesList,
      filteredSales: SalesList
   })   

   const handleSearchText = textToSearch => {
      const foundProduct = SalesList.filter( item => {
         return ( 
            item.product.toLowerCase().includes(textToSearch.toLowerCase()) 
         )
      })
      
      setsalesData({
         ...salesData,
         filteredSales: foundProduct.length == 0 ? null : foundProduct         
      })      
   }

   const handleSalesAdded = () => {
      setSalesAddedModal(true);
   }

   const onRefresh = React.useCallback( async() => {
      setRefreshing(true);
      SalesList = [];
      try{         
         await firestore()
            .collection('Sales')
            .get()
            .then( querySnapshot => {
               querySnapshot.forEach( documentSnapshot => {                  
                  SalesList.push(documentSnapshot.data());   
               });       
               setRefreshing(false) 
               setsalesData({
                  allSales: SalesList,
                  filteredSales: SalesList
               })          
            });          
      } catch(e) {
         console.log(e)
      }
   }, [refreshing]);

   return(
      <View style={styles.container}>
         <Heads nav={navigation} title="Sales" tabBool={0} />
         <View style={styles.mainActitivity}> 
            <View style={styles.searchBar}>
               <Icon style={{marginLeft: 10}} name="text-box-search-outline" size={20} color="#078bab" />
               
               <TextInput style={{flex: 1, marginLeft: 5, color: '#000'}} 
                  placeholder="Search" 
                  onChangeText={ (val) => handleSearchText(val)} 
               />            
            </View>                        
            { 
               salesData.filteredSales == null ?
               <View opacity={0.5} style={styles.errorDisplay}>
                  <Icon name="clipboard-alert-outline" size={30} color='#078bab'/>
                  <Text style={styles.errorMsg}>No Match Found</Text>  
                                 
               </View> :
               <FlatList 
                  data = {salesData.filteredSales}
                  keyExtractor = {item => item.product}
                  renderItem = { ({item}) =>  {
                        return <SalesCard items={item}/>
                     }                                                      
                  }
                  refreshControl={
                     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
               />
            }            
         </View>      
   
         <TouchableOpacity          
            style={{position: 'absolute', bottom: 25, right: 25,}}
            onPress={() => {setAddSalesModal(true)}}
         >            
            <Icon name="plus" size={30} color='#e6f1fa' style={styles.icon}/>              
         </TouchableOpacity>      

         <Modal 
            style={styles.modal}
            isVisible={addSalesModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setAddSalesModal(!addSalesModal)}
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
                  onPress={ () => setAddSalesModal(false)}
               />   
               <AddSales onAddSales={setAddSalesModal} stateChange={handleSalesAdded} />                                   
            </View>                                           
         </Modal> 
         <Modal 
            style={styles.modal1}
            isVisible={salesAddedModal} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            onBackButtonPress = {() => setSalesAddedModal(!salesAddedModal)}
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
                  onPress={ () => setSalesAddedModal(false)}
               />   
               <View style={styles.confirmModal}>
                  <Text style={styles.texts}>
                     <Icon name="text-box-check" size={25} color="green"/>
                     <Text style={{marginLeft: 5, fontWeight: '700'}}>Added Successfully !</Text>
                  </Text>                  
               </View>                                
            </View>                                           
         </Modal>                         
      </View>    
   )
}

export default SalesScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   mainActitivity: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#e6f1fa',
      justifyContent: 'center',
   },
   activityView:{
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