import React, { useState,useEffect } from "react"
// import "./create-account";
import {
    Card,
    CardBody,
    Col,
    Container,
    Form,
    Input,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap"
import Swal from "sweetalert2";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CustomerWizard from "./Customer/CustomerWizard";
import SKUWizard from "./SKU/SKUWizard";
import StoreWizard from "./Store/StoreWizard";
import SupervisorForm from "./Supervisor/supervisorWizard";
import PromotorForm from "./Promotor/PromotorWizard";
import MerchandForm from "./Merchandiser/MerchandWizard";
import Redirect from "./Redirection/index"
import Completed from "./CompletedTab";
import { getUnAssignedPromotors } from "../../../store/services/promotor"
import { getUnAssignedMerchandiser} from "../../../store/services/merchand"

const FormWizard = (props) => {
const [activeTab, setactiveTab] = useState(2)
const [salesTab, setsalesTab] = useState(['Merchand'])
const [assignProm, setassignProm] = useState([])
const [assignMerch, setassignMerch] = useState([])
const [completedTab, setcompletedTab] = useState([])
const [activeTabVartical, setoggleTabVertical] = useState(1)

useEffect(async () => {
    let data = await getUnAssignedPromotors();
    let merdata = await getUnAssignedMerchandiser();
    console.log("promotors are",data)
    setassignMerch(merdata)
    setassignProm(data)
    completedTab.push(1);
},[])
    function toggleTab(tab) {
        if (activeTab !== tab) {
            if (tab >= 1 && tab <= 4) {
                setactiveTab(tab)
            }
        }
    }

    function toggleTabVertical(tab) {
        if (activeTabVartical !== tab) {
            if (tab >= 1 && tab <= 4) {
                setoggleTabVertical(tab)
            }
        }
    }
const onChangeTab =(tabNo)=>{
    completedTab.push(tabNo);
    console.log("Active tab is",tabNo)
    setactiveTab(tabNo);
}
const onChangeSales=(sales)=>{
salesTab.push(sales)
}
   const HandleVerticleSwitch=(Tabno)=>{
       var tabcount=completedTab.length;
       console.log("Current length",completedTab)
       if(tabcount<Tabno){
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Please Complete Current Details!!',
            //     confirmButtonColor: '#306060',
            //   })       
       }
    for(var i=0;i<completedTab.length;i++){
        if(completedTab[i]===Tabno){
            console.log("Tab Details",Tabno)
            setactiveTab(Tabno)
        }if(completedTab[i]!=Tabno){
            // console.log("Tab Details",completedTab[i])
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Complete Current Details!!',
                confirmButtonColor: '#306060',
              })  
        }

    }
    function HandleStyle(){       
        for(var i=0;i<completedTab.length;i++){
            if(completedTab[i]==activeTab){
                setactiveTab(activeTab)
                return 'stepper-item completed'
            }
            // else if(activeTab===4){
            //     return 'stepper-item current'
            // }
            else{
                return 'stepper-item'
            }
    
        }
    }
}
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs maintitle="Customers" title="Customer List" breadcrumbItem="Add Customers" />
                    <Row>
                        <Col sm="4">
                            <Card>
                                <CardBody>
                                    <div className="form-verticle form-wizard-wrapper wizard clearfix">                                       
                                        <div className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid" id="kt_create_account_stepper">
                                            <div className="d-flex justify-content-center  rounded justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9">                                               
                                                <div className="stepper-nav">
                                                    {/*end::Step 1*/}
                                                    <div className={`stepper-item  ${activeTab === 1 ? "current": activeTab-1== 1 || activeTab-1>1?"completed":" "}`}   data-kt-stepper-element="nav" style={{cursor:'pointer'}} onClick={()=>{HandleVerticleSwitch(1)}}>
                                                        <div className="stepper-line w-40px"></div>
                                                        <div className="stepper-icon w-40px h-40px">
                                                            <i className="stepper-check fas fa-check " ></i>                                                            
                                                            <span className="stepper-number">1</span>
                                                        </div>                                                       
                                                        <div className="stepper-label">
                                                            <h3 className="stepper-title">Customer</h3>
                                                            <div className="stepper-desc fw-bold">Setup Your Customer Details</div>
                                                        </div>
                                                    </div>
                                                    {/*end::Step 1*/}
                                                    {/*begin::Step 2*/}
                                                    <div className={`stepper-item  ${activeTab === 2 ? "current": activeTab-1>1?"completed":" "}`}  data-kt-stepper-element="nav" style={{cursor:'pointer'}} onClick={()=>{HandleVerticleSwitch(2)}}>
                                                        <div className="stepper-line w-40px"></div>                                                        
                                                        <div className="stepper-icon w-40px h-40px">
                                                            <i className="stepper-check fas fa-check"></i>
                                                            <span className="stepper-number">2</span>
                                                        </div>                                                        
                                                        <div className="stepper-label">
                                                            <h3 className="stepper-title">Store Details</h3>
                                                            <div className="stepper-desc fw-bold">Setup Your Store Details</div>
                                                        </div>
                                                    </div>
                                                    {/*end::Step 2*/}
                                                    {/*begin::Step 3*/}
                                                    <div className={`stepper-item  ${activeTab === 3 ? "current": activeTab-1>1?"completed":" "}`}  data-kt-stepper-element="nav" style={{cursor:'pointer'}} onClick={()=>{HandleVerticleSwitch(3)}}>
                                                        {/*begin::Line*/}
                                                        <div className="stepper-line w-40px"></div>
                                                        {/*end::Line*/}
                                                        {/*begin::Icon*/}
                                                        <div className="stepper-icon w-40px h-40px">
                                                            <i className="stepper-check fas fa-check"></i>
                                                            <span className="stepper-number">3</span>
                                                        </div>
                                                        {/*end::Icon*/}
                                                        {/*begin::Label*/}
                                                        <div className="stepper-label">
                                                            <h3 className="stepper-title">SKU </h3>
                                                            <div className="stepper-desc fw-bold">Add SKU for Stores</div>
                                                        </div>
                                                        {/*end::Label*/}
                                                    </div>
                                                    {/*end::Step 3*/}
                                                    
                                                    {/*begin::Step 5*/}
                                                    {salesTab[0] == 'Promoter'?
                                                    <div>
                                                    <div className={`stepper-item  ${activeTab === 4 ? "current":  activeTab-1>4 || activeTab-1===4 ?"completed":" "}`}  data-kt-stepper-element="nav" style={{cursor:'pointer'}} onClick={()=>{HandleVerticleSwitch(4)}}>
                                                        {/*begin::Line*/}
                                                        <div className="stepper-line w-40px"></div>
                                                        {/*end::Line*/}
                                                        {/*begin::Icon*/}
                                                        <div className="stepper-icon w-40px h-40px">
                                                            <i className="stepper-check fas fa-check"></i>
                                                            <span className="stepper-number">4</span>
                                                        </div>
                                                        {/*end::Icon*/}
                                                        {/*begin::Label*/}
                                                        <div className="stepper-label">
                                                            <h3 className="stepper-title">Promoter Detail</h3>
                                                            <div className="stepper-desc fw-bold">Assign Your Promoters to Customer</div>
                                                        </div>
                                                        {/*end::Label*/}
                                                    </div> 
                                                    {/*begin::Step 4*/}
                                                    <div className={`stepper-item ${activeTab === 5 ? "current": activeTab-1>5 || activeTab-1===5 ?"completed":" "}`}  data-kt-stepper-element="nav" style={{cursor:'pointer'}} onClick={()=>{HandleVerticleSwitch(5)}}>
                                                        {/*begin::Line*/}
                                                        <div className="stepper-line w-40px"></div>
                                                        {/*end::Line*/}
                                                        {/*begin::Icon*/}
                                                        <div className="stepper-icon w-40px h-40px">
                                                            <i className="stepper-check fas fa-check"></i>
                                                            <span className="stepper-number">5</span>
                                                        </div>
                                                        {/*end::Icon*/}
                                                        {/*begin::Label*/}
                                                        <div className="stepper-label">
                                                            <h3 className="stepper-title">Supervisor Details</h3>
                                                            <div className="stepper-desc fw-bold">Add Supervisors for Customer</div>
                                                        </div>
                                                        {/*end::Label*/}
                                                    </div>
                                                    {/*end::Step 4*/}
                                                    <div className={`stepper-item  ${activeTab === 6 ? "current": activeTab-1==6?"completed":" "}`}  data-kt-stepper-element="nav" style={{cursor:'pointer'}} onClick={()=>{HandleVerticleSwitch(6)}}>
                                                        <div className="stepper-line w-40px"></div>                                                       
                                                        <div className="stepper-icon w-40px h-40px">
                                                            <i className="stepper-check fas fa-check"></i>
                                                            <span className="stepper-number">6</span>
                                                        </div>
                                                        
                                                        <div className="stepper-label">
                                                            <h3 className="stepper-title">Completed</h3>
                                                            <div className="stepper-desc fw-bold">Woah, we are here</div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                     :null}
                                                    {salesTab[0] == 'Merchand'?
                                                    <div>
                                                    <div className={`stepper-item  ${activeTab === 4 ? "current": activeTab-1>4 || activeTab-1===4 ?"completed":" "}`}  data-kt-stepper-element="nav" style={{cursor:'pointer'}} onClick={()=>{HandleVerticleSwitch(4)}}>
                                                        {/*begin::Line*/}
                                                        <div className="stepper-line w-40px"></div>
                                                        {/*end::Line*/}
                                                        {/*begin::Icon*/}
                                                        <div className="stepper-icon w-40px h-40px">
                                                            <i className="stepper-check fas fa-check"></i>
                                                            <span className="stepper-number">4</span>
                                                        </div>
                                                        {/*end::Icon*/}
                                                        {/*begin::Label*/}
                                                        <div className="stepper-label">
                                                            <h3 className="stepper-title">Merchandiser Detail</h3>
                                                            <div className="stepper-desc fw-bold">Assign Your Merchandiser to Customer</div>
                                                        </div>
                                                        {/*end::Label*/}
                                                    </div> 
                                                    {/*begin::Step 4*/}
                                                    <div className={`stepper-item ${activeTab === 5 ? "current": activeTab-1>5 || activeTab-1===4 ?"completed":" "}`}  data-kt-stepper-element="nav" style={{cursor:'pointer'}} onClick={()=>{HandleVerticleSwitch(5)}}>
                                                        {/*begin::Line*/}
                                                        <div className="stepper-line w-40px"></div>
                                                        {/*end::Line*/}
                                                        {/*begin::Icon*/}
                                                        <div className="stepper-icon w-40px h-40px">
                                                            <i className="stepper-check fas fa-check"></i>
                                                            <span className="stepper-number">5</span>
                                                        </div>
                                                        {/*end::Icon*/}
                                                        {/*begin::Label*/}
                                                        <div className="stepper-label">
                                                            <h3 className="stepper-title">Supervisor Details</h3>
                                                            <div className="stepper-desc fw-bold">Add Supervisors for Customer</div>
                                                        </div>
                                                        {/*end::Label*/}
                                                    </div>
                                                    {/*end::Step 4*/}
                                                    <div className={`stepper-item  ${activeTab === 6 ? "current": activeTab-1==6?"completed":" "}`}  data-kt-stepper-element="nav" style={{cursor:'pointer'}} onClick={()=>{HandleVerticleSwitch(6)}}>
                                                        <div className="stepper-line w-40px"></div>                                                       
                                                        <div className="stepper-icon w-40px h-40px">
                                                            <i className="stepper-check fas fa-check"></i>
                                                            <span className="stepper-number">6</span>
                                                        </div>
                                                        
                                                        <div className="stepper-label">
                                                            <h3 className="stepper-title">Completed</h3>
                                                            <div className="stepper-desc fw-bold">Woah, we are here</div>
                                                        </div>
                                                    </div>
                                                    </div>:
                                                    null}
                                                    {salesTab[0]==''?<div className={`stepper-item  ${activeTab === 5 ? "current": activeTab-1==5?"completed":" "}`}  data-kt-stepper-element="nav" style={{cursor:'pointer'}} onClick={()=>{HandleVerticleSwitch(5)}}>
                                                        <div className="stepper-line w-40px"></div>                                                       
                                                        <div className="stepper-icon w-40px h-40px">
                                                            <i className="stepper-check fas fa-check"></i>
                                                            <span className="stepper-number">5</span>
                                                        </div>
                                                        
                                                        <div className="stepper-label">
                                                            <h3 className="stepper-title">Completed</h3>
                                                            <div className="stepper-desc fw-bold">Woah, we are here</div>
                                                        </div>
                                                    </div>:null}
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                       
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        {/* {assignProm!='' || assignMerch!=''?( */}
                        <Col sm="8">
                            {activeTab === 1?(                            
                            <CustomerWizard TabdataVerticle={onChangeTab} SalesTabData={onChangeSales}/>
                             ):(null)}
                            {activeTab === 2?(                            
                            <StoreWizard TabdataVerticle={onChangeTab} />
                             ):(null)}
                            {activeTab === 3?(                            
                            <SKUWizard TabdataVerticle={onChangeTab} />
                             ):(null)}
                            
                            {activeTab === 4  && salesTab[0]=='Promoter'?(                            
                            <PromotorForm TabdataVerticle={onChangeTab} />
                            ):(null)}
                            {activeTab === 4 && salesTab[0]=='Merchand'?(                            
                            <MerchandForm TabdataVerticle={onChangeTab} />
                            ):(null)}
                            {activeTab === 5?(                            
                            <SupervisorForm TabdataVerticle={onChangeTab} SelectedPerson={salesTab} />
                             ):(null)}
                            {activeTab === 6?(                            
                            <Completed />
                             ):(null)}
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default FormWizard