
import ReactApexChart from "react-apexcharts";
import React,{useEffect, useState} from "react";
import {
	Row,
	Col,
	Card,
	CardBody,
} from "reactstrap";
import Filters from './Filters';
import { getAllAppleWatchSeries } from "../../../../../store/services/AppleStore/filtersdata"

const BarGraph =()=>{
  const [seriesdata,setseriesdata]=useState([]);
  const [monthdata,setmonthdata]=useState('');
  const [yeardata,setyeardata]=useState('');
  const [regiondata,setregiondata]=useState('');
  const [loader,setloader]=useState(false);
   useEffect(async ()=>{    
        let  merList= await getAllAppleWatchSeries(monthdata,yeardata,regiondata);  
        console.log("airpods lis",merList)      
        setseriesdata(merList)        
   },[])
   function onMonthChange(data){
    setmonthdata(data)
   }
   function onYearChange(data){
    setyeardata(data)
   }
   function onRegionChange(data){
    setregiondata(data)
   }
   const onChangeLoader=async (data)=>{
    setseriesdata([])  

    setloader(data)
    let  merList= await getAllAppleWatchSeries(monthdata,yeardata,regiondata); 
   setseriesdata(merList)  
    if(merList){
      setloader(false)
    }
   }
    let dataForBar = {};

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
          categories: ['W1', 'W2', 'W3', 'W4'],
        },
        legend: {
          position: 'bottom',
          // offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
    }
    return (
      
      // loader?(
      //   <div
      //   className="pagination" style={{
      //     position: 'relative ',
      //     marginTop: '20%'
      //   }}>
      //   <ThreeDots color="#306060" height={80} width={80} />
      // </div>):
        <div>
       <Filters Region={onRegionChange} Year={onYearChange} Month={onMonthChange} OpenLoader={onChangeLoader}/>
        <br></br>
        <br></br>
        <Row>
          <Col md={12}>
            <Card>
              <CardBody>
                <div class="card-title">
                  <div class="d-flex justify-content-start">
                    <Col md={12}>
                      <h3 class="m-0 text-gray-900">Apple Watch</h3>
                    </Col>
                  </div>
                </div>
                <div id="chart">
                  <ReactApexChart options={dataForBar.options} series={dataForBar.series} type="bar" height={350} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

export default BarGraph;
