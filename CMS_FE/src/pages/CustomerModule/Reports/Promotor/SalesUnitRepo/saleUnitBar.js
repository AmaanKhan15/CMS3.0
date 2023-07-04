import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";

export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          name: 'Total Sales Qty',
          data: props.repoSales,
          color: "#306060",
        }, {
          name: 'Damage Item',
          data: props.repoDamage,
          color: "#A0522D",
        },],
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
            categories:props.repoStore
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
                return  val + "Qty"
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