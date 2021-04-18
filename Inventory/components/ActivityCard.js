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

   const date = items.uploaded_at.toDate();

   const numbering = num => {
      let x = num;
      x = x.toString();
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
               <View style={{flexDirection: 'row', alignItems: 'center', flex:  1}}>
                  <View style={{
                           backgroundColor: '#e6f1fa',
                           padding: 10,
                           borderRadius: 50, 
                           // flex: 1
                        }}>
                     <Icon
                        name='cart-arrow-up'
                        color="#078bab"
                        size={20}
                        
                     />  
                  </View>
                  <View style={{flexDirection:'column', flex: 4}}>
                     <View style= {{flexDirection: 'row', flex:1, paddingVertical: 5, alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={[styles.cardTitle, {textAlign: 'left'}]}>{ items.customer.length > 13 ? items.customer.slice(0,12)+'...' : items.customer}</Text>   
                        <Text style={[styles.cardTitle, { textAlign: 'right', color: '#07a63a'}]}>+ Rs. {numbering(items.grand_total.toFixed(1))}</Text>                                                 
                     </View>  
                     <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={[styles.cardTitle, { textAlign: 'right',  fontStyle: 'italic', fontWeight: '200', fontSize: 14}]}>{date.toDateString()}</Text>
                     </View>           
                  </View>
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
      fontSize: 17,
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