import React from "react";
import { 
   Text,
   View,
   StyleSheet, 
   Image
} from "react-native";

const SupplierInfo = ({item}) => {
   return(
      <View  style={styles.SupplierInfo}>      
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Supplier ID:</Text> {item.supplier_id}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Supplier:</Text> {item.name}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>phone:</Text> {item.phone}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Address:</Text> {item.address}</Text>
         <Text style={styles.infoTexts}><Text style={{fontWeight: '700'}}>Status:</Text> <Text style={{color: item.status == 'pending' ? 'red' : 'green', fontStyle: 'italic'}}>{item.status}</Text></Text>

      </View>
   )
}

export default SupplierInfo;

const styles = StyleSheet.create({
   SupplierInfo: {
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