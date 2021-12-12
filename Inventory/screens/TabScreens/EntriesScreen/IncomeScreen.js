
import React, { useState } from 'react';
import { useEffect } from 'react';
import { 
   Text, 
   View, 
   TouchableOpacity, 
   StyleSheet,
   FlatList,
   RefreshControl,
   ActivityIndicator
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IncomeCard from '../../../components/Entries/Income/IncomeCard';
import IncomeCard2 from '../../../components/Entries/Income/IncomeCard2';
import IncomeChart from '../../../components/Entries/Income/IncomeChart';

let ProductsList = [];
let SalesList = [];
let SalesProductsList = [];
let IncomeList = require('../../../models/Entries.json');

const IncomeScreen = () => { 

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

   const [salesData, setSalesData] = useState({
      allSales: SalesList,
      filteredSales: SalesList
   })

   const [salesProductsData, setSalesProductsData] = useState({
      allSalesProducts: SalesProductsList,
      filteredSalesProducts: SalesProductsList
   })

   const [productsData, setProductsData] = useState({
      allProducts: ProductsList,
      filteredProducts: ProductsList
   })

   const [refreshing, setRefreshing] = useState(false)

   const [refreshing1, setRefreshing1] = useState(false)

   const [otherFlats, setOtherFlats] = useState(false)

   const [loading, setLoading] = useState(false)

   const [length, setLength] = useState(1);

   useEffect( () => {      
      setTimeout( async() => {
         ProductsList = [];
         SalesProductsList = [];
         SalesList = [];
         try{
            setLoading(true)
            await firestore()
               .collection('Sales')
               .get()
               .then( querySnapshot => {
                  querySnapshot.forEach( documentSnapshot => {
                     const data = documentSnapshot.data()
                     data.id = documentSnapshot.id;
                     SalesList.push(data);
                  })
                  setSalesData({
                     allSales: SalesList,
                     filteredSales: SalesList
                  })
               })
               await firestore()
                  .collection('SalesProducts')
                  .orderBy('last_updated', 'desc')
                  .get()
                  .then( querySnapshot => {
                     querySnapshot.forEach( documentSnapshot => {
                        const data = documentSnapshot.data()
                        data.id = documentSnapshot.id;
                        SalesProductsList.push(data);
                     })
                     setSalesProductsData({
                        allSalesProducts: SalesProductsList,
                        filteredSalesProducts: SalesProductsList
                     })
                  })
               await firestore()
                  .collection('Products')
                  .get()
                  .then( querySnapshot => {
                     querySnapshot.forEach( documentSnapshot => {
                        const data = documentSnapshot.data()
                        data.id = documentSnapshot.id;
                        ProductsList.push(data);
                     })
                     setProductsData({
                        allProducts: ProductsList,
                        filteredProducts: ProductsList
                     })
                  })
               setLoading(false)
         } catch(e) {
            console.log(e)
         }
      }, 1000);
   }, [])

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
      all: true,
      day: false,
      week: false,
      month: false,
      year: false
   })
   
   const handlePickerchange = async(val) => {

      const newDate = new Date();
      let DateVal = 0;
      let total = 0;
      let cost = 0;
      let discountVal = 0;

      if(val == "all"){
         setLength(1)
         setOtherFlats(false)
         setIncomeData({
            filteredIncomes: IncomeList
         }) 
         setProductsData({
            allProducts: ProductsList,
            filteredProducts: ProductsList
         })
         setPicker({ 
            all: true,
            day: false,
            week: false,
            month: false,
            year: false
         })
      } else if(val == "day"){
         setOtherFlats(true)
         setPicker({ 
            all: false,
            day: true,
            week: false,
            month: false,
            year: false
         })
         const date = new Date();        
         const todayValue = SalesProductsList.filter( item => {
            return item.last_updated.toDate().toDateString() == date.toDateString()
         })
         // todayValue.forEach( data => {
         //    try{
         //       firestore()
         //          .collection('Products')
         //          .doc(data.product_id)
         //          .get()
         //          .then( doc => {
         //             console.log(doc)
         //          })
         //    } catch(e) {
         //       console.log(e)
         //    }
         // })         
         setSalesProductsData({
            ...salesProductsData,
            allSalesProducts: todayValue,
            filteredSalesProducts: todayValue
         })
                
         const len = todayValue.length;
         setLength(len)
         if( len == 0 ) {
            return;
         } else {
            for( let i=0; i<len; i++){
               if(todayValue[i].discount == ""){
                  DateVal = (Number(todayValue[i].sold_quantity) * Number(todayValue[i].selling_price))+DateVal;
               } else {
                  total = Number(todayValue[i].sold_quantity) * Number(todayValue[i].selling_price);
                  cost = Number(todayValue[i].cost_price) * Number(todayValue[i].sold_quantity);
                  discountVal = total - ((Number(todayValue[i].discount)/100) * total)
                  DateVal = DateVal + (discountVal - cost);
               }                      
            }
            setValue(DateVal); 
         }              
      }  
      else if(val == "week"){
         setOtherFlats(true)
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
         setOtherFlats(true)
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
         //          console.log(y)
         //       }  
         //    }                        
         //    dataForGraph.push({x: x, y: y})
         // }
         // setGraphData(dataForGraph);
         for(let i= 0; i<len; i++){
            const y = new Date(monthValue[i].last_updated)
            const x = monthValue[i].sold_quantity * monthValue[i].price;
            dataForGraph.push({x: x, y: y})
         }
         setGraphData(dataForGraph);
      }  
      else if(val == "year"){
         setOtherFlats(true)
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
            const y = new Date(yearValue[i].last_updated)
            const x = yearValue[i].sold_quantity * yearValue[i].price;
            dataForGraph.push({x: x, y: y})
         }
         setGraphData(dataForGraph);
      } 
   }

   const onRefresh = React.useCallback( async() => {
      setRefreshing(true);
      SalesProductsList = [];      
      const today = new Date(); 
      await firestore()
         .collection('SalesProducts')
         .orderBy('last_updated', 'desc')
         .get()
         .then( querySnapshot => {
            querySnapshot.forEach( documentSnapshot => {                    
               const data = documentSnapshot.data();
               const dbDate = data.last_updated.toDate().toDateString();
               if( dbDate == today.toDateString()){
                  data.id = documentSnapshot.id;                                
                  SalesProductsList.push(data); 
               }                    
            });       
            setRefreshing(false) 
            setProductsData({
               allProducts: SalesProductsList,
               filteredProducts: SalesProductsList
            })          
         });
   }, [refreshing]);

   const onRefresh1 = React.useCallback( async() => {
      setRefreshing1(true);   
      ProductsList = []   
      await firestore()
         .collection('Products')
         .get()
         .then( querySnapshot => {
            querySnapshot.forEach( documentSnapshot => {                    
               const data = documentSnapshot.data();
               data.id = documentSnapshot.id;                                
               ProductsList.push(data); 
            });       
         setRefreshing1(false) 
         setProductsData({
            allProducts: ProductsList,
            filteredProducts: ProductsList
         })          
      });                            
   }, [refreshing1]);      

   return(
      <View style={styles.container}>
         <View style={styles.mainActitivity}> 
         {
            picker.all ?
            null :
            <View style={styles.IncomeSection}>               
               <Text style={styles.IncomeDisplay}>                  
                  Income: NRs. {numbering(value)}                 
               </Text>              
               {/* <View style={{display: graph ? 'flex' : 'none' }}>
                  <IncomeChart data={graphData} /> 
               </View> */}
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
           { 
               otherFlats ?
               <View style={[styles.cardContent]}>  

                  <Text style={[styles.cardTitle, {flex: 2, fontWeight: '700'}]}>Product</Text>             
                  <Text style={[styles.cardTitle, {flex: 1,fontSize: 15, textAlign: 'center', fontWeight: '700'}]}>Qty</Text>
                  <Text style={[styles.cardTitle, {flex: 1,fontSize: 15, textAlign: 'center', fontWeight: '700'}]}>Selling Price</Text>
                  <Text style={[styles.cardTitle, {flex: 1,fontSize: 15, textAlign: 'center', fontWeight: '700'}]}>Cost Price</Text>
                  <Text style={[styles.cardTitle, {flex: 1.5,fontSize: 15, textAlign: 'center', fontWeight: '700'}]}>Income (In Rs.)</Text>
               </View> :
               <View style={styles.cardContent}>  
                  <Text style={[styles.cardTitle, {flex: 1, fontSize: 15, textAlign: 'center', fontWeight: '700'}]}> ID</Text> 
                  <Text style={[styles.cardTitle, {flex: 2, textAlign: 'left', fontWeight: '700'}]}>Product</Text>             
                  <Text style={[styles.cardTitle, {flex: 2, textAlign: 'center', fontWeight: '700'}]}>Income (In Rs.)</Text>
               </View>  
            }       
            {
               length == 0 ?
               <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                  <Text style= {{opacity: 0.4, fontSize: 15, fontWeight: '700', color: '#078bab'}}>No Income Made</Text>
               </View>:
               null            
            }       
            {
               loading ?
               <ActivityIndicator size="large" color="#078bab" /> :
               null
            }
            { 
               otherFlats ?
               <FlatList 
                  data = {salesProductsData.filteredSalesProducts}
                  keyExtractor = {item => item.id}
                  renderItem = { ({item}) => {
                        let costData = 0;
                        let sellData = 0;
                        let discountSellData = 0;
                           costData = costData + (item.cost_price * item.sold_quantity);
                           if( item.discount == "") {                              
                              sellData = sellData + (item.selling_price * item.sold_quantity);
                           } else {
                              let total = (item.selling_price * item.sold_quantity)
                              discountSellData =  total - ((Number(item.discount)/100) * total) 
                              sellData = sellData + discountSellData;
                           }                      
                        return(
                           <View>                                                               
                              <IncomeCard2 items={item} costData={costData} sellData={sellData} />
                           </View>
                        )                        
                     }                       
                  }
                  refreshControl={
                     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
               /> :
               <FlatList 
                  data = {productsData.filteredProducts}
                  keyExtractor = {item => item.id}
                  renderItem = { ({item}) => {
                        let costData = 0;
                        let sellData = 0;
                        let discountSellData = 0;
                        const foundSoldProduct = SalesProductsList.filter( product => {
                           return item.id == product.product_id
                        }) 
                        foundSoldProduct.forEach( element => {                            
                           costData = costData + (element.cost_price * element.sold_quantity);
                           if( element.discount == "") {                              
                              sellData = sellData + (element.selling_price * element.sold_quantity);
                           } else {
                              let total = (element.selling_price * element.sold_quantity)
                              discountSellData =  total - ((Number(element.discount)/100) * total) 
                              sellData = sellData + discountSellData;
                           }
                        })
                        return(
                           <View>                                                               
                              <IncomeCard items={item} soldProduct={foundSoldProduct} costData={costData} sellData={sellData} />
                           </View>
                        )                        
                     }                       
                  }
                  refreshControl={
                     <RefreshControl refreshing={refreshing1} onRefresh={onRefresh1} />
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
      justifyContent: 'space-around',
      padding: 5,
      marginTop: 10,
      marginHorizontal: 10
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