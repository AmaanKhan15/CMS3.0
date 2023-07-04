import { Link } from "react-router-dom"

import CustomTable from "components/CustomTable";
import React, { useState } from "react"
// import "./create-account";
import {
    Col,
    Container,
    Row,
} from "reactstrap"
import ListTable from "./ListingTable";
const ListIndex = (props) => {

    const columns = [
        {
          field: "",
          headerName: "ID",
          width: 110,
          renderCell: ({ row }) => row.id,
        },
        {
          field: "name",
          headerName: "Store Name",
          width: 310,
        },
        {
            field: "contact",
            headerName: "contact",
            width: 100,
          },
          {
            field: "progress",
            headerName: "Progress",
            width: 100,
          },
          {
            field: "area",
            headerName: "Area",
            width: 110,
          },
          {
            field: "customer",
            headerName: "Customer",
            width: 210,
          }
      ];

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={8}>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={'12'}>
                            <div>
                            <div style = {{
                                textAlign : 'right',
                                paddingBottom : '1rem',
                                display : 'flex',justifyContent : 'space-between'

                            }}>
                                <h3 className="page-title"  >Store List</h3>

                            <Link type="button" to="/store-add" class="btn btn-primary font-size-14">
                                Add Stores
                            </Link>
                            </div>
                            <CustomTable
                            columns={columns}
                            />
                            </div>
                            <ListTable />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default ListIndex;