import React, {useState} from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import IncomeInfo from "./IncomeInfo";

// const IncomeList = require('../../../models/Sales.json');

const ExpenseCard = ({items, costData, sellData}) => { 

   const numbering = num => {
      let x = num;
      x=x.toString();
      // x=x.split('.')[0];
      let y = 0;
      if(x.includes('.')){
         y = '.'+x.split('.')[1]
         x = x.split('.')[0]
         let lastThree = x.substring(x.length-3);
         const otherNumbers = x.substring(0,x.length-3);
         if(otherNumbers != '')
            lastThree = ',' + lastThree;
         const val = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree; 
         return (val+y);
      } else {
         let lastThree = x.substring(x.length-3);
         const otherNumbers = x.substring(0,x.length-3);
         if(otherNumbers != '')
            lastThree = ',' + lastThree;
         const val = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree; 
         return (val);
      }
   }  

   const time = val => {
      const date1 = val
      const hour = new Date(date1).toString().substr(16, 2)
      let hrin12 = hour%12;
      if( hrin12 == "0"){
         hrin12 = 12
      }
      const min = new Date(date1).toString().substr(18, 3)
      let date = null;
      if(hour>=0 && hour<12){
         return date = hrin12+min+'AM';
      } else {
         return date = hrin12+min+'PM';
      }
   }

   const profit = (Number(sellData) - Number(costData)).toFixed(2)

   const [incomeDetailModal, setIncomeDetailModal] = useState(false);

   return(
      <View>
         <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
            <TouchableOpacity onPress={() => setIncomeDetailModal(!incomeDetailModal)}>
               <View style={styles.cardContent}>                    
                  <Text style={[styles.cardTitle, {flex: 3, textAlign: 'left'}]}>
                     {items.product_name.length > 14 ? items.product_name.slice(0,14)+'...' : items.product_name}
                  </Text>  
                  <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center'}]}>{items.cost_price}</Text>
                  <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center'}]}>{items.bought_quantity}</Text> 
                  <Text style={[styles.cardTitle, {flex: 2, fontSize: 15, textAlign: 'center'}]}>{numbering(items.bought_quantity * items.cost_price)}</Text> 
               </View>   
               <Text style={[styles.cardTitle, {flex: 1.5, textAlign: 'left', fontSize: 13}]}>{time(items.updated.toDate())}</Text>  
                     
            </TouchableOpacity>
            
         </Animatable.View>  
         <Modal 
            style={styles.detailModal}
            isVisible={incomeDetailModal} 
            onBackButtonPress = {() => setIncomeDetailModal(!incomeDetailModal)}
            transparent={true} 
            animationIn='slideInUp' 
            animationOut='slideOutUp'
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={300}
            animationInTiming={500}
            animationOutTiming={300}> 
            <View style={styles.modalView}>                         
               {/* <IncomeInfo item={items}/>  */}
               <View style={{flexDirection: 'row',justifyContent: 'space-between', bottom: 0, right: 0}}>
                     <Animatable.View 
                        animation="fadeInLeft"
                        duration={1000}
                        style={styles.history}>    
                        <Icon                         
                           name="progress-clock" 
                           color="#078bab" 
                           size={20} 
                        />              
                        <Text style={[styles.cardTitle, {marginLeft: 5, fontWeight: '700', fontSize: 18}]}>View History</Text>
                     </Animatable.View>
                  <View style={{alignSelf: 'flex-end', position:'absolute', bottom: 20, right: 20 }}>
                     <Animatable.View 
                        animation = "fadeInUpBig"
                        duration = {1000}
                     >
                        <Icon 
                           style={[styles.buttonIcon, {marginBottom: 10}]} 
                           name="delete-outline" 
                           color="#078bab" 
                           size={30}  
                        />
                     </Animatable.View>
                     <Animatable.View 
                        animation = "fadeInUpBig"
                        duration = {800}
                     >
                        <Icon 
                           style={[styles.buttonIcon, {marginBottom: 10}]} 
                           name="pencil-outline" 
                           color="#078bab" 
                           size={30}  
                        />
                     </Animatable.View>
                     <Animatable.View
                        animation = "fadeInUpBig"
                        duration = {600}
                     >
                        <Icon 
                           style={styles.buttonIcon}
                           name="close"
                           size={30}
                           color="#078bab"                                   
                           onPress={ () => setIncomeDetailModal(false)}
                        />
                     </Animatable.View>                  
                  </View>  
               </View>                                
            </View>                                           
         </Modal>
      </View>             
   )
}

export default ExpenseCard;

const styles = StyleSheet.create({
   cardTitle:{
      // marginHorizontal: 5,
      color: '#078bab',
      fontSize: 18,
   },
   card: {
      padding: 15,
      backgroundColor: '#fff',
      flex: 1,
      // marginVertical: 5,
      marginLeft: 5,
      marginRight: 5,   
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1,   
      
   },
   cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 15,
   },
   cardInfo: {      
      marginLeft: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   detailModal: {
      position: 'relative',
      flex: 1,
      borderRadius: 30,
      marginVertical: 100,
      backgroundColor: '#fff',
      marginHorizontal: 20,
   },
   buttonIcon: {   
      alignSelf: 'flex-end',
      padding: 3, 
      backgroundColor: "#c7e6ff", 
      borderRadius: 50
   },
   modalView: {
      flex: 1,
      position: 'relative',      
   },
    history: {
      padding: 5,
      alignItems: 'center',
      flexDirection: 'row', 
      position:'absolute', 
      bottom: 20, 
      left: 20, 
      backgroundColor: '#c7e6ff',
      borderRadius: 30
   }
})