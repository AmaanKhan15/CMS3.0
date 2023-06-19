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
import GroupModal from "../../Modal/AddGroup";
import SuccessModal from "../../Modal/Success";
import MaterialTable from 'material-table';
import { TableIcons } from "../../../Common/TableIcons"
import { getUnAssignedPromotors, promotorByUsersup,postUpdateStoresPromotor } from "../../../../store/services/promotor"
import { latestcustomerId } from "../../../../store/services/customer"
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { ThreeDots } from 'react-loader-spinner'
import Select from "react-select"
import { getCustomer } from "../../../../store/services/customer"
import { getStoreList } from "../../../../store/services/store"

const theme = createTheme({
    palette: {
        primary: {
            main: '#306060',
        },
        secondary: {
            main: '#306060',
        },
    },
})
const UploadStoreForm = (props) => {
    const [apidata, setApidata] = useState([]);
    const [selectedStore, setSelectedStores] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [custId, setcustId] = useState('')
    const [optionGroup] = useState([]);
    const [selectedCustomer, setselectedCustomer] = useState([])
    const [customerlist] = useState([]);

    const handleSubmitPersosnal = (e) => {
        e.preventDefault()
        // setopenModalSuccess(true);
        props.Tabdata(2);
    }
    const selectedRow = React.useRef([]);
    const handleSetSelectedRows = rows => {
        // rows.map((item,key)=>{
        selectedRow.current = rows;
        console.log("Only Rows are", rows)
        setSelectedStores(rows)
        if (selectedRow.current.length > 0) {
            setShowButton(true)
        }
    };
    useEffect(async () => {
        let data = await getUnAssignedPromotors();
        let id = await latestcustomerId();
        setcustId(id)
        if (data != '') {
            setApidata(data);
        }
        
        let cityList = await getCustomer();
        console.log("selected customer is", cityList)

        cityList.map((item) => {
            customerlist.push({ label: item.company_name, value: item.id })
        })
    }, [])
    const [selectedGroup, setselectedGroup] = useState([])
    function handleSelectGroup(selectedGroup) {
        console.log("select changed", selectedGroup)
        setselectedGroup(selectedGroup)
    }
    const handleSelectCustomer = async (selectedCustomer, eleId) => {
        setselectedCustomer(selectedCustomer)
        let storeGroup = await getStoreList(selectedCustomer.value)
        console.log("Store Ids are", storeGroup)
        storeGroup.map((item, key) => {
            optionGroup.push({ label: item.store_name, value: item.id })
        })
      }
    const HandleGroupPop = async () => {
        let data = await promotorByUsersup(selectedStore, custId)
        let Storedata = await postUpdateStoresPromotor(selectedStore, selectedGroup.value)

        selectedStore.map((item, key) => {
            setApidata(prev => prev.filter((el) => el.id !== item.id)); // filter by id       
        })
        if (data != '' && Storedata!='') {
            props.AssignedStore(custId)
            Swal.fire({
                icon: 'success',
                title: 'Assigned Sucessfully!',
                text: 'Promotor is Assigned to Customer & Stores!',
                confirmButtonColor: '#306060',
            })
        }
    }

    return (
        <Form className="needs-validation"
            method="post"
            id="tooltipForm"
            onSubmit={e => {
                handleSubmitPersosnal(e)
            }}
        >
            {apidata ?
                <div>

                    <Row>
                        <div>
                            {/* {apidata.length > 0 ? ( */}
                            <MuiThemeProvider theme={theme}>
                                
                              
                                <MaterialTable
                                    icons={TableIcons}
                                    title="Promotors List"
                                    columns={[
                                        { title: 'Name', field: 'first_name' },
                                        { title: 'City', field: 'city' },
                                        { title: 'Contact No', field: 'phone_no' },
                                        { title: 'Area', field: 'area' },
                                        { title: 'Gender', field: 'gender' },
                                    ]}
                                    data={apidata}
                                    options={{
                                        selection: true
                                    }}
                                    onSelectionChange={(e, a) => {
                                        handleSetSelectedRows(e);
                                    }}

                                />

                            </MuiThemeProvider>
                            &nbsp;
                            &nbsp;
                            <Row>
                                <Col md={6}>
                                    <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                        <span className="required">Customer Name</span>
                                    </label>
                                    <Select
                                        value={selectedCustomer}
                                        onChange={handleSelectCustomer}
                                        options={customerlist}
                                        id="selectedCustomer"
                                        maxMenuHeight="200px"
                                        classNamePrefix="select2-selection"
                                    // isMulti={true}
                                    />
                                </Col>
                                <Col md={6}>
                                    <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                        <span className="required">Store Name</span>
                                    </label>
                                    <Select
                        value={selectedGroup}
                        onChange={handleSelectGroup}
                        options={optionGroup}
                        id="selectedGroup"
                        classNamePrefix="select2-selection"
                    />
                                </Col>
                            </Row>
                            &nbsp;
                            &nbsp;
                            <Row>
                                <Col md={6}>
                                </Col>
                                <Col md={3}>
                                </Col>
                                <Col md={3}>
                                {showButton ? (<button
                                    type="button"
                                    class="btn btn-lg btn-light-primary me-3"
                                    onClick={() => HandleGroupPop()}
                                >
                                    Assign Promotor
                                </button>) : (
                                    <button
                                        type="button"
                                        class="btn btn-lg btn-light-primary me-3"
                                        onClick={() => HandleGroupPop()}
                                        disabled
                                    >
                                        Assign Promotor
                                    </button>)}
                                </Col>
                            </Row>
                        </div>
                    </Row>
                   
                </div>
                : <Container fluid>
                    <div
                        className="pagination" style={{
                            position: 'relative ',
                            marginTop: '20%'
                        }}>
                        <ThreeDots color="#306060" height={80} width={80} />
                    </div>
                </Container>
            }
           
        </Form>
    )

}
export default UploadStoreForm;