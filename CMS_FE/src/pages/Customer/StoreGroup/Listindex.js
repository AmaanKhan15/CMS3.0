import React, { useState } from "react"
// import "./create-account";
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
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ListTable from "./ListingTable";
const ListIndex = (props) => {

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={8}>
                                <h6 className="page-title">Store List</h6>
                            </Col>
                        </Row>
                    </div>
                    {/* <Breadcrumbs maintitle="Stores" title="Store List" breadcrumbItem="" /> */}
                    <Row>
                        <Col md={'12'}>
                            <ListTable />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default ListIndex;