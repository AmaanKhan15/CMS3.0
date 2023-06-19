// import React, { useState, useEffect } from "react"
// import {
//     Card,
//     CardBody,
//     Col,
//     Container,
//     Form,
//     FormGroup,
//     Label,
//     Input,
//     NavItem,
//     NavLink,
//     Row,
//     Modal,
//     TabContent,
//     TabPane
// } from "reactstrap"
// import Swal from "sweetalert2";
// import GroupModal from "../../Modal/AddGroup";
// import SuccessModal from "../../Modal/Success";
// import MaterialTable from 'material-table';
// import { TableIcons } from "../../../Common/TableIcons"
// import { getUnAssignedStores } from "../../../../store/services/store"
// import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
// import { ThreeDots } from 'react-loader-spinner'
// import { useHistory } from 'react-router-dom';
// import { getAllStoreList, getSKUList ,getStoreids} from '../../../../store/services/store'
// import Select from "react-select"
// import { getCustomerList } from "../../../../store/services/customer"

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#306060',
//         },
//         secondary: {
//             main: '#306060',
//         },
//     },
// })
// const UploadStoreForm = (props) => {
//     const history = useHistory();
//     const [apidata, setApidata] = useState(props.TabStores);
//     const [selectedRowStore, setSelectedRowStores] = useState([]);
//     const [allstoreids, setallstoreids] = useState('')
//     const [custid, setcustid] = useState('')
//     const [openModal, setopenModal] = useState(false);
//     const [openModalSuccess, setopenModalSuccess] = useState(false);
//     const [modal_center, setmodal_center] = useState(false)
//     const [showButton, setShowButton] = useState(false);
//     let [loading, setLoading] = useState(true);
//     const [allStores, setallStores] = useState([])
//     const [selectedCustomer, setselectedCustomer] = useState([])
//     const [customerlist] = useState([]);
//     const [custId, setcustId] = useState('')
   
    

//     const handleSubmitPersosnal = (e) => {
//         e.preventDefault()

//     }

//     function onChangeState(TabOpen) {
//         // setopenModal(TabOpen);

//         // props.Tabdata(4);
//     }

//     const selectedRow = React.useRef([]);
//     const handleSetSelectedRows = rows => {
//         // rows.map((item,key)=>{
//         selectedRow.current = rows;
//         console.log("Only Rows are", rows)
//         setSelectedRowStores(rows)
//         if (selectedRow.current.length > 0) {
//             setShowButton(true)
//         }
//     };
//     useEffect(async () => {
//         setLoading(false);
//         setTimeout(() => {
//             setLoading(false);
//         }, 5000);

//         let cityList = await getCustomerList();

//         cityList.map((item) => {
//             customerlist.push({ label: item.Customer_Name, value: item.Customer })
//         })
       
//     }, [])
//     const handleSelectCustomer = async (selectedCustomer, eleId) => {
//         setselectedCustomer(selectedCustomer)
//         setcustId(selectedCustomer.value)
//         let stores = await getSKUList(selectedCustomer.value)
//         console.log("all skus are",stores)
//         setallStores(stores)
//         setLoading(true);
//         setTimeout(() => {
//             setLoading(false);
//         }, 5000);

//     }

//     const HandleGroupPop = async () => {
//         let stores = await getStoreids(selectedCustomer.value)
//         console.log("store id are",stores)
//     }
//     return (
//         <Form className="needs-validation"
//             method="post"
//             id="tooltipForm"
//             onSubmit={e => {
//                 handleSubmitPersosnal(e)
//             }}
//         >
//             <div class="w-100">
//                 <div className="row mb-5">
//                     <div className="col-md-6 fv-row">
//                         <label class="d-flex align-items-center fs-5 fw-bold mb-2">
//                             <span className="required">Customer</span>
//                         </label>
//                         <div className="mb-3 position-relative">

//                             <Select
//                                 value={selectedCustomer}
//                                 onChange={handleSelectCustomer}
//                                 options={customerlist}
//                                 id="selectedCustomer"
//                                 maxMenuHeight="170px"
//                                 classNamePrefix="select2-selection"
//                             // isMulti={true}
//                             />
//                         </div>
//                     </div>                    
//                     <div className="col-md-6 fv-row">
//                         <label class="d-flex align-items-center fs-5 fw-bold mb-2">
//                             {/* <span className="required">Customer</span> */}
//                         </label>
//                         {showButton ? (<button
//                             type="button"
//                             class="btn btn-lg btn-light-primary me-3"
//                             onClick={() => HandleGroupPop()}
//                         >
//                             Assign SKU
//                         </button>) : (
//                             <button
//                                 type="button"
//                                 class="btn btn-lg btn-light-primary me-3"
//                                 onClick={() => HandleGroupPop()}
//                                 disabled
//                             >
//                                 Assign SKU
//                             </button>)}
//                     </div>
//                 </div>
//             </div>
//             &nbsp;
//             &nbsp;
//             &nbsp;
//             &nbsp;

//             {loading ? (
//                 <Container fluid>
//                     <div
//                         className="pagination" style={{
//                             position: 'relative ',
//                             marginTop: '20%'
//                         }}>
//                         <ThreeDots color="#306060" height={80} width={80} />
//                     </div>
//                 </Container>

//             ) :
//                 allStores ?
//                     <Row>

//                         {/* {props.TabStores.length >= 1 ? ( */}

//                         <MuiThemeProvider theme={theme}>
//                             <MaterialTable
//                                 icons={TableIcons}
//                                 title="Store List"
//                                 columns={[
//                                     { title: 'SKU', field: 'sku' },
//                                     { title: 'Category', field: 'category' },
//                                     { title: 'Product Name', field: 'product_name' },
//                                     { title: 'Product Desc', field: 'product_desc' },
//                                 ]}
//                                 data={allStores}
//                                 options={{
//                                     selection: true
//                                 }}
//                                 onSelectionChange={(e, a) => {
//                                     handleSetSelectedRows(e);
//                                 }}

//                             />

//                         </MuiThemeProvider>
//                         &nbsp;



//                         {openModal ? (<GroupModal isOpen={openModal} TabOpen={onChangeState} StoreData={allstoreids} custId={custid} />) : (null)}
//                         {/* {openModalSuccess ? (<SuccessModal isOpen={openModalSuccess} TabOpen={onChangeStateSuccess} message={"Customer"} />) : (null)} */}
//                     </Row>
//                     : null

//             }
//         </Form>
//     )
// }
// export default UploadStoreForm;