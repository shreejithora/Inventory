
import React, { useState } from 'react';
import { 
   Text, 
   View, 
   TouchableOpacity, 
   StyleSheet,
   FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IncomeCard from '../../../components/Entries/Income/IncomeCard';
import IncomeChart from '../../../components/Entries/Income/IncomeChart';

const IncomeList = require('../../../models/Entries.json');

const IncomeScreen = () => { 

   const [state, setState] = useState({
      status: ''
   });

   const [value, setValue] = useState('0');

   const [IncomeData, setIncomeData] = useState({
      allIncomes: IncomeList,
      filteredIncomes: IncomeList
   })

   const [graph, setGraph] = useState(true)

   const [graphData, setGraphData] = useState([]);

   const [picker, setPicker] = useState({
      all: false,
      day: true,
      week: false,
      month: false,
      year: false
   })
   
   const handlePickerchange = val => {

      const newDate = new Date();
      let DateVal = 0;

      if(val == "all"){
          setIncomeData({
            filteredIncomes: IncomeList
         }) 
         setPicker({ 
            all: true,
            day: false,
            week: false,
            month: false,
            year: false
         })
      } else if(val == "day"){
         setPicker({ 
            all: false,
            day: true,
            week: false,
            month: false,
            year: false
         })
         const date = newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate();        
         const todayValue = IncomeList.filter( item => {
            return item.last_updated == String(date)
         })
         setIncomeData({
            filteredIncomes: todayValue
         })
         const len = todayValue.length;
         for( let i=0; i<len; i++){
            DateVal = (todayValue[i].sold_quantity * todayValue[i].price)+DateVal;
         }
         setValue(DateVal);      
      }  
      else if(val == "week"){
         setPicker({ 
            all: false,
            day: false,
            week: true,
            month: false,
            year: false
         });    
         let week = [];

         for (let i = 0; i<7; i++) {
            const first = newDate.getDate() + newDate.getDay() + 1;
            const day = new Date(newDate.setDate(first)).toISOString().slice(0,10);
            week.push(day)
         }     
      }  
      else if(val == "month"){
         setPicker({ 
            all: false,
            day: false,
            week: false,
            month: true,
            year: false
         });
         const date = newDate.getFullYear()+'-'+(newDate.getMonth()+1); 
         const monthValue = IncomeList.filter( item => {
            return item.last_updated.substring(0,6) == String(date)
         })
         setIncomeData({
            filteredIncomes: monthValue
         })
         const len = monthValue.length;
         for( let i=0; i<len; i++){
            DateVal = (monthValue[i].sold_quantity * monthValue[i].price)+DateVal;
         }
         setValue(DateVal);

         let dataForGraph = [];
         let y = 0;

         // for(let i= 0; i<len; i++){
         //    const x = new Date(monthValue[i].last_updated)
         //    for (let j = 0; j<len; j++){
         //       const curr = new Date(monthValue[j].last_updated) 
         //       if(x.getMonth().toString() == curr.getMonth().toString()){
         //          y = monthValue[j].sold_quantity * monthValue[j].price + y;
         //       }
         //    }                        
         //    dataForGraph.push({x: x, y: y})
         // }
         // setGraphData(dataForGraph);
         for(let i= 0; i<len; i++){
            const x = new Date(monthValue[i].last_updated)
            const y = monthValue[i].sold_quantity * monthValue[i].price;
            dataForGraph.push({x: x, y: y})
         }
         setGraphData(dataForGraph);
      }  
      else if(val == "year"){
         setPicker({ 
            all: false,
            day: false,
            week: false,
            month: false,
            year: true
         });
         const date = newDate.getFullYear();    
         const yearValue = IncomeList.filter( item => {
            return item.last_updated.substring(0,4) == String(date)
         })
         setIncomeData({
            filteredIncomes: yearValue
         })
         const len = yearValue.length;
         for( let i=0; i<len; i++){
            DateVal = (yearValue[i].sold_quantity * yearValue[i].price)+DateVal;
         }
         setValue(DateVal);

         let dataForGraph = [];

         for(let i= 0; i<len; i++){
            const x = new Date(yearValue[i].last_updated)
            const y = yearValue[i].sold_quantity * yearValue[i].price;
            dataForGraph.push({x: x, y: y})
         }
         setGraphData(dataForGraph);
      } 
   }

   return(
      <View style={styles.container}>
         <View style={styles.mainActitivity}> 
         {
            picker.all ?
            null :
            <View style={styles.IncomeSection}>               
               <Text style={styles.IncomeDisplay}>                  
                  Income: NRs. {value}                 
               </Text>              
               <View style={{display: graph ? 'flex' : 'none' }}>
                  <IncomeChart data={graphData} /> 
               </View>
               <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}} onPress={() => setGraph(!graph)}>   
                     <Text style={{color: '#078bab'}}>{graph ? "Close Graph" : "See Graph"}</Text>                                         
                  <Icon  
                     style={{padding: 5}}                       
                     name={
                        graph ? 
                        "arrow-up-drop-circle-outline" : 
                        "arrow-down-drop-circle-outline"
                     } 
                     size={30} 
                     color="#078bab" 
                  />                                        
               </TouchableOpacity>
            </View>
         }            
            
            <View style={styles.pickDate}>
               <TouchableOpacity style={picker.all ? styles.picked : null} onPress={() => handlePickerchange("all")}>
                  <Text style={[styles.DateTexts, {color: picker.all ? '#fff' : '#078bab'}]}>All</Text>
               </TouchableOpacity>
               <TouchableOpacity style={picker.day ? styles.picked : null} onPress={() => handlePickerchange("day")}>
                  <Text style={[styles.DateTexts, {color: picker.day ? '#fff' : '#078bab'}]}>1D</Text>
               </TouchableOpacity>
               <TouchableOpacity style={picker.week ? styles.picked : null} onPress={() => handlePickerchange("week")}>
                  <Text style={[styles.DateTexts, {color: picker.week ? '#fff' : '#078bab'}]}>1W</Text>
               </TouchableOpacity>
               <TouchableOpacity style={picker.month ? styles.picked : null} onPress={() => handlePickerchange("month")}>
                  <Text style={[styles.DateTexts, {color: picker.month ? '#fff' : '#078bab'}]}>1M</Text>
               </TouchableOpacity>
               <TouchableOpacity style={picker.year ? styles.picked : null} onPress={() => handlePickerchange("year")}>
                  <Text style={[styles.DateTexts, {color: picker.year ? '#fff' : '#078bab'}]}>1Y</Text>
               </TouchableOpacity>
            </View>                
            <View style={styles.cardContent}>  
               <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}> ID</Text> 
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left', fontWeight: '700'}]}>Product</Text>             
               <Text style={[styles.cardTitle, {flex: 2, textAlign: 'center', fontWeight: '700'}]}>Income (In Rs.)</Text>
            </View>             
            { 
               IncomeData.filteredIncomes == null ?
               <View opacity={0.5} style={styles.errorDisplay}>
                  <Icon name="clipboard-alert-outline" size={30} color='#078bab'/>
                  <Text style={styles.errorMsg}>No Match Found</Text>  
                                 
               </View> :
               <FlatList 
                  data = {IncomeData.filteredIncomes}
                  keyExtractor = {item => item.product_id}
                  renderItem = { ({item}) =>                  
                     <IncomeCard items={item}/>                                    
                  }
               />
            }            
         </View>                               
      </View>    
   )
}

export default IncomeScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e6f1fa',
   },
   picker: {      
      paddingHorizontal: 8,
      paddingTop: 8
   },
   IncomeSection: {
      borderRadius: 5,
      alignSelf: 'center',
      marginTop: 10,
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#fafafa',
   },
   IncomeDisplay: {
      color: '#078bab',
      fontWeight: '700',
      fontSize: 18,
      paddingHorizontal: 20, 
   },
   pickDate: {
      marginTop: 10,
      flexDirection: 'row', 
      justifyContent: 'space-around',
      paddingVertical: 10
   },
   picked: {
      padding: 8,
      width: '15%',
      borderRadius: 50,
      backgroundColor: '#078bab'
   },
   DateTexts: {
      fontWeight: '700',
      color: '#078bab',
      fontSize: 18, 
      alignSelf: 'center'     
   },
   mainActitivity: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#e6f1fa',
   },   
   cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginTop: 10
   },
   cardTitle:{
      marginHorizontal: 5,
      color: '#078bab',
      fontSize: 18,
   },
   errorDisplay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',            
   },
   errorMsg: {
      color: '#078bab',
      fontSize: 20
   }
})