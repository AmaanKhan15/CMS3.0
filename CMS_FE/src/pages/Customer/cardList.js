import React from "react";
import image1 from "../../assets/images/avatars/029-boy-11.svg";
import {useHistory} from 'react-router-dom'
const CardList = (props) => {
  let data=props.cardData;
  const history=useHistory();
  const HandleAssignedPromotor=(id,name)=>{
history.push({
  pathname:'assignedpromotor/list',
  state:{name:name,id:id}
})
}
const HandleAssignedMarchand=(id,name)=>{
history.push({
  pathname:'assignedmerchand/list',
  state:{name:name,id:id}
})
}
const HandleAssignedStore=(id,name)=>{

history.push({
  pathname:'assignedstore/list',
  state:{name:name,id:id}
})
}
const HandleAssignedSKU=(id,name)=>{

history.push({
  pathname:'assignedsku/list',
  state:{name:name,id:id}
})
}

const handleCustomer=(id)=>{
  history.push({pathname:'/customer-deatils',state:{id:id}})
}
    return(
        <div className="card card-xl-stretch mb-xl-6 btn-rounded">
        <div className="card-body d-flex align-items-center pt-3 pb-0 ">
          {/* <img src={props.logo} alt="" className="align-self-center h-100px" /> */}
          <div className="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
            <a href="#" className="fw-bolder text-dark fs-4 mb-4 ">{data.Customer_Name}</a>
            <div className="d-flex justify-content-between w-100 mt-auto mb-2">
              <span className="fw-bold fs-5 text-black-400" >Promotors  </span>
              <span className="fw-bold fs-5 text-black-400" style={{ 'marginLeft': 30 }}>{data.PromotorCount}  </span>
              <button className="badge badge-success" style={{ 'marginLeft': 15,cursor:'pointer' }} onClick={()=>{HandleAssignedPromotor(data.Customer,data.Customer_Name)}}>See
                <span className="svg-icon svg-icon-4 ms-1 me-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                  </svg>
                </span>
              </button>                   
               </div>
            <div className="d-flex justify-content-between w-100 mt-auto mb-2">
              <span className="fw-bold fs-5 text-black-400" >Merchandiser  </span>
              <span className="fw-bold fs-5 text-black-400" style={{ 'marginLeft': 10 }} >{data.MerchandCount}  </span>
              <button className="badge badge-success" style={{ 'marginLeft': 15 }} onClick={()=>{HandleAssignedMarchand(data.Customer,data.Customer_Name)}}>See
                <span className="svg-icon svg-icon-4 ms-1 me-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="d-flex justify-content-between w-100 mt-auto mb-2">
              <span className="fw-bold fs-5 text-black-400" >Stores  </span>
              <span className="fw-bold fs-5 text-black-400" style={{ 'marginLeft': 57 }}>{data.StoreCount}  </span>
              <button className="badge badge-success" style={{ 'marginLeft': 15 }} onClick={()=>{HandleAssignedStore(data.Customer,data.Customer_Name)}}>See
                <span className="svg-icon svg-icon-4 ms-1 me-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="d-flex justify-content-between w-100 mt-auto mb-2">
              <span className="fw-bold fs-5 text-black-400" >SKU  </span>
              <span className="fw-bold fs-5 text-black-400" style={{ 'marginLeft': 57 }}>{data.SKUCount}  </span>
              <button className="badge badge-success" style={{ 'marginLeft': 15 }} onClick={()=>{HandleAssignedSKU(data.Customer,data.Customer_Name)}}>See
                <span className="svg-icon svg-icon-4 ms-1 me-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="d-flex justify-content-between w-100 mt-auto mb-4" style={{ 'marginTop': 30 }}>                      
              <button type="button" class="btn btn-light-primary me-6 btn-rounded" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" style={{"borderRadius":"20"}} onClick={()=>handleCustomer(data.Customer)}>
                {/* <span class="fas fa-eye">{" "} */}
                  See Details
                {/* </span> */}
                </button>												
            </div>

          </div>
        </div>
      </div>
    )
  // })}
}
export default CardList;
