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
   const numbering = num => {
      let x = num;
      x=x.toString();
      // x=x.split('.')[0];
      let y = 0;
      if(x.includes('.')){
         y = '.'+x.split('.')[1]
         x = x.split('.')[0]
         let lastThree = x.substring(x.length-3);
         const otherNumbers = x.substring(0,x.length-3);
         if(otherNumbers != '')
            lastThree = ',' + lastThree;
         const val = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree; 
         return (val+y);
      } else {
         let lastThree = x.substring(x.length-3);
         const otherNumbers = x.substring(0,x.length-3);
         if(otherNumbers != '')
            lastThree = ',' + lastThree;
         const val = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree; 
         return (val);
      }
   }
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
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left'}]}>{items.product}</Text>                            
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'right'}]}>+ Rs. {numbering(items.price)}</Text>
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
      fontSize: 16,
      fontWeight: '700'
   },
   card: {
      borderRadius: 20,
      padding: 15,
      backgroundColor: '#fff',
      flex: 1,  
   },
   cardContent: {
      // flexDirection: 'row',
      // justifyContent: 'space-between'
   },
})