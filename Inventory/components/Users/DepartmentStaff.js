import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { 
  View, 
  Button,
  Text, 
  TouchableOpacity, 
  StyleSheet,  
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavContext} from '../../contexts/NavContext';

const DepartmentStaff = (props) => {     

   return(
      <View>         
         {  
            props.info == [] ?
            <Text>No Users</Text>  :
            props.info.map( item => (               
               <Animatable.View animation="fadeInUpBig" duration={props.duration} style={styles.card} key={item.staff_id}>    
                  <TouchableOpacity onPress={()=>{}}>
                     <View style={styles.cardContent}>
                        <Animatable.View animation="fadeInDown" duration={1200}>
                        <Icon
                           name="account-circle-outline"
                           color="#078bab"
                           size={30}
                        />
                        </Animatable.View>
                        <Text style={[styles.cardTitle, {fontWeight: '700', fontSize: 18, marginVertical: 5}]}>{item.staff_id}</Text>
                        <Text style={[styles.cardTitle, {marginVertical: 5}]}>{item.name}</Text>
                        <Text style={styles.cardTitle}>{item.number}</Text>
                        <Text style={styles.cardTitle}>{item.address}</Text>
                     </View>
                  </TouchableOpacity>
               </Animatable.View>
            ))
         }
      </View>      
   )
}

export default DepartmentStaff;

const styles = StyleSheet.create({
   cardTitle:{
      color: '#078bab',
      fontSize: 15
   },
   card: {
      alignSelf: 'center',
      borderRadius: 5,
      backgroundColor: '#fff',
      width: '90%',
      // height: '100%',
      marginVertical: 10,
      marginHorizontal: 5,
      shadowColor: "#000",
      shadowOffset: {
         width:  10,
         height: 10,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,

      elevation: 7,
   },
   cardContent: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10
   }
})