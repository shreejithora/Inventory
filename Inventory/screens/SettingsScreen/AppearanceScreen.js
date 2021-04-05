import React from 'react';

import { 
   View,
   Text } 
from 'react-native';

import StackHeads from '../../components/StackHeads';

const AppearanceScreen = ({navigation}) => {
   return(
        <View>
         <StackHeads nav={navigation} title="Appearance" />
         <View>
            <Text>Appearance</Text>
         </View>
      </View>
   )
}

export default AppearanceScreen;