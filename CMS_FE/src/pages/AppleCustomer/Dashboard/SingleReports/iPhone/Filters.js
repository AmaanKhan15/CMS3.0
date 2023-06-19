
import ReactApexChart from "react-apexcharts";
import React,{useState,useEffect} from "react";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardTitle
} from "reactstrap";
import Select from "react-select"
import {getAllRegions,getAllMacProduct} from '../../../../../store/services/AppleStore/filtersdata'
const AllFilters =(props)=>{  
    const optionGroup = [
      { label: "2021", value: "2021" },
      { label: "2022", value: "2022" },
    ]
    const optionQuarter = [
      { label: "January", value: 1 },
      { label: "February", value: 2 },
      { label: "March", value: 3},
      { label: "April", value: 4 },
      { label: "May", value: 5},
      { label: "June", value:6},
      { label: "July", value: 7},
      { label: "August", value: 8 },
      { label: "September", value:9 },
      { label: "October", value: 10 },
      { label: "November", value: 11 },
      { label: "December", value: 12 },
    ]
    const [regionList] = useState([]);
    const [productList] = useState([]);

    const [selectedGroup, setselectedGroup] = useState([])
    const [selectedQuarter, setselectedQuarter] = useState([])
    const [selectedMonth, setselectedMonth] = useState([])
    const [selectedProduct, setselectedProduct] = useState([])
    function handleSelectGroup(selectedGroup) {
          setselectedGroup(selectedGroup)
          props.Year(selectedGroup.value)
    }
    function handleSelectQuarter(selectedQuarter) {      
      setselectedQuarter(selectedQuarter)
      props.Region(selectedQuarter.label)
    }
    function handleSelectMonth(selectedMonth) {    
      setselectedMonth(selectedMonth)
      props.Month(selectedMonth.value)

    }    
    function OpenLoader(){
      props.OpenLoader(true)
    }
    useEffect(async()=>{
      let regiondata = await getAllRegions();
      regiondata.map((item) => {
        regionList.push({ label: item.area, value: item.id })
      })
      let productdata = await getAllMacProduct();
      productdata.map((item) => {
        productList.push({ label: item.product_name, value: item.id })
      })
    },[])
    return (            
       <Row>
         <div className="col-md-3 fv-row" >
         <label class="d-flex align-items-center fs-5 fw-bold mb-2">
           <span >Region</span>
         </label>
         <Select
           value={selectedQuarter}
           onChange={handleSelectQuarter}
           options={regionList}
           id="selectedGroup"
           classNamePrefix="select2-selection"
           maxMenuHeight="150px"
          //  isMulti={true}
         />
       </div>
       <div className="col-md-3 fv-row" >
         <label class="d-flex align-items-center fs-5 fw-bold mb-2">
           <span >Year</span>
         </label>
         <Select
           value={selectedGroup}
           onChange={handleSelectGroup}
           options={optionGroup}
           id="selectedGroup"
           maxMenuHeight="250px"
           classNamePrefix="select2-selection"
         />
       </div>
       <div className="col-md-3 fv-row" >
         <label class="d-flex align-items-center fs-5 fw-bold mb-2">
           <span >Month</span>
         </label>
         <Select
           value={selectedMonth}
           onChange={handleSelectMonth}
           options={optionQuarter}
           id="selectedGroup"
           maxMenuHeight="250px"
           classNamePrefix="select2-selection"
         />
       </div>
      
       {/* <div className="col-md-3 fv-row" >
         <label class="d-flex align-items-center fs-5 fw-bold mb-2">
           <span >Products</span>
         </label>
         <Select
           value={selectedProduct}
           onChange={handleSelectProduct}
           options={productList}
           id="selectedGroup"
           classNamePrefix="select2-selection"
           maxMenuHeight="150px"
            isMulti={true}
         />
       </div> */}
       <div className="col-md-3 fv-row" >

         <button type="button" class="btn btn-primary  font-size-14" style={{ marginTop: '20px' }} onClick={OpenLoader}>
           Apply Filters
         </button>


       </div>
     </Row>

    );
  }

export default AllFilters;
