import React from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity
} from 'react-native';

import HomeCard from '../../components/HomeCard';
import ActivityCard from '../../components/ActivityCard';

const HomeScreen = ({navigation}) => {
  return(
    <View style={styles.container}>                  
      <View style={styles.cardView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>           
          <HomeCard iconName={'chart-line'} tabName={'Products'} cardName={'Products'} nav={navigation}/>
          <HomeCard iconName={'bank-transfer'} tabName={'Sales'} cardName={'Sales'} nav={navigation}/>
          <HomeCard iconName={'account-cash'} tabName={'Entries'} cardName={'Income'} nav={navigation}/>
          <HomeCard iconName={'checkbook'} tabName={'Entries'} cardName={'Expense'} nav={navigation}/> 
          <HomeCard iconName={'checkbook'} tabName={'Vendors'} cardName={'Suppliers'} nav={navigation}/> 
          <HomeCard iconName={'checkbook'} tabName={'Vendors'} cardName={'Customers'} nav={navigation}/>            
        </ScrollView>          
      </View>   

      {/* Table of Cards */}
      <ScrollView>
      <View style={styles.mainActitivity}>
        <View style={styles.activityTopic}>
            <Text style={styles.activityTopicText}>Activity</Text>
            <TouchableOpacity>
            <Text style={[styles.activityTopicText, {fontSize: 12}]}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingBottom: 50}}>
            <View style={styles.activityView}>     
              <View style={styles.activityCard}>
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
              </View>
            </View> 
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
    // paddingVertical: 20,
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
  activityDetails: {

  },
  activityCard: {
    width: 350
  }
})