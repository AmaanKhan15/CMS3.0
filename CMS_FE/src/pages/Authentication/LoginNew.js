import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import React from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link,useHistory } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError } from "../../store/actions"

// import images
import logoSm from "../../assets/images/logo-sm.png";

const Login = props => {
  // handleValidSubmit
  const history=useHistory()
  const handleValidSubmit = (event, values) => {
    props.loginUser(values, props.history)
    const data=JSON.parse(localStorage.getItem('authUser'))
    if(data.user_type=='Customer'){
      history.push('/customer/dashboard')
    }
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
        <div class="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
						{/*begin::Form*/}
						<form class="form w-100" novalidate="novalidate" id="kt_sign_up_form">
							{/*begin::Heading*/}
							<div class="mb-10 text-center">
								{/*begin::Title*/}
								<h1 class="text-dark mb-3">Create an Account</h1>
								{/*end::Title*/}
								{/*begin::Link*/}
								<div class="text-gray-400 fw-bold fs-4">Already have an account? 
								<a href="sign-in.html" class="link-primary fw-bolder">Sign in here</a></div>
								{/*end::Link*/}
							</div>
							{/*end::Heading*/}
							{/*begin::Action*/}
							<button type="button" class="btn btn-light-primary fw-bolder w-100 mb-10">
							<img alt="Logo" src="../../../assets/media/svg/brand-logos/google-icon.svg" class="h-20px me-3" />Sign in with Google</button>
							{/*end::Action*/}
							{/*begin::Separator*/}
							<div class="d-flex align-items-center mb-10">
								<div class="border-bottom border-gray-300 mw-50 w-100"></div>
								<span class="fw-bold text-gray-400 fs-7 mx-2">OR</span>
								<div class="border-bottom border-gray-300 mw-50 w-100"></div>
							</div>
							{/*end::Separator*/}
							{/*begin::Input group*/}
							<div class="row fv-row mb-7">
								{/*begin::Col*/}
								<div class="col-xl-6">
									<label class="form-label fw-bolder text-dark fs-6">First Name</label>
									<input class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="first-name" autocomplete="off" />
								</div>
								{/*end::Col*/}
								{/*begin::Col*/}
								<div class="col-xl-6">
									<label class="form-label fw-bolder text-dark fs-6">Last Name</label>
									<input class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="last-name" autocomplete="off" />
								</div>
								{/*end::Col*/}
							</div>
							{/*end::Input group*/}
							{/*begin::Input group*/}
							<div class="fv-row mb-7">
								<label class="form-label fw-bolder text-dark fs-6">Email</label>
								<input class="form-control form-control-lg form-control-solid" type="email" placeholder="" name="email" autocomplete="off" />
							</div>
							{/*end::Input group*/}
							{/*begin::Input group*/}
							<div class="mb-10 fv-row" data-kt-password-meter="true">
								{/*begin::Wrapper*/}
								<div class="mb-1">
									{/*begin::Label*/}
									<label class="form-label fw-bolder text-dark fs-6">Password</label>
									{/*end::Label*/}
									{/*begin::Input wrapper*/}
									<div class="position-relative mb-3">
										<input class="form-control form-control-lg form-control-solid" type="password" placeholder="" name="password" autocomplete="off" />
										<span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
											<i class="bi bi-eye-slash fs-2"></i>
											<i class="bi bi-eye fs-2 d-none"></i>
										</span>
									</div>
									{/*end::Input wrapper*/}
									{/*begin::Meter*/}
									<div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
										<div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
										<div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
										<div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
										<div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
									</div>
									{/*end::Meter*/}
								</div>
								{/*end::Wrapper*/}
								{/*begin::Hint*/}
								<div class="text-muted">Use 8 or more characters with a mix of letters, numbers &amp; symbols.</div>
								{/*end::Hint*/}
							</div>
							{/*end::Input group=*/}
							{/*begin::Input group*/}
							<div class="fv-row mb-5">
								<label class="form-label fw-bolder text-dark fs-6">Confirm Password</label>
								<input class="form-control form-control-lg form-control-solid" type="password" placeholder="" name="confirm-password" autocomplete="off" />
							</div>
							{/*end::Input group*/}
							{/*begin::Input group*/}
							<div class="fv-row mb-10">
								<label class="form-check form-check-custom form-check-solid form-check-inline">
									<input class="form-check-input" type="checkbox" name="toc" value="1" />
									<span class="form-check-label fw-bold text-gray-700 fs-6">I Agree 
									<a href="#" class="ms-1 link-primary">Terms and conditions</a>.</span>
								</label>
							</div>
							{/*end::Input group*/}
							{/*begin::Actions*/}
							<div class="text-center">
								<button type="button" id="kt_sign_up_submit" class="btn btn-lg btn-primary">
									<span class="indicator-label">Submit</span>
									<span class="indicator-progress">Please wait... 
									<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
								</button>
							</div>
							{/*end::Actions*/}
						</form>
						{/*end::Form*/}
					</div>
          {/* <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20">
                      Welcome Back !
                        </h5>
                    <p className="text-white-50">
                      Sign in to continue to Veltrix.
                        </p>
                    <Link to="/" className="logo logo-admin">
                      <img src={logoSm} height="24" alt="logo" />
                    </Link>
                  </div>
                </div>

                <CardBody className="p-4">
                  <div className="p-3">
                    <AvForm
                      className="form-horizontal mt-4"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          value="admin@themesbrand.com"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          value="123456"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <Row className="mb-3">
                        <Col sm={6}>
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customControlInline" />
                            <label className="form-check-label" htmlFor="customControlInline">Remember me</label>
                          </div>
                        </Col>
                        <Col sm={6} className="text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                              </button>
                        </Col>
                      </Row>
                      <Row className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <Link to="/forgot-password">
                            <i className="mdi mdi-lock"></i> Forgot your
                                password?
                              </Link>
                        </div>
                      </Row>
                      
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link
                    to="register"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Veltrix. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row> */}
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