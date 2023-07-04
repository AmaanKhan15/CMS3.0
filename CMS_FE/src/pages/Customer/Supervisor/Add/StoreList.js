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
const UploadSuperviorForm = (props) => {
    const [sku, setsku] = useState([]);
    const [openModal, setopenModal] = useState(false);
    const [modal_center, setmodal_center] = useState(false)    
    const handleSubmitPersosnal = (e) => {
        e.preventDefault()
        props.Tabdata(4);
    }

   
    function ChangeFile(files) {
        setsku(files)
    }
    function changePreviousTab() {
        props.TabPreviousdata(2);
    }
    function onChangeState(TabOpen){
        setopenModal(TabOpen);
        props.Tabdata(4); 
    }
    return (
        <Form className="needs-validation"
            method="post"
            id="tooltipForm"
            onSubmit={e => {
                handleSubmitPersosnal(e)
            }}
            >
            <Row>
                <div class="card mb-5 mb-xl-8">

                    <div class="card-header border-0 pt-5">
                        <input type="text" class="form-control form-control-lg form-control-solid w-750px btn-rounded-small" placeholder="Search Superviors" />
                        <button
                            type="button"
                            class="btn btn-sm btn-primary "
                        >
                            Search
                        </button>
                    </div>
                    <div class="card-body py-3">
                        <div class="table-responsive">
                            <table class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                                <thead>
                                    <tr class="fw-bolder text-muted">
                                        <th class="w-25px">
                                            {/* Checks */}
                                        </th>
                                        <th class="min-w-150px">Superviors</th>
                                        <th class="min-w-140px">Area</th>
                                        <th class="min-w-120px">Contact No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="form-check form-check-sm form-check-custom form-check-solid">
                                                <input class="form-check-input widget-13-check" type="checkbox" value="1" />
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder text-hover-primary fs-14">Supervior Name</a>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder text-hover-primary d-block mb-1 fs-14">Area Name</a>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder text-hover-primary d-block mb-1 fs-14">+918978678899</a>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="form-check form-check-sm form-check-custom form-check-solid">
                                                <input class="form-check-input widget-13-check" type="checkbox" value="1" />
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder text-hover-primary fs-14">Supervior Name</a>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder text-hover-primary d-block mb-1 fs-14">Area Name</a>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder text-hover-primary d-block mb-1 fs-14">+918978678899</a>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="form-check form-check-sm form-check-custom form-check-solid">
                                                <input class="form-check-input widget-13-check" type="checkbox" value="1" />
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder text-hover-primary fs-14">Supervior Name</a>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder text-hover-primary d-block mb-1 fs-14">Area Name</a>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder d-block mb-1 fs-14">+918978678899</a>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="form-check form-check-sm form-check-custom form-check-solid">
                                                <input class="form-check-input widget-13-check" type="checkbox" value="1" />
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder fs-14">Supervior Name</a>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder d-block mb-1 fs-14">Area Name</a>
                                        </td>
                                        <td>
                                            <a href="#" class="text-dark fw-bolder d-block mb-1 fs-14">+918978678899</a>
                                        </td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    <div class="card-header-button border-0 pt-3" >
                        <div class="align-items-center position-relative my-12">
                        <span
                            // type="span"
                            class="btn btn-lg btn-light-primary"
                            onClick={()=>setopenModal(true)}
                        >
                            Create Group
                        </span>
                    </div>
                    </div>
                    
                    </div>
                </div>
                {openModal?(<GroupModal isOpen={openModal} TabOpen={onChangeState}/>):(null)}
            </Row>
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
                    <Col md={7}></Col>
                    <Col md={2}>
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
export default UploadSuperviorForm;