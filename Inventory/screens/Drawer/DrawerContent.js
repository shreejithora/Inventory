import React, { useState } from 'react';

import { View, TouchableOpacity, StyleSheet } from 'react-native';

import {
   Avatar,
   Title,
   Caption,
   Drawer 
} from 'react-native-paper';

import {
   DrawerContentScrollView,
   DrawerItem
} from '@react-navigation/drawer';
import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerContent = (props) => {

   const [modalToggle, setModalToggle] = useState(false);

   return(
      <View style={styles.container}>
      {/* DrawerHeader */}
         <DrawerContentScrollView {...props}>
         <View style={styles.topDrawer}>
            <View style={styles.userinfo}>
               <TouchableOpacity onPress={() => setModalToggle(true)}>
               <View style={styles.userTop}>
                  <Avatar.Image 
                     source= {{
                     uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC' }}/>
                  <View style={styles.title}>
                     <Title style={{fontWeight: 'bold'}}>Shreejit Hora</Title>          
                     <Caption>@shreejithora</Caption>
                  </View> 
               </View>
               </TouchableOpacity>            
            </View>
            <Drawer.Section style={styles.menuDrawer} title="Basics">               
               <DrawerItem 
               icon = { ({color, size}) => <Icon name="cash-multiple" color='black' size={size}/>}
               label="Home"
               labelStyle= {{color: 'black'}}
               onPress = { () => {props.navigation.navigate('Home')}}
               />
               <DrawerItem 
               icon = { ({color, size}) => <Icon name="cash-multiple" color='black' size={size}/>}
               label="Products"
               labelStyle= {{color: 'black'}}
               onPress = { () => {}}
               />
               <DrawerItem 
               icon = { ({color, size}) => <Icon name="chart-line" color='black' size={size}/>}
               label="Sales"
               labelStyle= {{color: 'black'}}
               onPress = { () => {}}
               />
            </Drawer.Section>
            <Drawer.Section style={styles.menuDrawer} title="Vendors">
               <DrawerItem 
               icon = { ({color, size}) => <Icon name="account-cash" color='black' size={size}/>}
               label="Suppliers"
               labelStyle= {{color: 'black'}}
               onPress = { () => {props.navigation.navigate('Loan')}}
               />
               <DrawerItem 
               icon = { ({color, size}) => <Icon name="checkbook" color='black' size={size}/>}
               label="Customers"
               labelStyle= {{color: 'black'}}
               onPress = { () => {props.navigation.navigate('Cheques')}}
               />
            </Drawer.Section>
            <Drawer.Section style={styles.menuDrawer} title="Entries">
               <DrawerItem 
               icon = { ({color, size}) => <Icon name="account-cash" color='black' size={size}/>}
               label="Income"
               labelStyle= {{color: 'black'}}
               onPress = { () => {props.navigation.navigate('Loan')}}
               />
               <DrawerItem 
               icon = { ({color, size}) => <Icon name="checkbook" color='black' size={size}/>}
               label="Expense"
               labelStyle= {{color: 'black'}}
               onPress = { () => {props.navigation.navigate('Cheques')}}
               />
            </Drawer.Section>
            <Drawer.Section style={styles.menuDrawer} title="Users">
               <DrawerItem 
               icon = { ({color, size}) => <Icon name="home-outline" color='#000' size={size}/>}
               label="Admin"
               labelStyle= {{color: '#000'}}
               onPress = { () => {}}
               />
               <DrawerItem 
               icon = { ({color, size}) => <Icon name="cash-multiple" color='black' size={size}/>}
               label="Staff"
               labelStyle= {{color: 'black'}}
               onPress = { () => {}}
               />
               <DrawerItem 
               icon = { ({color, size}) => <Icon name="chart-line" color='black' size={size}/>}
               label="Accounts"
               labelStyle= {{color: 'black'}}
               onPress = { () => {}}
               />
            </Drawer.Section>
         </View>
         </DrawerContentScrollView>
         <Drawer.Section style={styles.bottomDrawer}>
         <DrawerItem 
            icon = { ({color, size}) => <Icon name="cog-outline" color='#000' size={size}/>}
            label="Quotation"
            labelStyle= {{color: '#000'}}
            onPress = { () => {}}
         />
         <DrawerItem 
            icon = { ({color, size}) => <Icon name="exit-to-app" color={color} size={size}/>}
            label="Sign Out"
            onPress = { () => {}}
         />
         </Drawer.Section>
         <Modal 
            style={styles.modal}
            isVisible={modalToggle} 
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutDown'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            animationInTiming={500}
            animationOutTiming={500}> 
            <View style={styles.modalView}>       
               <Icon 
                  style={styles.buttonIcon}
                  name="close"
                  size={30}
                  color="#065ba1"                                   
                  onPress={ () => setModalToggle(false)}
               />                                      
            </View>                                           
         </Modal>
      </View>
   )
}

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
      opacity: 0.8
  },
  userTop: {
      marginTop: 20,
      marginLeft: 15,
      flexDirection: 'row',
      alignItems: 'center',
  },
  menuDrawer: {
      marginTop: 5,
  },
  title: {
      marginHorizontal: 10,
  },
  bottomDrawer: {
      borderTopColor: '#dddddd',
      borderTopWidth: 1,

  },
  modal: {
      flex: 1,
      justifyContent: 'flex-start',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      flex: 1,
      marginTop: 100,
      backgroundColor: '#fff',
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
  },
  modalView: {
      marginTop: 0
  },
  modalText: {   
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065ba1',
    textAlign: 'center'
  },
  buttonIcon: {
    marginTop: 15, 
    padding: 3, 
    alignSelf: 'center', 
    backgroundColor: "#c7e6ff", 
    borderRadius: 50
  },
  texts: {
    fontSize: 20,
    color: '#065ba1'
  }, 
})