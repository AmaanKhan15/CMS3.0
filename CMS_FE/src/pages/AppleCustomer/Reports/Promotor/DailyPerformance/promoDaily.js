import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle
} from "reactstrap"
import Select from "react-select"
import { withTranslation } from "react-i18next"
import { ThreeDots } from 'react-loader-spinner'
import { getCityList,getCategoryCitySales ,getProductCitySales,getSKUCitySales,getAllStore,getAllPromotor} from "../../../../../store/services/CitySales"
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import DashCard from "./DashCards"

const Dashboard = props => {
    const [menu, setMenu] = useState(false)
    const toggle = () => {
        setMenu(!menu)
    }
    const [citylist] = useState([]);
    const [catlist] = useState([]);
    const [prolist] = useState([]);
    const [skulist] = useState([]);
    const [promolist] = useState([]);
    const [storelist] = useState([]);
    const [id] = useState('');
    const AllFilters=async()=>{
        let cityList = await getCityList();
        cityList.map((item, key) => {
            citylist.push({ label: item.city_name , value: item.city_name })
        })
        const data=JSON.parse(localStorage.getItem('authUser'))
        let promotorList = await getAllPromotor(data.customer_id);
        promotorList.map((item) => {
            promolist.push({ label: item.first_name + " " + item.last_name, value: item.id })
        })
        let categoryReport = await getCategoryCitySales(data.customer_id);
        categoryReport.map((item, key) => {
            catlist.push({ label: item.category , value: item.category })
        })
        let productReport = await getProductCitySales(data.customer_id,selectedCategory.value);
        productReport.map((item, key) => {
            prolist.push({ label: item.product_name , value: item.product_name })
        })
        let skuReport = await getSKUCitySales(data.customer_id,selectedProduct.value);
        skuReport.map((item, key) => {
            skulist.push({ label: item.sku_desc , value: item.id })
        })
        let storeList = await getAllStore();
        storeList.map((item) => {
            storelist.push({ label: item.store_name , value: item.id })
        })
    }
    useEffect(async () => {        
        AllFilters()
    }, [])

    const [selectedCustomer, setselectedCustsomer] = useState([])
    const [selectedCategory, setselectedCategory] = useState([])
    const [selectedProduct, setselectedProduct] = useState([])
    const [selectedSKU, setselectedSKU] = useState([])
    const [selectedPromo, setselectedPromo] = useState([])
    const [selectedStore, setselectedStore] = useState([])
    const [reportData, setreportData] = useState([])
    const [damageQty, setdamageQty] = useState([])
    const [salesQty, setsalesQty] = useState([])
    const [storeName, setstoreName] = useState([])
    const [Loading, setLoading] = useState(false)
    const [filterapply, setfilterapply] = useState(false)
    const [LoadingCards, setLoadingCards] = useState(false)
    const [LoadingCardsData, setLoadingCardsData] = useState(false)
    const [value, setDate] = useState(['', '']);
    const [filterCount, setfilterCount] = useState(0)

    const [promoid]=useState([])
    const onChange=(value)=>{        
        setDate(value)
        setfilterCount(filterCount+1)
    }
    const formatDate = date => {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	};
    const FilterChange = async () => {
        // let promotorReport=await getFilterReport(selectedStore.value,selectedSKU.value,selectedPromo.value,formatDate(value[0]),formatDate(value[1]));
        // setreportData(promotorReport);     
        setfilterapply(true)
        setLoadingCards(true);
        setLoadingCardsData(true);
        setTimeout(() => {
            setLoadingCards(false);
        }, 4000);        
            
    }
    const handleSelectStore = async (selectedStore) => {
        setselectedStore(selectedStore)       
    }
    const handleSelectCategory = async (selectedCategory) => {
        setselectedCategory(selectedCategory)       
        setfilterCount(filterCount+1) 
    }
    const handleSelectProduct = async (selectedProduct) => {
        setselectedProduct(selectedProduct)
        setfilterCount(filterCount+1) 
    }
    const [allproId]=useState()
    const handleSelectPromo = async (selectedPromo) => {
        setselectedPromo(selectedPromo) 
        setfilterCount(filterCount+1) 
    }
    const handleSelectSKU = async (selectedSKU) => {        
        setselectedSKU(selectedSKU)
        // let skuReport = await getPromWeekly(data.customer_id,selectedSKU.value,selectedPromo.value);
        setfilterCount(filterCount+1)                 
    }
    const ClearFilter=async()=>{
        salesQty.splice(0,salesQty.length)
        storeName.splice(0,storeName.length)
        damageQty.splice(0,damageQty.length)
        storelist.splice(0,storelist.length)
        promolist.splice(0,promolist.length)
        skulist.splice(0,skulist.length)
        prolist.splice(0,prolist.length)
        catlist.splice(0,catlist.length)
        // customerlist.splice(0,customerlist.length)
        setselectedCustsomer([])
        setselectedSKU([])
        setselectedProduct([])
        setselectedCategory([])
        setselectedPromo([])
        setselectedStore([])
        setLoadingCardsData(false)
        let promotorList = await getAllPromotor();
        promotorList.map((item) => {
            promolist.push({ label: item.first_name + " " + item.last_name, value: item.id })
        })
    }

    return (
        <React.Fragment>
            <div className="page-content">
                {Loading ? (<Container fluid>
                    <div
                        className="pagination" style={{
                            position: 'relative ',
                            marginTop: '20%'
                        }}>
                        <ThreeDots color="#306060" height={80} width={80} />
                    </div>
                </Container>) : (
                    <Container fluid style={{ overflow: 'auto' }}>
                        <div className="page-title-box">
                            <Row className="align-items-center">
                                <Col md={8}>
                                    <h6 className="page-title">Reports</h6>
                                    <div className="page-title-box">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Get the Customized Reports of </li>Promoter
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
                                                    <h3 class="m-0 text-gray-900">Promoter Daily Report</h3>
                                                </Col>
                                                <Col md={4}></Col>
                                                <Col md={2}>
                                                </Col>
                                            </div>
                                        </div>
                                        <Row>
                                            <div class="w-100">
                                                <div className="row mb-5">
                                                    
                                                    <div className="col-md-6 fv-row">
                                                        <label class="d-flex align-items-center  font-size-14">
                                                            <span >Promoter</span>
                                                        </label>
                                                        <Select
                                                            value={selectedPromo}
                                                            onChange={handleSelectPromo}
                                                            options={promolist}
                                                            id="selectedCustomer"
                                                            classNamePrefix="select2-selection"
                                                            maxMenuHeight="250px"
                                                            // isMulti={true}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 fv-row">
                                                        <label class="d-flex align-items-center  font-size-14">
                                                            <span >Store</span>
                                                        </label>
                                                        <Select
                                                            value={selectedStore}
                                                            onChange={handleSelectStore}
                                                            options={storelist}
                                                            id="selectedCustomer"
                                                            classNamePrefix="select2-selection"
                                                            maxMenuHeight="250px"
                                                            // isMulti={true}
                                                        />
                                                    </div> 
                                                   
                                                    
                                                </div>
                                                <div className="row mb-5">
                                                <div className="col-md-6 fv-row">
                                                        <label class="d-flex align-items-center  font-size-14">
                                                            <span >Category</span>
                                                        </label>
                                                        <Select
                                                            value={selectedCategory}
                                                            onChange={handleSelectCategory}
                                                            options={catlist}
                                                            id="selectedCustomer"
                                                            classNamePrefix="select2-selection"
                                                            maxMenuHeight="250px"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 fv-row">
                                                        <label class="d-flex align-items-center  font-size-14">
                                                            <span >Product</span>
                                                        </label>
                                                        <Select
                                                            value={selectedProduct}
                                                            onChange={handleSelectProduct}
                                                            options={prolist}
                                                            id="selectedCustomer"
                                                            classNamePrefix="select2-selection"
                                                            maxMenuHeight="250px"
                                                        />
                                                    </div>
                                                                                                
                                                </div>
                                                <div className="row mb-5"> 
                                                <div className="col-md-6 fv-row">
                                                        <label class="d-flex align-items-center  font-size-14">
                                                            <span >SKU</span>
                                                        </label>
                                                        <Select
                                                            value={selectedSKU}
                                                            onChange={handleSelectSKU}
                                                            options={skulist}
                                                            id="selectedCustomer"
                                                            classNamePrefix="select2-selection"
                                                            maxMenuHeight="250px"
                                                        />
                                                    </div> 
                                                                                                  
                                                <div className="col-md-6 fv-row" >
                                                        <label class="d-flex align-items-center font-size-14">
                                                            <span >Date</span>
                                                        </label>
                                                        <DateRangePicker onChange={onChange} value={value} className="col-md-12 " />
                                                    </div>
                                                    
                                                </div>
                                                {filterCount>0?
                                                <div className="row mb-5">
                                                    <div className="col-md-2 fv-row" >
                                                        <button type="button" class="btn btn-primary  font-size-14" onClick={FilterChange}>
                                                            Apply Filters
                                                        </button>
                                                    </div> 
                                                    <div className="col-md-2 fv-row" >
                                                        <button type="button" class="btn btn-primary  font-size-14" onClick={ClearFilter} >
                                                            Clear Filters
                                                        </button>
                                                    </div>
                                                </div>
                                                :<div className="row mb-5">
                                                <div className="col-md-2 fv-row" >
                                                    <button type="button" class="btn btn-primary  font-size-14" onClick={FilterChange} disabled>
                                                        Apply Filters
                                                    </button>
                                                </div>
                                                <div className="col-md-2 fv-row" >
                                                    <button type="button" class="btn btn-primary  font-size-14" onClick={ClearFilter}>
                                                        Clear Filters
                                                    </button>
                                                </div>
                                            </div>}
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        {LoadingCardsData ? (
                            <Row>
                                <Col md={12}>                                    
                                <DashCard storeId={selectedStore.value} skuId={selectedSKU.value} promId={selectedPromo.value} startdate={formatDate(value[0])} enddate={formatDate(value[1])} />
                                </Col>
                                {/* <Col md={12}>
                                <Card>
                                        <CardBody>
                                            <div class="card-title">
                                                <div class="d-flex justify-content-start">
                                                    <Col md={3}>
                                                        <h3 class="m-0 text-gray-900">Promotor Weekly Report</h3>
                                                    </Col>
                                                </div>
                                            </div>
                                            <SalesTable report={reportData} />
                                    </CardBody>
                                    </Card>
                                </Col> */}
                            </Row>
                        ) : null}
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
