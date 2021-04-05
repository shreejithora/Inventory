import React from 'react';

import {
   Text,
   View,
   StyleSheet
} from 'react-native';

const Stocks = () => {
   return(
      <View style={styles.stocksContainer}>
         <Text style={styles.texts}>Stocks</Text>
         <Text style={[styles.texts, {fontWeight: '700', fontSize: 25}]}>2,350</Text>
         
      </View>
   )
}

export default Stocks;

const styles = StyleSheet.create({
   stocksContainer: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: 15,
      height: 100,
      width: 150,
      backgroundColor: '#fafafa',
      borderRadius: 20,

      shadowColor: "#000",
      shadowOffset: {
         width:  10,
         height: 10,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 7      
   },
   texts: {
      fontSize: 15,
      color: '#078bab',
      fontWeight: 'normal'
   }
})