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
import { getUnavialableStockWithStore,getStoreList,getStoreGroupList,getCityList } from "../../../../../store/services/allmerchandReports"
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import SalesTable from "./reportTable"
const Dashboard = props => {

    const [selectedCategory, setselectedCategory] = useState([])
    const [selectedMerchand, setselectedMerchand] = useState([])
    const [selectedStore, setselectedStore] = useState([])
    const [selectedStoreGroup, setselectedStoreGroup] = useState([])
    const [selectedCity, setselectedCity] = useState([])
    const [selectedSKU, setselectedSKU] = useState([])
    const [reportData, setreportData] = useState([])
    const [Loading, setLoading] = useState(false)
    const [filterapply, setfilterapply] = useState(false)
    const [LoadingCards, setLoadingCards] = useState(false)
    const [LoadingCardsData, setLoadingCardsData] = useState(false)
    const [value, onChange] = useState([new Date(), new Date()])
    const [skulist] = useState([]);
    const [catlist] = useState([]);
    const [storelist] = useState([]);
    const [storegrouplist] = useState([]);
    const [merlist] = useState([]);
    const [citylist] = useState([]);
    const [barData] = useState([]);
    var [shlefTotal] = useState(0);
    var [floorTotal] = useState(0);
    var [refTotal] = useState(0);
    useEffect(async () => {
        let cityList = await getCityList();
        cityList.map((item, key) => {
            citylist.push({ label: item.city, value: item.id })
        })

    }, [])
    var merid=''
    const handleSelectCity = async (selectedCity) => {
        setselectedCity(selectedCity)
        let storGroupList = await getStoreGroupList(merid);
        storGroupList.map((item, key) => {
            storegrouplist.push({ label: item.store_group_name, value: item.store_details })
        })
    }
    const handleSelectStoreGroup = async (selectedStoreGroup) => {
        setselectedStoreGroup(selectedStoreGroup)
        let storeList = await getStoreList(selectedMerchand.id, selectedStoreGroup.value);
        storeList.map((item) => {
            const finalStore = item.filteredData;
            finalStore.map((store) => {
                // console.log("Store list is",store.store_name)
                storelist.push({ label: store.store_name, value: store.id })
            })
        })
    }
    const handleSelectStore = async (selectedStore) => {
        setselectedStore(selectedStore)
        let categoryList = await getUnavialableStockWithStore(selectedStore.value);
        console.log("category list is",categoryList)
        setreportData(categoryList);
    }
    
    const FilterChange = async () => {
        setfilterapply(true)
        setLoadingCards(true);
        setLoadingCardsData(true);
        setTimeout(() => {
            setLoadingCards(false);
        }, 4000);                
    }

    const ClearFilter = () => {
        setselectedStore([])
        setselectedStoreGroup([])
        setselectedCity([])
        setLoadingCardsData(false)
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
                                                    <h3 class="m-0 text-gray-900">Unavialable Stock Report</h3>
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
                                                            value={selectedCity}
                                                            onChange={handleSelectCity}
                                                            options={citylist}
                                                            id="selectedCustomer"
                                                            classNamePrefix="select2-selection"
                                                        // isMulti={true}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 fv-row">
                                                        <label class="d-flex align-items-center  font-size-14">
                                                            <span >Store Group</span>
                                                        </label>
                                                        <Select
                                                            value={selectedStoreGroup}
                                                            onChange={handleSelectStoreGroup}
                                                            options={storegrouplist}
                                                            id="selectedCustomer"
                                                            classNamePrefix="select2-selection"
                                                        // isMulti={true}
                                                        />
                                                    </div>



                                                </div>
                                                <div className="row mb-5">
                                                    
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
                                                        // isMulti={true}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 fv-row" >
                                                        <label class="d-flex align-items-center font-size-14">
                                                            <span >Date</span>
                                                        </label>
                                                        <DateRangePicker onChange={onChange} value={value} className="col-md-12 " />
                                                    </div>
                                                </div>                                                                                                
                                                { selectedStore!='' && selectedCity!='' ? (
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
                        {LoadingCardsData && reportData != [] ? (
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardBody>
                                            <div class="card-title">
                                                <div class="d-flex justify-content-start">
                                                    <Col md={3}>
                                                        <h3 class="m-0 text-gray-900">Unavialable Stock Report</h3>
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
