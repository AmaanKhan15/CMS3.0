import React from "react";
import image1 from "../../../../../assets/images/avatars/029-boy-11.svg";
import { Progress } from "reactstrap"
import {useHistory} from "react-router-dom"
import RadialChart from "./RadialBar";
const Cards = (props) => {
    const history = useHistory();
    let data=props.report;
    console.log("report data ",props.report)
    function onComplete(id) {
        history.push( {pathname : '/store-compare/report',state:{id:id}});
    }
    return (
        <React.Fragment>  
            {data?(  
                data.map((item,key)=>{                      
            return<div class="row g-5 g-xl-8">
                <div class="col-xl-12">
                    <div class="card card-xl-stretch mb-xl-8 btn-rounded">
                        <div class="card-body d-flex align-items-center pt-3 pb-0">
                            <img src={image1} alt="" class="align-self-center h-150px mb-20" />
                            <div class="d-flex flex-column flex-grow-0-5  py-2 py-lg-13 me-2">
                                <a href="#" class="text-muted fw-normal font-size-18">{item.promotor_detail['first_name']}</a>
                                <span class="text-muted fw-normal font-size-15">{item.customer_detail['company_name']}</span>
                                <div class="d-flex justify-content-between w-100 mt-auto mb-2">
                                    <span class="text-muted fw-normal font-size-12">Target Completed</span>
                                    <span class="fw-bolder fs-6">70%</span>
                                </div>
                                <div className="mb-10">
                                    <Progress color="primary" value={30} />
                                    <span class="text-muted fw-normal font-size-12">{item.store_detail['store_name']}</span>
                                </div>
                                <br />
                                {/* <div className="mb-10">
                                    <button
                                        type="button"
                                        class="btn btn-lg btn-light-primary"
                                        onClick={()=>{onComplete(item.promotor_detail['id'])}}
                                    >
                                        View Details
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="24" viewBox="0 0 24 24" fill="none">
                                            <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="white" />
                                            <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="white" />
                                        </svg>

                                    </button>
                                </div> */}
                            </div>
                            <div class="d-flex justify-content-end flex-grow-0-5" >
                                <RadialChart damage={item.damaged_item_qty}  sales={item.total_sales_qty} shelf={item.shelf_qty}/>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            }) 
            ):(null)} 
        </React.Fragment >
    )
}
export default Cards;
