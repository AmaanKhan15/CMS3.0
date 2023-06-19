const URL = process.env.REACT_APP_LOCAL_URL;
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
import SweetAlert from "react-bootstrap-sweetalert";
import { latestcustomerId } from "../../../../store/services/customer"
import { LatestStoresByCustomer } from "../../../../store/services/sku"
import Select from "react-select"
import { getCustomerList } from "../../../../store/services/customer"
import { ThreeDots } from 'react-loader-spinner'

const AddSkuForm = (props) => {
  const [sku, setsku] = useState('')
  const [carqty, setcarqty] = useState('')
  const [refno, setrefno] = useState('')
  const [skudec, setskudec] = useState('')
  const [catgy, setcatgy] = useState('')
  const [proname, setproname] = useState('')
  const [prodesc, setprodesc] = useState('')
  const [proprice, setproprice] = useState('')
  const [openModal, setopenModal] = useState(false);
  const [custId, setcustId] = useState('')
  const [storeId, setstoreId] = useState('')
  const [selectedCustomer, setselectedCustomer] = useState([])
  const [customerlist] = useState([]);
  const [Loading, setLoading] = useState(false)

  useEffect(async () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // let custId = await latestcustomerId();
    // console.log("cusstomer id is", custId)
    // console.log("Store Id", storeId)
    // setcustId(custId)
    // setstoreId(storeId)

    let cityList = await getCustomerList();
    console.log("selected customer is", selectedCustomer.length)

    cityList.map((item) => {
      customerlist.push({ label: item.Customer_Name, value: item.Customer })
    })
  }, [])
  const handleSelectCustomer = async (selectedCustomer, eleId) => {
    setselectedCustomer(selectedCustomer)
    setcustId(selectedCustomer.value)
    console.log("selected customer is", selectedCustomer.value)
  }
  const handleSubmitPersosnal = async (e) => {
    e.preventDefault()

    setsku(document.getElementById("sku1").value);
    setcarqty(document.getElementById("cartonQty1").value);
    setrefno(document.getElementById("Refno1").value);
    setskudec(document.getElementById("skuDesc1").value);
    setcatgy(document.getElementById("category1").value);
    setproname(document.getElementById("productname1").value);
    setprodesc(document.getElementById("productdesc1").value);
    setproprice(document.getElementById("productprice1").value);

    if (document.getElementById("sku").value === "") {
      setsku(false)
    } else {
      setsku(true)
    }
    if (document.getElementById("cartonQty").value === "") {
      setcarqty(false)
    } else {
      setcarqty(true)
    }
    if (document.getElementById("Refno").value === "") {
      setrefno(false)
    } else {
      setrefno(true)
    }
    if (document.getElementById("skuDesc").value === "") {
      setskudec(false)
    } else {
      setskudec(true)
    }
    if (document.getElementById("category").value === "") {
      setcatgy(false)
    } else {
      setcatgy(true)
    }
    if (document.getElementById("productname").value === "") {
      setproname(false)
    } else {
      setproname(true)
    }
    if (document.getElementById("productdesc").value === "") {
      setprodesc(false)
    } else {
      setprodesc(true)
    }
    if (document.getElementById("productprice").value === "") {
      setproprice(false)
    } else {
      setproprice(true)
    }
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
    var d1 = document.getElementsByName("validate")

    document.getElementById("tooltipForm").classList.add("was-validated")

    for (var i = 0; i < d1.length; i++) {
      d1[i].style.display = "block"
    }
    if (document.getElementById("sku").value != "" && document.getElementById("cartonQty").value != "" && document.getElementById("Refno").value != "" && document.getElementById("category").value != "" && document.getElementById("skuDesc").value != "" && document.getElementById("category").value != "" && document.getElementById("productname").value != "" && document.getElementById("productdesc").value != "" && document.getElementById("productprice").value != "",selectedCustomer.value!=0) {
      let storeId = await LatestStoresByCustomer(selectedCustomer.value)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var Bodydata = JSON.stringify({
        sku: document.getElementById("sku").value,
        sku_qty: document.getElementById("cartonQty").value,
        ref_no: document.getElementById("Refno").value,
        sku_desc: document.getElementById("skuDesc").value,
        category: document.getElementById("category").value,
        product_name: document.getElementById("productname").value,
        product_desc: document.getElementById("productdesc").value,
        product_price: document.getElementById("productprice").value,
        customer_id: selectedCustomer.value,
        store_id: storeId,
        created_by: 1,
        updated_by: 1
      });
      let res = await fetch(
        `${URL}` + `/sku`,
        {
          method: "post",
          headers: myHeaders,
          body: Bodydata
        }
      );
      let response = await res.json();
      console.log("response is", response)
      if (response.status == 200) {
        setopenModal(true);
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'SKU Added Succesfully',
          confirmButtonColor: '#306060',
        })
      }
      // props.TabdataVerticle(4);
props.Tabactive(2)
      // props.TabdataVerticle(4);         
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
  return (
    <Form className="needs-validation"
      method="post"
      id="tooltipForm"
      onSubmit={e => {
        handleSubmitPersosnal(e)
      }}>
      {/* {openModal ? <SweetAlert
        title="Good job!"
        success
        showCancel
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        onConfirm={() => {
          setopenModal(false)
        }}
        onCancel={() => {
          setopenModal(false)
        }}
      >
        SKU Uploaded Succesfully!!!
      </SweetAlert> : null} */}


      <Row>
        
          <div className="row mb-5 ">
            <div className="col-md-6 fv-row">
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
                <span className="required">SKU</span>
              </label>
              <div className="mb-3 position-relative">
                <Input
                  type="text"
                  className="form-control form-control-lg "
                  id="sku"
                  placeholder="SKU"
                  onChange={event =>
                    changeHandeler(event, "sku1")
                  }
                />

                <div
                  className={
                    sku === false ? "invalid-tooltip" : ""
                  }
                  name="validate"
                  id="sku1"
                >
                  {sku === false
                    ? "Please Enter Sku"
                    : ""}
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
              <span className="required">Carton Qty</span>
            </label>
            <div className="mb-3 position-relative">
              <Input
                type="text"
                className="form-control form-control-lg "
                id="cartonQty"
                placeholder="Carton Qty"
                onChange={event =>
                  changeHandeler(event, "cartonQty1")
                }
              />

              <div
                className={
                  carqty === false ? "invalid-tooltip" : ""
                }
                name="validate"
                id="cartonQty1"
              >
                {carqty === false
                  ? "Carton Qty is Required"
                  : ""}
              </div>
            </div>
            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
          </div>
          <div className="col-md-6 fv-row">
            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
              <span className="required">Reference No</span>
            </label>
            <div className="mb-3 position-relative">
              <Input
                type="text"
                className="form-control form-control-lg "
                id="Refno"
                placeholder="Reference No"
                onChange={event =>
                  changeHandeler(event, "Refno1")
                }
              />

              <div
                className={
                  refno === false ? "invalid-tooltip" : ""
                }
                name="validate"
                id="Refno1"
              >
                {refno === false
                  ? "Refernce No is Required"
                  : ""}
              </div>
            </div>
            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
          </div>
        </div>
      </Row>
      <Row>
        <div className="row mb-5">
          <div className="col-md-12 fv-row">
            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
              <span className="required">SKU Description</span>
            </label>
            <div className="mb-3 position-relative">
              <Input
                type="text"
                className="form-control form-control-lg "
                id="skuDesc"
                placeholder="SKU Description"
                onChange={event =>
                  changeHandeler(event, "skuDesc1")
                }
              />

              <div
                className={
                  skudec === false ? "invalid-tooltip" : ""
                }
                name="validate"
                id="skuDesc1"
              >
                {skudec === false
                  ? "SKU Description is Required"
                  : ""}
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
              <span className="required">Category</span>
            </label>
            <div className="mb-3 position-relative">
              <Input
                type="text"
                className="form-control form-control-lg "
                id="category"
                placeholder="Category"
                onChange={event =>
                  changeHandeler(event, "category1")
                }
              />

              <div
                className={
                  catgy === false ? "invalid-tooltip" : ""
                }
                name="validate"
                id="category1"
              >
                {catgy === false
                  ? "Category is Required"
                  : ""}
              </div>
            </div>
            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
          </div>

          <div className="col-md-6 fv-row">
            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
              <span className="required">Product Name</span>
            </label>
            <div className="mb-3 position-relative">
              <Input
                type="text"
                className="form-control form-control-lg "
                id="productname"
                placeholder="Product Name"
                onChange={event =>
                  changeHandeler(event, "productname1")
                }
              />

              <div
                className={
                  proname === false ? "invalid-tooltip" : ""
                }
                name="validate"
                id="productname1"
              >
                {proname === false
                  ? "Product name is Required"
                  : ""}
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
              <span className="required">Product Description</span>
            </label>
            <div className="mb-3 position-relative">
              <Input
                type="text"
                className="form-control form-control-lg "
                id="productdesc"
                placeholder="Product Description"
                onChange={event =>
                  changeHandeler(event, "productdesc1")
                }
              />

              <div
                className={
                  prodesc === false ? "invalid-tooltip" : ""
                }
                name="validate"
                id="productdesc1"
              >
                {prodesc === false
                  ? "Product Description is Required"
                  : ""}
              </div>
            </div>
            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
          </div>

          <div className="col-md-6 fv-row">
            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
              <span className="required">Product Price</span>
            </label>
            <div className="mb-3 position-relative">
              <Input
                type="text"
                className="form-control form-control-lg "
                id="productprice"
                placeholder="Product Price"
                onChange={event =>
                  changeHandeler(event, "productprice1")
                }
              />

              <div
                className={
                  proprice === false ? "invalid-tooltip" : ""
                }
                name="validate"
                id="productprice1"
              >
                {proprice === false
                  ? "Product Price is Required"
                  : ""}
              </div>
            </div>
            {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
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
export default AddSkuForm;