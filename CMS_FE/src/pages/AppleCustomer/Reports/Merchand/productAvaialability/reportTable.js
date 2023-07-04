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
    const [apidata, setApidata] = useState(props.report);
    const [filterResult, setfilterResult] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    let [loading, setLoading] = useState(true);
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [noOfPages, setnoOfPages] = useState('');
    const handleChange = (event, value) => {
        setPage(value);
    };
   
    console.log("in map api",props.report)
    const history=useHistory();
    useEffect(async () => {
       
        setnoOfPages(Math.ceil(props.report.length / itemsPerPage))
        // setData(empResult.slice(0, pageSize));
        setLoading(false);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
  }, [])
        
  
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = props.report.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setfilterResult(filteredData)
        }
    }
    return (
        
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
                    </div>
                    <div class="card-body py-3">
                        <div class="table-responsive">
                            {props.report.length > 0 ? (
                                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                    <thead>
                                        <tr class="text-muted fw-normal font-size-15">
                                            {/* <th class="min-w-150px">Merchand Name</th> */}
                                            <th class="min-w-150px">Store Name</th>                                           
                                            <th class="min-w-150px">SKU Desc</th>                                           
                                            <th class="min-w-150px">Shelf Qty</th>                                           
                                            <th class="min-w-150px">Floor Qty</th>                                
                                            <th class="min-w-150px">Refregarator Qty</th>                                
                                            <th class="min-w-150px">Expire Date</th>                                
                                            <th class="min-w-150px">WH Qty</th>                                
                                            <th class="min-w-150px">WH Damage</th>                                
                                            <th class="min-w-150px">WH Expire </th>  
                                           <th class="min-w-150px">Planogram</th>                                                                                                                     
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchInput.length > 1  ?
                                            filterResult
                                                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                                .map((item, key) => {                                                
                                                    return (   
                                                        <tr key={key}>
                                                            
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.store_detail!=null ? `${item.store_detail['store_name']}`:''}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['sku_desc']}`:''}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['shelf_qty']}`:''}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['floor_qty']}`:''}</a>
                                                            </td>                                                                                                                                                                                                                                                                     
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['floor_type']}`:''}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['exp_date']}`:''}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['planogram']}`:''}</a>
                                                            </td>                                                                                                      
                                                                                                                                                               
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.total_sales_qty}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.damage_qty}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.total_amt}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.exp_date}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.planogram}</a>
                                                            </td>                                                                                                      
                                                        </tr>                                                        
                                                    )                                                  
                                                }) :
                                            props.report
                                                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                                .map((item, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.store_detail!=null ? `${item.store_detail['store_name']}`:''}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['sku_desc']}`:''}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['shelf_qty']}`:''}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['floor_qty']}`:''}</a>
                                                            </td>                                                                                                                                                                                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['floor_type']}`:''}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['exp_date']}`:''}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.sku_detail!=null ? `${item.sku_detail['planogram']}`:''}</a>
                                                            </td>                                                                                                      
                                                                                                                                                               
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.total_sales_qty}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.damage_qty}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.total_amt}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.exp_date}</a>
                                                            </td>                                                                                                      
                                                            <td>
                                                            <a href="#" class="text-muted fw-normal font-size-14">{item.planogram}</a>
                                                            </td>                                                                                                      
                                                        </tr>  
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            ) : null}

                        </div>
                        {props.report.length > 0 ? (

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
                                        total={Math.ceil(props.report.length)}
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
                                    <span>Total Records:{Math.ceil(props.report.length)}</span></div>
                            </MuiThemeProvider>
                        ) : null}
                    </div>
                </div>
            )
}

export default ListIndex;