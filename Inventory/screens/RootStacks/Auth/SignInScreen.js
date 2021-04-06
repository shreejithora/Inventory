
import React, {useState, useContext} from 'react';

import { 
   View,
   Text, 
   TextInput,   
   TouchableOpacity,
   StyleSheet,
   Alert
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

import { UserContext } from '../../../context/UserContext';

const SignInScreen = ({ navigation }) => {

   const { login } = useContext(UserContext);

   const [isValidUser, setIsValidUser] = useState(true)

   const [isValidAll, setIsValidAll] = useState(true)

   const [email, setData] = React.useState({
      email: '',      
      checkInputChange: false,
   })

   const [password, setPassword] = React.useState({
      password: '',
      secureTextEntry: true,
   })

   const updateSecureTextEntry = () => {
      setPassword({
         ...password,
         secureTextEntry: !password.secureTextEntry
      })
   }

   const [token, setToken] = useState('');   
   const atoken = "12345"   

   const loginHandle = async(mail, pass) => {   

      setToken(atoken);   
      if (email.email.length == 0 || password.password.length == 0) {
         setIsValidAll(false)
         setIsValidUser(true)
         return;
      } else {
         setIsValidAll(true)      
         try{
            const users = await firestore()
            .collection('users')
            .get()
            .then( querySnapshot => {                       
               querySnapshot.forEach( documentSnapshot => {
                  let email = documentSnapshot.data().email               
                  let password = documentSnapshot.data().password              
                  if( email == mail && password == pass){
                     login(email,password, token)
                  } else {
                     setIsValidUser(false)
                     return;
                  }
               })            
            }); 
         } catch (e) {
            console.log(e);
         }
      }                    
   }

   const handleValidEmail = (val) => {      
         setData({
            ...email,
            email: val.toLowerCase(),            
         })   
   }
   const handleValidPass = (pass) => {
         setPassword({
            ...password,
            password: pass,
            // isValidPass: true
         })
   }

 return (
      <View style={styles.container}>
      <View style={styles.header}>
         <Animatable.Image 
            animation="fadeInDown"
            source = {require('../../../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
         />
      </View>
      <Animatable.View 
         animation="fadeInUpBig"
         style={styles.footer}>      

         <View style={styles.fields}>
            {  
               isValidUser ?
               null :
               <Animatable.Text animation="fadeIn" style={styles.errMsg}>Email and Password doesnot match</Animatable.Text>
            } 
            {  
               isValidAll ?
               null :
               <Animatable.Text animation="fadeIn" style={styles.errMsg}>Email and Password Fields cannot be Empty</Animatable.Text>
            } 
            <View style={styles.inputs}>
               <Text style={styles.texts}>Email</Text>
               <TextInput
                  style={styles.textInputs}
                  placeholder="Email" 
                  onChangeText = { (val) => {handleValidEmail(val)}}
                  onEndEditing = { (e) => handleValidEmail(e.nativeEvent.text)}
               />
            </View>            

            <View style={styles.inputs}>
               <Text style={styles.texts}>Password</Text>
               <View style={{flexDirection: 'row'}}>
                  <TextInput
                     style={[styles.textInputs, {flex: 10}]}
                     secureTextEntry={password.secureTextEntry ? true : false}
                     placeholder="Password" 
                     onChangeText = { (val) => handleValidPass(val)}  
                     onEndEditing = { (e) => handleValidPass(e.nativeEvent.text)}
                  />
                  <TouchableOpacity
                  onPress={updateSecureTextEntry}>
                     {password.secureTextEntry ?
                     <Feather 
                        style={[styles.textInputs, {justifyContent: 'flex-end'}]}
                        name="eye-off"
                        color="grey"
                        size= {20}
                     /> :
                     <Feather 
                        style={[styles.textInputs, {justifyContent: 'flex-end'}]}
                        name="eye"
                        color="grey"
                        size= {20}
                     /> }
                  </TouchableOpacity>
               </View>
            </View>
            {/* {  
               password.isValidPass ?
               null :
               <Animatable.Text animation="fadeIn" style={styles.errMsg}>Password doesn't match.</Animatable.Text>
            }  */}

            <TouchableOpacity 
               style={styles.button}
               onPress={() => loginHandle(email.email, password.password)}
               >
               <Text style={[styles.texts,{color: '#fff', fontWeight: 'bold'}]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
               <Text style={styles.forgotPass}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity 
               style={[styles.button, {backgroundColor: '#fff', borderWidth: 1, borderColor: '#078bab'}]}
               onPress={ () => {navigation.navigate('SignUpScreen')}}>
               <Text style={[styles.texts,{color: '#078bab', fontWeight: 'bold'}]}>Register Account</Text>
            </TouchableOpacity>
         </View>
      </Animatable.View>
   </View>
 );
}


export default SignInScreen;

const styles =  StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#078bab'
   },
   header: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#078bab'
   },
   logo: {
      borderRadius: 50,
      height: 100,
      width: 100
   },
   errMsg: {
      marginLeft: 20,
      color: 'red',
      fontSize: 14
   },
   fields: {
      margin: 20
   }, 
   inputs: {
      flexDirection: 'column',
      padding: 15,
      // borderBottomColor: 'grey',
      // borderBottomWidth: 1,
   },
   texts: {
      fontSize: 20,
      color: '#078bab'
   },
   textInputs: {
      height: 40,
      borderRadius: 5,
      // marginTop: Platform.OS == 'ios' ? 0 : -12,
      // backgroundColor: '#fff',
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      marginTop: 5,
   },
   button: {
      backgroundColor: '#078bab',
      margin: 20,
      padding: 15,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center'
   },
   forgotPass: {
      marginTop: -10,
      marginRight: 30,
      color: '#078bab', 
      fontSize: 15,
      fontWeight: 'bold', 
      textAlign: 'right'
   },
   line: {
      borderBottomColor: '#edebeb',
      borderBottomWidth: 1,
      marginBottom: 5,
      marginTop: 25
   },
   footer: {
      flex: 2,
      // backgroundColor: '#078bab',
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30 
   },
})