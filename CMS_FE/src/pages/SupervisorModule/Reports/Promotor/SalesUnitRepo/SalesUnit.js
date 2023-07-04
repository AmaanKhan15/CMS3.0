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
import { getPromotorByCustomerId, getSalesunitReport } from "../../../../../store/services/PromotorReport"
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import SalesTable from "./saleUnitTable"
import SalesBar from "./saleUnitBar"
const Dashboard = props => {
    const [menu, setMenu] = useState(false)
    const toggle = () => {
        setMenu(!menu)
    }
    const [customerlist] = useState([]);
    useEffect(async () => {
        const data = JSON.parse(localStorage.getItem('authUser'))
        let customerList = await getPromotorByCustomerId(data.id);
        customerList.map((item) => {
            customerlist.push({ label: item.first_name + " " + item.last_name, value: item.id })
        })
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [])

    const [selectedCustomer, setselectedCustsomer] = useState([])
    const [reportData, setreportData] = useState([])
    const [damageQty, setdamageQty] = useState([])
    const [salesQty, setsalesQty] = useState([])
    const [storeName, setstoreName] = useState([])
    const [Loading, setLoading] = useState(false)
    const [filterapply, setfilterapply] = useState(false)
    const [LoadingCards, setLoadingCards] = useState(false)
    const [LoadingCardsData, setLoadingCardsData] = useState(false)
    const [value, onChange] = useState([new Date(), new Date()]);
    const FilterChange = async () => {
        setfilterapply(true)
        setLoadingCards(true);
        setLoadingCardsData(true);
        reportData.map((item, key) => {
            console.log("data is", item.damage_qty)
            salesQty.push(item.total_sales_qty)
            damageQty.push(item.damage_qty)
            storeName.push(item.store_detail['store_name'])
        })
        setTimeout(() => {
            setLoadingCards(false);
        }, 4000);
    }
    const ClearFilter=()=>{
        salesQty.splice(0,salesQty.length)
        storeName.splice(0,storeName.length)
        damageQty.splice(0,damageQty.length)
        // customerlist.splice(0,customerlist.length)
        setselectedCustsomer([])
        setLoadingCardsData(false)
        console.log("sales Qty is",salesQty)
    }

    const handleSelectGroup = async (selectedCustomer) => {
        setselectedCustsomer(selectedCustomer)
        let promotorReport = await getSalesunitReport(selectedCustomer.value);
        console.log("report data is",promotorReport)
        setreportData(promotorReport);
    }
    return (
        <React.Fragment>
            <div className="page-content" style={{ overflow: 'auto' }}>
                {Loading ? (<Container fluid>
                    <div
                        className="pagination" style={{
                            position: 'relative ',
                            marginTop: '20%'
                        }}>
                        <ThreeDots color="#306060" height={80} width={80} />
                    </div>
                </Container>) : (
                    <Container fluid >
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
                                                    <h3 class="m-0 text-gray-900">Sales Unit Report</h3>
                                                </Col>
                                                <Col md={4}></Col>
                                                <Col md={2}>
                                                </Col>
                                            </div>
                                        </div>
                                        <Row >
                                            <div class="w-100">
                                                <div className="row mb-5">
                                                    <div className="col-md-6 fv-row">
                                                        <label class="d-flex align-items-center  font-size-14">
                                                            <span >Promotor</span>
                                                        </label>
                                                        <Select
                                                            value={selectedCustomer}
                                                            onChange={handleSelectGroup}
                                                            options={customerlist}
                                                            id="selectedCustomer"
                                                            classNamePrefix="select2-selection"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 fv-row" >
                                                        <label class="d-flex align-items-center font-size-14">
                                                            <span >Date</span>
                                                        </label>
                                                        <DateRangePicker onChange={onChange} value={value} className="col-md-12 " />
                                                    </div>
                                                </div>
                                                {selectedCustomer != '' ? (
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
                        {LoadingCardsData && reportData? (
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardBody>
                                            <div class="card-title">
                                                <div class="d-flex justify-content-start">
                                                    <Col md={3}>
                                                        <h3 class="m-0 text-gray-900">Sales Unit Report</h3>
                                                    </Col>
                                                </div>
                                            </div>
                                            <SalesBar repoDamage={damageQty} repoSales={salesQty} repoStore={storeName} />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={12}>
                                <Card>
                                        <CardBody>
                                            <div class="card-title">
                                                <div class="d-flex justify-content-start">
                                                    <Col md={3}>
                                                        <h3 class="m-0 text-gray-900">Sales Unit Report</h3>
                                                    </Col>
                                                </div>
                                            </div>
                                            <SalesTable report={reportData} />
                                    </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        ) :  null}
               
                        
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
