import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";

export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          name: 'Assign Target',
          type: 'column',
          data: [10, 12, 15, 8, 20, 21, 4, 42, 23, 42, 16, 5],
          color: "#306060",
        }, {
          name: 'Achived Target',
          type: 'line',
          data: [7, 10, 11, 2, 10, 15, 2, 20, 17, 22, 10, 3],
          color: "#A0522D",
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            width: [0, 4]
          },
          title: {
            text: 'Promoter Performance'
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
          },
          labels: ['01 Jan 2021', '02 Jan 2021', '03 Jan 2021', '04 Jan 2021', '05 Jan 2021', '06 Jan 2021', '07 Jan 2021', '08 Jan 2021', '09 Jan 2021', '10 Jan 2021', '11 Jan 2021', '12 Jan 2021'],
          xaxis: {
            type: 'datetime'
          },
          yaxis: [{
            title: {
              text: 'Assign Target',
            },
          
          }, {
            opposite: true,
            title: {
              text: 'Achived Target'
            }
          }]
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
</div>
      )
    }
}