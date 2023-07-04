import React, { useState, useEffect } from "react"
import {
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    NavItem,
    NavLink,
    Row,
    Modal,
    TabContent,
    TabPane
} from "reactstrap"
import Swal from "sweetalert2";
import SweetAlert from "react-bootstrap-sweetalert"
import image1 from "../../../../assets/images/avatars/029-boy-11.svg";
import { getMerchandList, updateSupervisorById, updateSupervisorByIdMerchand } from "../../../../store/services/supervisor"
import { ThreeDots } from 'react-loader-spinner'
import Pagination from 'react-mui-pagination';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { latestcustomerId } from "../../../../store/services/customer"
import Select from "react-select"
import { getCustomerList } from "../../../../store/services/customer"

const theme = createTheme({
    palette: {
        primary: {
            main: '#306060'
        }
    }
});

const SupervisorForm = (props) => {
    const [apidata, setApidata] = useState([]);
    const itemsPerPage = 4;
    const [page, setPage] = useState(1);
    const [noOfPages, setnoOfPages] = useState('');
    const [filterResult, setfilterResult] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedCustomer, setselectedCustomer] = useState([])
    const [customerlist] = useState([]);
    const [selectedUserType, setselectedUserType] = useState([])
    function handleselectedUserType(selectedGroup) {
        setselectedUserType(selectedGroup)      
    }
    const optionUserType = [
        { label: "Promotor", value: "Promotor" },
        { label: "Merchand", value: "Merchand" },
      ]
    const [custId, setcustId] = useState('');
    const handleChange = (event, value) => {
        setPage(value);
    };
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = apidata.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setfilterResult(filteredData)
        }
    }

    const [openModal, setopenModal] = useState(false);
    useEffect(async () => {
        let data = await getMerchandList();
        console.log("Supervisor data is", data)
        setnoOfPages(Math.ceil(data.length / itemsPerPage))
        setApidata(data);
        let cityList = await getCustomerList();
        cityList.map((item) => {
            customerlist.push({ label: item.Customer_Name, value: item.Customer })
        })
        // let custid = await latestcustomerId();
        // console.log("current customer is", custid)
        // setcustId(custid)
        // console.log("in supervisor cards",props.TabPersonsDetail[0]=='Promotor')
    }, [])
    const handleSubmitPersosnal =async (e) => {
        e.preventDefault()
        // props.TabdataVerticle(6);
       
    }
  
    const handleSelectCustomer = async (selectedCustomer, eleId) => {
        setselectedCustomer(selectedCustomer)
        setcustId(selectedCustomer.value)
        console.log("selected customer is", selectedCustomer.value)
    }
    const assignSupervisor = async (supid) => {       
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        // }, 3000);
        console.log("values are",supid,selectedCustomer.value)
        if (selectedUserType.value == 'Promotor') {
            let custid = await updateSupervisorById(supid, selectedCustomer.value);
            if (custid.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Assigned Sucessfully!',
                    text: 'Supervisor is Assigned to Customer!',
                    confirmButtonColor: '#306060',
                })
            }
            // setcustId(custid)
        }
        if (selectedUserType.value == 'Merchand') {
            let custid = await updateSupervisorByIdMerchand(supid, selectedCustomer.value);
            if (custid.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Assigned Sucessfully!',
                    text: 'Supervisor is Assigned to Customer!',
                    confirmButtonColor: '#306060',
                })
            }
        }
       
    }
    return (
        <div class="mx-auto mw-900px w-100 pt-15 pb-10">
            <Form className="needs-validation"
                method="post"
                id="tooltipForm"
                onSubmit={e => {
                    handleSubmitPersosnal(e)
                }}
            >
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
                    <Row>
                        <div class="card mb-5 mb-xl-8 btn-rounded" style={{ 'backgroundColor': '#fafafa', 'padding': ' 1rem 1rem' }}>
                           
                            <Row>
                                <Col md={'6'}>
                                <div className="col-md-12 fv-row">
                                        <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                            <span className="required">User Type</span>
                                        </label>
                                        <div className="mb-3 position-relative">

                                            <Select
                                                value={selectedUserType}
                                                onChange={handleselectedUserType}
                                                options={optionUserType}
                                                id="selectedCustomer"
                                                maxMenuHeight="250px"
                                                classNamePrefix="select2-selection"
                                            // isMulti={true}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md={'6'}>
                                    <div className="col-md-12 fv-row">
                                        <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                            <span className="required">Customer</span>
                                        </label>
                                        <div className="mb-3 position-relative">

                                            <Select
                                                value={selectedCustomer}
                                                onChange={handleSelectCustomer}
                                                options={customerlist}
                                                id="selectedCustomer"
                                                maxMenuHeight="250px"
                                                classNamePrefix="select2-selection"
                                            // isMulti={true}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col md={'12'}>
                                    <div class="card-header border-0 pt-5">
                                        <input type="text" class="form-control form-control-lg form-control-solid w-450px btn-rounded-small" onChange={(e) => searchItems(e.target.value)} placeholder="Search Stores" />

                                    </div>
                                </Col>
                            </Row> */}
                            {apidata ? (
                                <Row>
                                    {searchInput.length > 1 ?
                                        filterResult
                                            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                            .map((item, key) => {
                                                return (
                                                    <Col md={'6'} key={key}>
                                                        <div class=" border-0 pt-5 " >
                                                            <div className="card card-xl-stretch mb-xl-3  btn-rounded">
                                                                <div className="card-body d-flex align-items-center pt-3 pb-0">
                                                                    <div className="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                                                                        <a href="#" className="fw-bolder text-dark fs-4 mb-2 ">{item.first_name + " " + item.last_name}</a>
                                                                        {/* <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                                                                        <span className="fw-bold fs-6 text-black-400" >Store Name  </span>
                                                                    </div> */}
                                                                        <div className="d-flex justify-content-between w-100 mt-auto mb-4" >
                                                                            <button type="button" class="btn btn-light-primary btn-rounded me-6" data-kt-menu-placement="bottom-end" onClick={() => { assignSupervisor(item.id) }}>
                                                                                {/* <span class="fas fa-eye">{" "}
                                                                                See Details
                                                                            </span> */}
                                                                                Assign
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <img src={image1} alt="" className="align-self-center h-60px" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>)
                                            }) :
                                        apidata
                                            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                            .map((item, idx) => {
                                                return (
                                                    <Col md={'6'} key={idx}>
                                                        <div class=" border-0 pt-5 " >
                                                            <div className="card card-xl-stretch mb-xl-3  btn-rounded">
                                                                <div className="card-body d-flex align-items-center pt-3 pb-0">
                                                                    <div className="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                                                                        <a href="#" className="fw-bolder text-dark fs-4 mb-2 ">{item.first_name + " " + item.last_name}</a>

                                                                        <div className="d-flex justify-content-between w-100 mt-auto mb-4" >
                                                                            <button type="button" class="btn btn-light-primary btn-rounded me-6" data-kt-menu-placement="bottom-end" onClick={() => { assignSupervisor(item.id) }}>
                                                                                Assign
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <img src={image1} alt="" className="align-self-center h-60px" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )
                                            })

                                    }
                                </Row>
                            ) : (<Container fluid>
                                <div
                                    className="pagination" style={{
                                        position: 'relative ',
                                        marginTop: '20%'
                                    }}>
                                </div>
                                <div class="card-toolbar">
                                    <div class="d-flex justify-content-center" data-kt-customer-table-toolbar="base">
                                        <Link type="button" to="/assignedpromotor/list" class="btn btn-primary font-size-14" data-bs-toggle="modal" data-bs-target="#kt_modal_add_customer">Add New Promotor</Link>
                                    </div>
                                </div>
                            </Container>)}


                        </div>

                    </Row>)}
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

                <div className="actions clearfix">
                    <Row>
                        <Col md={5}>

                        </Col>
                        <Col md={4}></Col>
                        <Col md={3}>
                            {/* <button
                                type="submit"
                                class="btn btn-lg btn-primary"
                            >
                                Next {" "}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="white" />
                                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="white" />
                                </svg>                        </button> */}
                        </Col>
                    </Row>
                </div>
                {openModal ? <SweetAlert
                    title="Assigned Sucessfully!"
                    success
                    confirmBtnBsStyle="success"
                    confirmBtnText="close"
                    onConfirm={() => {
                        setopenModal(false)
                    }}

                >
                    Supervisor is Assigned to Customer!
                </SweetAlert> : null}
            </Form>
        </div>
    )
}
export default SupervisorForm;