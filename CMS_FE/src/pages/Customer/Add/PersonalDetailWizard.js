import React, { useState } from "react"
import MetaTags from 'react-meta-tags';

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
  TabPane
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

const PersonalWizard = () => {
  const [activeTab, setactiveTab] = useState(1)
  const [activeTabProgress, setactiveTabProgress] = useState(1)
  const [progressValue, setprogressValue] = useState(25)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
      }
    }
  }

  function toggleTabProgress(tab) {
    if (activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTabProgress(tab)

        if (tab === 1) {
          setprogressValue(25)
        }
        if (tab === 2) {
          setprogressValue(50)
        }
        if (tab === 3) {
          setprogressValue(75)
        }
        if (tab === 4) {
          setprogressValue(100)
        }
      }
    }
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="form-verticle form-wizard-wrapper wizard clearfix">
            <div className="steps clearfix">
              <ul>
                <NavItem
                  className={classnames({ current: activeTab === 1 })}>
                  <NavLink
                    className={classnames({ current: activeTab === 1 })}
                    onClick={() => {
                      setactiveTab(1)
                    }}
                  >
                    {/* <span className="number">1.</span>{" "} */}
                    Company
                  </NavLink>
                </NavItem>
                <NavItem className={classnames({ current: activeTab === 2 })}>
                  <NavLink
                    className={classnames({ active: activeTab === 2 })}
                    onClick={() => {
                      setactiveTab(2)
                    }}
                  >
                    {/* <span className="number">2.</span>{" "} */}
                    Personal Detail
                  </NavLink>
                </NavItem>
                <NavItem className={classnames({ current: activeTab === 3 })}>
                  <NavLink
                    className={classnames({ active: activeTab === 3 })}
                    onClick={() => {
                      setactiveTab(3)
                    }}
                  >
                    {/* <span className="number">3.</span> */}
                    Verify Detail
                  </NavLink>
                </NavItem>
                <NavItem className={classnames({ current: activeTab === 4 })}>
                  <NavLink
                    className={classnames({ active: activeTab === 4 })}
                    onClick={() => {
                      setactiveTab(4)
                    }}
                  >
                    {/* <span className="number">4.</span> */}
                    Account Detail
                  </NavLink>
                </NavItem>
              </ul>
            </div>
            <div className="content clearfix">
              <TabContent
                activeTab={activeTab}
                className="body"
              >
                <TabPane tabId={1}>
                  <Form className="form">
									<h1 class="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Personal Details</h1>
                    <Row>                     
                      <div className="row mb-5">                        
                        <div className="col-md-6 fv-row">
                        <label class="d-flex align-items-center fs-5 fw-bold mb-2">
													<span className="required">First Name</span>
												</label>
												<input type="text" class="form-control form-control-lg form-control-solid" placeholder="First Name" name="first-name" />										
                        </div>
                        <div className="col-md-6 fv-row">
                        <label class="d-flex align-items-center fs-5 fw-bold mb-2">
													<span className="required">Last Name</span>
												</label>
												<input type="text" class="form-control form-control-lg form-control-solid" placeholder="Last Name" name="last-name" />										
                        </div>
                      </div>
                    </Row>
                    <Row>                     
                      <div className="row mb-5">                        
                        <div className="col-md-6 fv-row">
                        <label class="d-flex align-items-center fs-5 fw-bold mb-2">
													<span className="required">Email</span>
												</label>
												<input type="text" class="form-control form-control-lg form-control-solid" placeholder="First Name" name="first-name" />										
                        </div>
                        <div className="col-md-6 fv-row">
                        <label class="d-flex align-items-center fs-5 fw-bold mb-2">
													<span className="required">Phone</span>
												</label>
												<input type="text" class="form-control form-control-lg form-control-solid" placeholder="Last Name" name="last-name" />										
                        </div>
                      </div>
                    </Row>
                    <Row>                     
                      <div className="row mb-5">                        
                        <div className="col-md-6 fv-row">
                        <label class="d-flex align-items-center fs-5 fw-bold mb-2">
													<span className="required">City</span>
												</label>
												<input type="text" class="form-control form-control-lg form-control-solid" placeholder="First Name" name="first-name" />										
                        </div>
                        <div className="col-md-6 fv-row">
                        <label class="d-flex align-items-center fs-5 fw-bold mb-2">
													<span className="required">Address</span>
												</label>
												<input type="text" class="form-control form-control-lg form-control-solid" placeholder="Last Name" name="last-name" />										
                        </div>
                      </div>
                    </Row>
                  

                  </Form>
                </TabPane>
                <TabPane tabId={2}>

                  <Form>
                    <Row>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="txtFirstNameShipping"
                            className="col-lg-3 col-form-label">PAN Card</label>
                          <div className="col-lg-9">
                            <Input id="txtFirstNameShipping" name="txtFirstNameShipping"
                              type="text" className="form-control" />
                          </div>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="txtLastNameShipping"
                            className="col-lg-3 col-form-label">VAT/TIN No.</label>
                          <div className="col-lg-9">
                            <Input id="txtLastNameShipping" name="txtLastNameShipping"
                              type="text" className="form-control" />
                          </div>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="txtCompanyShipping" className="col-lg-3 col-form-label">CST
                            No.</label>
                          <div className="col-lg-9">
                            <Input id="txtCompanyShipping" name="txtCompanyShipping"
                              type="text" className="form-control" />
                          </div>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="txtEmailAddressShipping"
                            className="col-lg-3 col-form-label">Service Tax No.</label>
                          <div className="col-lg-9">
                            <Input id="txtEmailAddressShipping"
                              name="txtEmailAddressShipping" type="text"
                              className="form-control" />
                          </div>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="txtCityShipping" className="col-lg-3 col-form-label">Company
                            UIN</label>
                          <div className="col-lg-9">
                            <Input id="txtCityShipping" name="txtCityShipping" type="text"
                              className="form-control" />
                          </div>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="txtStateProvinceShipping"
                            className="col-lg-3 col-form-label">Declaration</label>
                          <div className="col-lg-9">
                            <Input id="txtStateProvinceShipping"
                              name="txtStateProvinceShipping" type="text"
                              className="form-control" />
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
                <TabPane tabId={3}>

                  <Form className="form">
                    <Row>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="txtNameCard" className="col-lg-3 col-form-label">Name on
                            Card</label>
                          <div className="col-lg-9">
                            <Input id="txtNameCard" name="txtNameCard" type="text"
                              className="form-control" />
                          </div>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="ddlCreditCardType"
                            className="col-lg-3 col-form-label">Credit Card Type</label>
                          <div className="col-lg-9">
                            <Input type="select" id="ddlCreditCardType" name="ddlCreditCardType"
                              className="form-select">
                              <option value="">--Please Select--</option>
                              <option value="AE">American Express</option>
                              <option value="VI">Visa</option>
                              <option value="MC">MasterCard</option>
                              <option value="DI">Discover</option>
                            </Input>
                          </div>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="txtCreditCardNumber"
                            className="col-lg-3 col-form-label">Credit Card Number</label>
                          <div className="col-lg-9">
                            <Input id="txtCreditCardNumber" name="txtCreditCardNumber"
                              type="text" className="form-control" />
                          </div>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="txtCardVerificationNumber"
                            className="col-lg-3 col-form-label">Card Verification
                            Number</label>
                          <div className="col-lg-9">
                            <Input id="txtCardVerificationNumber"
                              name="txtCardVerificationNumber" type="text"
                              className="form-control" />
                          </div>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Row className="mb-3">
                          <label htmlFor="txtExpirationDate"
                            className="col-lg-3 col-form-label">Expiration Date</label>
                          <div className="col-lg-9">
                            <Input id="txtExpirationDate" name="txtExpirationDate"
                              type="text" className="form-control" />
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  </Form>

                </TabPane>
                <TabPane tabId={4}>
                  <div className="row justify-content-center">
                    <Col lg="6">
                      <div className="text-center">
                        <div className="mb-4">
                          <i className="mdi mdi-check-circle-outline text-success display-4" />
                        </div>
                        <div>
                          <h5>Confirm Detail</h5>
                          <p className="text-muted">
                            If several languages coalesce, the grammar of
                            the resulting
                          </p>
                        </div>
                      </div>
                    </Col>
                  </div>
                </TabPane>
              </TabContent>
            </div>
            <div className="actions clearfix">
              <ul>
                <Row>
                  <Col md={3}>
                    <li
                      className={
                        activeTab === 1 ? "previous disabled" : "previous"
                      }
                    >
                       <button type="button" class="btn btn-lg btn-light-primary me-3" data-kt-stepper-action="previous" onClick={() => {
                        toggleTab(activeTab - 1)
                      }} >
                        <span class="svg-icon svg-icon-3 me-1">
                          
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="6" y="11" width="13" height="2" rx="1" fill="black" />
                            <path d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z" fill="black" />
                          </svg>
                        </span>
                        Back
                        </button>


                    </li>
                  </Col>
                  <Col md={3}></Col>
                  <Col md={6}>
                    <li
                      className={activeTab === 4 ? "next disabled" : "next"}
                    >
                     
                        <button type="button" class="btn btn-lg btn-primary" data-kt-stepper-action="next" onClick={() => {
                        toggleTab(activeTab + 1)
                      }}>
                        <span class="svg-icon svg-icon-3 ms-1 me-0">
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                            <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                          </svg>                          
                        </span>
                      </button>

                    </li>
                  </Col>
                </Row>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default PersonalWizard