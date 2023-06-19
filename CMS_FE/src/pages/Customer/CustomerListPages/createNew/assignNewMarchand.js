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
import SuccessModal from "../../Modal/Success";
import MaterialTable from 'material-table';
import { TableIcons } from "../../../Common/TableIcons"
import { postMerchandUpdate, getUnAssignedMerchandiser } from "../../../../store/services/merchand"
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { ThreeDots } from 'react-loader-spinner';
import { Link, useLocation } from "react-router-dom";
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
    const [allstoreids, setallstoreids] = useState('')
    const [openModal, setopenModal] = useState(false);
    const [openModalSuccess, setopenModalSuccess] = useState(false);
    const [modal_center, setmodal_center] = useState(false)
    const [showButton, setShowButton] = useState(false);
    const handleSubmitPersosnal = (e) => {
        e.preventDefault()
        setopenModalSuccess(true);

    }
    const location = useLocation()
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
        let data = await getUnAssignedMerchandiser();
        console.log("data is", data)
        if (data != '') {
            setApidata(data);
        }
    }, [])
    const HandleGroupPop = () => {
        var id;
        console.log("Stores data After maping is", selectedStore, location.state.id)
        let data = postMerchandUpdate(selectedStore, location.state.id)
        selectedStore.map((item, key) => {
            id = item.id;
        })
        if(data !=''){
            Swal.fire({
                    icon: 'success',
                    title: 'Merchandiser Assigned Succesfully',
                    confirmButtonText: 'Continue',
                    confirmButtonColor: '#306060',
                  })
        }
        setApidata(prev => prev.filter((el) => el.id !== id)); // filter by id       
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={'12'}>
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
                                                <Link type="button" to="/customer-list" class="btn btn-primary font-size-14" data-bs-toggle="modal" data-bs-target="#kt_modal_add_customer">Back</Link>
                                            </div>
                                        </div>
                                        {/*end::Card toolbar*/}
                                    </div>
                                    <div class="card-body py-3">
                                        {/* <CardBody> */}
                                        <Form className="needs-validation"
                                            method="post"
                                            id="tooltipForm"
                                            onSubmit={e => {
                                                handleSubmitPersosnal(e)
                                            }}
                                        >
                                            {apidata ?
                                                <Row>
                                                    {apidata.length > 0 ? (
                                                        <MuiThemeProvider theme={theme}>
                                                            {showButton ? (
                                                            <button
                                                                type="button"
                                                                class="btn btn-lg btn-light-primary me-3"
                                                                onClick={() => HandleGroupPop()}
                                                            >
                                                                Assign Merchand
                                                            </button>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-lg btn-light-primary me-3"
                                                                    onClick={() => HandleGroupPop()}
                                                                    disabled
                                                                >
                                                                    Assign Merchand
                                                                </button>)}
                                                            &nbsp;
                                                            <MaterialTable
                                                                icons={TableIcons}
                                                                title="Unassigned Merchandiser's List"
                                                                columns={[
                                                                    { title: 'Name', field: 'first_name' },
                                                                    { title: 'Address', field: 'address' },
                                                                    { title: 'Id Proof', field: 'id_proof' },
                                                                    { title: 'Contact No', field: 'phone_no', type: 'numeric' },
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
                                                    ) : <Container fluid>
                                                    <div
                                                        className="pagination" style={{
                                                            position: 'relative ',
                                                            marginTop: '10%'
                                                        }}>
                                                    </div>
                                                    <div class="card-toolbar">
                                                        <div class="d-flex justify-content-center" data-kt-customer-table-toolbar="base">
                                                            <Link type="button" to="/merchand-add" class="btn btn-primary font-size-14" data-bs-toggle="modal" data-bs-target="#kt_modal_add_customer">Add New Merchandiser</Link>
                                                        </div>
                                                    </div>
                                                </Container>}
                                                </Row>
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
                                        {/* </CardBody> */}
                                    </div>
                                </div>
                                {/* </Card> */}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div >
        </React.Fragment >
    )
}
export default UploadStoreForm;