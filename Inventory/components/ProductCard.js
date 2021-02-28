import React from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  FlatList,  
} from 'react-native';

import * as Animatable from 'react-native-animatable';

const ProductCard = ({items}) => {
   return(
      <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
         <TouchableOpacity onPress={() => {}}>
            <View style={styles.cardContent}>  
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'left'}]}>{items.product_id}</Text> 
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left'}]}>{items.name}</Text>  
               <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.quantity}</Text>            
               <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left'}]}>{items.price}</Text>
            </View>         
         </TouchableOpacity>
      </Animatable.View>               
   )
}

export default ProductCard;

const styles = StyleSheet.create({
   cardTitle:{
      // marginHorizontal: 5,
      color: '#078bab',
      fontSize: 18,
   },
   card: {
      padding: 15,
      backgroundColor: '#fff',
      flex: 1,
      // marginVertical: 5,
      marginLeft: 5,
      marginRight: 5,   
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1,   
      
   },
   cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 15,
   },
   cardInfo: {      
      marginLeft: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
   }
})