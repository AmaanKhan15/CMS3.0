import React,{useState,useEffect} from "react";
import image1 from "../../../../../assets/images/avatars/029-boy-11.svg";
import { Progress,Container } from "reactstrap"
import { getFilterReport } from "../../../../../store/services/PromotorReport"
import RadialChart from "../RadialBar";
import { ThreeDots } from 'react-loader-spinner'

const Cards = (props) => {
    let [loading, setLoading] = useState(true);
    let [reportdata, setreportdata] = useState(true);
    var data;
    useEffect(async()=>{
        let promotorReport=await getFilterReport(props.storeId,props.skuId,props.promId,props.startdate,props.enddate);                    
        setreportdata(promotorReport)
        setLoading(false);        
    },[])  
    console.log("data from api is",data)         
    return (
            loading ? (
                <Container fluid>
                    <div
                        className="pagination" style={{
                            position: 'relative ',
                        }}>
                        <ThreeDots color="#306060" height={80} width={80} />
                    </div>
                </Container>
            ) : ( 
            reportdata?          
            reportdata.map((item,key)=>{                      
            return(
            <div class="row g-5 g-xl-8" key={key}>
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
                            </div>
                            <div class="d-flex justify-content-end flex-grow-0-5" >
                                <RadialChart damage={item.damaged_item_qty}  sales={item.total_sales_qty} shelf={item.shelf_qty}/>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>)
            }) 
            :null
    )
    )
}
export default Cards;
