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

   const handleQuantityChange = (val) => {   

      if( /\D/.test(val) || parseInt(val) <= 0){
         setProductQuantity({
            ...productQuantity,
            product_quantity: val,
            isValidProductQuantity: false
         })
      } else {
          setProductQuantity({
            ...productQuantity,
            product_quantity: val,
            isValidProductQuantity: true
         })
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
                        name='stack-overflow'
                        color="#078bab"
                        size={20}
                        
                     />  
                  </View>
                  <View style={{flexDirection:'column', flex: 4}}>
                     <View style= {{flexDirection: 'row', flex:1, paddingVertical: 5, alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={[styles.cardTitle, {textAlign: 'left'}]}>{ items.product_name.length > 20 ? items.product_name.slice(0,20)+'...' : items.product_name}</Text>   
                        <Text style={[styles.cardTitle, { textAlign: 'right', color: 'red'}]}>
                        <Icon name="arrow-down" size={15} color="red" />
                        {numbering(items.quantity)}</Text>
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
      padding: 15,
      backgroundColor: '#fff',
      flex: 1,  
   },
})