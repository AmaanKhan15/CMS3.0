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
  TabPane,
} from "reactstrap"
import Swal from "sweetalert2"
import { updateStore } from "../../../../store/services/store"
import { useHistory, useLocation } from "react-router-dom"
import SuccessModal from "../../Modal/Success"
import { ThreeDots } from "react-loader-spinner"
const URL = process.env.REACT_APP_LOCAL_URL

const AddStoreForm = props => {
  const [storeName, setstoreName] = useState("")
  const [Regno, setRegno] = useState("")
  const [contactNo, setcontactNo] = useState("")
  const [area, setarea] = useState("")
  const [address, setaddress] = useState("")
  const [openModal, setopenModal] = useState(false)
  const [lati, setlati] = useState("")
  const [long, setlong] = useState("")
  const [alldata, setalldata] = useState([])
  const [editData, seteditData] = useState([])
  const [Loading, setLoading] = useState(false)

  const location = useLocation()
  const history = useHistory()
  const handleSubmitPersosnal = async (e, storeid) => {
    e.preventDefault()

    setstoreName(document.getElementById("storeName1").value)
    setRegno(document.getElementById("Regno1").value)
    setcontactNo(document.getElementById("contactNo1").value)
    setarea(document.getElementById("area1").value)
    setaddress(document.getElementById("address1").value)
    setlati(document.getElementById("lati").value)
    setlong(document.getElementById("long1").value)

    alldata.push(document.getElementById("storeName1").value)
    alldata.push(document.getElementById("Regno1").value)
    alldata.push(document.getElementById("contactNo1").value)
    alldata.push(document.getElementById("area1").value)
    alldata.push(document.getElementById("address1").value)
    alldata.push(document.getElementById("lati").value)
    alldata.push(document.getElementById("long1").value)

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

    var d1 = document.getElementsByName("validate")

    document.getElementById("tooltipForm").classList.add("was-validated")

    for (var i = 0; i < d1.length; i++) {
      d1[i].style.display = "block"
    }
    if (
      document.getElementById("storeName").value != "" &&
      document.getElementById("contactNo").value != "" &&
      document.getElementById("Regno").value != "" &&
      document.getElementById("address").value != "" &&
      document.getElementById("area").value != "" &&
      document.getElementById("lati").value != "" &&
      document.getElementById("long").value != ""
    ) {
      setLoading(true)
      let data = await updateStore(
        document.getElementById("storeName").value,
        document.getElementById("contactNo").value,
        document.getElementById("Regno").value,
        document.getElementById("address").value,
        document.getElementById("area").value,
        document.getElementById("lati").value,
        document.getElementById("long").value,
        storeid
      )
      console.log("record deleted is", data)
      setTimeout(() => {
        setLoading(false)
      }, 2000)
      if (data.status == 200) {
        // setopenModal(true)
        Swal.fire({
          icon: "success",
          title: "Stores Updated Sucessfully!",
          // text: 'Supervisor is Assigned to Customer!',
          confirmButtonColor: "#306060",
        })
        history.push("/store-list")
      }
      // props.Storedata(alldata)
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Errors....",
        text: "Please Check Mandatory Fields!",
        confirmButtonColor: "#306060",
        textColor: "#306060",
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }
  useEffect(async () => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Cache-Control", "no-cache")
    let res = await fetch(`${URL}` + `/store/` + `${location.state.id}`, {
      method: "get",
      headers: myHeaders,
    })
    let response = await res.json()
    seteditData(response.data)
    console.log("post data is", response)
  }, [])
  //for change tooltip display propery
  function changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none"
    else document.getElementById(eleId).style.display = "block"
  }
  function changePreviousTab() {
    props.TabPreviousdata(1)
  }
  function onChangeState(TabOpen) {
    setopenModal(TabOpen)
    props.Tabdata(2)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Stores</h6>
              </Col>
            </Row>
          </div>
          {/* <Breadcrumbs maintitle="Stores" title="Store List" breadcrumbItem="" /> */}
          <Row>
            <Col md={"12"}>
              <Card>
                <CardBody>
                  {editData != [] ? (
                    editData.map((item, key) => {
                      return (
                        <Form
                          className="needs-validation"
                          method="post"
                          id="tooltipForm"
                          onSubmit={e => {
                            handleSubmitPersosnal(e, item.id)
                          }}
                        >
                          <Row>
                            <div class="w-100">
                              <div class="pb-10 pb-lg-15">
                                <h2 class="fw-bolder text-dark">
                                  Add Stores For
                                  <i
                                    class="fas fa-exclamation-circle ms-2 fs-7"
                                    data-bs-toggle="tooltip"
                                    title="Adding Stores"
                                  ></i>{" "}
                                </h2>
                                <div class="text-muted fw-bold fs-6">
                                  Please Enter Details to Create Stores.
                                </div>
                              </div>
                              <div className="row mb-5">
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
                                      defaultValue={item.store_name}
                                      onChange={event =>
                                        changeHandeler(event, "storeName1")
                                      }
                                    />
                                    <div
                                      className={
                                        storeName === false
                                          ? "invalid-tooltip"
                                          : ""
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
                                    <span className="required">
                                      Registeration No
                                    </span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="text"
                                      className="form-control form-control-lg "
                                      id="Regno"
                                      defaultValue={item.ref_no}
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
                          {openModal ? (
                            <SuccessModal
                              isOpen={openModal}
                              TabOpen={onChangeState}
                              message={"Stores"}
                            />
                          ) : null}
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
                                      defaultValue={item.contact_no}
                                      placeholder="Contact No"
                                      onChange={event =>
                                        changeHandeler(event, "contactNo1")
                                      }
                                    />
                                    <div
                                      className={
                                        contactNo === false
                                          ? "invalid-tooltip"
                                          : ""
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
                                      defaultValue={item.area}
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
                                      {area === false ? "Area is Required" : ""}
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
                                      defaultValue={item.latitude}
                                      placeholder="Contact No"
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
                                      defaultValue={item.longitude}
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
                                <div className="col-md-12 fv-row">
                                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span className="required">Address</span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="text"
                                      className="form-control form-control-lg "
                                      id="address"
                                      placeholder="Address"
                                      defaultValue={item.address}
                                      onChange={event =>
                                        changeHandeler(event, "address1")
                                      }
                                    />
                                    <div
                                      className={
                                        address === false
                                          ? "invalid-tooltip"
                                          : ""
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
                              </div>
                            </div>
                          </Row>

                          <div className="actions clearfix">
                            <Row>
                              <Col md={3}></Col>
                              <Col md={6}></Col>
                              {Loading ? (
                                <Col md={2}>
                                  <button
                                    type="submit"
                                    class="btn btn-lg btn-primary"
                                  >
                                    <ThreeDots
                                      color="#ffffff"
                                      height={30}
                                      width={30}
                                    />
                                  </button>
                                </Col>
                              ) : (
                                <Col md={2}>
                                  <button
                                    type="submit"
                                    class="btn btn-lg btn-primary"
                                  >
                                    Update{" "}
                                    <i
                                      className="fas fa-check"
                                      style={{ size: "20" }}
                                    ></i>
                                  </button>
                                </Col>
                              )}
                            </Row>
                          </div>
                        </Form>
                      )
                    })
                  ) : (
                    <Container fluid>
                      <div
                        className="pagination"
                        style={{
                          position: "relative ",
                          marginTop: "30%",
                        }}
                      >
                        <ThreeDots color="#306060" height={80} width={80} />
                      </div>
                    </Container>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default AddStoreForm
