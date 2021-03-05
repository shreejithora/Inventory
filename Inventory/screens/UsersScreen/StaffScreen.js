import React, {useState} from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';

import StaffCard from '../../components/Users/StaffCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DepartmentStaff from '../../components/Users/DepartmentStaff';

const StaffList = require('../../models/Staffs.json');

const StaffScreen = ({navigation}) => {

   const userCategory = [
      {
         id: '101',
         name: 'Accounts'
      },
      {
         id: '102',
         name: 'Reception'
      },
      {
         id: '103',
         name: 'Marketting'
      },
      {
         id: '104',
         name: 'Sales'
      },
      {
         id: '105',
         name: 'IT'
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
                     <StaffCard handleDepartment={handleDepartment} category={userCategory[1]} iconName={'card-account-phone-outline'} duration={1000} />
                     <StaffCard handleDepartment={handleDepartment} category={userCategory[2]} iconName={'buffer'} duration={1200} />
                     <StaffCard handleDepartment={handleDepartment} category={userCategory[3]} iconName={'briefcase-plus-outline'} duration={1400} />
                     <StaffCard handleDepartment={handleDepartment} category={userCategory[4]} iconName={'laptop'} duration={1600} />               
                  </View>
               </ScrollView>  :
               <FlatList 
                  data={staff.allStaff}
                  keyExtractor={item => item.staff_id}
                  renderItem = { ({item}) => {
                     <DepartmentStaff info={item} duration={1000}/>
                  }}
               />
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