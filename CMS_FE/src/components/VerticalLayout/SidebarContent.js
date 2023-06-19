import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import icon6 from "../../assets/images/icons8-circled-6-24.png"
import icon1 from "../../assets/images/icons8-level-1-24.png"
import icon2 from "../../assets/images/icons8-circled-2-c-24.png"
import icon3 from "../../assets/images/icons8-circled-3-c-24.png"
import icon4 from "../../assets/images/icons8-circled-4-c-24.png"
import icon5 from "../../assets/images/icons8-circled-5-24.png"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  const [apidata, setApidata] = useState([])
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()

  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()

  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    console.log("item is at 1 ", item.classList.value)
    if (item.classList.value === 'waves-effect single') {
      item.classList.add("active")
    }
    item.classList.add("active-new")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active-new") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  var authdata = JSON.parse(localStorage.getItem('authUser'))
  console.log("localstorage data is", authdata)
  if (authdata.user_type == 'Site Admin') {
    return (
      <React.Fragment>
        <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{props.t("Main")} </li>
              <li>
                <Link to="/dashboard" className="waves-effect single">
                  <i className="ti-home"></i>
                  {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-user"></i>
                  <span>{props.t("Customer")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/customer-list">{props.t("Customer List")}</Link>
                  </li>
                 
                  <li>
                    <Link to="/customer-step1">{<img src={icon1} />}{props.t("Customer")} </Link>
                  </li>
                  <li>
                    <Link to="/customer-step2">{<img src={icon2} />}{props.t("Stores")} </Link>
                  </li>
                  <li>
                    <Link to="/customer-step3">{<img src={icon3} />}{props.t("SKU")} </Link>
                  </li>
                  <li>
                    <Link to="/customer-step4">{<img src={icon4} />}{props.t("Merchandiser")} </Link>
                  </li>
                  <li>
                    <Link to="/customer-step5">{<img src={icon5} />}{props.t("Promoter")} </Link>
                  </li>
                  <li>
                    <Link to="/customer-step6">{<img src={icon6} />}{props.t("Supervisor")} </Link>
                  </li>

                </ul>
              </li>
              {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="fas fa-user"></i>
                <span>{props.t("Add Customer")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
              </ul>
            </li> */}
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-store"></i>
                  <span>{props.t("Stores")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/store-list">{props.t("Store List")}</Link>
                  </li>
                  <li>
                    <Link to="/store-add">{props.t("Add Store")} </Link>
                  </li>
                  {/* <li>
                  <Link to="/ui-progressbars">{props.t("Create Group")} </Link>
                </li>               */}
                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-user-tie"></i>
                  <span>{props.t("Merchandiser")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/merchand-list">{props.t("Merchandiser List")}</Link>
                  </li>
                  <li>
                    <Link to="/merchand-add">{props.t("Add Merchandiser")} </Link>
                  </li>

                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-bullhorn"></i>
                  <span>{props.t("Promoter")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/promotor-list">{props.t("List Promoter")}</Link>
                  </li>
                  <li>
                    <Link to="/promotor-add">{props.t("Add Promoter")} </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chalkboard-teacher"></i>
                  <span>{props.t("Supervisor")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/supervisor-list">{props.t("Supervisor List")}</Link>
                  </li>
                  <li>
                    <Link to="/supervisor-add">{props.t("Add Supervisor")} </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Promoter Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/promotor-report">{props.t("Promoter Daily Reports")} </Link>
                  </li>
                  <li>
                    <Link to="/store-compare/report">{props.t("Store Compare Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/promotor-compare/report">{props.t("Promoter Compare Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/promotor-sales/report">{props.t("Promoter Sales Qty Report")} </Link>
                  </li>
                  <li>
                    <Link to="/promotor-Amt/report">{props.t("Promoter Sales Amt Report")} </Link>
                  </li>
                  <li>
                    <Link to="/promotor-perform/report">{props.t("Promoter Performance Report")} </Link>
                  </li>

                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Merchandiser Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/merchand-report">{props.t("Merchandiser Daily Reports")} </Link>
                  </li>
                  <li>
                    <Link to="/merchand-genaral/report">{props.t("Merchandiser General Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/merchand-sharemarket/report">{props.t("Market Share  Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/merchand-productavialable/report">{props.t("Product Availability Report")} </Link>
                  </li>
                  <li>
                    <Link to="/merchand-unavialble/report">{props.t("Unavailable Stock Report")} </Link>
                  </li>
                  <li>
                    <Link to="/merchand-outofstock/report">{props.t("Out Of Stock Report")} </Link>
                  </li>
                  <li>
                    <Link to="/merchand-damagestock/report">{props.t("Damaged Stock Report")} </Link>
                  </li>
                  <li>
                    <Link to="/merchand-nearexpiray/report">{props.t("Near Expiry Report")} </Link>
                  </li>
                  {/* <li>
                  <Link to="/merchand-report">{props.t("MTD-YTD Report")} </Link>
                </li> */}

                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Login/Logout Reports")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/login-report/promotor">{props.t("Promoter Report")} </Link>
                  </li>
                  <li>
                    <Link to="/login-report/merchand">{props.t("Merchandiser Report")} </Link>
                  </li>
                  {/* <li>
                  <Link to="/login-logout/report">{props.t("Login/Logout Report")} </Link>
                </li> */}
                  {/* <li>
                  <Link to="/all-store-report">{props.t("Stores")}</Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("Merchandiser")} </Link>
                </li> */}
                </ul>
              </li>

            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    )
  }
  if (authdata.user_type == 'Customer') {
    return (
      <React.Fragment>
        <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{props.t("Main")} </li>
              <li>
                <Link to="/customer/dashboard" className="waves-effect single">
                  <i className="ti-home"></i>
                  {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-user"></i>
                  <span>{props.t("SKU Details")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/customer/near-expiray">{props.t("Near Expiray")}</Link>
                  </li>
                  <li>
                    <Link to="/customer/unavailable-sku">{props.t("Unavailable SKU's")} </Link>
                  </li>
                  <li>
                    <Link to="/customer/library">{props.t("Library of Data Collected")} </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Promoter Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {/* <li>
                    <Link to="/promotor-report">{props.t("Daily Reports")} </Link>
                  </li> */}
                  <li>
                    <Link to="/customer/promotor-daily/report">{props.t("Daily Performance Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/customer/promotor-week/report">{props.t("Weekly Performance ")}</Link>
                  </li>
                  <li>
                    <Link to="/customer/store-compare/report">{props.t("Store Compare")} </Link>
                  </li>
                  <li>
                    <Link to="/customer/promotor-compare/report">{props.t("Promoter Compare")} </Link>
                  </li>
                  <li>
                    <Link to="/customer/promotor-citysales/report">{props.t("City Sales Unit")} </Link>
                  </li>
                  <li>
                    <Link to="/customer/promotor-sales/report">{props.t("Promoter Sales Unit")} </Link>
                  </li>

                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Login/Logout Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/customer/promotor-login-logout/report">{props.t("Promoter  Report")} </Link>
                  </li>
                  <li>
                    <Link to="/customer/merchand-login-logout/report">{props.t("Merchandiser  Report")} </Link>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    )
  }
  if (authdata.user_type == 'AppleCustomer') {
    return (
      <React.Fragment>
        <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{props.t("Main")} </li>
              <li>
                <Link to="/applecustomer/dashboard" className="waves-effect single">
                  <i className="ti-home"></i>
                  {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-user"></i>
                  <span>{props.t("SKU Details")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/applecustomer/near-expiray">{props.t("Near Expiray")}</Link>
                  </li>
                  <li>
                    <Link to="/applecustomer/unavailable-sku">{props.t("Unavailable SKU's")} </Link>
                  </li>
                  <li>
                    <Link to="/applecustomer/library">{props.t("Library of Data Collected")} </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("iPro's Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {/* <li>
                    <Link to="/promotor-report">{props.t("Daily Reports")} </Link>
                  </li> */}
                  <li>
                    <Link to="/applecustomer/promotor-daily/report">{props.t("Daily Performance Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/applecustomer/promotor-week/report">{props.t("Weekly Performance ")}</Link>
                  </li>
                  <li>
                    <Link to="/applecustomer/store-compare/report">{props.t("Store Compare")} </Link>
                  </li>
                  <li>
                    <Link to="/applecustomer/promotor-compare/report">{props.t("iPro Compare")} </Link>
                  </li>
                  <li>
                    <Link to="/applecustomer/promotor-citysales/report">{props.t("City Sales Unit")} </Link>
                  </li>
                  <li>
                    <Link to="/applecustomer/promotor-sales/report">{props.t("iPro Sales Unit")} </Link>
                  </li>

                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Login/Logout Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/applecustomer/promotor-login-logout/report">{props.t("iPro  Report")} </Link>
                  </li>
                  {/* <li>
                    <Link to="/applecustomer/merchand-login-logout/report">{props.t("Merchandiser  Report")} </Link>
                  </li>                                                 */}
                </ul>
              </li>

            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    )
  }
  if (authdata.user_type == 'Customer/Merchandiser') {
    return (
      <React.Fragment>
        <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{props.t("Main")} </li>
              <li>
                <Link to="/customer/dashboard" className="waves-effect single">
                  <i className="ti-home"></i>
                  {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-user"></i>
                  <span>{props.t("SKU Details")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/customer/near-expiray">{props.t("Near Expiray")}</Link>
                  </li>
                  <li>
                    <Link to="/customer/unavailable-sku">{props.t("Unavailable SKU's")} </Link>
                  </li>
                  <li>
                    <Link to="/customer/library">{props.t("Library of Data Collected")} </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Merchandiser Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/merchand-report">{props.t("Merchandiser Daily Reports")} </Link>
                  </li>
                  <li>
                    <Link to="/merchand-genaral/report">{props.t("Merchandiser General Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/merchand-sharemarket/report">{props.t("Market Share  Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/merchand-productavialable/report">{props.t("Product Availability Report")} </Link>
                  </li>
                  <li>
                    <Link to="/merchand-unavialble/report">{props.t("Unavailable Stock Report")} </Link>
                  </li>
                  <li>
                    <Link to="/merchand-outofstock/report">{props.t("Out Of Stock Report")} </Link>
                  </li>
                  <li>
                    <Link to="/merchand-damagestock/report">{props.t("Damaged Stock Report")} </Link>
                  </li>
                  <li>
                    <Link to="/merchand-nearexpiray/report">{props.t("Near Expiry Report")} </Link>
                  </li>
                  {/* <li>
                  <Link to="/merchand-report">{props.t("MTD-YTD Report")} </Link>
                </li> */}

                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Login/Logout Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {/* <li>
                    <Link to="/customer/promotor-login-logout/report">{props.t("Promoter  Report")} </Link>
                  </li> */}
                  <li>
                    <Link to="/customer/merchand-login-logout/report">{props.t("Merchandiser  Report")} </Link>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    )
  }
  if (authdata.user_type == 'Supervisor') {
    return (
      <React.Fragment>
        <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{props.t("Main")} </li>
              <li>
                <Link to="/supervisor/dashboard" className="waves-effect single">
                  <i className="ti-home"></i>
                  {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-user"></i>
                  <span>{props.t("SKU Details")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/supervisor/near-expiray">{props.t("Near Expiray")}</Link>
                  </li>
                  <li>
                    <Link to="/supervisor/unavailable-sku">{props.t("Unavailable SKU's")} </Link>
                  </li>
                  <li>
                    <Link to="/supervisor/library">{props.t("Library of Data Collected")} </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Promoter Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {/* <li>
                    <Link to="/promotor-report">{props.t("Daily Reports")} </Link>
                  </li> */}
                  <li>
                    <Link to="/supervisor/promotor-daily/report">{props.t("Daily Performance Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/supervisor/promotor-week/report">{props.t("Weekly Performance ")}</Link>
                  </li>
                  <li>
                    <Link to="/supervisor/store-compare/report">{props.t("Store Compare")} </Link>
                  </li>
                  <li>
                    <Link to="/supervisor/promotor-compare/report">{props.t("Promoter Compare")} </Link>
                  </li>
                  <li>
                    <Link to="/supervisor/promotor-citysales/report">{props.t("City Sales Unit")} </Link>
                  </li>
                  <li>
                    <Link to="/supervisor/promotor-sales/report">{props.t("Promoter Sales Unit")} </Link>
                  </li>

                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Merchandiser Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/supervisor/merchand-report">{props.t("Merchandiser Daily Reports")} </Link>
                  </li>
                  <li>
                    <Link to="/supervisor/merchand-genaral/report">{props.t("Merchandiser General Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/supervisor/merchand-sharemarket/report">{props.t("Market Share  Report ")}</Link>
                  </li>
                  <li>
                    <Link to="/supervisor/merchand-productavialable/report">{props.t("Product Availability Report")} </Link>
                  </li>
                  <li>
                    <Link to="/supervisor/merchand-unavialble/report">{props.t("Unavailable Stock Report")} </Link>
                  </li>
                  <li>
                    <Link to="/supervisor/merchand-outofstock/report">{props.t("Out Of Stock Report")} </Link>
                  </li>
                  <li>
                    <Link to="/supervisor/merchand-damagestock/report">{props.t("Damaged Stock Report")} </Link>
                  </li>
                  <li>
                    <Link to="/supervisor/merchand-nearexpiray/report">{props.t("Near Expiry Report")} </Link>
                  </li>
                  {/* <li>
                  <Link to="/merchand-report">{props.t("MTD-YTD Report")} </Link>
                </li> */}

                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chart-area"></i>
                  <span>{props.t("Login/Logout Reports")}</span>

                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/supervisor/promotor-login-logout/report">{props.t("Promoter  Report")} </Link>
                  </li>
                  <li>
                    <Link to="/supervisor/merchand-login-logout/report">{props.t("Merchandiser  Report")} </Link>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    )
  }
  if (authdata.user_type == 'hr') {
    return (
      <React.Fragment>
        <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{props.t("Main")} </li>
              <li>
                <Link to="/hradmin/dashboard" className="waves-effect single">
                  <i className="ti-home"></i>
                  {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="fas fa-chalkboard-teacher"></i>
                  <span>{props.t("Application List")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/hradmin/merchandiser">{props.t("Merchandiser List")}</Link>
                  </li>
                  <li>
                    <Link to="/hradmin/promoter">{props.t("Promoter List")} </Link>
                  </li>
                </ul>

              </li>
              <li>
                <Link to="/hradmin/shortListed" className="waves-effect single">
                  <i className="fas fa-bullhorn"></i>
                  {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                  <span>{props.t("Short Listed")}</span>
                </Link>
              </li>
            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    )
  }

}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
