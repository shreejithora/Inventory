import React from 'react';;

import {
   View,
   Text,
   StyleSheet,  
   TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  * as Animatable from 'react-native-animatable';

const Heads = ({nav, title}) => {
   return(
      <View style={styles.header}>
         <TouchableOpacity onPress = {  () => {nav.goBack()}} >
            <Animatable.View 
               animation="bounceIn"
               duration={1000}
               style={{flexDirection: 'row', alignItems: 'center'}}>      
               <Icon
                  style={styles.navButton}
                  name="arrow-left-thick"
                  size={30}   
                  color="#078bab"
                  backgroundColor= "#e6f1fa"
               />
               <Text style={styles.headerText}>{title}</Text>
            </Animatable.View>   
         </TouchableOpacity>               
      </View>
   )
}

export default Heads;

const styles = StyleSheet.create({
   header: {
      alignItems: 'center',
      marginVertical: 10,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
      width: '100%'
   },
   headerText: {
      marginLeft: 10,
      fontFamily: 'sans-serif-medium',
      fontSize: 25,
      fontWeight: '700',
      textAlign: "left",
      color: '#078bab',
   },
   navButton: {
      // padding: 10
   }
})