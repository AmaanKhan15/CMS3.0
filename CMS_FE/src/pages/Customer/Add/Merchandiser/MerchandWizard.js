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

import AssignMerchand from "./AssignMerchand"
import AssignStores from "./AssignStore"
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

const SkuWizard = (props) => {
	const [activeTab, setactiveTab] = useState(1)
	const [assignedStore, setAssignedStore] = useState([])
	function toggleTab(tab) {
		if (activeTab !== tab) {
			if (tab >= 1 && tab <= 2) {
				setactiveTab(tab)
			}
		}
	}

	const onChangePrevious = tabprev => {
		setactiveTab(tabprev);
	}
	const onChangeTabVerticle = (TabdataVerticle) => {
		props.TabdataVerticle(TabdataVerticle);
	}
	const onChangeTab = (Tabdata) => {
		setactiveTab(Tabdata);
	}
	const onChangeStore = (Tabdata) => {
		setAssignedStore(Tabdata);
	}
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs maintitle="Customers" title="Add Merchandiser" />
					<Row>
						<Col sm="12">
							<Card>
								<CardBody>
									<div class="stepper stepper-links" id="kt_create_account_stepper">
										{/*begin::Nav*/}
										<div class="stepper-nav ">
											{/*begin::Step 1*/}
											<div className={`stepper-item  ${activeTab === 1 ? "current" : ""}`} data-kt-stepper-element="nav" style={{ 'position': 'relative', 'flex-shrink': '0' ,cursor: 'pointer'}}>
												<h3 class="stepper-title" onClick={() => {toggleTab(1)}}>Assign Customer & Stores</h3>
											</div>
											{/* <div className={`stepper-item  ${activeTab === 2 ? "current" : ""}`} data-kt-stepper-element="nav" style={{ 'position': 'relative', 'flex-shrink': '0', 'margin': '1rem 12.0rem' ,cursor: 'pointer'}} >
												<h3 class="stepper-title" onClick={() => {toggleTab(2)}} >Assign Stores</h3>
											</div> */}
										</div>

										<div class="mx-auto mw-900px w-100 pt-15 pb-10" >

											<TabContent
												activeTab={activeTab}
												className="body"
											>
												<TabPane tabId={1}>
													<AssignMerchand Tabdata={onChangeTab} AssignedMerchand={onChangeStore} />
												</TabPane>
												{/* <TabPane tabId={2}>
													<AssignStores TabdataVerticle={onChangeTabVerticle} TabPreviousdata={onChangePrevious} AssignedStoreTab={assignedStore} />
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