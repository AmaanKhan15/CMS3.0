import ReactApexChart from "react-apexcharts";
import React,{useState,useEffect} from "react";
import { getAlliPadComparison } from "../../../../store/services/AppleStore/filtersdata"

const BarGraph = () => {
  let dataForBar = {};
  const [seriesdata,setseriesdata]=useState([]);
  useEffect(async ()=>{    
    let  merList= await getAlliPadComparison();   
    setseriesdata(merList)        
},[])

  dataForBar = {
    series: seriesdata,
    options: {
      chart: {
        type: 'bar',
        // height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5
        },
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      },
      legend: {
        position: 'top',
        // offsetY: 40
      },
      fill: {
        opacity: 1
      }
    },
  }
  return (
    <div id="chart">
      <ReactApexChart options={dataForBar.options} series={dataForBar.series} type="bar" height={350} />
    </div>

  );
}

export default BarGraph;
