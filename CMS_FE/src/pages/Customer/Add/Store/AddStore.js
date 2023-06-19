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
  TabContent,
  TabPane
} from "reactstrap"
import Swal from "sweetalert2";
import { postStoreData, getStoreList } from '../../../../store/services/store'
import { getCustomerList } from "../../../../store/services/customer"
import SuccessModal from "../../Modal/Success";
import { ThreeDots } from 'react-loader-spinner'
import Select from "react-select"

const AddStoreForm = (props) => {
  const [storeName, setstoreName] = useState('')
  const [Regno, setRegno] = useState('')
  const [contactNo, setcontactNo] = useState('')
  const [area, setarea] = useState('')
  const [address, setaddress] = useState('')
  const [openModal, setopenModal] = useState(false);
  const [lati, setlati] = useState('')
  const [long, setlong] = useState('')
  const [city, setcity] = useState('')
  const [custId, setcustId] = useState('')
  const [allStores, setallStores] = useState([])
  const [Loading, setLoading] = useState(false)
  const [alldata, setalldata] = useState([]);
  const [selectedCustomer, setselectedCustomer] = useState([])
  const [customerlist] = useState([]);

  useEffect(async () => {

    let cityList = await getCustomerList();
    console.log("selected customer is",selectedCustomer.length)

    cityList.map((item) => {
        customerlist.push({ label: item.Customer_Name, value: item.Customer })
    })
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // let res = await fetch(
    //   `${URL}` + `/latestcustomer`,
    //   {
    //     method: "get",
    //     headers: myHeaders,
    //   }
    // );
    // let response = await res.json();
    // const empResult = response.data;
    // empResult.map((item, key) => {
    //   setcustId(item.id)
    // })
    console.log("INAPIN SERVICE")
  })
  const handleSelectCustomer = async (selectedCustomer,eleId) => {    
    setselectedCustomer(selectedCustomer)
    setcustId(selectedCustomer.value)  
    console.log("selected customer is",selectedCustomer.value)
   }
  const handleSubmitPersosnal = async (e) => {
    e.preventDefault()
    console.log("selected customer lsit is",selectedCustomer.length)
    
    setstoreName(document.getElementById("storeName1").value);
    setRegno(document.getElementById("Regno1").value);
    setcontactNo(document.getElementById("contactNo1").value);
    setarea(document.getElementById("area1").value);
    setaddress(document.getElementById("address1").value);
    setlati(document.getElementById("lati").value);
    setlong(document.getElementById("long1").value);

    alldata.push(document.getElementById("storeName1").value);
    alldata.push(document.getElementById("Regno1").value);
    alldata.push(document.getElementById("contactNo1").value);
    alldata.push(document.getElementById("area1").value);
    alldata.push(document.getElementById("address1").value);
    alldata.push(document.getElementById("lati").value);
    alldata.push(document.getElementById("long1").value);
    alldata.push(document.getElementById("city1").value);

    if (document.getElementById("storeName").value === "") {
      setstoreName(false)
    } else {
      setstoreName(true)
    }
    if (document.getElementById("Regno").value === "") {
      setRegno(false)
    } else {
      setRegno(true)
    }
    if (document.getElementById("contactNo").value === "") {
      setcontactNo(false)
    } else {
      setcontactNo(true)
    }
    if (document.getElementById("address").value === "") {
      setaddress(false)
    } else {
      setaddress(true)
    }
    if (document.getElementById("area").value === "") {
      setarea(false)
    } else {
      setarea(true)
    }
    if (document.getElementById("lati").value === "") {
      setlati(false)
    } else {
      setlati(true)
    }
    if (document.getElementById("long").value === "") {
      setlong(false)
    } else {
      setlong(true)
    }
    if (document.getElementById("city").value === "") {
      setcity(false)
    } else {
      setcity(true)
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    var d1 = document.getElementsByName("validate")

    document.getElementById("tooltipForm").classList.add("was-validated")

    for (var i = 0; i < d1.length; i++) {
      d1[i].style.display = "block"
    }
      if (document.getElementById("storeName").value != "" && document.getElementById("contactNo").value != "" && document.getElementById("Regno").value != "" && document.getElementById("address").value != "" && document.getElementById("area").value != "" && document.getElementById("lati").value != "" && document.getElementById("long").value != "" && document.getElementById("city").value != "" && selectedCustomer.length != 0) {
      let data = await postStoreData(document.getElementById("storeName").value, document.getElementById("contactNo").value, document.getElementById("Regno").value, document.getElementById("address").value, document.getElementById("area").value, document.getElementById("lati").value, document.getElementById("long").value, selectedCustomer.value, document.getElementById("city").value);
      console.log("record deleted is", data)
      if (data != '') {
        // setopenModal(true)
        let stores = await getStoreList(selectedCustomer.value)
        //  if(stores!=''){
        //   setallStores(stores)

        //  }
        // props.Storedata(stores)
        Swal.fire({
          icon: 'success',
          title: 'Store Details Added Succesfully..!',
          // text: 'Please Check Mandatory Fields!',
          confirmButtonColor: '#306060',
          textColor: '#306060'
          // footer: '<a href="">Why do I have this issue?</a>'
        })
        props.Tabdata(2);
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Errors....',
        text: 'Please Check Mandatory Fields!',
        confirmButtonColor: '#306060',
        textColor: '#306060'
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }

  //for change tooltip display propery
  function changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none"
    else document.getElementById(eleId).style.display = "block"
  }
  function changePreviousTab() {
    props.TabPreviousdata(1);
  }
  function onChangeState(TabOpen) {
    setopenModal(TabOpen);
    props.Tabdata(2);
    // props.Stores(allStores); 
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
            <h2 class="fw-bolder text-dark">Add Stores For
              <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Adding Stores"></i>	</h2>
            <div class="text-muted fw-bold fs-6">Please Enter Details to Create Stores.</div>
          </div>
          <div className="row mb-5">
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
            <div className="col-md-6 fv-row">
              <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                <span className="required">Store Name</span>
              </label>
              <div className="mb-3 position-relative">
                <Input
                  type="text"
                  className="form-control form-control-lg "
                  id="storeName"
                  placeholder="Store Name"
                  onChange={event =>
                    changeHandeler(event, "storeName1")
                  }
                />
                <div
                  className={
                    storeName === false ? "invalid-tooltip" : ""
                  }
                  name="validate"
                  id="storeName1"
                >
                  {storeName === false
                    ? "Store Name is Required"
                    : ""}
                </div>
              </div>
              {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
            </div>
            <div className="col-md-6 fv-row">
              <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                <span className="required">Registeration No</span>
              </label>
              <div className="mb-3 position-relative">
                <Input
                  type="text"
                  className="form-control form-control-lg "
                  id="Regno"
                  placeholder="Registeration No"
                  onChange={event =>
                    changeHandeler(event, "Regno1")
                  }
                />
                <div
                  className={
                    Regno === false ? "invalid-tooltip" : ""
                  }
                  name="validate"
                  id="Regno1"
                >
                  {Regno === false
                    ? "Registeration No is Required"
                    : ""}
                </div>
              </div>
              {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
            </div>
          </div>
        </div>
      </Row>
      {openModal ? (<SuccessModal isOpen={openModal} TabOpen={onChangeState} message={"Stores"} />) : (null)}
      <Row>
        <div class="w-100">
          <div className="row mb-5">
            <div className="col-md-6 fv-row">
              <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                <span className="required">Contact No</span>
              </label>
              <div className="mb-3 position-relative">
                <Input
                  type="text"
                  className="form-control form-control-lg "
                  id="contactNo"
                  placeholder="Contact No"
                  onChange={event =>
                    changeHandeler(event, "contactNo1")
                  }
                />
                <div
                  className={
                    contactNo === false ? "invalid-tooltip" : ""
                  }
                  name="validate"
                  id="contactNo1"
                >
                  {contactNo === false
                    ? "Contact No is Required"
                    : ""}
                </div>
              </div>
              {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
            </div>
            <div className="col-md-6 fv-row">
              <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                <span className="required">Area</span>
              </label>
              <div className="mb-3 position-relative">
                <Input
                  type="text"
                  className="form-control form-control-lg "
                  id="area"
                  placeholder="Area"
                  onChange={event =>
                    changeHandeler(event, "area1")
                  }
                />

                <div
                  className={
                    area === false ? "invalid-tooltip" : ""
                  }
                  name="validate"
                  id="area1"
                >
                  {area === false
                    ? "Area is Required"
                    : ""}
                </div>
              </div>
              {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <div class="w-100">
          <div className="row mb-5">
            <div className="col-md-6 fv-row">
              <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                <span className="required">Latitude</span>
              </label>
              <div className="mb-3 position-relative">
                <Input
                  type="text"
                  className="form-control form-control-lg "
                  id="lati"
                  placeholder="Latitude"
                  onChange={event =>
                    changeHandeler(event, "lati1")
                  }
                />
                <div
                  className={
                    lati === false ? "invalid-tooltip" : ""
                  }
                  name="validate"
                  id="lati1"
                >
                  {lati === false
                    ? "Latitude is Required"
                    : ""}
                </div>
              </div>
              {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
            </div>
            <div className="col-md-6 fv-row">
              <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                <span className="required">Logitude</span>
              </label>
              <div className="mb-3 position-relative">
                <Input
                  type="text"
                  className="form-control form-control-lg "
                  id="long"
                  placeholder="Longitude"
                  onChange={event =>
                    changeHandeler(event, "long1")
                  }
                />
                <div
                  className={
                    long === false ? "invalid-tooltip" : ""
                  }
                  name="validate"
                  id="long1"
                >
                  {long === false
                    ? "longitude is Required"
                    : ""}
                </div>
              </div>
              {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <div class="w-100">
          <div className="row mb-5">
            <div className="col-md-6 fv-row">
              <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                <span className="required">Address</span>
              </label>
              <div className="mb-3 position-relative">
                <Input
                  type="text"
                  className="form-control form-control-lg "
                  id="address"
                  placeholder="Address"
                  onChange={event =>
                    changeHandeler(event, "address1")
                  }
                />
                <div
                  className={
                    address === false ? "invalid-tooltip" : ""
                  }
                  name="validate"
                  id="address1"
                >
                  {address === false
                    ? "Address is Required"
                    : ""}
                </div>
              </div>
              {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
            </div>
            <div className="col-md-6 fv-row">
              <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                <span className="required">City</span>
              </label>
              <div className="mb-3 position-relative">
                <Input
                  type="text"
                  className="form-control form-control-lg "
                  id="city"
                  placeholder="City"
                  onChange={event =>
                    changeHandeler(event, "city1")
                  }
                />
                <div
                  className={
                    city === false ? "invalid-tooltip" : ""
                  }
                  name="validate"
                  id="city1"
                >
                  {city === false
                    ? "Address is Required"
                    : ""}
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

          </Col>
          <Col md={6}></Col>
          <Col md={3}>
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
export default AddStoreForm;