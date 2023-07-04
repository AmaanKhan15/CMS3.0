import React, { useState } from "react";
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
    TabPane
} from "reactstrap";
const Redirect = (props) => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    console.log("props data is",props.TabPromotor)
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <Row>
                        <div class="w-100">
                            {props.TabMerchand.length<1?(<div class="pb-10 pb-lg-15">
                                <h4 class="fw-bolder text-dark">All Merchandiser are Assigned Please Add New Merchand To Create Customer</h4>
                            </div> ):null}                                                   
                            {props.TabPromotor.length<1?(<div class="pb-10 pb-lg-15">
                                <h4 class="fw-bolder text-dark">All Promotors are Assigned Please Add New To Create Customer</h4>
                            </div> ):null}                                                   
                            {props.TabPromotor.length<1 || props.TabMerchand.length<1?(<div class="pb-10 pb-lg-15">
                                <h4 class="fw-bolder text-dark">All Promotors are Assigned Please Add New To Create Customer</h4>
                            </div> ):null}                                                   
                        </div>
                    </Row>                                       
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default Redirect;