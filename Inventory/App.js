import 
  React, 
  {
    useState, 
    useEffect, 
    useReducer, 
    useMemo
  } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';

import 'react-native-gesture-handler';

import {UserProvider} from './context/UserContext';
// import * as Animatable from 'react-native-animatable';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import auth from '@react-native-firebase/auth';

import RootStackScreen from './screens/RootStacks/RootStackScreen';
import DrawerContent from './screens/Drawer/DrawerContent';
import HomeTabNav from './navigation/HomeTabNav';
import SettingsNav from './navigation/SettingsNav';
import UsersNav from './navigation/UsersNav';
import VendorsNav from './navigation/VendorsNav';
import SalesNav from './navigation/SalesNav';
import QuotationNav from './navigation/QuotationNav';

const Drawer = createDrawerNavigator();

const App = () => {

  const initialLoginState = {
    isLoading: true,
    email: null,
    password: null,
    username: null,
    userToken: null,
    role: null,
  };

  const LoginReducer = ( prevState = initialLoginState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN': return {
        ...prevState,
        userToken: action.token,
        isLoading: false
      };
      case 'LOGIN': return {
        ...prevState,
        email: action.email,
        isLoading: false
      };
      case 'SIGNOUT': return {
        ...prevState,
        email: null,
        password: null,
        userToken: null,
        isLoading: false
      };
      case 'REGISTER': return {
        ...prevState,
        userToken: action.token,
        email: action.email,
        username: action.username,
        password: action.password,
        role: action.role,
        isLoading: false
      };
    }
  };

  const [loginState, dispatch] = useReducer(LoginReducer, initialLoginState);

  const authContext = useMemo( () => ({
    login: async( e_mail, password ) => {
      try{
        await auth().signInWithEmailAndPassword(e_mail, password)
      } catch (e){
        Alert.alert('Error !', e, [{text: 'Ok'}])
      }
      dispatch({type: 'LOGIN', email: e_mail });
    },
    signOut: async() => {
      try{
        await auth().signOut();
      } catch (e) {
        Alert.alert('Error !', e, [{text: 'Ok'}])
      }
      dispatch({ type: 'SIGNOUT'})
    },
    signUp: async(email, password) => {
      try{
        await auth().createUserWithEmailAndPassword(email, password)
      } catch (e) {
        Alert.alert('Error !', e, [{text: 'Ok'}]);
      }
    }
  }), []);

  useEffect(() => {
    setTimeout( async() => {
      let userToken;
      userToken = null;
      try{
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        Alert.alert('Error !', e, [{text: 'Ok'}]);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken})
    }, 1000);
  }, [])

  if( loginState.isLoading ) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#078bab'}}>
          <Image 
            animation="fadeIn"
            source={require('./assets/logo.png')}
            style={{height: 200, width: 200, borderRadius: 100}}
          />
        </View>
    )
  }
  return(
    <UserProvider value={authContext}>
    <NavigationContainer>
      {
        loginState.userToken == null ? 
        <RootStackScreen/> :
        <Drawer.Navigator drawerContent={ props => <DrawerContent {...props}/>}>
          <Drawer.Screen name="Home" component = { HomeTabNav } />
          <Drawer.Screen name="Users" component = { UsersNav } />
          <Drawer.Screen name="Vendors" component = { VendorsNav } />
          <Drawer.Screen name="Sales" component = { SalesNav } />
          <Drawer.Screen name="Settings" component = { SettingsNav } />
          <Drawer.Screen name="Quotation" component = { QuotationNav } />
        </Drawer.Navigator>        
      }
    </NavigationContainer>
    </UserProvider>
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