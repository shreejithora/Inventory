import React from 'react';;

import {
   View,
   Text,
   StyleSheet  
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  * as Animatable from 'react-native-animatable';

const Heads = ({nav, title, tabBool}) => {
   return(
      <View style={styles.header}>
         <Animatable.View 
            animation="bounceIn"
            duration={1000}
            style={{flexDirection: 'row', alignItems: 'center'}}>      
            <Icon.Button 
               style={styles.navButton}
               name="arrow-right-thick"
               size={30}   
               color="#078bab"
               backgroundColor= "#e6f1fa"
               onPress = {  () => {nav.openDrawer()}} />
            <Text style={styles.headerText}>{title}</Text>
         </Animatable.View>
         {
            tabBool ?
            <Icon.Button                
               style={{alignSelf: 'stretch'}}
               name="bell-outline" 
               size={28} 
               color="#078bab" 
               backgroundColor="#e6f1fa"
            /> :      
            <Icon.Button                
               style={{alignSelf: 'stretch'}}
               name="home-outline" 
               size={28} 
               color="#078bab" 
               backgroundColor="#e6f1fa"
               onPress={ () => nav.navigate('HomeTab')}
            />
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
      fontFamily: 'sans-serif-medium',
      fontSize: 22,
      fontWeight: '700',
      textAlign: "left",
      color: '#078bab',
   },
   navButton: {
      // padding: 10
   }
})