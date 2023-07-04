import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
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
import DashCard from "./generalList"
import Select from "react-select"
import { withTranslation } from "react-i18next"
import { ThreeDots } from 'react-loader-spinner'
import { getUnavialableStock } from "../../../../store/services/allmerchandReports"
const Dashboard = props => {
    const [reportData, setreportData] = useState([])
    const [Loading, setLoading] = useState(false)
    useEffect(async () => {
        let customerList = await getUnavialableStock();
        console.log("data is", customerList)
        setreportData(customerList);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                {Loading ? (<Container fluid>
                    <div
                        className="pagination" style={{
                            position: 'relative ',
                            marginTop: '20%'
                        }}>
                        <ThreeDots color="#306060" height={80} width={80} />
                    </div>

                </Container>) : (
                    <Container fluid>
                        <div className="page-title-box">
                            <Row className="align-items-center">
                                <Col md={8}>
                                    <h6 className="page-title">Reports</h6>
                                    <div className="page-title-box">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Get the Customized Reports of </li>Merchandiser
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
                                                    <h3 class="m-0 text-gray-900">Out Of Stock Report</h3>
                                                </Col>
                                                <Col md={4}></Col>
                                                <Col md={2}>
                                                    {/* <Link to="/promotor-report/all" class="btn btn-lg btn-primary">View All Reports</Link> */}
                                                </Col>
                                            </div>

                                        </div>
                                        <DashCard report={reportData} />
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

Dashboard.propTypes = {
    t: PropTypes.any
}

export default withTranslation()(Dashboard)
