import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";

// export default class ApexChart extends React.Component {
//   constructor(props) {
//     super(props);
// console.log("in bar data is",props.repoShlef, props.repoFloor, props.repoRef)
//     this.state = {

//       series: [{
//         name: 'Total Sales Qty',
//         data: [props.repoShlef, props.repoFloor, props.repoRef],
//         // data: [ '480' ,'4' ,'40'],
//         color: "#306060",
//       }],
//       options: {
//         chart: {
//           type: 'bar',
//           height: 350
//         },
//         plotOptions: {
//           bar: {
//             horizontal: false,
//             columnWidth: '25%',
//             endingShape: 'rounded'
//           },
//         },
//         dataLabels: {
//           enabled: false
//         },
//         stroke: {
//           show: true,
//           width: 2,
//           colors: ['transparent']
//         },
//         xaxis: {
//           categories: ['Shelf Qty', 'Floor Qty', 'Refregarator Qty']
//         },
//         yaxis: {
//           title: {
//             text: 'Qty'
//           }
//         },
//         fill: {
//           opacity: 1
//         },
//         tooltip: {
//           y: {
//             formatter: function (val) {
//               return val + "  Qty"
//             }
//           }
//         }
//       },


//     };
//   }
//   render() {
//     return (
//       <div id="chart">
//         <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
//       </div>
//     )
//   }
// }
const BarChart=(props)=>{
  
 console.log(props.report)
  const [chartdata,setchartdata]=useState({
          series: [{
            name: 'Total Qty',
            data: props.report,
            // data: [ '480' ,'4' ,'40'],
            color: "#306060",
          }],
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
              categories: ['Shelf Qty', 'Floor Qty', 'Refregarator Qty','Warehouse Qty']
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
                  return val + "  Qty"
                }
              }
            }
          },
      })
return(
  <div id="chart">
   <ReactApexChart options={chartdata.options} series={chartdata.series} type="bar" height={350} />
  </div>
)

}
export default BarChart;