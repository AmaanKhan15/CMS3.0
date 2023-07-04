import React, { useEffect, useState } from "react";
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import CardList from "./cardList";
import { useHistory } from "react-router-dom"
import { getCustomerList } from '../../store/services/customer'
import { ThreeDots } from 'react-loader-spinner'
import "../Common/page.css";
import Pagination from 'react-mui-pagination';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const theme = createTheme({
  palette: {
    primary: {
      main: '#306060'
    }
  }
});

const CustomerList = (props) => {
  const history = useHistory();
  let [loading, setLoading] = useState(true);
  let [Apidata, setApidata] = useState([])
  const [searchInput, setSearchInput] = useState('');
  useEffect(async () => {
    let data = await getCustomerList();
    if (data != '') {
      setLoading(false);
      setApidata(data)
    }
    setnoOfPages(Math.ceil(data.length / itemsPerPage))
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [])
  const onChangeHandle = () => {
    history.push("/customer-add");
  }
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const [noOfPages, setnoOfPages] = useState('');
  const [filterResult, setfilterResult] = useState([]);
  const handleChange = (event, value) => {
    setPage(value);
  };
 
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags >
          <title>Customer List | Connect Market Services</title>
        </MetaTags>
        {loading ? (
          <Container fluid>
            <div
              className="pagination" style={{
                position: 'relative ',
                marginTop: '20%'
              }}>
              <ThreeDots color="#306060" height={80} width={80} />
            </div>
          </Container>

        ) : (
          <Container fluid>
            {Apidata ? (
              <div>
                <div className="page-title-box">
                  <Row className="align-items-center">
                    <Col md={10}>
                      <h6 className="page-title">Customer List</h6>
                    </Col>
                    <Col md={2}>
                      <button type="button" class="btn btn-primary fw-normal font-size-14" onClick={() => onChangeHandle()} >
                        Add Customer
                      </button>
                    </Col>
                  </Row>
                </div>
                <Row>
                {Apidata
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((item, idx) => (
                      <Col xl={4} md={6} key={idx}>
                        <CardList cardData={item} />
                      </Col>
                    ))}                                  
                </Row>
              </div>
            ) : null}
            {Apidata.length > 0 ? (

              <MuiThemeProvider
                theme={theme}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>

                  <Pagination
                    linksShadow={4}
                    numOfLinks={3}
                    page={page}
                    setPage={handleChange}
                    perPage={itemsPerPage}
                    total={Math.ceil(Apidata.length)}
                    size="large"
                    activeLinkColor='primary'
                    firstContent='First'
                    lastContent='Last'
                    firstLastColor='primary'
                    // firstLastColor={'primary'}
                    FirstLastComponent={Fab} // we have used our imported component      
                  />
                </div>
              </MuiThemeProvider>
            ) : null}
            {/* {Apidata.length>0?
            <div className="pagination">
            <button
              onClick={goToPreviousPage}
              className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
              prev
            </button>
      
            {/* show page numbers 
            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${currentPage === item ? 'active' : null}`}
              >
                <span>{item}</span>
              </button>
            ))}
      
            {/* next button 
            <button
              onClick={goToNextPage}
              className={`next ${currentPage === pages ? 'disabled' : ''}`}
            >
              next
            </button>
          </div>:(null)} */}

          </Container>
        )}
      </div>
    </React.Fragment>
  );
};
export default CustomerList;