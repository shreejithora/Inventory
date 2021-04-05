import React from 'react';
import { 
   View,
   Text, 
   TextInput,
   Button,
   TouchableOpacity,
   Platform,
   StyleSheet,
   Image,
   BackHandler,
   Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

// import { UserContext } from '../../components/UserContext';
// import Users from '../../models/users';

const SignInScreen = ({ navigation }) => {
   const [email, setData] = React.useState({
      email: '',      
      checkInputChange: false,
      isValidEmail: true,
   })

   const [password, setPassword] = React.useState({
      password: '',
      isValidPass: true,
      secureTextEntry: true,
   })

//    const { signIn } = React.useContext(UserContext);   

   const updateSecureTextEntry = () => {
      setPassword({
         ...password,
         secureTextEntry: !password.secureTextEntry
      })
   }

//    const loginHandle = (phone, pass) => {
//       const foundUser = Users.filter( item => {
//          return phone == item.phone && pass == item.password; 
//       });

//       if (data.phone.length == 0 || password.password.length == 0) {
//          Alert.alert('Invalid Input !', 'Phone or Password fields cannot be empty.', [{text: 'Ok'}]);
//          return;
//       }

//       if (foundUser.length == 0) {
//          Alert.alert('Invalid User!', 'Phone or Password is Incorrect.', [{text: 'Ok'}]);
//          return;
//       }
//       signIn(foundUser);
//    }
const regexEmail="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]$"
   const handleValidEmail = (val) => {
     //  const userPhone = Users.filter( item => {
     //     return number == item.phone
     //  })
      if (val.match(regexEmail)){
         setData({
            ...email,
            email: val,
            isValidEmail: true
         })
      } else {
         setData({
            ...email,
            email: val,
            isValidEmail:false
         })
       }
   }
   const handleValidPass = (pass) => {
         setPassword({
            ...password,
            password: pass,
            isValidPass: true
         })
   }

 return (
      <View style={styles.container}>
      <View style={styles.header}>
         {/* <Animatable.Image 
            animation="fadeInDown"
            source = {require('./../../assets/userImage/nagarik.png')}
            style={styles.logo}
            resizeMode="stretch"
         /> */}
          <Text>INVENTORY</Text>
      </View>
      <Animatable.View 
         animation="fadeInUpBig"
         style={styles.footer}>
         <View style={styles.fields}>
            <View style={styles.inputs}>
               <Text style={styles.texts}>Email</Text>
               <TextInput
                  style={styles.textInputs}
                  placeholder="Email" 
                  onChangeText = { (val) => {handleValidEmail(val)}}
                  onEndEditing = { (e) => handleValidEmail(e.nativeEvent.text)}
               />
            </View>
            {  
               email.isValidEmail ?
               null :
               <Animatable.Text animation="fadeIn" style={styles.errMsg}>Email doesn't match</Animatable.Text>
            } 

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
            {  
               password.isValidPass ?
               null :
               <Animatable.Text animation="fadeIn" style={styles.errMsg}>Password doesn't match.</Animatable.Text>
            } 

            <TouchableOpacity 
               style={styles.button}
               onPress={ () => {navigation.navigate('Home')}}
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
      fontSize: 12
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