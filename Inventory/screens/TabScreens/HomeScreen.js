import React from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';

import HomeCard from '../../components/HomeCard';
import ActivityCard from '../../components/ActivityCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SalesList = require('../../models/Sales.json');

const HomeScreen = ({navigation}) => {
  return(
    <View style={styles.container}>                  
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
      {/* <ScrollView> */}
       <View style={styles.mainActitivity}>
          <View style={styles.activityTopic}>
            <Text style={styles.activityTopicText}>Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sales')}>
            <Text style={[styles.activityTopicText, {fontSize: 12}]}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingBottom: 50}}>
            <View style={styles.activityView}>     
              <View style={styles.activityCard}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={SalesList}
                  keyExtractor={(item) => item.product_id}
                  renderItem={({item}) => (                                             
                    <ActivityCard items={item} />                                                                      
                  )}                   
                />
              </View>
              <TouchableOpacity onPress={() => console.log('hi')}>
                <Icon name="arrow-down" size={25} color='#078bab' style={styles.icon} />
              </TouchableOpacity>
            </View> 
          </View>
        </View>  
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
    backgroundColor: '#e6f1fa',
    justifyContent: 'center',
  },
  activityView: {
    padding: 6,
    borderRadius: 13,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    height: 450,
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
    fontSize: 20,
    fontWeight: '700'
  },
  activityCard: {
    width: '100%'
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