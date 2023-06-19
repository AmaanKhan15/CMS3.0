import React, { useState,useEffect } from "react"
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
} from "reactstrap"
import Swal from "sweetalert2";  
import { updateMerchandiser } from '../../../../store/services/merchand'
import Select from "react-select"
import SuccessModal from "../../Modal/Success";
import { ThreeDots } from 'react-loader-spinner'
import { useLocation,useHistory } from "react-router-dom";
const URL = process.env.REACT_APP_LOCAL_URL;

const AddStoreForm = (props) => {
  const [contactNo, setcontactNo] = useState('')
  const [area, setarea] = useState('')
  const [address, setaddress] = useState('')
  const [openModal, setopenModal] = useState(false);
  const [fName,setfname]=useState('')
  const [mName,setmname]=useState('')
  const [lName,setlname]=useState('')
  const [gender,setgender]=useState('')
  const [idproof,setidproof]=useState('')
  const [proofno,setproofno]=useState('')
  const [email,setemail]=useState('')
  const [city,setcity]=useState('')
  const [pass,setpass]=useState('')
  const [uname,setuname]=useState('')
  const [Loading, setLoading] = useState(false)
  const [selectedGroup, setselectedGroup] = useState([])
  const [selectedProof, setselectedProof] = useState([])
  const [editData, seteditData] = useState([])
  const location=useLocation()
  const history= useHistory()
  // const[id,setid]=useState('')
 

  function handleSelectGroup(selectedGroup) {
    console.log("select changed",selectedGroup)
    setselectedGroup(selectedGroup)
    }
  function handleSelectProof(selectedProof) {
    console.log("select changed",selectedProof)
    setselectedProof(selectedProof)
    }
  
  const handleSubmitPersosnal=async(e,id)=> {
    e.preventDefault()
console.log("merchand id is",id)
    setfname(document.getElementById("fName").value);
    setmname(document.getElementById("mName").value);
    setlname(document.getElementById("lName").value);
    setcontactNo(document.getElementById("contactNo").value);
    setarea(document.getElementById("area").value);
    setaddress(document.getElementById("address").value);
    setemail(document.getElementById("email").value);
    setcity(document.getElementById("city").value);
    setpass(document.getElementById("pass").value);
    setuname(document.getElementById("uname").value);
    setselectedProof(document.getElementById("selectedProof").value);
    setselectedGroup(document.getElementById("selectedGroup").value);

  
    if (document.getElementById("fName").value === "") {
      setfname(false)
    } else {
      setfname(true)
    }
    if (document.getElementById("mName").value === "") {
      setmname(false)
    } else{
      setmname(true)
    } 
    if (document.getElementById("lName").value === "") {
      setlname(false)
    } else{
      setlname(true)
    } 
    if (document.getElementById("selectedGroup").value === "") {
      setgender(false)
    } else{
      setgender(true)
    } 
    if (document.getElementById("selectedProof").value === "") {
      setidproof(false)
    } else{
      setidproof(true)
    } 
    if (document.getElementById("proofno").value === "") {
      setproofno(false)
    } else{
      setproofno(true)
    } 
    if (document.getElementById("contactNo").value === "") {
        setcontactNo(false)
    } else{
        setcontactNo(true)
    } 
    if (document.getElementById("address").value === "") {
        setaddress(false)
    } else{
        setaddress(true)
    }
    if (document.getElementById("email").value === "") {
      setemail(false)
    } else{
      setemail(true)
    }
    if (document.getElementById("area").value === "") {
        setarea(false)
    }else{
        setarea(true)
    }
    if (document.getElementById("city").value === "") {
      setcity(false)
    }else{
      setcity(true)
    }
    if (document.getElementById("pass").value === "") {
      setpass(false)
    }else{
      setpass(true)
    }
    if (document.getElementById("uname").value === "") {
      setuname(false)
    }else{
      setuname(true)
    }
    var d1 = document.getElementsByName("validate")
    
    document.getElementById("tooltipForm").classList.add("was-validated")

    for (var i = 0; i < d1.length; i++) {
      d1[i].style.display = "block"
    }  
    if(document.getElementById("fName").value!= ""  &&document.getElementById("mName").value!= ""  && document.getElementById("lName").value!= ""  && document.getElementById("contactNo").value!= ""  &&  document.getElementById("address").value!= ""  && document.getElementById("area").value!= "" && document.getElementById("email").value!= "" && document.getElementById("proofno").value!= ""&& document.getElementById("city").value!= ""){
      setLoading(true);
      var fname=document.getElementById("fName").value;
      var mname=document.getElementById("mName").value;
      var lname=document.getElementById("lName").value;
      var email=document.getElementById("email").value;
      var address=document.getElementById("address").value;
      var area=document.getElementById("area").value;
      var poorf_no=document.getElementById("proofno").value;
      var city=document.getElementById("city").value;
      var password=document.getElementById("pass").value;
      var username=document.getElementById("uname").value;
      var contact=document.getElementById("contactNo").value;
     let data=await updateMerchandiser(fname,mname,lname,email,address,area,poorf_no,city,selectedProof,selectedGroup,contact,username,password,id)     
     setTimeout(() => {
       setLoading(false);
     }, 2000);
        if(data.status==200){
        //   setopenModal(true)
        Swal.fire({
            icon: 'success',
            title: 'Merchandiser is Updated Sucessfully!',
            // text: 'Merchandiser is Assigned to Customer!',
            confirmButtonColor: '#306060',
        })
        history.push('merchand-list')
        }
    }
    else{
          Swal.fire({
              icon: 'error',
              title: 'Validation Errors....',
              text: 'Please Check Mandatory Fields!',
              confirmButtonColor: '#306060',
              textColor:'#306060'
              // footer: '<a href="">Why do I have this issue?</a>'
            })
            
      }
  }
    const optionProof = [      
          { label: "Iqama", value: "Iqama" },
          { label: "Driving Licence", value: "Driving Licence" },
          { label: "Passport", value: "Passport" }      
    ]      
    const optionGroup = [     
          { label: "Female", value: "Female" },
          { label: "Male", value: "Male" }     
    ]      
useEffect(async()=>{
  
if(location?.state?.id){  
  console.log("i am in  calling api mode",location.state.id)  
var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}`+`/merchand/`+`${location.state.id}`,
    {
      method: "get",
      headers: myHeaders,
    }
  );
  let response = await res.json();
  console.log("post data is",response.data)
  seteditData(response.data)
}
//   const empResult=response.data;
//   return response;  

//   console.log("data is",res)

},[])
  //for change tooltip display propery
  function changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none"
    else document.getElementById(eleId).style.display = "block"
  }
function changePreviousTab(){
  props.TabPreviousdata(1);
}
function onChangeState(TabOpen){
  setopenModal(TabOpen);
  props.Tabdata(2); 
}
function onFirstChange(value){
    setfname(value)
}
    return (
        <React.Fragment>
			 <div className="page-content">
                <Container fluid={true}>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col md={8}>
                                <h6 className="page-title">Merchandiser</h6>
                            </Col>
                        </Row>
                    </div>
                    {/* <Breadcrumbs maintitle="Stores" title="Store List" breadcrumbItem="" /> */}
                    <Row>
                        <Col md={'12'}>
			<Card>
				<CardBody>
                    {editData!=[]?(
                   editData.map((item,key)=>{     
        return<Form className="needs-validation"
            method="post"
            id="tooltipForm"
            onSubmit={e => {
              handleSubmitPersosnal(e,item.id)
            }}
            key={key}>
            <Row>
                <div class="w-100">
                    <div class="pb-10 pb-lg-15">
                        <h2 class="fw-bolder text-dark">Edit Marchandiser    
                        <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Adding Marchands"></i>	</h2>														
						<div class="text-muted fw-bold fs-6">Please Enter Details to Add Marchandiser.</div>                      
                    </div>
                    <div className="row mb-5">
                <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">First Name</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg"
                            id="fName"
                            placeholder="First Name"
                            defaultValue={item.first_name}
                            onChange={event =>
                                changeHandeler(event, "fName1")
                              }                          />
                        <div
                            className={
                                fName === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="fName1"
                          >
                            {fName === false
                              ?  "First Name is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                        <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Middle Name</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg"
                            id="mName"
                            placeholder="Middle Name"
                            defaultValue={item.middle_name}
                            onChange={event =>
                                changeHandeler(event, "mName1")
                              }                          
                            />
                        <div
                            className={
                              mName === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="mName1"
                          >
                            {mName === false
                              ?  "Middle Name No is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                </div>
                </div>
            </Row>
            <Row>
            <div class="w-100">
                <div className="row mb-5">
                <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Last Name</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg"
                            id="lName"
                            placeholder="Contact No"
                            defaultValue={item.last_name}
                            onChange={event =>
                              changeHandeler(event, "lName1")
                            }
                          />
                        <div
                            className={
                              lName === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="lName1"
                          >
                            {lName === false
                              ?  "Last Name is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                        <div className="col-md-6 fv-row">
                        
                        <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span >Gender</span>
                        </label>
                        <Select
                            value={selectedGroup}
                            onChange={handleSelectGroup}
                            options={optionGroup}
                            id="selectedGroup"
                            defaultValue={{ label: 2002, value: 2002 }}
                            classNamePrefix="select2-selection"
                          /> 
                           <div
                            className={
                              gender === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="gender1"
                          >
                            {gender === false
                              ?  "Gender is Required"
                              :""}
                          </div>              
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                </div>
                </div>
            </Row>
            {openModal?(<SuccessModal isOpen={openModal} TabOpen={onChangeState} message={"Stores"}/>):(null)}
            <Row>
            <div class="w-100">
                <div className="row mb-5">
                <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Contact No</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg"
                            id="contactNo"
                            placeholder="Contact No"
                            defaultValue={item.phone_no}
                            onChange={event =>
                              changeHandeler(event, "contactNo1")
                            }
                          />
                        <div
                            className={
                                contactNo === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="contactNo1"
                          >
                            {contactNo === false
                              ?  "Contact No is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                        <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Area</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg"
                            id="area"
                            placeholder="Area"
                            defaultValue={item.area}

                            onChange={event =>
                              changeHandeler(event, "area1")
                            }
                          />

<div
                            className={
                              area === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="area1"
                          >
                            {area === false
                              ?  "Area is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                </div>
                </div>
            </Row>
            <Row>
            <div class="w-100">
                <div className="row mb-5">
                <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span>Id Proof</span>
                            </label>
                            <div className="mb-3 position-relative">
                            
                           <Select
                            value={selectedProof}
                            onChange={handleSelectProof}
                            options={optionProof}
                            id="selectedProof"
                            defaultValue={{value: item.id_proof, label:item.id_proof}}
                            classNamePrefix="select2-selection"
                          /> 
                        <div
                            className={
                              idproof === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="id_proof1"
                          >
                            {idproof === false
                              ?  "Id Proof is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                        <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Id No</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg"
                            id="proofno"
                            placeholder="Id No"
                            defaultValue={item.proof_no}

                            onChange={event =>
                              changeHandeler(event, "proof_no1")
                            }
                          />
<div
                            className={
                              proofno === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="proof_no1"
                          >
                            {proofno === false
                              ?  "Id No is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                </div>
                </div>
            </Row>
            <Row>
            <div class="w-100">
                <div className="row mb-5">
                <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Address</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg"
                            id="address"
                            placeholder="Address"
                            defaultValue={item.address}

                            onChange={event =>
                              changeHandeler(event, "address1")
                            }
                          />
                        <div
                            className={
                                address === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="address1"
                          >
                            {address === false
                              ?  "Address is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Email</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg"
                            id="email"
                            placeholder="Email"
                            defaultValue={item.email}

                            onChange={event =>
                              changeHandeler(event, "email1")
                            }
                          />
                        <div
                            className={
                                email === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="email1"
                          >
                            {email === false
                              ?  "Email is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                    
                </div>
                </div>
            </Row>
            <Row>
            <div class="w-100">
                <div className="row mb-5">
                <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Username</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg"
                            id="uname"
                            placeholder="Username"
                            defaultValue={item.username}
                            onChange={event =>
                              changeHandeler(event, "uname1")
                            }
                          />
                        <div
                            className={
                              uname === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="uname1"
                          >
                            {uname === false
                              ?  "Username is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                <div className="col-md-6 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">Password</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="password"
                            className="form-control form-control-lg"
                            id="pass"
                            defaultValue={item.password}
                            placeholder="Password"
                            onChange={event =>
                              changeHandeler(event, "pass1")
                            }
                          />
                        <div
                            className={
                              pass === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="pass1"
                          >
                            {pass === false
                              ?  "Password is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                    
                </div>
                </div>
            </Row>
            <Row>
            <div class="w-100">
                <div className="row mb-5">
            
                <div className="col-md-12 fv-row">
                            <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                <span className="required">City</span>
                            </label>
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg"
                            id="city"
                            placeholder="City"
                            defaultValue={item.city}
                            onChange={event =>
                              changeHandeler(event, "city1")
                            }
                          />
                        <div
                            className={
                              city === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="city1"
                          >
                            {city === false
                              ?  "City is Required"
                              :""}
                          </div>
                        </div>
                            {/* <input type="text" class="form-control form-control-lg" placeholder="First Name" name="first-name" /> */}
                        </div>
                    
                </div>
                </div>
            </Row>
            
            <div className="actions clearfix">
                <Row>
                    <Col md={3}>
                        
                    </Col>
                    <Col md={6}></Col>
                    {Loading ?
            <Col md={2}>

              <button
                type="submit"
                class="btn btn-lg btn-primary"
              >
                <ThreeDots color="#ffffff" height={30} width={30} />
              </button>
            </Col>
            : <Col md={2}>
              <button
                type="submit"
                class="btn btn-lg btn-primary"
              >
                Update{" "}
                <i className="fas fa-check" style={{ "size": '20' }}></i>

              </button>
            </Col>}
                </Row>
            </div>
        </Form>})
        ):<Container fluid>
        <div
            className="pagination" style={{
                position: 'relative ',
                marginTop: '30%'
            }}>
            <ThreeDots color="#306060" height={80} width={80} />								
        </div>        
    </Container>}
        </CardBody>
			</Card>
			</Col>
			</Row>
			</Container>
			</div>
		</React.Fragment>
    )
}
export default AddStoreForm;