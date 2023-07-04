const URL = process.env.REACT_APP_LOCAL_URL
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
import Select from "react-select"
import { useLocation, useHistory } from "react-router-dom"
import { getSKUList } from "../../../../store/services/sku"
import { Link } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"
import Swal from "sweetalert2"

const Promotortarget = props => {
  const [selectedSku, setselectedSku] = useState([])
  const [target, settarget] = useState("")
  const [tdescript, settdescript] = useState("")
  const [Loading, setLoading] = useState(false)
  const [skulist] = useState([])
  const location = useLocation()
  const history = useHistory()
  useEffect(async () => {
    let skuList = await getSKUList(
      location.state.custId,
      location.state.storeId
    )
    console.log("data is", skuList)
    skuList.map((item, key) => {
      skulist.push({
        label: item.product_name + " " + item.product_desc,
        value: item.id,
      })
    })
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])
  function handleSelectSKU(selectedStore) {
    // setstorid(selectedStore.value);
    setselectedSku(selectedStore)
  }
  const handleSubmitPersosnal = async e => {
    e.preventDefault()

    settarget(document.getElementById("target1").value)
    settdescript(document.getElementById("tdescript1").value)

    if (document.getElementById("target1").value === "") {
      settarget(false)
    } else {
      settarget(true)
    }
    if (document.getElementById("tdescript1").value === "") {
      settdescript(false)
    } else {
      settdescript(true)
    }

    var d1 = document.getElementsByName("validate")

    document.getElementById("tooltipForm").classList.add("was-validated")

    for (var i = 0; i < d1.length; i++) {
      d1[i].style.display = "block"
    }
    if (
      document.getElementById("target").value != "" &&
      document.getElementById("tdescript").value != ""
    ) {
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append("Cache-Control", "no-cache")
      var Bodydata = JSON.stringify({
        customer_id: location.state.custId,
        promotor_id: location.state.proId,
        store_id: location.state.storeId,
        target_assigned: document.getElementById("target").value,
        sku_id: selectedStore.value,
        target_desc: document.getElementById("tdescript").value,
        created_by: 1,
        updated_by: 1,
      })
      let res = await fetch(`${URL}` + `/targetassigned`, {
        method: "post",
        headers: myHeaders,
        body: Bodydata,
      })
      let response = await res.json()
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Target Assigned Succesfully",
          confirmButtonText: "Continue",
          confirmButtonColor: "#306060",
        })
        history.push("/customer-list")
      }
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

  //for change tooltip display propery
  function changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none"
    else document.getElementById(eleId).style.display = "block"
  }
  return (
    <React.Fragment>
      <div className="page-content">
        {Loading ? (
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
        ) : (
          <Container fluid={true}>
            <div className="page-title-box">
              <Row className="align-items-center">
                <Col md={8}>
                  <h6 className="page-title">Promoter Target</h6>
                </Col>
                <Col md={2}></Col>
                <Col md={2}>
                  <div class="card-toolbar">
                    <div
                      class="d-flex justify-content-end"
                      data-kt-customer-table-toolbar="base"
                    >
                      <Link
                        type="button"
                        to="/customer-list"
                        class="btn btn-primary font-size-14"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_add_customer"
                      >
                        Back
                      </Link>
                    </div>
                  </div>
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
                        <div class="w-100">
                          <div className="row mb-5">
                            <div className="col-md-6 fv-row">
                              <label class="text-muted fw-normal font-size-15">
                                <span className="required">Target</span>
                              </label>
                              <div className="mb-3 position-relative">
                                <Input
                                  type="text"
                                  className="form-control form-control-lg "
                                  id="target1"
                                  placeholder="Target"
                                  onChange={event =>
                                    changeHandeler(event, "target")
                                  }
                                />
                                <div
                                  className={
                                    target === false ? "invalid-tooltip" : ""
                                  }
                                  name="validate"
                                  id="target"
                                >
                                  {target === false ? "Target is Required" : ""}
                                </div>
                              </div>
                              {/* <input type="text" class="form-control form-control-lg form-control-solid" placeholder="First Name" name="first-name" /> */}
                            </div>
                            <div className="col-md-6 fv-row">
                              <label class="text-muted fw-normal font-size-15">
                                <span className="required">SKU</span>
                              </label>
                              <div className="mb-3 position-relative">
                                <Select
                                  value={selectedSku}
                                  onChange={handleSelectSKU}
                                  options={skulist}
                                  id="selectedStore"
                                  classNamePrefix="select2-selection"
                                />
                                {/* <div
                                                                className={
                                                                    address === false ? "invalid-tooltip" : ""
                                                                }
                                                                name="validate"
                                                                id="address1"
                                                            >
                                                                {address === false
                                                                    ? "Address is Required"
                                                                    : ""}
                                                            </div> */}
                              </div>
                              {/* <input type="text" class="form-control form-control-lg form-control-solid" placeholder="First Name" name="first-name" /> */}
                            </div>
                          </div>
                          <div className="row mb-5">
                            <div className="col-md-12 fv-row">
                              <label class="text-muted fw-normal font-size-15">
                                <span className="required">
                                  Target Description
                                </span>
                              </label>
                              <div className="mb-3 position-relative">
                                <Input
                                  type="text"
                                  className="form-control form-control-lg "
                                  id="tdescript1"
                                  placeholder="Target Description"
                                  onChange={event =>
                                    changeHandeler(event, "tdescript")
                                  }
                                />
                                <div
                                  className={
                                    tdescript === false ? "invalid-tooltip" : ""
                                  }
                                  name="validate"
                                  id="tdescript"
                                >
                                  {tdescript === false
                                    ? "Target Description is Required"
                                    : ""}
                                </div>
                              </div>
                              {/* <input type="text" class="form-control form-control-lg form-control-solid" placeholder="First Name" name="first-name" /> */}
                            </div>
                          </div>
                        </div>
                      </Row>
                      <div className="actions clearfix">
                        <Row>
                          <Col md={3}></Col>
                          <Col md={6}></Col>
                          <Col md={2}>
                            <button
                              type="submit"
                              class="btn btn-lg btn-primary"
                            >
                              Submit{" "}
                              <i
                                className="fas fa-check"
                                style={{ size: "20" }}
                              ></i>
                            </button>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </React.Fragment>
  )
}

export default Promotortarget
