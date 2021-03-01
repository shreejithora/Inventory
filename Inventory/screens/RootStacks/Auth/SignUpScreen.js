import React, {useState}from 'react';
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
   ScrollView
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import RadioForm from 'react-native-radio-form';

const SignInScreen = ({ navigation }) => {
   const [data, setData] = React.useState({
      phone: '',
      password: '',
      confirmPassword: '',
      checkInputChange: false,
      secureTextEntry: true,
      confirmSecureTextEntry: true,
      isValidPhone: true,
      isValidPass: true
   })

   const handlePassChange = (val) => {
         setData({
            ...data,
            password: val
         })
   }

   const updateSecureTextEntry = () => {
      setData({
         ...data,
         secureTextEntry: !data.secureTextEntry
      })
   }

   const updateConfirmSecureTextEntry = () => {
      setData({
         ...data,
         confirmSecureTextEntry: !data.confirmSecureTextEntry
      })
   }

   const handleConfirmPassChange = (val) => {
      setData({
         ...data,
         confirmPassword: val
      })
   }

   const[users,setUsers]=useState([
     { label: "Super Admin", value: 0},
     { label: "Employees", value: 1},
   ]);

   // const handleRegister = (phone, password, confirmPassword) => {
   //    signUp(phone, password)
   // }

 return (
   <View style={styles.container}>
      <View style={styles.header}>
         {/* <Animatable.Image 
            animation="fadeInDown"
            source = {require('./../../assets/userImage/nagarik.png')}
            style={styles.logo}
            resizeMode="stretch"
         /> */}
      </View>
      
      <Animatable.View 
         animation="fadeInUpBig"
         style={styles.footer}>
         <View style={styles.fields}>
            <View style={styles.inputs}>
               <Text style={styles.texts}>Phone / Account Number</Text>
               <TextInput
                  style={styles.textInputs}
                  placeholder="Phone / Account Number" 
               />
            </View>
            <View style={styles.inputs}>
               <Text style={styles.texts}>Password</Text>
               <View style={{flexDirection: 'row'}}>
                  <TextInput
                     style={[styles.textInputs, {flex: 10}]}
                     secureTextEntry={data.secureTextEntry ? true : false}
                     placeholder="Password" 
                     onChangeText = { (val) => handlePassChange(val)}  
                  />
                  <TouchableOpacity
                  onPress={updateSecureTextEntry}>
                     {data.secureTextEntry ?
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

             <View style={styles.inputs}>
               <Text style={styles.texts}>Password Confirmation</Text>
               <View style={{flexDirection: 'row'}}>
                  <TextInput
                     style={[styles.textInputs, {flex: 10}]}
                     secureTextEntry={data.confirmSecureTextEntry ? true : false}
                     placeholder="Re-type Password" 
                     onChangeText = { (val) => handleConfirmPassChange(val)}  
                  />
                  <TouchableOpacity
                  onPress={updateConfirmSecureTextEntry}>
                     {data.confirmSecureTextEntry ?
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
            <View style={styles.inputs}>
            <Text style={styles.texts}>User Roles</Text>
               <RadioForm 
                                 dataSource={users}
                                 initial={2}
                              //    onPress={ (value) => setLoanFields({...loanFields, income: value})}
                                 circleSize={20}
                                 outerColor="#078bab"
                              />
                 </View>   

            
            <TouchableOpacity 
               style={[styles.button, {backgroundColor: '#fff', borderWidth: 1, borderColor: '#078bab'}]}
               onPress={ () => {navigation.navigate('SignInScreen')}}>
               <Text style={[styles.texts,{color: '#078bab', fontWeight: 'bold'}]}>Register</Text>
            </TouchableOpacity>
             {/* <TouchableOpacity 
               style={styles.button}
               onPress={ () => {alert('clicked')}}>
               <Text style={[styles.texts,{color: '#fff', fontWeight: 'bold'}]}>Login</Text>
            </TouchableOpacity> */}
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
      color: '#000', 
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
      flex: 3,
      // backgroundColor: '#078bab',
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30 
   },
})