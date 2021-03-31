import React from 'react';
import {
   Text,
   View,
} from 'react-native';

import {
   VictoryChart,
   VictoryLine,
   VictoryTheme,
} from 'victory-native';

const IncomeChart = () => {
   return(
      <View>
         <VictoryChart
            theme={VictoryTheme.material}
            animate={{
               duration: 1000,
               onLoad: { duration: 500 }
            }}
         >
            <VictoryLine
               data={[
                  {x: new Date(2021, 1, 12), y: 1000}, 
                  {x: new Date(2021, 1, 12), y: 2000},                  
                  {x: new Date(2021, 1, 13), y: 2000},
                  {x: new Date(2021, 1, 16), y: 8000},
                  {x: new Date(2021, 1, 18), y: 5000}
               ]}
               style={{
                  data: {
                     stroke: '#000'
                  }
               }}
            />
         </VictoryChart>
      </View>
   )
}

export default IncomeChart;