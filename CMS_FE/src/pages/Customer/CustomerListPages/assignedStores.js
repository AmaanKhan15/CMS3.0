import React, { useState, useEffect } from "react"
import {
    Card,
    CardBody,
    Col,
    Container,
    Form,
    Input,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap"
import { Link } from "react-router-dom"
import { ThreeDots } from 'react-loader-spinner'
import Pagination from 'react-mui-pagination';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { useHistory, useLocation } from 'react-router-dom';
import {removeStoresfromCustomer} from '../../../store/services/store'
import "../../../assets/scss/style.bundle.css";
import Swal from "sweetalert2";  
const URL = process.env.REACT_APP_LOCAL_URL;


const theme = createTheme({
    palette: {
        primary: {
            main: '#306060'
        }
    }
});
const ListIndex = (props) => {
    const [apidata, setApidata] = useState([]);
    const [filterResult, setfilterResult] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    let [loading, setLoading] = useState(true);
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [noOfPages, setnoOfPages] = useState('');
    // const [location.state.id, setlocation.state.id] = useState('');

    const handleChange = (event, value) => {
        setPage(value);
    };
    const history = useHistory();
    const location = useLocation()
    useEffect(async () => {
       
        // console.log("id passed is",location.state.id)        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let res = await fetch(
            `${URL}`+`/storesbycustomer/` + `${location.state.id}`,
            {
                method: "GET",
                headers: myHeaders,
            }
        );
        let response = await res.json();
        const empResult = response.data;
        setnoOfPages(Math.ceil(empResult.length / itemsPerPage))
        // setData(empResult.slice(0, pageSize));
        setApidata(empResult);
        console.log("stores data is",empResult)
        setLoading(false);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, [])
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = apidata.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setfilterResult(filteredData)
        }
    }
    const HandleDelete=async(proid)=>{
    let data=await removeStoresfromCustomer(proid)
    console.log("Promoter apu called",data);
    if(data.status=200){
    Swal.fire({
            icon: 'success',
            title: `Stores Removed Succesfully`,
            confirmButtonText: 'Continue',
            confirmButtonColor: '#306060',
          })
    }
    setApidata(prev => prev.filter((el) => el.id !== proid)); // filter by id       

    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={8}>
                                <h6 className="page-title">Assigned Stores </h6>
                            </Col>
                            <Col md={3}>
                            </Col>
                            <Col md={1}>
                                <Link type="button" to="/customer-list" class="btn btn-primary font-size-14">
                                    Back
                                </Link>
                            </Col>
                        </Row>
                    </div>
                    {/* <Breadcrumbs maintitle="Stores" title="Store List" breadcrumbItem="" /> */}
                    <Row>
                        <Col md={'12'}>
                            {loading ? (
                                <Container fluid>
                                    <div
                                        className="pagination" style={{
                                            position: 'relative ',
                                            marginTop: '20%'
                                        }}>
                                        <ThreeDots color="#306060" height={80} width={80} />
                                    </div>
                                </Container>

                            ) : (
                                <div class="card mb-5 mb-xl-8">
                                    <div class="card-header border-0 pt-6">
                                        <div class="card-title">
                                            <div class="d-flex align-items-center position-relative my-1">
                                                <span class="svg-icon svg-icon-1 position-absolute ms-6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                                                        <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                                                    </svg>
                                                </span>
                                                <input onChange={(e) => searchItems(e.target.value)} type="text" data-kt-customer-table-filter="search" class="form-control form-control-lg form-control-solid w-450px ps-15" placeholder="Search..." />
                                            </div>
                                        </div>
                                        <div class="card-toolbar">
                                            <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
                                                <a type="button"  onClick={()=>{history.push({pathname:'/unassignedstore/list',state:{id:location.state.id}})}} class="btn btn-primary font-size-14" data-bs-toggle="modal" data-bs-target="#kt_modal_add_customer">Assign New Stores </a>
                                            </div>
                                        </div>
                                        {/*end::Card toolbar*/}
                                    </div>
                                    <div class="card-body py-3">
                                        <div class="table-responsive">
                                            {apidata.length > 0 ? (
                                                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                                    <thead>
                                                        <tr class="text-muted fw-normal font-size-15">
                                                            <th class="min-w-150px">Store name</th>
                                                            <th class="min-w-140px">Contact no</th>
                                                            <th class="min-w-140px">Refernce no</th>
                                                            <th class="min-w-120px">Address</th>
                                                            <th class="min-w-100px text-end">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {searchInput.length > 1 ?
                                                            filterResult
                                                                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                                                .map((item, key) => {
                                                                    return (
                                                                        <tr key={key}>
                                                                            <td>
                                                                                <div class="d-flex align-items-center">
                                                                                    <div class="d-flex justify-content-start flex-column">
                                                                                        <a href="#" class="text-muted fw-normal font-size-14">{item.store_name}</a>
                                                                                        {/* <span class="text-muted fw-bold text-muted d-block fs-7">HTML, JS, ReactJS</span> */}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <a href="#" class="text-muted fw-normal font-size-14">{item.contact_no}</a>
                                                                                {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                                            </td>                                                                           
                                                                            <td>
                                                                                <a href="#" class="text-muted fw-normal font-size-14">{item.ref_no}</a>
                                                                                {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                                            </td>                                                                            
                                                                            <td>
                                                                                <a href="#" class="text-muted fw-normal font-size-14">{item.address}</a>
                                                                                {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                                            </td>                                                                            
                                                                            <td>
                                                                                <div class="d-flex justify-content-end ">
                                                                                    <a onClick={() => HandleDelete(item.id)} class="btn btn-bg-light-danger btn-active-color-danger btn-lg">
                                                                                        Remove
                                                                                    </a>
                                                                                </div>
                                                                            </td>
                                                                        </tr>)
                                                                }) :
                                                            apidata
                                                                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                                                .map((item, key) => {
                                                                    return (
                                                                        <tr key={key}>
                                                                            <td>
                                                                                <div class="d-flex align-items-center">
                                                                                    <div class="d-flex justify-content-start flex-column">
                                                                                        <a href="#" class="text-muted fw-normal font-size-14">{item.store_name}</a>
                                                                                        {/* <span class="text-muted fw-bold text-muted d-block fs-7">HTML, JS, ReactJS</span> */}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <a href="#" class="text-muted fw-normal font-size-14">{item.contact_no}</a>
                                                                                {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                                            </td>                                                                            
                                                                            <td>
                                                                                <a href="#" class="text-muted fw-normal font-size-14">{item.ref_no}</a>
                                                                                {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                                            </td>                                                                        
                                                                            <td>
                                                                                <a href="#" class="text-muted fw-normal font-size-14">{item.address}</a>
                                                                                {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                                            </td>                                                                        
                                                                            <td>
                                                                                <div class="d-flex justify-content-end ">
                                                                                    <a onClick={() => HandleDelete(item.id)} class="btn btn-bg-light-danger btn-active-color-danger btn-lg">
                                                                                        Remove
                                                                                    </a>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        )
                                                                })
                                                        }
                                                       
                                                    </tbody>
                                                </table>
                                            ) : null}

                                        </div>
                                        {apidata.length > 0 ? (

                                            <MuiThemeProvider
                                                theme={theme}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>

                                                    <Pagination
                                                        linksShadow={4}
                                                        numOfLinks={3}
                                                        page={page}
                                                        setPage={handleChange}
                                                        perPage={itemsPerPage}
                                                        total={Math.ceil(apidata.length)}
                                                        size="large"
                                                        activeLinkColor='primary'
                                                        firstContent='First'
                                                        lastContent='Last'
                                                        firstLastColor='primary'
                                                        // firstLastColor={'primary'}
                                                        FirstLastComponent={Fab} // we have used our imported component      
                                                    />
                                                </div>
                                            </MuiThemeProvider>
                                        ) : null}
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default ListIndex;