import PropTypes from 'prop-types'
import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle
} from "reactstrap"
import { Link } from "react-router-dom"


import "../../../../assets/scss/style.bundle.css";
import { useHistory } from "react-router-dom";
import { withTranslation } from "react-i18next"
import BarGraph from "../../../AllCharts/chartist/ReoprtBar";
import image3 from "../../../../assets/images/avatars/043-boy-18.svg";
import { Progress } from "reactstrap"

const Dashboard = props => {
    const [menu, setMenu] = useState(false)
    const history = useHistory();

    function onComplete() {
        history.push("/Merchandiser-report/detail");
    }

    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={8}>
                                <h6 className="page-title">Reports</h6>
                                <div className="page-title-box">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item ">Get the Customized Reports of </li>Merchandiser
                                    </ol>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                    <Col md={12}>
                            <Card >
                                <CardBody >
                                    <div class="card-title">

                                        <div class="d-flex justify-content-end">
                                            <Col md={6}>
                                            <h3 class="m-0 text-gray-900">Merchandisers Report</h3>

                                            </Col>
                                            <Col md={4}></Col>
                                            <Col md={2}>
                                            <a href="add.html" class="btn btn-lg btn-light-primary">All Reports</a>                                           

                                            </Col>

                                        </div>
                                        <div class="card-toolbar">  
                                        <span>Get Customized Reports of Merchandisers</span>                                     
                                    </div>
                                    </div>
                                    {/* <Row> */}
                                        <Col md={12}></Col>
                                   
                                    
                                    <div class="d-flex justify-content-start" data-kt-subscription-table-toolbar="base" style={{'marginTop':'10%'}}>
                                    <Col md={2}>
                                        <button type="button" class="btn btn-light-primary me-3" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                            <span class="svg-icon svg-icon-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="black" />
                                                </svg>
                                            </span>
                                            Filter
                                        </button>
                                    </Col>
                                    <Col md={3}>
                                        <select name="country" aria-label="Select a Country" data-control="select2" data-placeholder=" Customer" class="form-select form-select-solid form-select-lg fw-bold me-3">
                                            <option value="">Customers</option>
                                            <option data-kt-flag="flags/afghanistan.svg" value="AF">Customer Name</option>
                                            <option data-kt-flag="flags/aland-islands.svg" value="AX">Customer Name</option>
                                        </select>
                                    </Col>
                                    <Col md={1}>
                                    </Col>
                                    <Col md={3}>
                                        <select name="country" aria-label="Select a Country" data-control="select2" data-placeholder=" Store" class="form-select form-select-solid form-select-lg fw-bold me-3">
                                            <option value="">Stores</option>
                                            <option data-kt-flag="flags/afghanistan.svg" value="AF">Store Name</option>
                                            <option data-kt-flag="flags/aland-islands.svg" value="AX">Store Name</option>
                                        </select>
                                    </Col>
                                    <Col md={1}>
                                    </Col>
                                    <Col md={2}>
                                    <a href="add.html" class="btn  btn-primary">Apply</a>
                                    </Col>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                    <div class="card-title">

                                        <div class="d-flex justify-content-end">
                                            <Col md={6}>
                                                <h3 class="m-0 text-gray-900">Monthly Report</h3>

                                            </Col>
                                            <Col md={2}></Col>
                                            <Col md={4}>
                                                <button class="btn btn-lg btn-color-muted btn-active btn-active-primary  px-4 me-1" >Daily</button>
                                                <button class="btn btn-lg btn-color-muted btn-active btn-active-primary px-4 me-1" >Weekly</button>
                                                <button class="btn btn-lg btn-color-muted btn-active btn-active-primary active px-4 me-1" >Monthly</button>
                                                <button class="btn btn-lg btn-color-muted btn-active btn-active-primary px-4" >Yearlly</button>
                                            </Col>


                                        </div>

                                    </div>
                                    <BarGraph />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>

        </React.Fragment>
    )
}

Dashboard.propTypes = {
    t: PropTypes.any
}

export default withTranslation()(Dashboard)
