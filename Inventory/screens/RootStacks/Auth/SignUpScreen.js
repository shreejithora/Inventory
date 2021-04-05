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
   ScrollView,
   Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import RadioForm from 'react-native-radio-form';

const SignInScreen = ({ navigation }) => {
   const [data, setData] = React.useState({
      email: '',
      username:'',
      password: '',
      confirmPassword: '',
      checkInputChange: false,
      secureTextEntry: true,
      confirmSecureTextEntry: true,
      isValidEmail: true,
      isValidUser:true,
      isValidPass: true,
      isValidConfirmPass:true
   })
const regexEmail="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]$"
const handleValidEmail=(val)=>{
     if(val.match(regexEmail)){
          setData({
               ...data,
               email:val,
               isValidEmail:true
          })
     }else{
          setData({
               ...data,
               email:val,
               isValidEmail:false
          })
     }
}
const regexName= "^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$"
const handleValidUser=(val)=>{
   if(val.match(regexName)){
      setData({
         ...data,
         username:val,
         isValidUser:true
      })
   }else{
      setData({
         ...data,
         username:val,
         isValidUser:false
      })
   }
}
const regexPass="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$"
   const handlePassChange = (val) => {
      if(val.match(regexPass)){
         setData({
            ...data,
            password: val,
            isValidPass:true
         })
      }else{
         setData({
            ...data,
            password: val,
            isValidPass:false
         })
      }
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
     if(data.password==val){
      setData({
         ...data,
         confirmPassword: val,
         isValidConfirmPass:true
      })
   }else{
       setData({
          ...data,
          confirmPassword:val,
          isValidConfirmPass:false
       })
   }
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
 <ScrollView>
         <View style={styles.fields}>
            <View style={styles.inputs}>
               <Text style={styles.texts}>Email</Text>
               <TextInput
                  style={styles.textInputs}
                  placeholder="Email Address" 
                  onChangeText={(val)=>handleValidEmail(val)}
                  onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
               />
               {
                    data.isValidEmail?
                    null:
                    <Animatable.Text animation='fadeIn' style={styles.errMsg}>Invalid email address</Animatable.Text>
               }
            </View>
            <View style={styles.inputs}>
               <Text style={styles.texts}>Username</Text>
               <TextInput
                  style={styles.textInputs}
                  placeholder="Username" 
                  onChangeText={(val)=>handleValidUser(val)}
                  onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
               />
               {
                    data.isValidUser?
                    null:
                    <Animatable.Text animation='fadeIn' style={styles.errMsg}>Invalid Username</Animatable.Text>
               }
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
               {
               data.isValidPass?
               null:
               <Animatable.Text animation='fadeIn' style={styles.errMsg}>1.At least 8 characters long,{'\n'}
               2.One lowercase one uppercase,{'\n'}3.One number and one special character,{'\n'}
               4.No whitespaces.</Animatable.Text>
            }

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
                        {
                           data.isValidConfirmPass?
                           null:
                           <Animatable.Text animation='fadeIn' style={styles.errMsg}>Password doesn't match</Animatable.Text>
                        }
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
         </ScrollView>
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
   errMsg: {
     marginLeft: 20,
     color: 'red',
     fontSize: 12
  },
})