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

const IncomeChart = ({data}) => {
   // console.log(data)
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
               data={data}
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