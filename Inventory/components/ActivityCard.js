import React from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,  
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActivityCard = ({items}) => {
   return(
      <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
         <TouchableOpacity onPress={() => {}}>
            <View style={styles.cardContent}>  
               <View style={{flexDirection: 'row', flex: 1}}>
               <Icon
                  name='cart-arrow-up'
                  color="#078bab"
                  size={30}
               />               
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left'}]}>{items.name}</Text>                            
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'right'}]}>+ Rs. {items.price}</Text>
               </View>  
            </View>         
         </TouchableOpacity>
      </Animatable.View>      
   )
}

export default ActivityCard;

const styles = StyleSheet.create({
   cardTitle:{
      marginHorizontal: 10,
      color: '#078bab',
      fontSize: 18,
      fontWeight: '700'
   },
   card: {
      borderRadius: 20,
      padding: 15,
      backgroundColor: '#fff',
      flex: 1,
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1,   
   },
   cardContent: {
      // flexDirection: 'row',
      // justifyContent: 'space-between'
   },
})