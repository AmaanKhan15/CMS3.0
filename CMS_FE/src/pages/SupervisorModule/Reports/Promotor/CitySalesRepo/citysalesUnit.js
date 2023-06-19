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
import { getCityList,getCategoryCitySales ,getProductCitySales,getSKUCitySales,getCitySalesUnit} from "../../../../../store/services/CitySales"
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import SalesTable from "./citysaleUnitTable"
import SalesBar from "./citysaleUnitBar"
const Dashboard = props => {
    const [menu, setMenu] = useState(false)
    const toggle = () => {
        setMenu(!menu)
    }
    const [citylist] = useState([]);
    const [catlist] = useState([]);
    const [prolist] = useState([]);
    const [skulist] = useState([]);
    useEffect(async () => {
        let cityList = await getCityList();
        cityList.map((item, key) => {
            citylist.push({ label: item.city_name , value: item.city_name })
        })
        const data=JSON.parse(localStorage.getItem('authUser'))
        let categoryReport = await getCategoryCitySales(data.id);
        categoryReport.map((item, key) => {
            catlist.push({ label: item.category , value: item.category })
        })
        // let productReport = await getProductCitySales(data.id);
        // productReport.map((item, key) => {
        //     prolist.push({ label: item.product_name , value: item.product_name })
        // })
        // let skuReport = await getSKUCitySales(data.id);
        // skuReport.map((item, key) => {
        //     skulist.push({ label: item.sku_desc , value: item.id })
        // })
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [])

    const [selectedCustomer, setselectedCustsomer] = useState([])
    const [selectedCategory, setselectedCategory] = useState([])
    const [selectedProduct, setselectedProduct] = useState([])
    const [selectedSKU, setselectedSKU] = useState([])
    const [reportData, setreportData] = useState([])
    const [damageQty, setdamageQty] = useState([])
    const [salesQty, setsalesQty] = useState([])
    const [storeName, setstoreName] = useState([])
    const [Loading, setLoading] = useState(false)
    const [filterapply, setfilterapply] = useState(false)
    const [LoadingCards, setLoadingCards] = useState(false)
    const [LoadingCardsData, setLoadingCardsData] = useState(false)
    const [value, onChange] = useState([new Date(), new Date()]);
    const data=JSON.parse(localStorage.getItem('authUser'))
    const FilterChange = async () => {
        setfilterapply(true)
        setLoadingCards(true);
        setLoadingCardsData(true);
        setTimeout(() => {
            setLoadingCards(false);
        }, 4000);
        console.log("sku id is",selectedSKU)
       

    }
    const handleSelectGroup = async (selectedCustomer) => {
        setselectedCustsomer(selectedCustomer)
        // setreportData(promotorReport);
    }
    const handleSelectCategory = async (selectedCategory) => {
        setselectedCategory(selectedCategory)
        let productReport = await getProductCitySales(data.id,selectedCategory.value);
        productReport.map((item, key) => {
            prolist.push({ label: item.product_name , value: item.product_name })
        })
        // setreportData(promotorReport);
    }
    const handleSelectProduct = async (selectedProduct) => {
        setselectedProduct(selectedProduct)
        let skuReport = await getSKUCitySales(data.id,selectedProduct.value);
        skuReport.map((item, key) => {
            skulist.push({ label: item.sku_desc , value: item.id })
        })
    }
    const handleSelectSKU = async (selectedSKU) => {
        setselectedSKU(selectedSKU)
        let skuReport = await getCitySalesUnit(data.id,selectedSKU.value);
        skuReport.map((item, key) => {
            salesQty.push(item.unit_sales)
            storeName.push(item.sku_detail['sku_desc'])
            console.log("in filters",item.sku_detail['sku_desc'])
        })
        setreportData(skuReport)
    }
    const ClearFilter=()=>{
        salesQty.splice(0,salesQty.length)
        storeName.splice(0,storeName.length)
        damageQty.splice(0,damageQty.length)
        // customerlist.splice(0,customerlist.length)
        setselectedCustsomer([])
        setselectedSKU([])
        setselectedProduct([])
        setselectedCategory([])
        setLoadingCardsData(false)
        console.log("sales Qty is",salesQty)
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
                                            <li className="breadcrumb-item">Get the Customized Reports of </li>Promotor
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
                                                    <h3 class="m-0 text-gray-900">City Sales Unit Report</h3>
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
                                                            <span >City</span>
                                                        </label>
                                                        <Select
                                                            value={selectedCustomer}
                                                            onChange={handleSelectGroup}
                                                            options={citylist}
                                                            id="selectedCustomer"
                                                            classNamePrefix="select2-selection"
                                                        />
                                                    </div>
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
                                                        />
                                                    </div>
                                                    
                                                </div>
                                                <div className="row mb-5">
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
                                                        />
                                                    </div>
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
                                                        />
                                                    </div>
                                                    
                                                </div>
                                                <div className="row mb-5">                                                    
                                                <div className="col-md-6 fv-row" >
                                                        <label class="d-flex align-items-center font-size-14">
                                                            <span >Date</span>
                                                        </label>
                                                        <DateRangePicker onChange={onChange} value={value} className="col-md-12 " />
                                                    </div>
                                                    
                                                </div>
                                                {selectedCustomer != '' && selectedSKU!='' && selectedProduct!=''? (
                                                    <div className="row mb-5">
                                                       <div className="col-md-2 fv-row" >
                                                        <button type="button" class="btn btn-primary  font-size-14" onClick={FilterChange}>
                                                            Apply Filters
                                                        </button>
                                                        </div> 
                                                       <div className="col-md-2 fv-row" >
                                                        <button type="button" class="btn btn-primary  font-size-14" onClick={ClearFilter}>
                                                            Clear Filters
                                                        </button>
                                                        </div> 
                                                    </div>
                                                ) : (
                                                    <div className="row mb-5">
                                                    <div className="col-md-2 fv-row" >
                                                        <button type="button" class="btn btn-primary  font-size-14" onClick={FilterChange} disabled>
                                                            Apply Filters
                                                        </button>
                                                        </div> 
                                                        <div className="col-md-2 fv-row" >
                                                        <button type="button" class="btn btn-primary  font-size-14"  disabled>
                                                            Clear Filters
                                                        </button>
                                                        </div> 
                                                    </div>
                                                )}
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        {LoadingCardsData ? (
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardBody>
                                            <div class="card-title">
                                                <div class="d-flex justify-content-start">
                                                    <Col md={3}>
                                                        <h3 class="m-0 text-gray-900">City Sales Unit Report</h3>
                                                    </Col>
                                                </div>
                                            </div>
                                            <SalesBar  repoSales={salesQty} repoStore={storeName} />

                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={12}>
                                <Card>
                                        <CardBody>
                                            <div class="card-title">
                                                <div class="d-flex justify-content-start">
                                                    <Col md={3}>
                                                        <h3 class="m-0 text-gray-900">City Sales Unit Report</h3>
                                                    </Col>
                                                </div>
                                            </div>
                                            <SalesTable report={reportData} />
                                    </CardBody>
                                    </Card>
                                </Col>
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
