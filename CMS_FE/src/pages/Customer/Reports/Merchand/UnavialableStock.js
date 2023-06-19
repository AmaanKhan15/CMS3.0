import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle
} from "reactstrap"
import { Link } from "react-router-dom"
import "../../../../assets/scss/style.bundle.css";
import DashCard from "./generalList"
import Select from "react-select"
import { withTranslation } from "react-i18next"
import { ThreeDots } from 'react-loader-spinner'
import { getCustomerList,getStoreList,getFilterReport } from "../../../../store/services/MerchandiserReport"
const Dashboard = props => {
    const [menu, setMenu] = useState(false)
    const toggle = () => {
        setMenu(!menu)
    }
    const [customerlist] = useState([]);
    const [storelist] = useState([]);
    useEffect(async () => {
        let customerList = await getCustomerList();
        customerList.map((item, key) => {
            customerlist.push({ label: item.Customer_Name, value: item.Customer })
        })
        setLoading(true);        
        setTimeout(() => {
          setLoading(false);
        }, 3000);
    },[])
    const [selectedCustomer, setselectedCustsomer] = useState([])
    const [selectedStore, setselectedStore] = useState([])
    const [selectedSKU, setselectedSKU] = useState([])
    const [selectedMerchand, setselectedMerchand] = useState([])
    const [selectedPromotor, setselectedPromotor] = useState([])
    const [reportData, setreportData] = useState([])
    const [custid, setcustid] = useState('')
    const [storid, setstorid] = useState('')
    const [skuid, setskuid] = useState('')
    const [promoid, setpromoid] = useState('')
    const [Loading, setLoading] = useState(false)
    const [filterapply,setfilterapply]=useState(false)
    const [LoadingCards, setLoadingCards] = useState(false)
    const handleSelectGroup = async(selectedCustomer) =>{
        setcustid(selectedCustomer.value);
        setselectedCustsomer(selectedCustomer)
        let storeList=await getStoreList(selectedCustomer.value)
        console.log("store list is",storeList,selectedCustomer.value)
        if(storeList!=''){
            storeList.map((item, key) => {
                storelist.push({ label: item.store_name, value: item.id })
            })
        }
    }
    function handleSelectStore(selectedStore) {
        setstorid(selectedStore.value);
        setselectedStore(selectedStore)
    }
    function handleSelectSKU(selectedSKU) {
        setselectedSKU(selectedSKU)
    }
    function handleSelectMerchand(selectedPromotor) {
        setselectedMerchand(selectedPromotor)
    }
   const FilterChange=async()=>{
    setfilterapply(true)
    setLoadingCards(true);
    setTimeout(() => {
        setLoadingCards(false);      
    }, 4000);
       let promotorReport=await getFilterReport(custid,storid,skuid,promoid);
       setreportData(promotorReport);
   }
   const optionMerchand = [     
    { label: "Aaban Shaheed G	", value: "1" },
    { label: "Hamad Abdulrahman Alzory	", value: "2" },     
    { label: "Abdus Shakur D		", value: "3" }     ,
    { label: "Almahdi Outhman AlHoraishi	", value: "4" }     ,
] 
   const optionSKU = [     
    { label: "iPhone iPhone 8 / 7 Silicone Case Rose Red", value: "1" },
    { label: "iPad Pro 10.5\" WiFi + Cell 256GB Rose Gold", value: "2" },     
    { label: "iPad Pro 10.5\" WiFi 512GB Rose Gold", value: "3" },
    { label: "iPad Pro 10.5\" WiFi 512GB Rose Gold", value: "4" },
] 
    return (
        <React.Fragment>
            <div className="page-content">
                {Loading?(<Container fluid>
                    <div 
                    className="pagination" style={{
                      position: 'relative ',
                      marginTop: '20%'             
                    }}>
                      <ThreeDots color="#306060" height={80} width={80} />
                    </div>
                
                  </Container>):(
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={8}>
                                <h6 className="page-title">Reports</h6>
                                <div className="page-title-box">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">Get the Customized Reports of </li>Merchandiser
                                    </ol>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={12}>
                            <Card >
                                <CardBody >
                                    <div class="card-title">

                                        <div class="d-flex justify-content-end">
                                            <Col md={6}>
                                                <h3 class="m-0 text-gray-900">Unavailable Stock Report</h3>
                                            </Col>
                                            <Col md={4}></Col>
                                            <Col md={2}>
                                                {/* <Link to="/promotor-report/all" class="btn btn-lg btn-primary">View All Reports</Link> */}
                                            </Col>
                                        </div>
                                        <div class="card-toolbar">
                                            <span>Get Customized Reports of Merchandiser</span>
                                        </div>
                                    </div>
                                    <Row>
                                        <div class="w-100">
                                            <div className="row mb-5">
                                                <div className="col-md-6 fv-row">
                                                    <label class="d-flex align-items-center  font-size-14">
                                                        <span >Customer</span>
                                                    </label>
                                                    <Select
                                                        value={selectedCustomer}
                                                        onChange={handleSelectGroup}
                                                        options={customerlist}
                                                        id="selectedCustomer"                                                       
                                                        classNamePrefix="select2-selection"
                                                    />
                                                </div>
                                                <div className="col-md-6 fv-row">
                                                    <label class="d-flex align-items-center font-size-14">
                                                        <span >Store</span>
                                                    </label>
                                                    <Select
                                                        value={selectedStore}
                                                        onChange={handleSelectStore}
                                                        options={storelist}                                                        
                                                        id="selectedStore"
                                                        classNamePrefix="select2-selection"
                                                    />
                                                </div>
                                            </div>
                                           <div className="row mb-5">
                                                <div className="col-md-6 fv-row">
                                                    <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                                        <span >SKU</span>
                                                    </label>
                                                    <Select
                                                        value={selectedSKU}
                                                        onChange={handleSelectSKU}
                                                        options={optionSKU}
                                                        id="selectedGroup"
                                                        classNamePrefix="select2-selection"
                                                    />
                                                </div>
                                                <div className="col-md-6 fv-row">
                                                    <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                                        <span>Merchandiser</span>
                                                    </label>
                                                    <Select
                                                        value={selectedMerchand}
                                                        onChange={handleSelectMerchand}
                                                        options={optionMerchand}
                                                        id="selectedGroup"
                                                        classNamePrefix="select2-selection"
                                                    />
                                                </div>

                                            </div> 
                                            {selectedCustomer!=''?(
                                                LoadingCards?(
                                                    <div className="row mb-5">
                                                <button type="button" class="btn btn-primary  font-size-14" style={{ display: 'flex',alignItems: 'center',
                                                justifyContent: 'center'}}>
                                                <ThreeDots color="#FFFFFF" height={30} width={30}  />								
                                                </button>
                                                {/* </div> */}
                                            </div>
                                                ):(<div className="row mb-5">

                                                <button type="button" class="btn btn-primary  font-size-14" onClick={FilterChange}>
                                                    Apply Filters
                                                </button>
                                                {/* </div> */}
                                            </div>)
                                            ):(
                                                <div className="row mb-5">

                                                <button type="button" class="btn btn-primary  font-size-14" onClick={FilterChange} disabled>
                                                    Apply Filters
                                                </button>
                                                {/* </div> */}
                                            </div>
                                            )}
                                    </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        {filterapply?
                        <Col md={12}>
                            {/* <DashCard report={reportData}/> */}
                            <DashCard/>
                        </Col>  
                        :(null)}                      
                    </Row>                
                </Container>
                )}
            </div>

        </React.Fragment>
    )
}

Dashboard.propTypes = {
    t: PropTypes.any
}

export default withTranslation()(Dashboard)
