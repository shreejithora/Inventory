import React from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity
} from 'react-native';

import AdminCard from '../../components/Users/AdminCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SalesList = require('../../models/Sales.json');

const AdminScreen = ({navigation}) => {

   const Admins = [
      {
         iconName: 'account-circle-outline',
         adminName: 'Prabin Shrestha',
         number: '9841987547',
         address: 'Kalapani, Nepal - 12',
      },
      {
         iconName: 'account-circle-outline',
         adminName: 'Shrena Neupane',
         number: '9841987547',
         address: 'Kalanki, Kathmandu - 4, Nepal',
      },
      {
         iconName: 'account-circle-outline',
         adminName: 'Hari Dahal',
         number: '9841987547',
         address: 'Baneshwor, Kathmandu - 5, Nepal',
      },
      {
         iconName: 'account-circle-outline',
         adminName: 'Krijan Prajapati',
         number: '9841987547',
         address: 'Koteshwor, Kathmandu - 5, Nepal',
      },
      {
         iconName: 'account-circle-outline',
         adminName: 'Ritika Pradhananga',
         number: '9841987547',
         address: 'Bageshwori, Bhaktapur - 1, Nepal',
      },
   ]

   const duration = 0;

   return(
      <View style={styles.container}>                  
         <View style={styles.cardView}>
         <ScrollView showsVerticalScrollIndicator={false}> 
            <View style={styles.cards}>
               {/* {
                  Admins.forEach( (item, index) => 
                     <AdminCard admin={item} duration={duration + 1000} />
                  )
               }          */}
               
               <AdminCard admin={Admins[0]} duration={800} />
               <AdminCard admin={Admins[1]} duration={1000} />
               <AdminCard admin={Admins[2]} duration={1200} />
               <AdminCard admin={Admins[3]} duration={1400} />
               <AdminCard admin={Admins[4]} duration={1600} />               
            </View>                                                
         </ScrollView>          
         </View> 
         <TouchableOpacity          
            style={{position: 'absolute', bottom: 25, right: 25,}}
            onPress={() => {}}
         >            
            <Icon name="plus" size={30} color='#e6f1fa' style={styles.icon}/>              
         </TouchableOpacity>             
      </View>
   )
}

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f1fa',
  },
  cardView: {    
    paddingHorizontal: 10,    
    backgroundColor: '#e6f1fa'
  },
  cards: {       
     justifyContent:'center',  
     paddingVertical: 20,
     flexWrap: 'wrap' ,
     flexDirection: 'row'
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
})