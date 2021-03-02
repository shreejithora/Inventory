
import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Animatable.Image 
          animation = "bounceIn"
          source = {require('../assets/userImage/nagarik.png')}
          style = {styles.logo}
          resizeMode = "stretch"
        /> */}
        <Animatable.Text style={styles.name} animation= "bounceIn">NAGARIK</Animatable.Text>
      </View>
      <Animatable.View 
        animation = "fadeInUpBig"
        style={styles.footer}
      >
        <Text style={styles.heading}>A higher financial altitude.</Text>
        <Text style={{color: 'white', fontFamily: 'sans-serif-light'}}>Connect with us</Text>
        <TouchableOpacity 
        onPress={ () => {navigation.navigate('SignInScreen')}}>
          <View style={styles.signIn}>
            <Text style={styles.signText}>Get Started</Text>
            <MaterialIcons 
              name="navigate-next" 
              color={'white'} 
              size={20} />
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a4b80'
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a4b80'
  },
  logo: {
    borderRadius: 50
  },
  name: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
    fontFamily: 'sans-serif'    
  },  
  heading: {
    fontFamily: 'sans-serif',
    color: '#fff',
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 25
  },
  signIn: {
    flexDirection: 'row',
    backgroundColor: '#0874cc',
    marginTop: 15,
    padding: 15,
    height: 50,
    width: 150,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signText:{
    marginRight: 5,
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold'
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#065ba1',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30 
  }
});