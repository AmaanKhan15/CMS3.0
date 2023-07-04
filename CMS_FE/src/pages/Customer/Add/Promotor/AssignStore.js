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
import { latestcustomerId } from "../../../../store/services/customer";
import { getPromotorListByCustsomer, postUpdateStoresPromotor } from "../../../../store/services/promotor"
import { getStoreList } from "../../../../store/services/store"
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { ThreeDots } from 'react-loader-spinner';
import Select from "react-select";
import MaterialTable from 'material-table';
import { TableIcons } from "../../../Common/TableIcons"

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

const AssignStoreForm = (props) => {
    const handleSubmitPersosnal = (e) => {
        e.preventDefault()
        props.TabdataVerticle(5);
    }
    const [custId, setcustId] = useState('');
    const [apidata, setApidata] = useState([]);
    const [optionGroup] = useState([]);
    useEffect(async () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setApidata(props.AssignedStoreTab)
        let custid = await latestcustomerId();
        setcustId(custid)
        console.log("In Promotor stores id is", props.AssignedStoreTab)
        let storeGroup = await getStoreList(custid)
        console.log("Store Ids are", storeGroup)
        storeGroup.map((item, key) => {
            optionGroup.push({ label: item.store_name, value: item.id })
        })
    }, [])


    const [selectedGroup, setselectedGroup] = useState([])
    function handleSelectGroup(selectedGroup) {
        console.log("select changed", selectedGroup)
        setselectedGroup(selectedGroup)
    }
    const [selectedStore, setSelectedStores] = useState([]);
    const selectedRow = React.useRef([]);
    const handleSetSelectedRows = rows => {
        selectedRow.current = rows;
        console.log("Only Rows are", rows)
        setSelectedStores(rows)

    };
    function changePreviousTab() {
        props.TabPreviousdata(1);
    }
    const AssignMerchand = async () => {
        console.log("assiged vlues are", selectedStore, selectedGroup.value)
        let data = await postUpdateStoresPromotor(selectedStore, selectedGroup.value)
        if (data != '') {
            Swal.fire({
                icon: 'success',
                title: 'Assigned Sucessfully!',
                text: 'Promotor is Assigned to Customer!',
                confirmButtonColor: '#306060',
            })
            selectedStore.map((item, key) => {
                setApidata(prev => prev.filter((el) => el.id !== item.id)); // filter by id       
            })

            //   props.TabdataVerticle(6);         
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
            {props.AssignedStoreTab ?
                <Row>
                    <div>
                        {/* {props.AssignedStoreTab.length > 0 ? ( */}

                            <MuiThemeProvider theme={theme}>
                                <MaterialTable
                                    icons={TableIcons}
                                    title="Promotor List"
                                    columns={[
                                        { title: 'Name', field: 'first_name' },
                                        { title: 'City', field: 'city' },
                                        { title: 'Contact No', field: 'phone_no' },
                                        { title: 'Area', field: 'area' },
                                        { title: 'Gender', field: 'gender' },
                                    ]}
                                    data={props.AssignedStoreTab}

                                    options={{
                                        selection: true,

                                    }}
                                    onSelectionChange={(e, a) => {
                                        handleSetSelectedRows(e);
                                    }}

                                />

                            </MuiThemeProvider>


                        {/* ) : <Container fluid>
                            <div
                                className="pagination" style={{
                                    position: 'relative ',
                                    marginTop: '10%'
                                }}>
                                <h2>No Record Found</h2>
                            </div>
                        </Container>*/}
                        &nbsp;&nbsp;

                        {/* {openModal ? (<GroupModal isOpen={openModal} TabOpen={onChangeState} StoreData={allstoreids} />) : (null)} */}
                        {/* {openModalSuccess ? (<SuccessModal isOpen={openModalSuccess} TabOpen={onChangeStateSuccess} message={"Customer"} />) : (null)} */}
                    </div>

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
            &nbsp;
            &nbsp;
            <Row>
                <Col md={8}>
                    <Select
                        value={selectedGroup}
                        onChange={handleSelectGroup}
                        options={optionGroup}
                        id="selectedGroup"
                        classNamePrefix="select2-selection"
                    />
                </Col>
                <Col md={4}>
                    <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        onClick={() => AssignMerchand()}
                    >
                        Assign Promotor
                    </button>
                </Col>
            </Row>
            &nbsp;
            &nbsp;
            <div className="actions clearfix">
                <Row>

                    <Col md={3}>
                        <button
                            type="button"
                            class="btn btn-lg btn-light-primary me-3"
                            onClick={() => {
                                changePreviousTab()
                            }}
                        >
                            <span class="svg-icon svg-icon-3 me-1">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="6" y="11" width="13" height="2" rx="1" fill="white" />
                                    <path d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z" fill="white" />
                                </svg>
                            </span>
                            Back
                        </button>
                    </Col>
                    <Col md={6}>

                    </Col>
                    <Col md={3}>
                        <button
                            type="submit"
                            class="btn btn-lg btn-primary"
                        >
                            Next{" "}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="white" />
                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="white" />
                            </svg>
                        </button>
                    </Col>
                </Row>
            </div>
        </Form>
    )
}
export default AssignStoreForm;