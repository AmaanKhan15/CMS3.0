import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import React ,{useState}from "react"
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
// actions
import { loginUser, apiError } from "../../store/actions"
// import images
import logoSm from "../../assets/images/logo-sm.png";
import backImage from "../../assets/images/illustration.png";
import logolightImg from "../../assets/images/ConnectMarketingServices.png";
import { ThreeDots } from 'react-loader-spinner'

const Login = props => {
  // handleValidSubmit
  let [loading, setLoading] = useState(false);
  // if(props.error){
  //   console.log("in erorr logs",)
  //   setLoading(false)
  // }
  const handleValidSubmit = (event, values) => {

    // setLoading(true)
    // setTimeout(() => {
    //   setLoading(false)
    //   }, 3000);	
    // console.log("Values are",values)

    props.loginUser(values, props.history)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Connect Market Services</title>
      </MetaTags>         
      <div className="account-pages my-5 pt-sm-5">
        
        <Container>
          <Row className="justify-content-center">
         
            <Col md={12} >
              <Card className="overflow-hidden btn-rounded">
                <CardBody className="p-4">                  
                    <div class="d-flex justify-content-start">
                      <Col md={6}>
                      {/* <div className="bg-primary"> */}
                  <div className="text-primary text-center p-4">
                    
                    <span className="logo-lg">
                  <img src={logolightImg} alt="" height="37" />
              
                </span>
                <h1 className="text-primary font-size-30" style={{'marginTop':'5%'}}>
                      Welcome Back !
                    </h1>
                    <p className="text-primary-50">
                      Sign in Here.
                    </p>
                   
                </div>
                        <div className="p-3">
                          <AvForm
                            className="form-horizontal mt-4"
                            onValidSubmit={(e, v) => {
                              handleValidSubmit(e, v)
                            }}
                          >
                            {props.error ? (                              
                               <Alert color="danger">{props.error[1]}</Alert>                              
                            ) : null}

                            <div className="mb-3">
                              <AvField
                                name="email"
                                label="Email"
                                className="form-control form-control-lg form-control-solid"
                                placeholder="Enter email"
                                type="email" 
                                validate={{ required: { value: true } }}   
                                                           
                              />
                            </div>

                            <div className="mb-3">
                              <AvField
                                name="password"
                                label="Password"
                                validate={{ required: { value: true } }}
                                // value="123456"
                                // validate={{ required: { value: true } }}
                                type="password"                               
                                className="form-control form-control-lg form-control-solid"
                                placeholder="Enter Password"
                                
                              />
                            </div>
                            <div className="mb-3">
                              <Col sm={6}>
                                <div className="form-check">
                                  <input type="checkbox" className="form-check-input" id="customControlInline" />
                                  <label className="form-check-label" htmlFor="customControlInline">Remember me</label>
                                </div>
                              </Col>
                             
                            </div>
                            <div className="mb-12 justify-content-center">
                              <Col md={12}>
                             
                                {loading?(<button
                                  className="btn btn-lg btn-primary w-md waves-effect waves-light text-center"
                                  type="submit"
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                >
                                <ThreeDots color="#FFFFFF" height={30} width={30} />
                                </button>):
                                <button
                                  className="btn btn-lg btn-primary w-md waves-effect waves-light text-center"
                                  type="submit"
                                >
                                  Log In
                                </button>}
                               
                                </Col>
                            </div>

                          </AvForm>
                        </div>
                      </Col>
                      <Col md={6} >
                      <div style={{ backgroundImage: `url(${backImage})`, 
backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',  
 width: "100%",
  height: "440px" 
  }}>    
                 </div>
                      {/* <img src={backImage} alt="logo" height='200px' class="d-flex justify-content-center"/>         */}
                      </Col>
                    </div>
                   
                  {/* </div> */}

                </CardBody>
              </Card>
              <div className="mt-5 text-center">
               
                <p>
                  © {new Date().getFullYear()} Connect Market. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Vitesse Technology
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}