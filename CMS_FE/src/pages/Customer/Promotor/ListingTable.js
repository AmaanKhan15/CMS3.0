import React, { useState, useEffect } from "react"
const URL = process.env.REACT_APP_BASE_URL
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
import { Link } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"
import Pagination from "react-mui-pagination"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
import {
  DeleteMarchand,
  getMerchandList,
} from "../../../store/services/promotor"
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom"
import "../../../assets/scss/style.bundle.css"
const theme = createTheme({
  palette: {
    primary: {
      main: "#306060",
    },
  },
})
const ListTable = props => {
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
  useEffect(async () => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Cache-Control", "no-cache")
    let res = await fetch(`${URL}` + `/promotor`, {
      method: "GET",
      headers: myHeaders,
    })
    let response = await res.json()
    const empResult = response.data
    setnoOfPages(Math.ceil(empResult.length / itemsPerPage))
    // setData(empResult.slice(0, pageSize));
    setApidata(empResult)
    setLoading(false)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])
  const history = useHistory()
  const HandleEdit = proid => {
    history.push({
      pathname: "/promotor-edit",
      state: { id: proid },
    })
  }
  const HandleDelete = async id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async result => {
      if (result.isConfirmed) {
        let data = await DeleteMarchand(id)
        Swal.fire("Deleted!", "Your Record has been deleted.", "success")
      }
    })
    setApidata(prev => prev.filter(el => el.id !== id)) // filter by id
  }
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

            <div class="card-toolbar">
              <div
                class="d-flex justify-content-end"
                data-kt-customer-table-toolbar="base"
              >
                {/* <button type="button" class="btn btn-light-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_customers_export_modal">
                                    <span class="svg-icon svg-icon-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="black" />
                                            <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="black" />
                                            <path d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="#C4C4C4" />
                                        </svg>
                                    </span>
                                    <a href={storeSample} download="store_sample">Download</a>
                                    </button> */}
                {/* <Button><a href={storeSample} download="store_sample">Download</a></Button> */}

                <Link
                  type="button"
                  to="/promotor-add"
                  class="btn btn-primary font-size-14"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_add_customer"
                >
                  Add Promoter
                </Link>
              </div>
            </div>
            {/*end::Card toolbar*/}
          </div>
          <div class="card-body py-3">
            <div class="table-responsive">
              {apidata.length > 0 ? (
                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                  <thead>
                    <tr class="text-muted fw-normal font-size-15">
                      <th class="min-w-150px">Promoter name</th>
                      <th class="min-w-140px">Contact no</th>
                      <th class="min-w-120px">Area</th>
                      <th class="min-w-120px">Status</th>
                      <th class="min-w-120px">City</th>
                      <th class="min-w-120px">Address</th>
                      <th class="min-w-100px text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchInput.length > 1
                      ? filterResult
                          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
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
                                        {`${item.first_name}` +
                                          " " +
                                          `${item.last_name}`}
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
                                    {item.phone_no}
                                  </a>
                                  {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    class="text-muted fw-normal font-size-14"
                                  >
                                    {item.area}
                                  </a>
                                  {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                </td>
                                <td>
                                  {item.customer_id ? (
                                    <span class="badge-pro bg-badge-active text-muted fw-normal font-size-14">
                                      Active
                                    </span>
                                  ) : (
                                    <span class="badge-pro bg-badge-inactive text-muted fw-normal font-size-14 ">
                                      In Active
                                    </span>
                                  )}
                                  {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                </td>

                                <td>
                                  <a
                                    href="#"
                                    class="text-muted fw-normal font-size-14"
                                  >
                                    {item.city}
                                  </a>
                                  {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    class="text-muted fw-normal font-size-14"
                                  >
                                    {item.address}
                                  </a>
                                  {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                </td>

                                <td>
                                  <div class="d-flex justify-content-end flex-shrink-0">
                                    <a
                                      onClick={() => HandleEdit(item.id)}
                                      class="btn btn-icon btn-bg-light-warning btn-active-color-warning btn-sm me-1"
                                    >
                                      <span class="svg-icon svg-icon-3">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="#ffcccb"
                                        >
                                          <path
                                            opacity="0.3"
                                            d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                            fill="black"
                                          />
                                          <path
                                            d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                            fill="black"
                                          />
                                        </svg>
                                      </span>
                                    </a>
                                    <a
                                      onClick={() => HandleDelete(item.id)}
                                      class="btn btn-icon btn-bg-light-danger btn-active-color-danger btn-sm"
                                    >
                                      <span class="svg-icon svg-icon-3">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                                            fill="black"
                                          />
                                          <path
                                            opacity="0.5"
                                            d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                                            fill="black"
                                          />
                                          <path
                                            opacity="0.5"
                                            d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                                            fill="black"
                                          />
                                        </svg>
                                      </span>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                      : apidata
                          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
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
                                        {`${item.first_name}` +
                                          " " +
                                          `${item.last_name}`}
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
                                    {item.phone_no}
                                  </a>
                                  {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    class="text-muted fw-normal font-size-14"
                                  >
                                    {item.area}
                                  </a>
                                  {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                </td>
                                <td>
                                  {item.customer_id ? (
                                    <span class="badge-pro bg-badge-active text-muted fw-normal font-size-14">
                                      Active
                                    </span>
                                  ) : (
                                    <span class="badge-pro bg-badge-inactive text-muted fw-normal font-size-14 ">
                                      In Active
                                    </span>
                                  )}
                                  {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                </td>
                                <td>
                                  <span className="text-muted fw-normal font-size-14">
                                    {item.city}
                                  </span>
                                  {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    class="text-muted fw-normal font-size-14"
                                  >
                                    {item.address}
                                  </a>
                                  {/* <span class="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span> */}
                                </td>

                                <td>
                                  <div class="d-flex justify-content-end flex-shrink-0">
                                    <a
                                      onClick={() => HandleEdit(item.id)}
                                      class="btn btn-icon btn-bg-light-warning btn-active-color-warning btn-sm me-1"
                                    >
                                      <span class="svg-icon svg-icon-3">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="#ffcccb"
                                        >
                                          <path
                                            opacity="0.3"
                                            d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                            fill="black"
                                          />
                                          <path
                                            d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                            fill="black"
                                          />
                                        </svg>
                                      </span>
                                    </a>
                                    <a
                                      onClick={() => HandleDelete(item.id)}
                                      class="btn btn-icon btn-bg-light-danger btn-active-color-danger btn-sm"
                                    >
                                      <span class="svg-icon svg-icon-3">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                                            fill="black"
                                          />
                                          <path
                                            opacity="0.5"
                                            d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                                            fill="black"
                                          />
                                          <path
                                            opacity="0.5"
                                            d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                                            fill="black"
                                          />
                                        </svg>
                                      </span>
                                    </a>
                                  </div>
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
    </React.Fragment>
  )
}

export default ListTable
