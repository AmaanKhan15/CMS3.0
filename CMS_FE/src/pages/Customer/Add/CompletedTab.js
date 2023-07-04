import React, { useState } from "react"
import {
    Card,
    CardBody,
    TabContent,
    TabPane,
    Form,
    Row,
    Col
} from "reactstrap"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";


const CompleteTab = (props) => {
    const history = useHistory();

    const [activeTab, setactiveTab] = useState(1)


    const onChangeTabVerticle = (TabdataVerticle) => {
        props.TabdataVerticle(TabdataVerticle);
    }
    const onComplete = () => {
        history.push('/customer-list')
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div class="stepper stepper-links" id="kt_create_account_stepper">
                        <TabContent
                            activeTab={activeTab}
                            className="body"
                        >
                            <div class="mx-auto mw-600px w-100 pt-15 pb-10">
                                <Form className="needs-validation"
                                    method="post"
                                    id="tooltipForm"
                                    onSubmit={e => {
                                        handleSubmitPersosnal(e)
                                    }}
                                >

                                    <Row>
                                        {/* <div class="card mb-5 mb-xl-8 btn-rounded" style={{ 'backgroundColor': '#fafafa', 'padding': ' 1rem 1rem' }}> */}
                                        {/* <div class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                                                <div class="mb-3 mb-md-0 fw-bold">
                                                    <h4 class="text-gray-900 fw-bolder">Customer Creation and Assignment Process Completed!</h4>
                                                    <div class="fs-6 text-gray-700 pe-7">Go to Customer List Page For furthur Details</div>
                                                </div>
                                                <a href="#" class="btn btn-primary px-6 align-self-center text-nowrap">Proceed</a>
                                            </div> */}

                                        {/* </div> */}
                                        <div class="w-100">
                                            <div class="pb-8 pb-lg-10">
                                                <h2 class="fw-bolder text-dark">Your Are Done!</h2>

                                            </div>
                                            <div class="mb-0">
                                                <div class="notice d-flex bg-light-success rounded border-success border border-dashed p-6" style={{ 'border-style': 'dashed!important', 'border-color': '#e4e6ef' }}>
                                                    <span class="svg-icon svg-icon-2tx svg-icon-success me-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                                                            <rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="black" />
                                                            <rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="black" />
                                                        </svg>
                                                    </span>


                                                    <div class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                                                        <div class="mb-3 mb-md-0 fw-bold">
                                                            <h4 class="text-gray-900 fw-bolder">Customer Creation and Assignment Process Completed!</h4>
                                                            <div class="fs-6 text-gray-700 pe-7">Go to Customer List Page For furthur Details</div>
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                           
                                        </div>

                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                        </Col>
                                        <Col md={1}>
                                        </Col>
                                       
                                        <Col md={5}>
                                            <div class="py-6">
                                            <button
                                                type="button"
                                                class="btn btn-lg btn-primary"
                                                onClick={() => onComplete()}
                                            >
                                                Go To Customer List
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="white" />
                                                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="white" />
                                                </svg>

                                            </button>
                                            </div>
                                        
                                        </Col>
                                    </Row>
                                </Form>
                            </div>

                        </TabContent>
                        {/* </div> */}
                    </div>

                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default CompleteTab;
