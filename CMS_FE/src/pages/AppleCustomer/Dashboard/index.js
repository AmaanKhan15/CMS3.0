const URL = process.env.REACT_APP_LOCAL_URL
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { ThreeDots } from "react-loader-spinner"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import MacReport from "./Quartercomparison/mac"
import IpadReport from "./Quartercomparison/ipad"
import Iphone from "./Quartercomparison/iphone"
import Beats from "./Quartercomparison/beats"
import AppleWatch from "./Quartercomparison/applewatch"
import AppleTV from "./Quartercomparison/appleTv"
import AirPodsComp from "./Quartercomparison/airPods"
import AppleCareComp from "./Quartercomparison/appleCare"
import AccessoriesComp from "./Quartercomparison/accessories"
import { withTranslation } from "react-i18next"
import RegionData from "./regionData"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import MacSingleRepo from "./SingleReports/Mac/iphone"
import IPhoneSingleRepo from "./SingleReports/iPhone/iphone"
import IPadSingleRepo from "./SingleReports/iPad/iphone"
import AirPodsSinglrRepo from "./SingleReports/AirPods/iphone"
import AppleTVSinglrRepo from "./SingleReports/AppleTv/iphone"
import AppleCareinglrRepo from "./SingleReports/AppleCare/iphone"
import AppleWatchSinglrRepo from "./SingleReports/AppleWatch/iphone"
import IPodinglrRepo from "./SingleReports/iPod/iphone"
import AccessoriesSinglrRepo from "./SingleReports/Accessories/iphone"
import IPhone from "../../../assets/images/iphone.png"
import Ipad from "../../../assets/images/ipad.png"
import AppleCare from "../../../assets/images/applecare.png"
import Accessories from "../../../assets/images/accessories.png"
import AirPods from "../../../assets/images/airpodss.png"
import AppleTv from "../../../assets/images/appleTv.png"
import AppleWatchIcon from "../../../assets/images/AppleWatch.png"
import AppleMac from "../../../assets/images/mac.png"
import IpodIcon from "../../../assets/images/ipod.png"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  tabs: {
    "& .MuiButtonBase-root": {
      color: "#000000",
      fontWeight: "600",
      fontSize: "12px",
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#000000",
      fontWeight: "600",
    },
  },
}))

const Dashboard = props => {
  const classes = useStyles()
  const [menu, setMenu] = useState(false)

  const [apidata, setApidata] = useState([])
  const [salesdata, setsalesdata] = useState([])
  const [regiondata, setregiondata] = useState([])
  const [Loading, setLoading] = useState(false)
  const data = JSON.parse(localStorage.getItem("authUser"))
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)

    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Cache-Control", "no-cache")
    var Bodydata = JSON.stringify({
      customer_id: data.customer_id,
    })
    let res = await fetch(`${URL}` + `/customermodule/dashboard`, {
      method: "post",
      headers: myHeaders,
      body: Bodydata,
    })
    let response = await res.json()
    setApidata(response)
    let regonapi = await fetch(`${URL}` + `/customermodule/regionReport`, {
      method: "post",
      headers: myHeaders,
      body: Bodydata,
    })
    let alldata = await regonapi.json()
    let combinedata = []
    combinedata.push(alldata.Total_Sales)
    console.log("Combined data is", combinedata)
    combinedata.map(item => {
      item.map(item => {
        regiondata.push(item.region)
        console.log("data is", item.slaes)
        item.slaes.map(sal => {
          salesdata.push(sal.unit_sales)
        })
      })
    })
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Connect Market Services</title>
        </MetaTags>
        {Loading && apidata ? (
          <Container fluid>
            <div
              className="pagination"
              style={{
                position: "relative ",
                marginTop: "20%",
              }}
            >
              <ThreeDots color="#306060" height={80} width={80} />
            </div>
          </Container>
        ) : (
          <Container fluid>
            <div className="page-title-box">
              <Row className="align-items-center">
                <Col md={8}>
                  <h6 className="page-title">Dashboard</h6>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item ">
                      Welcome to Connect Market Dashboard
                    </li>
                  </ol>
                </Col>
              </Row>
            </div>

            <Row>
              <div class="w-100">
                <div className="row mb-5">
                  <div className={classes.root}>
                    <AppBar position="static" style={{ background: "#306060" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        fullWidth
                        centered
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "#000000",
                            fontWeight: "600",
                          },
                        }}
                        className={classes.tabs}
                      >
                        {/* <Tab label="Tab 1" {...a11yProps(0)} /> */}
                        <Tab label="All Products" {...a11yProps(0)} />
                        <Tab
                          icon={
                            <img
                              alt="TrophyShining"
                              style={{ width: "30px", height: "30px" }}
                              src={AppleMac}
                            />
                          }
                          {...a11yProps(1)}
                        />
                        <Tab
                          icon={
                            <img
                              alt="TrophyShining"
                              style={{ width: "30px", height: "30px" }}
                              src={IPhone}
                            />
                          }
                          {...a11yProps(2)}
                        />
                        <Tab
                          icon={
                            <img
                              alt="TrophyShining"
                              style={{ width: "30px", height: "30px" }}
                              src={Ipad}
                            />
                          }
                          {...a11yProps(3)}
                        />
                        <Tab
                          icon={
                            <img
                              alt="TrophyShining"
                              style={{ width: "30px", height: "30px" }}
                              src={AirPods}
                            />
                          }
                          {...a11yProps(4)}
                        />
                        <Tab
                          icon={
                            <img
                              alt="TrophyShining"
                              style={{ width: "30px", height: "30px" }}
                              src={AppleTv}
                            />
                          }
                          {...a11yProps(5)}
                        />
                        <Tab
                          icon={
                            <img
                              alt="TrophyShining"
                              style={{ width: "30px", height: "30px" }}
                              src={AppleCare}
                            />
                          }
                          {...a11yProps(6)}
                        />
                        <Tab
                          icon={
                            <img
                              alt="TrophyShining"
                              style={{ width: "30px", height: "30px" }}
                              src={IpodIcon}
                            />
                          }
                          {...a11yProps(7)}
                        />
                        <Tab
                          icon={
                            <img
                              alt="TrophyShining"
                              style={{ width: "30px", height: "30px" }}
                              src={AppleWatchIcon}
                            />
                          }
                          {...a11yProps(8)}
                        />
                        <Tab
                          icon={
                            <img
                              alt="TrophyShining"
                              style={{ width: "30px", height: "30px" }}
                              src={Accessories}
                            />
                          }
                          {...a11yProps(9)}
                        />
                      </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                      <Row>
                        <Col md={6}>
                          <Card>
                            <CardBody>
                              <div class="card-title">
                                <div class="d-flex justify-content-start">
                                  <Col md={6}>
                                    <h3 class="m-0 text-gray-900">Mac</h3>
                                  </Col>
                                </div>
                              </div>
                              <MacReport />
                            </CardBody>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card>
                            <CardBody>
                              <div class="card-title">
                                <div class="d-flex justify-content-start">
                                  <Col md={6}>
                                    <h3 class="m-0 text-gray-900">IPad</h3>
                                  </Col>
                                </div>
                              </div>
                              <IpadReport />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Card>
                            <CardBody>
                              <div class="card-title">
                                <div class="d-flex justify-content-start">
                                  <Col md={6}>
                                    <h3 class="m-0 text-gray-900">iPod</h3>
                                  </Col>
                                </div>
                              </div>
                              <Beats />
                            </CardBody>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card>
                            <CardBody>
                              <div class="card-title">
                                <div class="d-flex justify-content-start">
                                  <Col md={6}>
                                    <h3 class="m-0 text-gray-900">Apple TV </h3>
                                  </Col>
                                </div>
                              </div>
                              <AppleTV />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Card>
                            <CardBody>
                              <div class="card-title">
                                <div class="d-flex justify-content-start">
                                  <Col md={6}>
                                    <h3 class="m-0 text-gray-900">
                                      Apple Watch
                                    </h3>
                                  </Col>
                                </div>
                              </div>
                              <AppleWatch />
                            </CardBody>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card>
                            <CardBody>
                              <div class="card-title">
                                <div class="d-flex justify-content-start">
                                  <Col md={6}>
                                    <h3 class="m-0 text-gray-900">IPhone</h3>
                                  </Col>
                                </div>
                              </div>
                              <Iphone />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Card>
                            <CardBody>
                              <div class="card-title">
                                <div class="d-flex justify-content-start">
                                  <Col md={6}>
                                    <h3 class="m-0 text-gray-900">Air Pods</h3>
                                  </Col>
                                </div>
                              </div>
                              <AirPodsComp />
                            </CardBody>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card>
                            <CardBody>
                              <div class="card-title">
                                <div class="d-flex justify-content-start">
                                  <Col md={6}>
                                    <h3 class="m-0 text-gray-900">
                                      Apple Care+
                                    </h3>
                                  </Col>
                                </div>
                              </div>
                              <AppleCareComp />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <div class="card-title">
                                <div class="d-flex justify-content-start">
                                  <Col md={6}>
                                    <h3 class="m-0 text-gray-900">
                                      Accessories
                                    </h3>
                                  </Col>
                                </div>
                              </div>
                              <AccessoriesComp />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <div class="card-title">
                                <div class="d-flex justify-content-start">
                                  <Col md={6}>
                                    <h3 class="m-0 text-gray-900">
                                      Region Report
                                    </h3>
                                  </Col>
                                </div>
                              </div>
                              <RegionData
                                RegionData={regiondata}
                                SalesData={salesdata}
                              />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <MacSingleRepo />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <IPhoneSingleRepo />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <IPadSingleRepo />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <AirPodsSinglrRepo />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <AppleTVSinglrRepo />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <AppleCareinglrRepo />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <IPodinglrRepo />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <AppleWatchSinglrRepo />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPanel>
                    <TabPanel value={value} index={9}>
                      <Row>
                        <Col md={12}>
                          <Card>
                            <CardBody>
                              <AccessoriesSinglrRepo />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPanel>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        )}
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(Dashboard)
