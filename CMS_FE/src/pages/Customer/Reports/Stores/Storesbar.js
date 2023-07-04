import React, { useState } from "react";
// import ReactApexChart  from 'apexcharts';
import ReactApexChart from "react-apexcharts";


export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        series: [{
            name: 'AL AMIR',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
          }, {
            name: 'Al Haddad - AL Rawda1',
            type: 'area',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
          }, {
            name: 'Al Dahmani',
            type: 'line',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
          }],
          options: {
            chart: {
              height: 350,
              type: 'line',
              stacked: false,
            },
            stroke: {
              width: [0, 2, 5],
              curve: 'smooth'
            },
            plotOptions: {
              bar: {
                columnWidth: '50%'
              }
            },
            
            fill: {
              opacity: [0.85, 0.25, 1],
              gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
              }
            },
            colors: [ '#A0522D', '#306060','#A0522D','#306060'],

            labels: ['01/01/2020', '02/01/2020', '03/01/2020', '04/01/2020', '05/01/2020', '06/01/2020', '07/01/2020',
              '08/01/2020', '09/01/2020', '10/01/2020', '11/01/2020'
            ],
            markers: {
              size: 0
            },
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
              title: {
                text: 'Sales',
              },
              min: 0
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    
                    return y.toFixed(0) + " Sales";
                  }
                  return y;
            
                }
              }
            }
          },
        
        
        };
      }
  render() {
    return (
      <div id="chart" >
  <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={450} />
      </div>
    );
  }
}
