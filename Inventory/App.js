import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  return(
    <View style={styles.container}>
      <Text>Welcome to Inventory</Text>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})