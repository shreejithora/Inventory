import React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QuotationScreen = () => {

   const [state, setState] = useState({
      country: 'uk'
   })

   return(
      <View>
         <Text>Quotations</Text>      
         <Text style={{textAlign: 'right'}}>Hello</Text>
      </View>
   )
}

export default QuotationScreen;