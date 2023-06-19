import React, { useState,useEffect } from "react";

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

const PersonalForm = (props) => {
  const [fnm, setfnm] = useState('')
  const [lnm, setlnm] = useState('')
  const [eml, seteml] = useState('')
  const [phn, setphn] = useState('')
  const [cty, setcty] = useState('')
  const [ads, setads] = useState('')
  const [alldata,setalldata]=useState([]);
 

  const handleSubmitPersosnal=(e)=> {
    e.preventDefault()
    console.log("I am here in Personal")

    setfnm(document.getElementById("validationTooltip07").value);
    setlnm(document.getElementById("validationTooltip02").value);
    seteml(document.getElementById("validationTooltip03").value);
    setphn(document.getElementById("validationTooltip04").value);
    setcty(document.getElementById("validationTooltip05").value);
    setads(document.getElementById("validationTooltip06").value);
    
    alldata.push(document.getElementById("validationTooltip07").value);
    alldata.push(document.getElementById("validationTooltip02").value);
    alldata.push(document.getElementById("validationTooltip03").value);
    alldata.push(document.getElementById("validationTooltip04").value);
    alldata.push(document.getElementById("validationTooltip05").value);
    alldata.push(document.getElementById("validationTooltip06").value);
    // alldata.push(fnm)
    // alldata.push(lnm)
    // alldata.push(eml)
    // alldata.push(phn)
    // alldata.push(cty)
    // alldata.push(ads)
    if (document.getElementById("validationTooltip07").value === "") {
      setfnm(false)
    } else {
      setfnm(true)
    }
    if (document.getElementById("validationTooltip02").value === "") {
      setlnm(false)
    } else{
      setlnm(true)
    } 
    if (document.getElementById("validationTooltip03").value === "") {
      seteml(false)
    } else{
      seteml(true)
    } 
    if (document.getElementById("validationTooltip04").value === "") {
      setphn(false)
    } else{
      setphn(true)
    }
    if (document.getElementById("validationTooltip05").value === "") {
      setcty(false)
    }else{
      setcty(true)
    }
    if (document.getElementById("validationTooltip06").value === "") {
      setads(false)
    }else{
      setads(true)
    }

    var d1 = document.getElementsByName("validate")
    
    document.getElementById("tooltipForm").classList.add("was-validated")

    for (var i = 0; i < d1.length; i++) {
      d1[i].style.display = "block"
    }
    if(document.getElementById("validationTooltip07").value != "" && document.getElementById("validationTooltip02").value!= ""  && document.getElementById("validationTooltip03").value!= ""  && document.getElementById("validationTooltip04").value!= ""  && document.getElementById("validationTooltip05").value!= ""  && document.getElementById("validationTooltip06").value != ""  ){        
        props.Tabdata(3);   
        props.Personal(alldata)
    }
  }

  //for change tooltip display propery
  function changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none"
    else document.getElementById(eleId).style.display = "block"
  }
function changePreviousTab(){
  props.TabPreviousdata(1);
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
                    <div class="pb-10 pb-lg-15">
                        <h2 class="fw-bolder text-dark">Personal Details</h2>                       
                    </div>
                    <div className="row mb-5 ">
                        <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">First Name</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg "
                            id="validationTooltip07"
                            placeholder="First name"
                            onChange={event =>
                              changeHandeler(event, "validate7")
                            }
                          />

                          <div
                            className={
                              fnm === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="validate7"
                          >
                           {fnm === false
                              ? "Please Enter First Name"
                              : ""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
                        </div>
                        <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Last Name</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg "
                            id="validationTooltip02"
                            placeholder="Last name"
                            onChange={event =>
                              changeHandeler(event, "validate2")
                            }
                          />

<div
                            className={
                              lnm === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="validate2"
                          >
                            {lnm === false
                              ?  "Last Name is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
                        </div>
                    </div>
                </div>
            </Row>
            <Row>
                <div className="row mb-5">
                <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Email</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg "
                            id="validationTooltip03"
                            placeholder="Email"
                            onChange={event =>
                              changeHandeler(event, "validate3")
                            }
                          />

<div
                            className={
                              eml === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="validate3"
                          >
                            {eml === false
                              ?  "Email is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
                        </div>
                        <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Phone</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg "
                            id="validationTooltip04"
                            placeholder="Phone"
                            onChange={event =>
                              changeHandeler(event, "validate4")
                            }
                          />

<div
                            className={
                              phn === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="validate4"
                          >
                            {phn === false
                              ?  "Phone is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
                        </div>
                </div>
            </Row>
            <Row>
                <div className="row mb-5">
                <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">City</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg "
                            id="validationTooltip05"
                            placeholder="City"
                            onChange={event =>
                              changeHandeler(event, "validate5")
                            }
                          />

<div
                            className={
                              cty === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="validate5"
                          >
                            {cty === false
                              ?  "City is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
                        </div>
                        <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Address</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg "
                            id="validationTooltip06"
                            placeholder="Address"
                            onChange={event =>
                              changeHandeler(event, "validate6")
                            }
                          />

<div
                            className={
                              ads === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="validate6"
                          >
                            {ads === false
                              ?  "Address is Required"
                              :""}
                          </div>
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