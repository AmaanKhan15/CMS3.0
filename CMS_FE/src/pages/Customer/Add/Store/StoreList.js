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
  TabPane,
} from "reactstrap"
import Swal from "sweetalert2"
import GroupModal from "../../Modal/AddGroup"
import SuccessModal from "../../Modal/Success"
import MaterialTable from "material-table"
import { TableIcons } from "../../../Common/TableIcons"
import { getUnAssignedStores } from "../../../../store/services/store"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
import { ThreeDots } from "react-loader-spinner"
const URL = process.env.REACT_APP_LOCAL_URL
import { useHistory } from "react-router-dom"
import { getAllStoreList, getStoreList } from "../../../../store/services/store"
import Select from "react-select"
import { getCustomerList } from "../../../../store/services/customer"

const theme = createTheme({
  palette: {
    primary: {
      main: "#306060",
    },
    secondary: {
      main: "#306060",
    },
  },
})
const UploadStoreForm = props => {
  const history = useHistory()
  const [apidata, setApidata] = useState(props.TabStores)
  const [selectedStore, setSelectedStores] = useState([])
  const [allstoreids, setallstoreids] = useState("")
  const [custid, setcustid] = useState("")
  const [openModal, setopenModal] = useState(false)
  const [openModalSuccess, setopenModalSuccess] = useState(false)
  const [modal_center, setmodal_center] = useState(false)
  const [showButton, setShowButton] = useState(false)
  let [loading, setLoading] = useState(true)
  const [allStores, setallStores] = useState([])
  const [selectedCustomer, setselectedCustomer] = useState([])
  const [customerlist] = useState([])
  const [custId, setcustId] = useState("")

  const handleSubmitPersosnal = e => {
    e.preventDefault()
    // setopenModalSuccess(true);
    // props.TabdataVerticle(3);
    // history.push("/customer-step3")
  }

  function ChangeFile(files) {
    setsku(files)
  }
  function changePreviousTab() {
    props.TabPreviousdata(2)
  }
  function onChangeState(TabOpen) {
    // setopenModal(TabOpen);
    // props.Tabdata(4);
  }

  const selectedRow = React.useRef([])
  const handleSetSelectedRows = rows => {
    // rows.map((item,key)=>{
    selectedRow.current = rows
    console.log("Only Rows are", rows)
    setSelectedStores(rows)
    if (selectedRow.current.length > 0) {
      setShowButton(true)
    }
  }
  useEffect(async () => {
    setLoading(false)
    setTimeout(() => {
      setLoading(false)
    }, 5000)

    let cityList = await getCustomerList()
    console.log("selected customer is", selectedCustomer.length)

    cityList.map(item => {
      customerlist.push({ label: item.Customer_Name, value: item.Customer })
    })
  }, [])
  const handleSelectCustomer = async (selectedCustomer, eleId) => {
    setselectedCustomer(selectedCustomer)
    setcustId(selectedCustomer.value)
    let stores = await getStoreList(selectedCustomer.value)
    setallStores(stores)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }
  // useEffect(async () => {
  //     setLoading(false);
  //     setTimeout(() => {
  //         setLoading(false);
  //     }, 5000);
  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");  myHeaders.append("Cache-Control", "no-cache");;

  //     let res = await fetch(
  //         `${URL}` + `/latestcustomer`,
  //         {
  //             method: "get",
  //             headers: myHeaders,
  //         }
  //     );
  //     let response = await res.json();
  //     const empResult = response.data;
  //     var customer;
  //     empResult.map((item, key) => {
  //         setcustid(item.id);
  //         customer = item.id;
  //     })
  //     let data = await getUnAssignedStores(customer);
  //     console.log("data is", data)
  //     if (data != '') {
  //         setApidata(data);
  //     }
  //     console.log("stores in store list is", props.TabStores)
  // }, [])
  const HandleGroupPop = async () => {
    let ids = []
    setallStores([])
    selectedStore.map((item, key) => {
      console.log("Stores data After maping is", item.id)
      ids.push(item.id)
    })
    setallstoreids(ids.join(","))
    setopenModal(true)
    setLoading(true)
    let stores = await getAllStoreList()
    if (stores) {
      setallStores(stores)
      setLoading(false)
    }
    // setApidata(prev => prev.filter((el) => el.id !== id)); // filter by id
  }
  return (
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
              <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                <span className="required">Customer</span>
              </label>
              <div className="mb-3 position-relative">
                <Select
                  value={selectedCustomer}
                  onChange={handleSelectCustomer}
                  options={customerlist}
                  id="selectedCustomer"
                  maxMenuHeight="140px"
                  classNamePrefix="select2-selection"
                  // isMulti={true}
                />
              </div>
            </div>
            <div className="col-md-6 fv-row">
              <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                {/* <span className="required">Customer</span> */}
              </label>
              {showButton ? (
                <button
                  type="button"
                  class="btn btn-lg btn-light-primary me-3"
                  onClick={() => HandleGroupPop()}
                >
                  Create Group
                </button>
              ) : (
                <button
                  type="button"
                  class="btn btn-lg btn-light-primary me-3"
                  onClick={() => HandleGroupPop()}
                  disabled
                >
                  Create Group
                </button>
              )}
            </div>
          </div>
        </div>
      </Row>
      &nbsp; &nbsp;
      {loading ? (
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
      ) : allStores ? (
        <Row>
          &nbsp; &nbsp;
          {/* {props.TabStores.length >= 1 ? ( */}
          <MuiThemeProvider theme={theme}>
            <MaterialTable
              icons={TableIcons}
              title="Store List"
              columns={[
                { title: "Stores", field: "store_name" },
                { title: "Refernce No", field: "ref_no" },
                { title: "Area", field: "address" },
                { title: "Contact No", field: "contact_no", type: "numeric" },
              ]}
              data={allStores}
              options={{
                selection: true,
              }}
              onSelectionChange={(e, a) => {
                handleSetSelectedRows(e)
              }}
            />
          </MuiThemeProvider>
          &nbsp;
          {openModal ? (
            <GroupModal
              isOpen={openModal}
              TabOpen={onChangeState}
              StoreData={allstoreids}
              custId={custid}
            />
          ) : null}
          {/* {openModalSuccess ? (<SuccessModal isOpen={openModalSuccess} TabOpen={onChangeStateSuccess} message={"Customer"} />) : (null)} */}
        </Row>
      ) : null}
    </Form>
  )
}
export default UploadStoreForm
