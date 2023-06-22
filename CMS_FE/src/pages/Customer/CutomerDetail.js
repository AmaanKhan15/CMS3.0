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
import { useLocation, Link } from "react-router-dom"
const URL = process.env.REACT_APP_LOCAL_URL

const AddStoreForm = props => {
  const [contactNo, setcontactNo] = useState("")
  const [area, setarea] = useState("")
  const [address, setaddress] = useState("")
  const [openModal, setopenModal] = useState(false)
  const [fName, setfname] = useState("")
  const [mName, setmname] = useState("")
  const [lName, setlname] = useState("")
  const [gender, setgender] = useState("")
  const [idproof, setidproof] = useState("")
  const [proofno, setproofno] = useState("")
  const [email, setemail] = useState("")
  const [city, setcity] = useState("")
  const [pass, setpass] = useState("")
  const [uname, setuname] = useState("")
  const [Loading, setLoading] = useState(false)
  const [selectedGroup, setselectedGroup] = useState([])
  const [selectedProof, setselectedProof] = useState([])

  const [apiData, setApidata] = useState([])
  const location = useLocation()
  useEffect(async () => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Cache-Control", "no-cache")
    let res = await fetch(`${URL}` + `/customer/` + `${location.state.id}`, {
      method: "get",
      headers: myHeaders,
    })
    let response = await res.json()
    setApidata(response.data)
    console.log("post data is", response)
  }, [])
  //for change tooltip display propery
  function changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none"
    else document.getElementById(eleId).style.display = "block"
  }
  return (
    <React.Fragment>
      <div className="page-content">
        {apiData ? (
          apiData.map((item, key) => {
            return (
              <Container fluid={true}>
                <div className="page-title-box">
                  <Row className="align-items-center">
                    <Col md={8}>
                      <h6 className="page-title">Customer Details</h6>
                    </Col>
                  </Row>
                </div>
                {/* <Breadcrumbs maintitle="Stores" title="Store List" breadcrumbItem="" /> */}
                <Row>
                  <Col md={"12"}>
                    <Card>
                      <CardBody>
                        <Form
                          className="needs-validation"
                          method="post"
                          id="tooltipForm"
                          onSubmit={e => {
                            handleSubmitPersosnal(e)
                          }}
                        >
                          <Row>
                            <Col md={11}></Col>
                            <Col md={1}>
                              <Link
                                type="button"
                                to="/customer-list"
                                class="btn btn-primary font-size-14"
                              >
                                Back
                              </Link>
                            </Col>
                          </Row>
                          <Row>
                            <div class="w-100">
                              <div class="pb-10 pb-lg-15">
                                <h2 class="fw-bolder text-dark">
                                  Custsomer Details
                                  <i
                                    class="fas fa-exclamation-circle ms-2 fs-7"
                                    data-bs-toggle="tooltip"
                                    title="Adding Marchands"
                                  ></i>{" "}
                                </h2>
                                {/* <div class="text-muted fw-bold fs-6">Please Enter Details to Add Marchandiser.</div>                       */}
                              </div>
                              <div className="row mb-5">
                                <div className="col-md-12 fv-row">
                                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span className="required">
                                      Company Name
                                    </span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="text"
                                      className="form-control form-control-lg "
                                      id="address"
                                      placeholder="Address"
                                      defaultValue={item.company_name}
                                      onChange={event =>
                                        changeHandeler(event, "address1")
                                      }
                                      disabled
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
                          <Row>
                            <div class="w-100">
                              <div className="row mb-5">
                                <div className="col-md-6 fv-row">
                                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span className="required">First Name</span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="text"
                                      className="form-control form-control-lg"
                                      id="fName"
                                      placeholder="First Name"
                                      defaultValue={item.first_name}
                                      onChange={event =>
                                        changeHandeler(event, "fName1")
                                      }
                                      disabled
                                    />
                                    <div
                                      className={
                                        fName === false ? "invalid-tooltip" : ""
                                      }
                                      name="validate"
                                      id="fName1"
                                    >
                                      {fName === false
                                        ? "First Name is Required"
                                        : ""}
                                    </div>
                                  </div>
                                  {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                                </div>
                                <div className="col-md-6 fv-row">
                                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span className="required">
                                      Middle Name
                                    </span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="text"
                                      className="form-control form-control-lg"
                                      id="mName"
                                      placeholder="Middle Name"
                                      defaultValue={item.middle_name}
                                      onChange={event =>
                                        changeHandeler(event, "mName1")
                                      }
                                      disabled
                                    />
                                    <div
                                      className={
                                        mName === false ? "invalid-tooltip" : ""
                                      }
                                      name="validate"
                                      id="mName1"
                                    >
                                      {mName === false
                                        ? "Middle Name No is Required"
                                        : ""}
                                    </div>
                                  </div>
                                  {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                                </div>
                              </div>
                            </div>
                          </Row>
                          <Row>
                            <div class="w-100">
                              <div className="row mb-5">
                                <div className="col-md-12 fv-row">
                                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span className="required">Last Name</span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="text"
                                      className="form-control form-control-lg"
                                      id="lName"
                                      placeholder="Contact No"
                                      defaultValue={item.last_name}
                                      onChange={event =>
                                        changeHandeler(event, "lName1")
                                      }
                                      disabled
                                    />
                                    <div
                                      className={
                                        lName === false ? "invalid-tooltip" : ""
                                      }
                                      name="validate"
                                      id="lName1"
                                    >
                                      {lName === false
                                        ? "Last Name is Required"
                                        : ""}
                                    </div>
                                  </div>
                                  {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                                </div>
                              </div>
                            </div>
                          </Row>
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
                                      className="form-control form-control-lg"
                                      id="contactNo"
                                      placeholder="Contact No"
                                      defaultValue={item.phone_no}
                                      onChange={event =>
                                        changeHandeler(event, "contactNo1")
                                      }
                                      disabled
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
                                  {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                                </div>
                                <div className="col-md-6 fv-row">
                                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span className="required">Id Proof</span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="text"
                                      className="form-control form-control-lg"
                                      id="area"
                                      placeholder="Area"
                                      defaultValue={item.id_proof}
                                      onChange={event =>
                                        changeHandeler(event, "area1")
                                      }
                                      disabled
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
                                  {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
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
                                      className="form-control form-control-lg"
                                      id="address"
                                      placeholder="Address"
                                      defaultValue={item.address}
                                      onChange={event =>
                                        changeHandeler(event, "address1")
                                      }
                                      disabled
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
                                  {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                                </div>
                                <div className="col-md-6 fv-row">
                                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span className="required">Email</span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="text"
                                      className="form-control form-control-lg"
                                      id="email"
                                      placeholder="Email"
                                      defaultValue={item.email}
                                      onChange={event =>
                                        changeHandeler(event, "email1")
                                      }
                                      disabled
                                    />
                                    <div
                                      className={
                                        email === false ? "invalid-tooltip" : ""
                                      }
                                      name="validate"
                                      id="email1"
                                    >
                                      {email === false
                                        ? "Email is Required"
                                        : ""}
                                    </div>
                                  </div>
                                  {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                                </div>
                              </div>
                            </div>
                          </Row>
                          <Row>
                            <div class="w-100">
                              <div className="row mb-5">
                                <div className="col-md-6 fv-row">
                                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span className="required">Username</span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="text"
                                      className="form-control form-control-lg"
                                      id="uname"
                                      placeholder="Username"
                                      defaultValue={item.username}
                                      onChange={event =>
                                        changeHandeler(event, "uname1")
                                      }
                                      disabled
                                    />
                                    <div
                                      className={
                                        uname === false ? "invalid-tooltip" : ""
                                      }
                                      name="validate"
                                      id="uname1"
                                    >
                                      {uname === false
                                        ? "Username is Required"
                                        : ""}
                                    </div>
                                  </div>
                                  {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                                </div>
                                <div className="col-md-6 fv-row">
                                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span className="required">Password</span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="password"
                                      className="form-control form-control-lg"
                                      id="pass"
                                      defaultValue={item.password}
                                      placeholder="Password"
                                      onChange={event =>
                                        changeHandeler(event, "pass1")
                                      }
                                      disabled
                                    />
                                    <div
                                      className={
                                        pass === false ? "invalid-tooltip" : ""
                                      }
                                      name="validate"
                                      id="pass1"
                                    >
                                      {pass === false
                                        ? "Password is Required"
                                        : ""}
                                    </div>
                                  </div>
                                  {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                                </div>
                              </div>
                            </div>
                          </Row>
                          <Row>
                            <div class="w-100">
                              <div className="row mb-5">
                                <div className="col-md-12 fv-row">
                                  <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span className="required">City</span>
                                  </label>
                                  <div className="mb-3 position-relative">
                                    <Input
                                      type="text"
                                      className="form-control form-control-lg"
                                      id="city"
                                      placeholder="City"
                                      defaultValue={item.city}
                                      onChange={event =>
                                        changeHandeler(event, "city1")
                                      }
                                      disabled
                                    />
                                    <div
                                      className={
                                        city === false ? "invalid-tooltip" : ""
                                      }
                                      name="validate"
                                      id="city1"
                                    >
                                      {city === false ? "City is Required" : ""}
                                    </div>
                                  </div>
                                  {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                                </div>
                              </div>
                            </div>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            )
          })
        ) : (
          <Container fluid>
            <div
              className="pagination"
              style={{
                position: "relative ",
                marginTop: "20%",
              }}
            >
              <ThreeDots color="#306060" height={80} width={80} />
            </div>
          </Container>
        )}
      </div>
    </React.Fragment>
  )
}
export default AddStoreForm
