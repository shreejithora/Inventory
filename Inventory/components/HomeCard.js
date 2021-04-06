import React from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,  
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeCard = (props) => {   
   return(
      <Animatable.View animation="fadeInLeftBig" duration={5000} style={styles.card}>         
         <TouchableOpacity onPress={() => {props.nav.navigate(props.tabName, {cus: props.cus, sup: props.sup, income: props.income, expense: props.expense})}}>
            <View style={styles.cardContent}>
               <Animatable.View animation="fadeInRight" duration={1600}>
               <Icon
                  name={props.iconName}
                  color="#078bab"
                  size={30}
               />
               </Animatable.View>
               <Text style={styles.cardTitle}>{props.cardName}</Text>
            </View>
         </TouchableOpacity>
      </Animatable.View>
   )
}

// props.nav.navigation.navigate(props.tabName)

export default HomeCard;

const styles = StyleSheet.create({
   cardTitle:{
      color: '#078bab',
      fontSize: 15
   },
   card: {
      flex: 1,
      borderRadius: 5,
      backgroundColor: '#fff',
      width: 101,
      height: 120,
      marginVertical: 10,
      marginLeft: 10,
      marginRight: 10,
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
      marginVertical: 20
   }
})