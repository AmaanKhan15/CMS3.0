import React, { useState } from "react";
// import ReactApexChart  from 'apexcharts';
import ReactApexChart from "react-apexcharts";


export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [props.sales,props.total,props.damage,props.warehouse],
      options: {
        chart: {
          height: 280,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '20%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              }
            }
          }
        },
        colors: ['#A0522D', '#306060', '#A0522D', '#306060'],
        labels: ['Sales Qty', 'Total Qty', 'Damage Qty','Warehouse Qty'],
        legend: {
          show: true,
          floating: true,
          fontSize: '16px',
          position: 'right',
          offsetX: 130,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0
          },
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
          },
          itemMargin: {
            vertical: 3
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }]
      },
    };
  }
  render() {
    return (
      <div id="chart" >
        <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={280} />
      </div>
    );
  }
}
