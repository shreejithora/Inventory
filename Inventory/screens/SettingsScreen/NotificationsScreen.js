import React from 'react';

import { 
   View, 
   Text } 
from 'react-native';

import StackHeads from '../../components/StackHeads';

const NotificationsScreen = ({navigation}) => {
   return(
        <View>
         <StackHeads nav={navigation} title="Notifications" />
         <View>
            <Text>Notifications</Text>
         </View>
      </View>
   )
}

export default NotificationsScreen;