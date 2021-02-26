import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView
} from 'react-native';

import HomeCard from '../components/HomeCard'

const HomeScreen = ({navigation}) => {
   return(
      <View style={styles.container}>
         <ScrollView>             
            <View style={styles.cardView}>
               <HomeCard iconName={'chart-line'} tabName={'Products'} cardName={'Products'} nav={navigation}/>
               <HomeCard iconName={'bank-transfer'} tabName={'Sales'} cardName={'Sales'} nav={navigation}/>
               <HomeCard iconName={'account-cash'} tabName={'Income'} cardName={'Income'} nav={navigation}/>
               <HomeCard iconName={'checkbook'} tabName={'Expense'} cardName={'Expense'} nav={navigation}/> 
               <HomeCard iconName={'checkbook'} tabName={'Suppliers'} cardName={'Suppliers'} nav={navigation}/> 
               <HomeCard iconName={'checkbook'} tabName={'Customers'} cardName={'Customers'} nav={navigation}/>     
               <HomeCard iconName={'checkbook'} tabName={'Users'} cardName={'Users'} nav={navigation}/>                
            </View>               
         </ScrollView>
   </View>
   )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  cardView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#e6f1fa',
    
  },
  
})