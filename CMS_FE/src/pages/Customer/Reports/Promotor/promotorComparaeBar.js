import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";

export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          name: 'Total Sales Qty',
          data: [15000,12200,200,1200],
          color: "#306060",
        }, ],
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '25%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Abdus Shakur D', 'Hamad Abdulrahman Alzory', 'Almahdi Outhman AlHoraishi','Aaban Shaheed G'],
          },
          yaxis: {
            title: {
              text: 'Qty'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return  val + " Qty"
              }
            }
          }
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
</div>
      )
}
}