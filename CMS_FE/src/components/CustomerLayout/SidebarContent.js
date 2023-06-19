import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"


const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
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
    console.log("item is at 1 ",item.classList.value)
    if(item.classList.value==='waves-effect single'){
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
  var authdata=JSON.parse(localStorage.getItem('authUser'))
  console.log("localstorage data is",authdata.role)
  if(authdata.role=='admin'){
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
                <i className="fas fa-chart-area"></i>
                <span>{props.t("Promotor Reports")}</span>

              </Link>
              <ul className="sub-menu" aria-expanded="false">
              <li>
                  <Link to="/promotor-report">{props.t("Promotor Daily Reports")} </Link>
                </li>
                <li>
                  <Link to="/all-store-report/all">{props.t("Store Compare Report ")}</Link>
                </li>
                <li>
                  <Link to="/promotor-report">{props.t("Promotor Compare Report ")}</Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("Promotor Sales Qty Report")} </Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("Promotor Sales Amt Report")} </Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("Promotor Performance Report")} </Link>
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
                  <Link to="/promotor-report/all">{props.t("Merchandiser General Report ")}</Link>
                </li>
                <li>
                  <Link to="/promotor-report/all">{props.t("Share Market Report ")}</Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("Product Availability Report")} </Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("Unavailable Stock Report")} </Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("Out Of Stock Report")} </Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("Damaged Stock Report")} </Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("Near Expiry Report")} </Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("MTD-YTD Report")} </Link>
                </li>
               
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="fas fa-chart-area"></i>
                <span>{props.t("Login Reports")}</span>

              </Link>
              <ul className="sub-menu" aria-expanded="false">
              <li>
                  <Link to="/promotor-report">{props.t("Promotor Login Report")} </Link>
                </li>
              <li>
                  <Link to="/promotor-report">{props.t("Merchandiser Login Report")} </Link>
                </li>
              <li>
                  <Link to="/promotor-report">{props.t("Login/Logout Report")} </Link>
                </li>
                <li>
                  <Link to="/all-store-report">{props.t("Stores")}</Link>
                </li>
                <li>
                  <Link to="/merchand-report">{props.t("Merchandiser")} </Link>
                </li>
               
              </ul>
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
