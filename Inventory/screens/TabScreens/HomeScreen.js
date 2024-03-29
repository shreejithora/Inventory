import React from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import HomeCard from '../../components/HomeCard';
import ActivityCard from '../../components/ActivityCard';
import LowStockCard from '../../components/LowStockCard';
import Heads from '../../components/Heads';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { useState } from 'react';

let SalesList = [];
let ProductsList = [];

const HomeScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(true)

  const [salesData, setSalesData] = useState({
    allSales: SalesList,
    filteredSales: SalesList
  })

  const [productsData, setProductsData] = useState({
    allProducts: ProductsList,
    filteredProducts: ProductsList
  })

  const [size, setSize] = useState('');

  const [salesSize, setSalesSize] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  useEffect( () => {
    setTimeout(  async() => {
      try{
        SalesList = [];
        ProductsList = [];
        await firestore()
          .collection('Sales')          
          .get()
          .then( querySnapshot => {
            querySnapshot.forEach( documentSnapshot => {
              const data = documentSnapshot.data()
              data.id = documentSnapshot.id;
              const uploaded = data.uploaded_at.toDate().toDateString();
                const today = new Date()
                if( uploaded == today.toDateString()){
                  SalesList.push(data)
                }
              });      
              setSalesSize(SalesList.length)
            setSalesData({
              allSales: SalesList,
              filteredSales: SalesList
            })
            
          })

        await firestore()
          .collection('Products')
          .get()
          .then( querySnapshot => {            
            querySnapshot.forEach( documentSnapshot => {
              const data = documentSnapshot.data()
              data.id = documentSnapshot.id;              
              if( data.quantity <= 20 ){
                ProductsList.push(data)
              }         
              setSize(ProductsList.length)     
            })
            setProductsData({
              allProducts: ProductsList,
              filteredProducts: ProductsList
            })
          })
          setIsLoading(false)
      } catch(e) {
        console.log(e)
      }
    }, 1000);
  }, []);

  const onRefresh = React.useCallback( async() => {
      setRefreshing(true);
      ProductsList = [];
      SalesList = [];
      try{         
         await firestore()
            .collection('Products')
            .get()
            .then( querySnapshot => {
               querySnapshot.forEach( documentSnapshot => {    
                  const data = documentSnapshot.data();
                  data.id = documentSnapshot.id              
                  if( data.quantity <= 20 ){
                    ProductsList.push(data)
                  }     
                  setSize(ProductsList.length)
               });      
               setRefreshing(false) 
               setProductsData({
                  allProducts: ProductsList,
                  filteredProducts: ProductsList
               })          
            });
        await firestore()
            .collection('Sales')
            .get()
            .then( querySnapshot => {
              querySnapshot.forEach( documentSnapshot => {    
                const data = documentSnapshot.data();
                data.id = documentSnapshot.id  
                const uploaded = data.uploaded_at.toDate().toDateString();
                const today = new Date()
                if( uploaded == today.toDateString()){
                  SalesList.push(data)
                } 
                // console.log(data.uploaded_at.toDate().toDateString(), today.toDateString())
              });      
              setSalesSize(SalesList.length)
              setRefreshing(false) 
              setSalesData({
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
      <Heads nav={navigation} title="Inventory" tabBool={1} />
      <View style={styles.cardView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>           
          <HomeCard iconName={'cart-outline'} tabName={'Products'} cardName={'Products'} nav={navigation}/>
          <HomeCard iconName={'chart-line'} tabName={'Sales'} cardName={'Sales'} nav={navigation}/>
          <HomeCard iconName={'cash-plus'} income={1} expense={0} tabName={'Entries'} cardName={'Income'} nav={navigation}/> 
          <HomeCard iconName={'cash-minus'} income={0} expense={1} tabName={'Entries'} cardName={'Expense'} nav={navigation}/> 
          <HomeCard iconName={'truck-fast-outline'} cus={0} sup={1} tabName={'Vendors'} cardName={'Suppliers'} nav={navigation}/> 
          <HomeCard iconName={'account-multiple-outline'} cus={1} sup={0} tabName={'Vendors'} cardName={'Customers'} nav={navigation}/>                                         
        </ScrollView>       
      </View>   

      {/* Table of Cards */}
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl = {
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
        {
          ProductsList.length == 0 ?
          null :
          <View style={styles.mainActitivity}>          
            <View style={styles.activityTopic}>
              <Text style={[styles.activityTopicText]}>Low Stocks <Text style={{fontSize: 14}}>({size})</Text></Text>
              <TouchableOpacity onPress={() => {navigation.navigate('Products', {filter: 'low'});}}>
              <Text style={[styles.activityTopicText, {fontSize: 12}]}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              {
                isLoading ?
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size="large" color="#078bab" />
                </View> :                  
                <FlatList   
                  nestedScrollEnabled            
                  showsVerticalScrollIndicator={false}
                  data={productsData.filteredProducts}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (                                             
                    <LowStockCard items={item}/>  
                  )}                   
                />                                            
              }              
            </View>
          </View>
        }       
      
       <View style={styles.mainActitivity}>          
          <View style={styles.activityTopic}>
            <Text style={styles.activityTopicText}>Today's Activity <Text style={{fontSize: 14}}>({salesSize})</Text></Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sales')}>
            <Text style={[styles.activityTopicText, {fontSize: 12}]}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.list}>
            {
              isLoading ?
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#078bab" />
              </View> :
              <View>
              <FlatList         
                nestedScrollEnabled      
                showsVerticalScrollIndicator={false}
                data={salesData.filteredSales}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (                                             
                  <ActivityCard items={item} />  
                )}                   
              />    
              </View>                                         
            }             
          </View>
        </View>
      </ScrollView>  
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f1fa',
  },
  cardView: {    
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    backgroundColor: '#e6f1fa',    
  },
  mainActitivity: {
    marginTop: -20,
    backgroundColor: '#e6f1fa',
    justifyContent: 'flex-start',
  },
  activityView: {
    padding: 6,
    borderRadius: 13,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    height: '75%',
    shadowColor: "#000",
    shadowOffset: {
        width:  2,
        height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 7,
  },
  activityTopic: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTopicText: {
    color: '#078bab',
    fontSize: 20,
    fontWeight: '700'
  },
  activityCard: {
    // width: '100%',    
  },
  list: {
    height: 300,
    paddingBottom: 15
  },
  icon: {
    padding: 5,
    zIndex: 1, 
    bottom: 50,
    backgroundColor: '#e6f1fa', 
    borderRadius: 50 ,
    shadowColor: "#000",
    shadowOffset: {
        width:  2,
        height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 7,

    elevation: 6,
  }
})