import React, { useState } from "react"
import {
	Card,
	CardBody,
	TabContent,
	TabPane,Container,
	Row,
    Col,
} from "reactstrap"
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import AddStoreForm from "./AddStore";
import UploadStoreForm from "./UploadStore";
import StoreListForm from "./StoreList";
import StoreGroupForm from "./StoreGroup";
const SkuWizard = (props) => {
	const [activeTab, setactiveTab] = useState(1)
	const [stores, setstore] = useState([])
    function toggleTab(tab) {
        if (activeTab !== tab) {
          if (tab >= 1 && tab <= 4) {
            setactiveTab(tab)
          }
        }
      }
	const onStoreFill=allstores=>{
		console.log("All stores  are",allstores)
		setstore(allstores)
	}
	const onChangePrevious=tabprev=>{
		setactiveTab(tabprev);
	}
	const onChangeTabVerticle =(TabdataVerticle)=>{
		props.TabdataVerticle(TabdataVerticle);
	}
	const onChangeTab =(Tabdata)=>{
		setactiveTab(Tabdata);
	}
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs maintitle="Customers" title="Add Store"  />
					<Row>
						<Col sm="12">
			<Card>
				<CardBody>
					<div class="stepper stepper-links" id="kt_create_account_stepper">
						{/*begin::Nav*/}
						<div class="stepper-nav ">
							{/*begin::Step 1*/}
							<div className={`stepper-item  ${activeTab === 1 ? "current" : ""}`} data-kt-stepper-element="nav" style={{'margin': '1rem 8.0rem',cursor: 'pointer'} }>
								<h3 class="stepper-title" onClick={() => {toggleTab(1) }}>Add Store</h3>
							</div>
							<div className={`stepper-item  ${activeTab === 2 ? "current" : ""}`} data-kt-stepper-element="nav" style={{'margin': '1rem 8.0rem',cursor: 'pointer'} } >
								<h3 class="stepper-title" onClick={() => {toggleTab(2)}} >Upload Store</h3>
							</div>
							<div className={`stepper-item  ${activeTab === 3 ? "current" : ""}`} data-kt-stepper-element="nav" style={{'margin': '1rem 8.0rem',cursor: 'pointer'} } >
								<h3 class="stepper-title" onClick={() => {toggleTab(3)}} >Store Group</h3>
							</div>
							{/* <div className={`stepper-item  ${activeTab === 4 ? "current" : ""}`} data-kt-stepper-element="nav" style={{'margin': '1rem 3.0rem',cursor: 'pointer'} } >
								<h3 class="stepper-title" onClick={() => {toggleTab(4)}} >Store Groups</h3>
							</div> */}
						</div>
						
						<div class="mx-auto mw-900px w-80 pt-15 pb-10" >

						<TabContent
							activeTab={activeTab}
							className="body"
						>
							<TabPane tabId={1}>
								<AddStoreForm 	Tabdata={onChangeTab} Storedata={onStoreFill} />
							</TabPane>
							<TabPane tabId={2}>
							    <UploadStoreForm Tabdata={onChangeTab} TabPreviousdata={onChangePrevious} Storedata={onStoreFill}/>
							</TabPane>
							<TabPane tabId={3}>
							    <StoreListForm  TabPreviousdata={onChangePrevious} TabStores={stores}/>
							</TabPane>
							{/* <TabPane tabId={4}>
							    <StoreGroupForm TabdataVerticle={onChangeTabVerticle} TabPreviousdata={onChangePrevious}/>
							</TabPane> */}
					    </TabContent>
</div>
					</div>
					
				</CardBody>
			</Card>
			</Col>
			</Row>
			</Container>
			</div>
		</React.Fragment>
	)
}

export default SkuWizard;