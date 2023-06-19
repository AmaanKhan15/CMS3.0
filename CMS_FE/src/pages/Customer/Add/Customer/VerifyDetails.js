import React, { useState,useEffect } from "react"
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
    TabContent,
    TabPane
} from "reactstrap"
import Select from "react-select"


const PersonalForm = (props) => {
  const [idno, setidno] = useState('')
 
  const [selectedGroup, setselectedGroup] = useState(null)


  const handleSubmitPersosnal=(e)=> {
    e.preventDefault()
    // setidproof(document.getElementById("validationTooltip08").value);
    // setidno(document.getElementById("validationTooltip09").value);
   
   
    // if (document.getElementById("validationTooltip09").value === "") {
    //     setidno(false)
    // } else{
    //     setidno(true)
    // } 
   
    // var d1 = document.getElementsByName("validate")
    
    // document.getElementById("tooltipForm").classList.add("was-validated")

    // for (var i = 0; i < d1.length; i++) {
    //   d1[i].style.display = "block"
    // }
    // if(document.getElementById("validationTooltip09").value!= "" ){        
        props.Tabdata(4); 
        props.Verify(document.getElementById("validationTooltip09").value)        
    // }
  }

  //for change tooltip display propery
  function changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none"
    else document.getElementById(eleId).style.display = "block"
  }
function changePreviousTab(){
  props.TabPreviousdata(2);
}
const optionGroup = [
    {
      label: "Id Proof",
      options: [
        { label: "Iqama", value: "iq" },
        { label: "Adhar Card", value: "adc" },
        { label: "Pan Card", value: "pc" },
        { label: "Passport", value: "p" },
        { label: "Driving Licence", value: "dl" }
      ]
    },
   
  ]
  
function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
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
                <div className="row mb-5 ">
                        <div className="col-md-6 fv-row">
                        <h2 class="fw-bolder text-dark">Verify Details</h2>                       
                    </div>
                    </div>
                    <div className="row mb-5 ">
                        <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span >Select Id Proof</span>
                            </label>
                            <div className="mb-3 position-relative">
                             <Select
                            value={selectedGroup}
                            onChange={() => {
                              handleSelectGroup()
                            }}
                            options={optionGroup}
                            classNamePrefix="select2-selection "
                          /> 
                          
                          {/* <select class="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Select ID Proof" name="target_assign">
																<option value="">Select proof...</option>
																<option value="1">Adhar Card</option>
																<option value="2">Pan Card</option>
																<option value="3">Driving Licence</option>
																<option value="4">Passport</option>
													</select> */}

                        </div>
                            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
                        </div>
                    
                    </div>
                    <div className="row mb-5 ">
                       
                        <div className="col-md-12 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span >Enter Id Number</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg "
                            id="validationTooltip09"
                            placeholder="ID No"
                            onChange={event =>
                              changeHandeler(event, "validate9")
                            }
                          />

<div
                            className={
                                idno === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="validate9"
                          >
                            {idno === false
                              ?  "ID No is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
                        </div>
                    </div>
                </div>
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
                            Next
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
export default PersonalForm;