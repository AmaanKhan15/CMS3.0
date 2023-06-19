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

    // function onComplete() {
    //     history.push("/promotor-report/detail");
    // }

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
                                        <li className="breadcrumb-item ">Get the Customized Reports of </li>Promoter
                                    </ol>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={12}>
                            <div class="row g-5 g-xl-8">
                                <div class="col-xl-12">
                                    <div class="card card-xl-stretch mb-xl-8 btn-rounded">
                                        <div class="card-body d-flex align-items-center pt-3 pb-0">
                                            <img src={image3} alt="" class="align-self-center h-150px mb-20" />

                                            <div class="d-flex flex-column flex-grow-0-5  py-2 py-lg-13 me-2">
                                                <a href="#" class="fw-bolder text-dark fs-2 mb-2 text-hover-primary">Promoter Name</a>
                                                <span class="fw-bold text-muted fs-5 mb-2">Customer Name</span>
                                                <div class="d-flex justify-content-between w-100 mt-auto mb-2">
                                                    <span class="fw-bold fs-6 text-gray-400">Target Completed</span>
                                                    <span class="fw-bolder fs-6">80%</span>
                                                </div>
                                                <div className="mb-10">
                                                    <Progress color="primary" value={80} />
                                                    <span class="fw-bold fs-6 text-600">Store Name</span>
                                                </div>
                                                <br />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                
                                    <BarGraph Name={"Promoter"}/>
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
