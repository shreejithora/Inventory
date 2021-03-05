import React from 'react';
import { useState, useEffect } from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,  
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StaffCard = (props) => {     

   return(
      <Animatable.View animation="fadeInUpBig" duration={props.duration} style={styles.card}>         
         <TouchableOpacity onPress={() => props.handleDepartment(props.category.name)}>                    
            <View style={styles.cardContent}>
               <Animatable.View animation="fadeInDown" duration={1500}>
               <Icon
                  name={props.iconName}
                  color="#078bab"
                  size={30}
               />
               </Animatable.View>
               <Text style={[styles.cardTitle, {fontWeight: '700', fontSize: 18, marginVertical: 5}]}>{props.category.name}</Text>
               
            </View>
         </TouchableOpacity>
      </Animatable.View>
   )
}

export default StaffCard;

const styles = StyleSheet.create({
   cardTitle:{
      color: '#078bab',
      fontSize: 15
   },
   card: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      width: '44%',
      justifyContent: 'center',
      alignItems: 'center',
      // height: '100%',
      marginVertical: 10,
      marginHorizontal: 10,
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