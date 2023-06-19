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
import storeSample from "../../../../assets/Files/skudetails.xlsx"
const URL = process.env.REACT_APP_LOCAL_URL;
import Select from "react-select"
import { getCustomerList } from "../../../../store/services/customer"
import { LatestStoresByCustomer } from "../../../../store/services/sku"
import Swal from "sweetalert2";  
import { ThreeDots } from 'react-loader-spinner'

const UploadStoreForm = (props) => {
    const [store, setstore] = useState('');
    const [store_id, setstore_id] = useState('');
    const [openModal, setopenModal] = useState(false);
    const[custId,setcustId]=useState('')
    const [selectedCustomer, setselectedCustomer] = useState([])
    const [customerlist] = useState([]);
    const [Loading, setLoading] = useState(false)

useEffect(async()=>{
   
    let cityList = await getCustomerList();
    console.log("selected customer is",selectedCustomer.length)

    cityList.map((item) => {
        customerlist.push({ label: item.Customer_Name, value: item.Customer })
    })
},[])
// const handleSubmitPersosnal=(e)=>{
//     // props.TabdataVerticle(4); 
// }
const handleSubmitPersosnal = async (e) => {
    e.preventDefault()
        setLoading(true)
        setTimeout(() => {
          setLoading(false);
        }, 5000);
        let storeId = await LatestStoresByCustomer(selectedCustomer.value)
        if(store!='' &&  selectedCustomer.length != 0 && storeId){
      console.log("calling from inside function")
        var formdata = new FormData();
        formdata.append('file', store); // file from File API
        formdata.append('customer_id',selectedCustomer.value)
        formdata.append('store_id',storeId)
        formdata.append('created_by','1')
        formdata.append('updated_by','1')
        for (var [key, value] of formdata.entries()) { 
            console.log(key, value);
           }  
        const response = await fetch(`${URL}`+`/bulk_upload_sku`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/sform-data',
                'Accept': 'application/json'
            },
        body: formdata
        });
        var responseData = await response.json();
        if(responseData.error!=''){
          Swal.fire({
            icon: 'error',
            title: 'Validation Errors....',
            // text: `${responseData.error}`,
          })
        }
        if(responseData.status==200){
            setLoading(false)
             Swal.fire({
            icon: 'success',
            title: 'SKU Added Succesfully!!',
            confirmButtonColor: '#306060',
          })
          
        }    
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Validation Errors....',
            text: 'Please Select File to Upload!',
          })
    }
    //   console.log("Response data is",responseData)                                    
    }

    const fileHandler=async(event)=>{
        setstore(event[0])
    }
    function changePreviousTab() {
        props.TabPreviousdata(1);
    }
    function onChangeState(TabOpen){
        setopenModal(TabOpen);
        props.Tabdata(3); 
    }
    const handleSelectCustomer = async (selectedCustomer,eleId) => {    
        setselectedCustomer(selectedCustomer)
        setcustId(selectedCustomer.value)  
        console.log("selected customer is",selectedCustomer.value)
        
        // setstore_id(storeId)
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
                    {/* <div class="pb-10 pb-lg-15">
                        <h2 class="fw-bolder text-dark">Upload Store</h2>
                    </div> */}
                <div className="row mb-5">
                <div className="col-md-6 fv-row">
                <h2 class="fw-bolder text-dark">Upload SKU</h2>
                    </div>
                <div className="col-md-2 fv-row">
                {/* <button type="button" class="btn btn-lg btn-primary" onClick={()=>handleUpload()}>
                  Upload{ " "}
                {/* <i className="fas fa-check" style={{ "size": '20' }}></i> 
                </button> */}
                </div>
                <div className="col-md-4 fv-row">
                <button type="button" class="btn  bg-light me-3" data-bs-toggle="modal" data-bs-target="#kt_customers_export_modal">
                            {/* <span class="svg-icon svg-icon-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="black" />
                                    <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="black" />
                                    <path d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="#C4C4C4" />
                                </svg>
                            </span> */}
                            <a href={storeSample} download="store_sample">
                            Download Dummy .Xlsx File</a>
                        </button>
                    </div>
                    </div>
              
                    <div className="row mb-5 ">
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
            {openModal?(<SuccessModal isOpen={openModal} TabOpen={onChangeState} message={"Stores"}/>):(null)}
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
                    {/* <button type="button" class="btn btn-lg btn-primary" onClick={()=>handleUpload()}>
                  Upload{ " "}
                <i className="fas fa-check" style={{ "size": '20' }}></i>
                </button> */}
               {Loading ? (<button
              type="submit"
              class="btn btn-lg btn-primary"
            >
              <ThreeDots color="#FFFFFF" height={30} width={30} />

            </button>) : (<button
              type="submit"
              class="btn btn-lg btn-primary"
            >
              Submit{" "}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="white" />
                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="white" />
              </svg>
            </button>)}
                    </Col>
                </Row>
            </div>
        </Form>
    )
}
export default UploadStoreForm;