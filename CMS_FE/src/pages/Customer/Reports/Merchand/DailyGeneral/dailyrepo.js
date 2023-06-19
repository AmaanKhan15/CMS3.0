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
import { getSKUList, getCateoryList, getStoreList, getStoreGroupList, getMerchandiserList, getCityList, getDailyMerchandRepoSKU } from "../../../../../store/services/allmerchandReports"
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
    const [value, setDate] = useState(['', '']);
    const [skulist] = useState([]);
    const [catlist] = useState([]);
    const [storelist] = useState([]);
    const [storegrouplist] = useState([]);
    const [merlist] = useState([]);
    const [citylist] = useState([]);
    const [filterCount, setfilterCount] = useState(0)
    const onChange=(value)=>{  
        setreportData([])      
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
   
    
    const handleSelectAllFilters=async()=>{
        let cityList = await getCityList();
        cityList.map((item, key) => {
            citylist.push({ label: item.city_name, value: item.id })
        })
        let merList = await getMerchandiserList();
        merList.map((item, key) => {
            merlist.push({  label: item.FullName , value: item.id ,id:item.store_group_id})
        })
        let storGroupList = await getStoreGroupList();
        storGroupList.map((item, key) => {
            storegrouplist.push({ label: item.store_group_name , value: item.store_details ,id:item.id})
        })
        let storeList = await getStoreList();
        storeList.map((item) => {
            const finalStore=item.filteredData;
            finalStore.map((store)=>{
                storelist.push({ label: store.store_name , value: store.id })
            })
         })
         let categoryList = await getCateoryList();
        categoryList.map((item) => {
            catlist.push({ label: item.category , value: item.id })
        })
        let skuReport = await getSKUList();
        skuReport.map((item) => {
            skulist.push({ label: item.sku_desc , value: item.id })
        })
    }
    useEffect(async () => {
        handleSelectAllFilters();
        
    }, [])
    const handleSelectCity = async (selectedCity) => {
        setreportData([])
        setselectedCity(selectedCity) 
        setfilterCount(filterCount+1)       
    }
    const handleSelectMerchand = async (selectedMerchand) => {
        setreportData([])
        setselectedMerchand(selectedMerchand)
        setfilterCount(filterCount+1) 
    }
    
    const handleSelectStore = async (selectedStore) => {
        setreportData([])
        setselectedStore(selectedStore)
        setfilterCount(filterCount+1) 
    }
    const handleSelectCategory = async (selectedCategory) => {
        setreportData([])
        setselectedCategory(selectedCategory)
        setfilterCount(filterCount+1) 
    }
    const handleSelectSKU = async (selectedSKU) => {
        setreportData([])
        setselectedSKU(selectedSKU)
        setfilterCount(filterCount+1) 
    }
    const FilterChange = async () => {
        setfilterapply(true)
        setLoadingCards(true);
        setLoadingCardsData(true);
        setTimeout(() => {
            setLoadingCards(false);
        }, 4000);
        setfilterCount(0) 
        let merchandrepoList = await getDailyMerchandRepoSKU(selectedMerchand.value, selectedStore.value, selectedCategory.label, selectedCity.label,selectedSKU.value,formatDate(value[0]),formatDate(value[1]));
        setreportData(merchandrepoList)
        
    }

    const ClearFilter = () => {
        setselectedCategory([])
        setselectedMerchand([])
        setselectedStore([])
        setselectedStoreGroup([])
        setselectedSKU([])
        setselectedCity([])
        setreportData([])
        // barData.splice(0,salesQty.length)

        // merlist.splice(0,merlist.length)
        // storegrouplist.splice(0,storegrouplist.length)
        // storelist.splice(0,storelist.length)
        // catlist.splice(0,catlist.length)
        // skulist.splice(0,skulist.length)
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
                                                    <h3 class="m-0 text-gray-900">Merchandiser Genral Report</h3>
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
                                                            maxMenuHeight="250px"
                                                            classNamePrefix="select2-selection"
                                                        // isMulti={true}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 fv-row">
                                                        <label class="d-flex align-items-center  font-size-14">
                                                            <span >Merchandiser</span>
                                                        </label>
                                                        <Select
                                                            value={selectedMerchand}
                                                            onChange={handleSelectMerchand}
                                                            options={merlist}
                                                            id="selectedCustomer"
                                                            maxMenuHeight="250px"
                                                            classNamePrefix="select2-selection"
                                                        // isMulti={true}
                                                        />
                                                    </div>



                                                </div>
                                                <div className="row mb-5">
                                                
                                                    {/* <div className="col-md-6 fv-row">
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
                                                    </div> */}
                                                     <div className="col-md-6 fv-row">
                                                        <label class="d-flex align-items-center  font-size-14">
                                                            <span >Category</span>
                                                        </label>
                                                        <Select
                                                            value={selectedCategory}
                                                            onChange={handleSelectCategory}
                                                            options={catlist}
                                                            id="selectedCustomer"
                                                            maxMenuHeight="250px"
                                                            classNamePrefix="select2-selection"
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
                                                            maxMenuHeight="250px"
                                                            classNamePrefix="select2-selection"
                                                        // isMulti={true}
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
                                                            maxMenuHeight="200px"
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
                                                
                                                {filterCount>0?
                                                <div className="row mb-5">
                                                    <div className="col-md-2 fv-row" >
                                                        <button type="button" class="btn btn-primary  font-size-14" onClick={FilterChange}>
                                                            Apply Filters
                                                        </button>
                                                    </div> 
                                                    <div className="col-md-2 fv-row" >
                                                        <button type="button" class="btn btn-primary  font-size-14" onClick={ClearFilter} disabled>
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
                        {LoadingCardsData && reportData != [] ? (
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardBody>
                                            <div class="card-title">
                                                <div class="d-flex justify-content-start">
                                                    <Col md={6}>
                                                        <h3 class="m-0 text-gray-900">Merchandiser Genral Report</h3>
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
