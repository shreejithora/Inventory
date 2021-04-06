import React from 'react';;

import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  * as Animatable from 'react-native-animatable';

const Heads = ({nav, title, tabBool}) => {
   return(
      <View style={styles.header}>
         <Animatable.View 
            animation="bounceIn"
            duration={1000}
         > 
            <TouchableOpacity 
               style={{
                  flexDirection: 'row', 
                  alignItems: 'center',
               }}
               onPress = {  () => {nav.openDrawer()}} 
            >
               <Icon
                  style={styles.navButton}
                  name="menu-open"
                  size={35}   
                  color="#078bab"
                  backgroundColor= "#e6f1fa"
               />
               <Text style={styles.headerText}>{title}</Text>
         </TouchableOpacity>
         </Animatable.View>
         {
            tabBool ?
            <TouchableOpacity>
               <Icon             
                  style={{alignSelf: 'stretch', marginRight: 10}}
                  name="bell-outline" 
                  size={28} 
                  color="#078bab" 
                  backgroundColor="#e6f1fa"
               />
            </TouchableOpacity> :      
            <TouchableOpacity>
               <Icon
                  style={{alignSelf: 'stretch', marginRight: 10}}
                  name="home-outline" 
                  size={28} 
                  color="#078bab" 
                  backgroundColor="#e6f1fa"
                  onPress={ () => nav.navigate('HomeTab')}
               />
            </TouchableOpacity>
         }
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