import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
} from "reactstrap"
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
const URL = process.env.REACT_APP_LOCAL_URL;
// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"
import Swal from "sweetalert2";
import {useHistory} from 'react-router-dom';

import avatar from "../../assets/images/users/user-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"

const UserProfile = props => {
  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  const history=useHistory();

const fakebackend=JSON.parse(localStorage.getItem("authUser"))
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))

      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName)
        setemail(obj.email)
        setpassword(obj.password)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username)
        setemail(obj.email)
        setpassword(obj.password)
      }
      setTimeout(() => {
        props.resetProfileFlag();
      }, 3000);
    }
  }, [props.success])

  async function handleValidSubmit(event, values) {
    // props.editProfile(values)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var Bodydata = JSON.stringify({
      username:values.username,
      email:values.username,
      user_type:fakebackend.user_type,           
      password:values.password,            
      created_by:1,
      updated_by: 1
    });
    let res = await fetch(

      `${URL}` + `/users` ,
      {
        method: "PUT",
        headers: myHeaders,
        body: Bodydata
      }      
    );
    let response = await res.json();
    console.log("response is",response)
   if(response.status==200){
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated Sucessfully!',
      // text: 'Supervisor is Assigned to Customer!',
      confirmButtonColor: '#306060',
  })
// history.push("/dashboard")
   } 
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | CMS- Connect Market Services</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="CMS" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="align-self-center flex-1">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        {/* <p className="mb-0">Id no: #{idx}</p> */}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change Profile Details</h4>

          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v)
                }}
              >
                <div className="mb-3">
                  <AvField
                    name="username"
                    label="User Name"
                    value={email || ''}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    required
                  />
                
                </div>
                <div className="mb-3">
                  <AvField
                    name="password"
                    label="Password"
                    value={password || ''}
                    className="form-control"
                    placeholder="Enter PasswordProfil"
                    type="password"
                    required
                  />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Edit Profile Details
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, { editProfile, resetProfileFlag })(UserProfile)
)
