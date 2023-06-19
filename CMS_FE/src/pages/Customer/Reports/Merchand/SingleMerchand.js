const URL = process.env.REACT_APP_LOCAL_URL;
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
import "../../../../assets/scss/style.bundle.css";
import { useLocation } from "react-router-dom";
import { withTranslation } from "react-i18next"
import BarGraph from "./OneMerchanddata";
import image3 from "../../../../assets/images/avatars/043-boy-18.svg";
import { Progress } from "reactstrap"
import { getFilterReport } from "../../../../store/services/MerchandiserReport"
import { ThreeDots } from 'react-loader-spinner'
import ChartistGraph from "react-chartist";
const Dashboard = props => {
    const [menu, setMenu] = useState(false)
    const location = useLocation();
    const [merchandname, setmerchandname] = useState('')
    const [storename, setstorename] = useState('')
    const [resdata, setresdata] = useState([])
    const [stores] = useState([])
    const [total] = useState([])
    const [prodata] = useState([]);
    const [Loading, setLoading] = useState(false)
    useEffect(async () => {
         
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var Bodydata = JSON.stringify({
            merchand_id: location.state.merId
        })
        let res = await fetch(
            `${URL}` + `/merchandmodule/singlemerchandReport`,
            {
                method: "post",
                headers: myHeaders,
                body: Bodydata
            }
        );
        let response = await res.json();
        let dataLabels = response.data;
        dataLabels.map((item, key) => {
            total.push(item.total_amount)
            stores.push(item.store_detail['store_name'])
        })
       setresdata(response.data)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        //    setreportData(promotorReport);
    }, [])
    var barChartOptions = {
        stackBars: true,
        axisY: {
            labelInterpolationFnc: function (value) {
                return value ;
            }
        }
    };
    var barChartData = {
        labels: stores,
        series: [            
            total
        ]
    };
    return (
        <React.Fragment>
            <div className="page-content">
                {!Loading?(
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
                                    <div class="row g-5 g-xl-8">
                                        <div class="col-xl-12">
                                            <div class="card card-xl-stretch mb-xl-8 btn-rounded">
                                                <div class="card-body d-flex align-items-center pt-3 pb-0">
                                                    <img src={image3} alt="" class="align-self-center h-150px mb-20" />

                                                    <div class="d-flex flex-column flex-grow-0-5  py-2 py-lg-13 me-2">
                                                        <a href="#" class="fw-bolder text-dark fs-2 mb-2 text-hover-primary">{location.state.merchand}</a>
                                                        <span class="fw-bold text-muted fs-5 mb-2">{ }</span>
                                                        <div class="d-flex justify-content-between w-100 mt-auto mb-2">
                                                            <span class="fw-bold fs-6 text-gray-400">Target Completed</span>
                                                            <span class="fw-bolder fs-6">80%</span>
                                                        </div>
                                                        <div className="mb-10">
                                                            <Progress color="primary" value={80} />
                                                            <span class="fw-bold fs-6 text-600">{location.state.storeName}</span>
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

                                    <ChartistGraph
                                        data={barChartData}
                                        style={{ height: "900px" }}
                                        options={barChartOptions}
                                        type={"Bar"}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
                ):<Container fluid style={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>
                <div
                    className="pagination" style={{
                        position: 'relative ',
                        marginTop: '20%'
                    }}>
                </div>
                <ThreeDots color="#306060" height={80} width={80} />								

            </Container>}
            </div>

        </React.Fragment>
    )
}

Dashboard.propTypes = {
    t: PropTypes.any
}

export default withTranslation()(Dashboard)
