import React,{useState} from "react";
import {
	Modal,
	Form,
	Input
} from "reactstrap"
import Swal from "sweetalert2";  
import {postStoreGroup} from "../../../store/services/store";
import { useHistory } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'

const SuccessModal = (props) => {
	const history=useHistory();
	const [openModal,setopenModal]=useState(props.isOpen);    
	const [storeGName, setstoreGName] = useState('') 
	const [loading,setLoading]=useState(true)
	const handleSubmitPersosnal=async(e)=> {
		console.log("Store ids are",props.StoreData)
		setLoading(false)
		setTimeout(() => {
            setLoading(false);
        }, 5000);
		e.preventDefault()
		setstoreGName(document.getElementById("storeGName1").value);
		if (document.getElementById("storeGName").value === "") {
			setstoreGName(false)
		} else {
			setstoreGName(true)
		}
		var d1 = document.getElementsByName("validate")
    
		document.getElementById("tooltipForm").classList.add("was-validated")
	
		for (var i = 0; i < d1.length; i++) {
		  d1[i].style.display = "block"
		}
		if(document.getElementById("storeGName").value !== ""){ 
		let data=await postStoreGroup(props.StoreData,document.getElementById("storeGName").value,props.custId)
		if(data.status==200){			
			setopenModal(false);
			
			  Swal.fire({
				icon: 'success',
				title: 'Good Job!',
				text:'Store Group Added Successfully!!',
				confirmButtonColor: '#306060',
	
			  })
			  setTimeout(() => {
				// history.push('/store-list')
			}, 3000);
			        
		}
	}
		  window.scrollTo({
			top: 0, 
			behavior: 'smooth'			
		  });       
	}
	function changeHandeler(event, eleId) {
		if (event.target.value !== "")
		  document.getElementById(eleId).style.display = "none"
		else document.getElementById(eleId).style.display = "block"
	  }
	
	return (
		<Modal
			isOpen={openModal}
			centered={true}
		>
			{/* <div class="modal fade" id="kt_modal_new_target" tabindex="-1" > */}
			<div class="modal-content rounded">
				<div class="modal-header pb-0 border-0 justify-content-end">
					<div class="btn btn-sm btn-icon btn-active-color-primary" >
						
					</div>
				</div>
				<Form className="needs-validation"
            method="post"
            id="tooltipForm"
            onSubmit={e => {
              handleSubmitPersosnal(e)
            }}>

				<div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">

					{/*begin:Form*/}
					{/* <form id="kt_modal_new_target_form"> */}
						<div class=" d-flex flex-column mb-8 fv-row">
							<div class="card-header-button1">
							<i className="fas fa-store fa-4x b-color" ></i>
							</div>
							
							<label class="align-items-center fs-12 fw-bold mb-4">
								<span class="b-color card-header-button1 required">Add Store Group Name</span>
							</label>
							{/* <input type="text" class="form-control form-control-lg form-control-solid" placeholder="Add Store Group Name" name="target_title" /> */}
							
                            <div className="mb-3 position-relative">
                            <Input
                            type="text"
                            className="form-control form-control-lg form-control-solid"
                            id="storeGName"
                            placeholder="Store Name"
                            onChange={event =>
                              changeHandeler(event, "storeGName1")
                            }
                          />
                        <div
                            className={
                                storeGName === false ? "invalid-tooltip" : ""
                            }
                            name="validate"
                            id="storeGName1"
                          >
                            {storeGName === false
                              ?  "Store Group Name is Required"
                              :""}
                          </div>
						</div>
						</div>
						<div class="text-center">
							<button class="btn btn-light-danger me-3" onClick={()=>setopenModal(false)}>Cancel</button>
							{loading?(
							<button id="kt_modal_new_target_submit" class="btn btn-primary" type="submit" >
								<span class="indicator-label">Add Group</span>
							</button>
							):(
							<button id="kt_modal_new_target_submit" class="btn btn-primary" type="submit" >
							<ThreeDots color="#FFFFFF" height={10} width={10} />								
							</button>
							)}
							
						</div>
					{/* </form> */}
				</div>
			</Form>
			</div>
		</Modal>

	)
}
export default SuccessModal