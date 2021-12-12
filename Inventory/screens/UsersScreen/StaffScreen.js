import React, {useState} from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Button,
  FlatList,
  Alert
} from 'react-native';

import StaffCard from '../../components/Users/StaffCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DepartmentStaff from '../../components/Users/DepartmentStaff';

const StaffList = require('../../models/Staffs.json');

const StaffScreen = () => {

   const userCategory = [
      {
         id: '101',
         name: 'Accounts'
      },
      {
         id: '102',
         name: 'Reception'
      },
     
   ]

   const [staff, setStaff] = useState({
      allStaff: [],
      isValid: true
   })   

   const duration = 0;
   
   const handleDepartment = (category) => {
      const foundStaff = StaffList.filter( item => {
         return category.toLowerCase() == item.department.toLowerCase()
      })
      console.log(foundStaff);
      setStaff({
         allStaff: foundStaff,
         isValid: false
      });
   }

   return(
      <View style={styles.container}>                  
         <View style={styles.cardView}>
         
            {
               staff.isValid ?
               <ScrollView showsVerticalScrollIndicator={false}> 
                  <View style={styles.cards}>                       
                     <StaffCard handleDepartment={handleDepartment} category={userCategory[0]} iconName={'bank'} duration={800} />
                     <StaffCard handleDepartment={handleDepartment} category={userCategory[1]} iconName={'card-account-phone-outline'} duration={800} />
                                 
                  </View>
               </ScrollView>  :
               // <FlatList 
               //    data={staff.allStaff}
               //    keyExtractor={item => item.staff_id}
               //    renderItem = { ({item}) => {
                  <View>
                  <Icon
                     style={{alignSelf: 'flex-end', marginRight: 15}}
                     name="arrow-right"
                     size={30}
                     color='#078bab'
                     onPress={() => setStaff({isValid: true})}
                  />
                  <ScrollView showsVerticalScrollIndicator={false} style={{paddingBottom: 10, marginBottom: 10}}>                     
                     <DepartmentStaff info={staff.allStaff} duration={1000}/>
                  </ScrollView>
                  </View>
               //    }}
               // />
            }                                               
                  
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

export default StaffScreen;

const styles = StyleSheet.create({
   container: {
         flex: 1,
         backgroundColor: '#e6f1fa',
   },
   cardView: {   
      flex: 1,
      paddingHorizontal: 10,    
      backgroundColor: '#e6f1fa'
   },
   cards: {       
      flex: 1,
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