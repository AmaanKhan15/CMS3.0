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
import { DropzoneArea } from 'material-ui-dropzone';
import SuccessModal from "../../Modal/Success";
import storeSample from "../../../../assets/Files/merchandemo.xlsx"
import { ThreeDots } from 'react-loader-spinner'
import Swal from "sweetalert2";  
import {useHistory} from 'react-router-dom';
const URL = process.env.REACT_APP_LOCAL_URL;

const UploadStoreForm = (props) => {
    
    const [store, setstore] = useState('');
    const [modal_center, setmodal_center] = useState(false);
    const [openModal, setopenModal] = useState(false);
    const [selectedGroup, setselectedGroup] = useState(null)
    const [Loading, setLoading] = useState(false)
    const history=useHistory();


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
    const handleSubmitPersosnal = async (e) => {
        e.preventDefault()
        var formdata = new FormData();
        formdata.append('file', store); // file from File API        
        formdata.append('created_by', '1')
        formdata.append('updated_by', '1')
        for (var [key, value] of formdata.entries()) {
            console.log(key, value);
        }
        const response = await fetch(`${URL}`+`/bulk_upload_merchand`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/sform-data',
                'Accept': 'application/json'
            },
            body: formdata
        });
        var responseData = await response.json();

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        if (responseData.status == 200) {
            // setopenModal(true);
            Swal.fire({
            icon: 'success',
            title: 'Marchandiser Added Succesfully',
            confirmButtonText: 'OK',
            confirmButtonColor: '#306060',
          })
          history.push('/merchand-list')
        }
        // Swal.fire({
        //     icon: 'success',
        //     title: 'SKU Added Succesfully',
        //     confirmButtonText: 'Go To Supervisor',
        //     confirmButtonColor: '#306060',

        //   })
        //   props.Tabdata(3);         

    }
    const fileHandler = async (event) => {
        setstore(event[0])
        console.log("Evevnt files are", event);
    }
    function changePreviousTab() {
        props.TabPreviousdata(1);
    }
    function onChangeState(TabOpen) {
        setopenModal(TabOpen);
        props.Tabdata(3);
    }
    return (
        <Form className="needs-validation"
            method="post"
            id="tooltipForm"
            onSubmit={e => {
                handleSubmitPersosnal(e)
            }}>

            <Row>
                <div class="w-100">                    
                    <div className="row mb-5">
                        <div className="col-md-9 fv-row">
                            <h2 class="fw-bolder text-dark">Upload Merchandiser</h2>
                        </div>
                        <div className="col-md-3 fv-row">
                            <button type="button" class="btn  bg-light me-3" data-bs-toggle="modal" data-bs-target="#kt_customers_export_modal">                               
                                <a href={storeSample} download="merchand_sample">
                                    Download Dummy .Xlsx File</a>
                            </button>
                        </div>
                    </div>                   
                    <div className="row mb-5 ">
                        <div className="col-md-12 fv-row">
                            <DropzoneArea
                                onChange={fileHandler}
                                showPreviews={true}
                                maxFileSize={5000000}
                                name="file"
                                class="card h-100 flex-center bg-light-primary border-primary border border-dashed p-8"
                            />
                        </div>
                    </div>
                </div>
            </Row>
            {openModal ? (<SuccessModal isOpen={openModal} TabOpen={onChangeState} message={"Stores"} />) : (null)}
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
                    {Loading ?
                        <Col md={2}>

                            <button
                                type="submit"
                                class="btn btn-lg btn-primary"
                            >
                                <ThreeDots color="#ffffff" height={20} width={20} />
                            </button>
                        </Col>
                        : <Col md={2}>
                            <button
                                type="submit"
                                class="btn btn-lg btn-primary"
                            >
                                Submit{" "}
                                <i className="fas fa-check" style={{ "size": '20' }}></i>

                            </button>
                        </Col>}

                </Row>
            </div>
        </Form>
    )
}
export default UploadStoreForm;