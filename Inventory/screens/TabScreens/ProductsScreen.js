import React from 'react';
import { Text, 
   View, 
   TouchableOpacity, 
   ScrollView, 
   StyleSheet
} from 'react-native';

import ProductCard from '../../components/ProductCard';

const ProductsScreen = () => {
   return(
      <View style={styles.container}>
         <ScrollView>
            <View style={styles.mainActitivity}> 
               <View style={styles.activityTop}>
               {/* Activity top Desgin */}
               </View>              
               <View style={{paddingBottom: 15}}>
                  <View style={styles.activityView}>    
                     <ProductCard />
                     <ProductCard />
                     <ProductCard />
                     <ProductCard />
                     <ProductCard />
                     <ProductCard />
                     <ProductCard />
                  </View> 
               </View>
            </View>
         </ScrollView>
      </View>
   )
}

export default ProductsScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   mainActitivity: {
      paddingTop: 20,
      backgroundColor: '#e6f1fa',
      justifyContent: 'center',
   },
   activityView: {
      borderRadius: 15,
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '90%',
      shadowColor: "#000",
      shadowOffset: {
         width:  2,
         height: 3,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,

      elevation: 7,
   },
   activityTop: {
   },
   activityTopicText: {
      fontSize: 20,
      fontWeight: '700'
   },
})