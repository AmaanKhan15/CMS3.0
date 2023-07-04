import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";

export default class ApexChart extends React.Component {
    constructor(props) {
       super(props);
        this.state = {
            series: [{
                name: 'Unit Sales',
                data: props.SalesData,
                color: "#306060",
              }],
              options: {
                chart: {
                  height: 350,
                  type: 'area'
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  curve: 'smooth'
                },
                xaxis: {
                //   type: 'datetime',
                //   categories: ["Western Region", "Western Region", "Western Region", "Western Region", "Western Region", "Western Region", "Western Region"]
                  categories: props.RegionData
                },
                // tooltip: {
                //   x: {
                //     format: 'dd/MM/yy HH:mm'
                //   },
                // },
              },
            
            
            };
          }
  
    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
            </div>
        );
    }
}

