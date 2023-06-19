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
import {useHistory} from "react-router-dom";
const UploadStoreForm = (props) => {
    const [sku, setsku] = useState([]);
    const [openModal, setopenModal] = useState(false);
    const [modal_center, setmodal_center] = useState(false)
    const [openModalComplete, setopenModalComplete] = useState(false);
    const history = useHistory();


    const handleSubmitPersosnal = (e) => {
        e.preventDefault()
        setopenModalComplete(true)
        // setsku(document.getElementById("sku1").value);
        // setmodal_center(!modal_center)
        // removeBodyCss()  
        // setopenModal(true);
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Store Added Successfully',
        //     // confirmButtonText: 'Go To Supervisor',
        //     confirmButtonColor: '#306060',

        // })
        // props.Tabdata(4);


    }
    useEffect(()=>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'     
          });
    })
   
    function ChangeFile(files) {
        setsku(files)
    }
    function changePreviousTab() {
        props.TabPreviousdata(3);
    }
    function onChangeState(TabOpen){
        setopenModal(TabOpen);
    }
    function onChangeStateComplete(TabOpen){
        setopenModalComplete(TabOpen);
        history.push("/merchand-list")
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
                        <input type="text" class="form-control form-control-lg form-control-solid w-750px btn-rounded-small" placeholder="Search Stores" />
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
                                        <th class="min-w-150px">Stores</th>
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
                                            <a href="#" class="text-dark fw-bolder text-hover-primary fs-14">Store Name</a>
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
                                            <a href="#" class="text-dark fw-bolder text-hover-primary fs-14">Store Name</a>
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
                                            <a href="#" class="text-dark fw-bolder text-hover-primary fs-14">Store Name</a>
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
                                            <a href="#" class="text-dark fw-bolder fs-14">Store Name</a>
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
                            Add Stores
                        </span>
                    </div>
                    </div>
                    
                    </div>
                </div>
                {openModal?(<SuccessModal isOpen={openModal} TabOpen={onChangeState} message={"Stores"}/>):(null)}
                {openModalComplete?(<SuccessModal isOpen={openModal} TabOpen={onChangeStateComplete} message={"All Merchandiser Data"}/>):(null)}

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
                    <Col md={6}></Col>
                    <Col md={3}>
                        <button
                            type="submit"
                            class="btn btn-lg btn-primary"
                        >
                            Submit{" "}
                            <i className="fas fa-check" style={{ "size": '20' }}></i>
                        </button>
                    </Col>
                </Row>
            </div>
        </Form>
    )
}
export default UploadStoreForm;