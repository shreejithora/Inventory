import React from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,  
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// props.nav.navigate(props.tabName)

const HomeCard = (props) => {
   return(
      <Animatable.View animation="fadeInLeftBig" duration={1000} style={styles.card}>
         <TouchableOpacity onPress={() => {}}>
            <View style={styles.cardContent}>
               <Animatable.View animation="bounceInRight" duration={2000}>
               <Icon
                  name={props.iconName}
                  color="#fff"
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
      color: '#fff',
      fontSize: 15
   },
   card: {
      borderRadius: 5,
      backgroundColor: '#065ba1',
      width: 135,
      height: 100,
      marginVertical: 10,
      marginLeft: 10,
      marginRight: 10,
      shadowColor: "#000",
      shadowOffset: {
         width:  10,
         height: 16,
      },
      shadowOpacity: 1,
      shadowRadius: 20,

      elevation: 14,
   },
   cardContent: {
      padding: 25,
      justifyContent: 'center',
      alignItems: 'center'
   }
})