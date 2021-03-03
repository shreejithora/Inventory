import React from "react";
import { 
   Text,
   View,
   StyleSheet, 
   Image
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomersInfo = ({item}) => {
   return(
      <View  style={styles.CustomersInfo}>   
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Customer ID:</Text> {item.customer_id}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Customer:</Text> {item.name}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>phone:</Text> {item.phone}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Address:</Text> {item.address}</Text>
      </View>
   )
}

export default CustomersInfo;

const styles = StyleSheet.create({
   CustomersInfo: {
      flex: 1,
      padding: 10,
   },
   infoTexts: {
      padding: 10,
      textAlign: 'left',
      fontSize: 20,
      color: '#078bab'
   },
   barcode: {
      marginTop: 15,
      height: 100,
      width: 150,
      alignSelf: 'center'
   }
})