import React from 'react';

import { 
   Text, 
   View } 
from 'react-native';

import StackHeads from '../../components/StackHeads';

const PreferencesScreen = ({navigation}) => {
   return(
      <View>
         <StackHeads nav={navigation} title="Preferences" />
         <View>
            <Text>Preferences</Text>
         </View>
      </View>
   )
}

export default PreferencesScreen;