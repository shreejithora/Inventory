import React from 'react';

import { 
   View, 
   Text } 
from 'react-native';

import StackHeads from '../../components/StackHeads';

const SecurityScreen = ({navigation}) => {
   return(
        <View>
         <StackHeads nav={navigation} title="Security" />
         <View>
            <Text>Security</Text>
         </View>
      </View>
   )
}

export default SecurityScreen;