import React, { useState, useEffect } from "react"
// import "./create-account";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"
import { ThreeDots } from "react-loader-spinner"
import Pagination from "react-mui-pagination"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
const URL = process.env.REACT_APP_LOCAL_URL

import { useHistory } from "react-router-dom"
const theme = createTheme({
  palette: {
    primary: {
      main: "#306060",
    },
  },
})

const ListIndex = props => {
  const [apidata, setApidata] = useState([])
  const [filterResult, setfilterResult] = useState([])
  const [searchInput, setSearchInput] = useState("")
  let [loading, setLoading] = useState(true)
  const itemsPerPage = 10
  const [page, setPage] = useState(1)
  const [noOfPages, setnoOfPages] = useState("")
  const handleChange = (event, value) => {
    setPage(value)
  }
  const history = useHistory()
  useEffect(async () => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Cache-Control", "no-cache")
    const data = JSON.parse(localStorage.getItem("authUser"))
    var Bodydata = JSON.stringify({
      customer_id: data.id,
    })
    let res = await fetch(`${URL}` + `/customermodule/unavailableSKU`, {
      method: "POST",
      headers: myHeaders,
      body: Bodydata,
    })
    let response = await res.json()
    const empResult = response.data
    console.log("response data is", empResult)
    setnoOfPages(Math.ceil(empResult.length / itemsPerPage))
    // setData(empResult.slice(0, pageSize));
    setApidata(empResult)
    setLoading(false)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  const searchItems = searchValue => {
    setSearchInput(searchValue)
    if (searchInput !== "") {
      const filteredData = apidata.filter(item => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      })
      setfilterResult(filteredData)
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">
                  Unavailable SKU List{" "}
                  <p>(SKU Qty Less Than 15 In Warehouse)</p>
                </h6>
              </Col>
            </Row>
          </div>
          {/* <Breadcrumbs maintitle="Stores" title="Store List" breadcrumbItem="" /> */}
          <Row>
            <Col md={"12"}>
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
              ) : (
                <div class="card mb-5 mb-xl-8">
                  <div class="card-header border-0 pt-6">
                    <div class="card-title">
                      <div class="d-flex align-items-center position-relative my-1">
                        <span class="svg-icon svg-icon-1 position-absolute ms-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <rect
                              opacity="0.5"
                              x="17.0365"
                              y="15.1223"
                              width="8.15546"
                              height="2"
                              rx="1"
                              transform="rotate(45 17.0365 15.1223)"
                              fill="black"
                            />
                            <path
                              d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <input
                          onChange={e => searchItems(e.target.value)}
                          type="text"
                          data-kt-customer-table-filter="search"
                          class="form-control form-control-lg form-control-solid w-450px ps-15"
                          placeholder="Search..."
                        />
                      </div>
                    </div>
                  </div>
                  <div class="card-body py-3">
                    <div class="table-responsive">
                      {apidata.length > 0 ? (
                        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                          <thead>
                            <tr class="text-muted fw-normal font-size-15">
                              <th class="min-w-150px">SKU</th>
                              <th class="min-w-150px">Warehouse Qty</th>
                              <th class="min-w-150px">Damage Qty</th>
                              <th class="min-w-140px">Category</th>
                              <th class="min-w-120px">Product Name</th>
                              <th class="min-w-120px">Store</th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchInput.length > 1
                              ? filterResult
                                  .slice(
                                    (page - 1) * itemsPerPage,
                                    page * itemsPerPage
                                  )
                                  .map((item, key) => {
                                    return (
                                      <tr key={key}>
                                        <td>
                                          <div class="d-flex align-items-center">
                                            <div class="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                class="text-muted fw-normal font-size-14"
                                              >
                                                {`${item.sku_detail["sku"]}` +
                                                  " " +
                                                  `${item.sku_detail["sku_desc"]}`}
                                              </a>
                                              {/* <span class="text-muted fw-bold text-muted d-block fs-7">HTML, JS, ReactJS</span> */}
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div class="d-flex align-items-center">
                                            <div class="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                class="text-muted fw-normal font-size-14"
                                              >
                                                {item.qty_warehouse}
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div class="d-flex align-items-center">
                                            <div class="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                class="text-muted fw-normal font-size-14"
                                              >
                                                {item.damage_qty}
                                              </a>
                                              {/* <span class="text-muted fw-bold text-muted d-block fs-7">HTML, JS, ReactJS</span> */}
                                            </div>
                                          </div>
                                        </td>

                                        <td>
                                          <a
                                            href="#"
                                            class="text-muted fw-normal font-size-14"
                                          >
                                            {item.sku_detail["category"]}
                                          </a>
                                          {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                        </td>
                                        <td>
                                          <a
                                            href="#"
                                            class="text-muted fw-normal font-size-14"
                                          >
                                            {item.sku_detail["product_name"]}
                                          </a>
                                          {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                        </td>

                                        <td>
                                          <a
                                            href="#"
                                            class="text-muted fw-normal font-size-14"
                                          >
                                            {item.store_detail["store_name"]}
                                          </a>
                                          {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                        </td>
                                      </tr>
                                    )
                                  })
                              : apidata
                                  .slice(
                                    (page - 1) * itemsPerPage,
                                    page * itemsPerPage
                                  )
                                  .map((item, key) => {
                                    return (
                                      <tr key={key}>
                                        <td>
                                          <div class="d-flex align-items-center">
                                            <div class="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                class="text-muted fw-normal font-size-14"
                                              >
                                                {`${item.sku_detail["sku"]}` +
                                                  " " +
                                                  `${item.sku_detail["sku_desc"]}`}
                                              </a>
                                              {/* <span class="text-muted fw-bold text-muted d-block fs-7">HTML, JS, ReactJS</span> */}
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div class="d-flex align-items-center">
                                            <div class="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                class="text-muted fw-normal font-size-14"
                                              >
                                                {item.qty_warehouse}
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div class="d-flex align-items-center">
                                            <div class="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                class="text-muted fw-normal font-size-14"
                                              >
                                                {item.damage_qty}
                                              </a>
                                              {/* <span class="text-muted fw-bold text-muted d-block fs-7">HTML, JS, ReactJS</span> */}
                                            </div>
                                          </div>
                                        </td>

                                        <td>
                                          <a
                                            href="#"
                                            class="text-muted fw-normal font-size-14"
                                          >
                                            {item.sku_detail["category"]}
                                          </a>
                                          {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                        </td>
                                        <td>
                                          <a
                                            href="#"
                                            class="text-muted fw-normal font-size-14"
                                          >
                                            {item.sku_detail["product_name"]}
                                          </a>
                                          {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                        </td>

                                        <td>
                                          <a
                                            href="#"
                                            class="text-muted fw-normal font-size-14"
                                          >
                                            {item.store_detail["store_name"]}
                                          </a>
                                          {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                        </td>
                                      </tr>
                                    )
                                  })}
                          </tbody>
                        </table>
                      ) : null}
                    </div>
                    {apidata.length > 0 ? (
                      <MuiThemeProvider theme={theme}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Pagination
                            linksShadow={4}
                            // numOfLinks={4}
                            page={page}
                            setPage={handleChange}
                            perPage={itemsPerPage}
                            total={Math.ceil(apidata.length)}
                            size="large"
                            activeLinkColor="primary"
                            firstContent="First"
                            lastContent="Last"
                            firstLastColor="primary"
                            // firstLastColor={'primary'}
                            FirstLastComponent={Fab} // we have used our imported component
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "end",
                            justifyContent: "end",
                          }}
                        >
                          <span>Total Records:{Math.ceil(apidata.length)}</span>
                        </div>
                      </MuiThemeProvider>
                    ) : null}
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ListIndex
