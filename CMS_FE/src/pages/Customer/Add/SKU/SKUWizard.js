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
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import AddSkuForm from "./AddSku"
import UploadSkuForm from "./UploadSku"
import UploadSkuStoreForm from "./storeList"
const SkuWizard = (props) => {
	const [activeTab, setactiveTab] = useState(1)
	function toggleTab(tab) {
		if (activeTab !== tab) {
			if (tab >= 1 && tab <= 4) {
			  setactiveTab(tab)
			}
		}
	}

	const onChangePrevious = tabprev => {
		setactiveTab(tabprev);
	}
	const onChangeTab = (Tabactive) => {
		setactiveTab(Tabactive)
	}
	const onChangeTabVerticle = (TabdataVerticle) => {
		props.TabdataVerticle(TabdataVerticle);
	}
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs maintitle="Customers" title="Add SKU"  />
					<Row>
						<Col sm="12">
							<Card>
								<CardBody>
									<div class="stepper stepper-links" id="kt_create_account_stepper">
										{/*begin::Nav*/}
										<div class="stepper-nav ">
											{/*begin::Step 1*/}
											<div className={`stepper-item  ${activeTab === 1 ? "current" : ""}`} data-kt-stepper-element="nav" style={{ 'position': 'relative', 'flex-shrink': '0', 'margin': '1rem 12.0rem', cursor: 'pointer', }}>
												<h3 class="stepper-title" onClick={() => { toggleTab(1) }}>Add SKU</h3>
											</div>
											<div className={`stepper-item  ${activeTab === 2 ? "current" : ""}`} data-kt-stepper-element="nav" style={{ 'position': 'relative', 'flex-shrink': '0', 'margin': '1rem 12.0rem', cursor: 'pointer' }} >
												<h3 class="stepper-title" onClick={() => {toggleTab(2)}} >Upload SKU</h3>
											</div>
											{/* <div className={`stepper-item  ${activeTab === 3 ? "current" : ""}`} data-kt-stepper-element="nav" style={{ 'position': 'relative', 'flex-shrink': '0', 'margin': '1rem 8.0rem', cursor: 'pointer' }} >
												<h3 class="stepper-title" onClick={() => {toggleTab(3)}} >Upload SKU's Store</h3>
											</div> */}
										</div>

										<div class="mx-auto mw-900px w-100 pt-15 pb-10" >

											<TabContent
												activeTab={activeTab}
												className="body"
											>
												<TabPane tabId={1}>
													<AddSkuForm  Tabactive={onChangeTab}/>
												</TabPane>
												{/* TabdataVerticle={onChangeTabVerticle} */}
												<TabPane tabId={2}>
													<UploadSkuForm  TabPreviousdata={onChangePrevious} />
												</TabPane>
												{/* <TabPane tabId={3}>
													<UploadSkuStoreForm  TabPreviousdata={onChangePrevious} />
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