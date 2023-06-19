import React, { useState ,useEffect} from "react"
const URL = process.env.REACT_APP_LOCAL_URL;
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
import {useHistory} from 'react-router-dom';
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
    const handleChange = (event, value) => {
        setPage(value);
    };
    const history=useHistory();
    useEffect(async () => {
        const data=JSON.parse(localStorage.getItem('authUser'))
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var Bodydata = JSON.stringify({         
            customer_id: data.id,           
          });
        let res = await fetch(
            `${URL}`+`/customermodule/LoginReportMerchandCustomer`,
            {
                method: "POST",
                headers: myHeaders,
                body: Bodydata
            }
        );
        let response = await res.json();
        const empResult = response.data;
        setnoOfPages(Math.ceil(empResult.length / itemsPerPage))
        // setData(empResult.slice(0, pageSize));
        setApidata(empResult);
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
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={8}>
                                <h6 className="page-title">Marchandiser Login Report</h6>
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
                                {/* <button type="button" class="btn btn-light-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_customers_export_modal">
                                    <span class="svg-icon svg-icon-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="black" />
                                            <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="black" />
                                            <path d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="#C4C4C4" />
                                        </svg>
                                    </span>
                                    <a href={storeSample} download="store_sample">Download</a>
                                    </button> */}
                                    {/* <Button><a href={storeSample} download="store_sample">Download</a></Button> */}

                                {/* <Link type="button" to="/merchand-add" class="btn btn-primary font-size-14" data-bs-toggle="modal" data-bs-target="#kt_modal_add_customer">Add Marchandiser</Link> */}
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
                                            <th class="min-w-150px">Marchand name</th>
                                            <th class="min-w-140px">Login Date</th>                                           
                                            <th class="min-w-140px">Login Time</th>                                           
                                            <th class="min-w-120px">Store Name</th>
                                            <th class="min-w-120px">Logout Date</th>
                                            <th class="min-w-120px">Logout Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchInput.length > 1  ?
                                            filterResult
                                                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                                .map((item, key) => {                                                
                                                    return (   
                                                        item.promotor_detail!=null?                                                   
                                                        <tr key={key}>
                                                            <td>
                                                                <div class="d-flex align-items-center">
                                                                    <div class="d-flex justify-content-start flex-column">
                                                                         <a href="#" class="text-muted fw-normal font-size-14">{item.merchand_detail!=null ? `${item.merchand_detail['first_name']}` +" "+ `${item.merchand_detail['last_name']}`:''}</a>
                                                                        {/* <span class="text-muted fw-bold text-muted d-block fs-7">HTML, JS, ReactJS</span> */}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <a href="#" class="text-muted fw-normal font-size-14">{item.LoginDate}</a>
                                                                {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                            </td>
                                                            <td>
                                                                <a href="#" class="text-muted fw-normal font-size-14">{item.LoginTime}</a>
                                                                {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                            </td>
                                                            <td>
                                                                                                      
                                                                <span class="badge-pro bg-badge-active text-muted fw-normal font-size-14">{item.store_detail!=null? item.store_detail['store_name']:null}</span>
                                                             {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                            </td>
                                                            <td>
                                                                <a href="#" class="text-muted fw-normal font-size-14">{item.LogoutDate==null?
                                                                <span class="badge-pro bg-badge-active text-muted fw-normal font-size-14">Active</span>:item.LogoutDate}</a>
                                                                {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                            </td>
                                                            
                                                            <td>
                                                                <a href="#" class="text-muted fw-normal font-size-14">{item.LogoutTime==null?
                                                                <span class="badge-pro bg-badge-active text-muted fw-normal font-size-14">Active</span>:item.LogoutTime}</a>
                                                                {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                            </td>
                                                            
                                                                                                      
                                                        </tr>
                                                        :null
                                                    )                                                  
                                                }) :
                                            apidata
                                                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                                .map((item, key) => {
                                                    return (
                                                        // item.promotor_detail!=null?                                                   
                                                        <tr key={key}>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <div class="d-flex justify-content-start flex-column">
                                                                     <a href="#" class="text-muted fw-normal font-size-14">{item.merchand_detail!=null ? `${item.merchand_detail['first_name']}` +" "+ `${item.merchand_detail['last_name']}`:''}</a>
                                                                    {/* <span class="text-muted fw-bold text-muted d-block fs-7">HTML, JS, ReactJS</span> */}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.LoginDate}</a>
                                                            {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                        </td>
                                                        <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.LoginTime}</a>
                                                            {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                        </td>
                                                        <td>
                                                                                                  
                                                            <span class="badge-pro bg-badge-active text-muted fw-normal font-size-14">{item.store_detail!=null? item.store_detail['store_name']:null}</span>
                                                         {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                        </td>
                                                        <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.LogoutDate==null?
                                                                <span class="badge-pro bg-badge-inactive text-muted fw-normal font-size-14">Active</span>:item.LogoutDate}</a>
                                                            {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                        </td>
                                                        
                                                        <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.LogoutTime==null?
                                                                <span class="badge-pro bg-badge-inactive text-muted fw-normal font-size-14">Active</span>:item.LogoutTime}</a>
                                                            {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                                        </td>
                                                        
                                                                                                  
                                                    </tr>
                                                        // :null
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
                                        // numOfLinks={4}
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
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'end',
                                    justifyContent: 'end'
                                }}>
                                    <span>Total Records:{Math.ceil(apidata.length)}</span></div>
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