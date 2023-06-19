import React, { useState } from "react"
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

import AddStoreForm from "./AddMerchand";
import UploadStoreForm from "./UploadMerchand";
import StoreListForm from "./CustomerList";
import StoreGroupForm from "./StoreList";
const SkuWizard = (props) => {
	const [activeTab, setactiveTab] = useState(1)
    function toggleTab(tab) {
        if (activeTab !== tab) {
          if (tab >= 1 && tab <= 4) {
            setactiveTab(tab)
          }
        }
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
					<div class="stepper stepper-links" id="kt_create_account_stepper">
						{/*begin::Nav*/}
						<div class="stepper-nav ">
							{/*begin::Step 1*/}
							<div className={`stepper-item  ${activeTab === 1 ? "current" : ""}`} data-kt-stepper-element="nav" style={{'margin': '1rem 12.0rem',cursor: 'pointer'} }>
								<h3 class="stepper-title" onClick={() => {toggleTab(1) }}>Add Merchandiser</h3>
							</div>
							<div className={`stepper-item  ${activeTab === 2 ? "current" : ""}`} data-kt-stepper-element="nav" style={{'margin': '1rem 12.0rem',cursor: 'pointer'} } >
								<h3 class="stepper-title" onClick={() => {toggleTab(2)}} >Upload Merchandiser</h3>
							</div>
							{/* <div className={`stepper-item  ${activeTab === 3 ? "current" : ""}`} data-kt-stepper-element="nav" style={{'margin': '1rem 4.0rem',cursor: 'pointer'} } >
								<h3 class="stepper-title" onClick={() => {toggleTab(3)}} >Add Customer</h3>
							</div>
							<div className={`stepper-item  ${activeTab === 4 ? "current" : ""}`} data-kt-stepper-element="nav" style={{'margin': '1rem 4.0rem',cursor: 'pointer'} } >
								<h3 class="stepper-title" onClick={() => {toggleTab(4)}} >Add Stores</h3>
							</div> */}
						</div>
						
						<div class="mx-auto mw-900px w-100 pt-15 pb-10" >

						<TabContent
							activeTab={activeTab}
							className="body"
						>
							<TabPane tabId={1}>
								<AddStoreForm 	Tabdata={onChangeTab}/>
							</TabPane>
							<TabPane tabId={2}>
							    <UploadStoreForm Tabdata={onChangeTab} TabPreviousdata={onChangePrevious}/>
							</TabPane>
							{/* <TabPane tabId={3}>
							    <StoreListForm Tabdata={onChangeTab} TabPreviousdata={onChangePrevious}/>
							</TabPane>
							<TabPane tabId={4}>
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