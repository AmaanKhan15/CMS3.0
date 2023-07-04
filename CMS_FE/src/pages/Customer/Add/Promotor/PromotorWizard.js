import React, { useState } from "react";
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
} from "reactstrap";
import AssignPromotor from "./AssignPromotor";
import AssignStores from "./AssignStore";
import { getPromotorListByCustsomer } from "../../../../store/services/promotor"
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

const PromotorWizard = (props) => {
	const [activeTab, setactiveTab] = useState(1)
	const [storeData, setstoreData] = useState([])
	function toggleTab(tab) {
		if (activeTab !== tab) {
			if (tab >= 1 && tab <= 2) {
				setactiveTab(tab)
			}
		}
	}
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
	const onChangePrevious = tabprev => {
		setactiveTab(tabprev);
	}
	const onChangeTabVerticle = (TabdataVerticle) => {
		props.TabdataVerticle(TabdataVerticle);
	}
	const onChangeTab = (Tabdata) => {
		setactiveTab(Tabdata);
	}
	const onStoreChange = async (Tabdata) => {
		let promotor = await getPromotorListByCustsomer(Tabdata)
		console.log("promotor data is", promotor)
		setstoreData(promotor);
	}
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs maintitle="Customers" title="Assign Promotor" />
					<Row>
						<Col sm="12">
							<Card>
								<CardBody>
									<div class="stepper stepper-links" id="kt_create_account_stepper">
										{/*begin::Nav*/}
										<div class="stepper-nav ">
											{/*begin::Step 1*/}
											<div className={`stepper-item  ${activeTab === 1 ? "current" : ""}`} data-kt-stepper-element="nav" style={{ 'position': 'relative', 'flex-shrink': '0' }}>
												<h3 class="stepper-title" >Assign Promotor</h3>
											</div>
											{/* <div className={`stepper-item  ${activeTab === 2 ? "current" : ""}`} data-kt-stepper-element="nav" style={{ 'position': 'relative', 'flex-shrink': '0', 'margin': '1rem 6.0rem' }} >
												<h3 class="stepper-title"  >Assign Stores</h3>
											</div> */}
										</div>

										<div class="mx-auto mw-900px w-100 pt-15 pb-10" >

											<TabContent
												activeTab={activeTab}
												className="body"
											>
												<TabPane tabId={1}>
													<AssignPromotor Tabdata={onChangeTab} AssignedStore={onStoreChange} />
												</TabPane>
												{/* <TabPane tabId={2}>
													<AssignStores TabdataVerticle={onChangeTabVerticle} TabPreviousdata={onChangePrevious} AssignedStoreTab={storeData} />
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

export default PromotorWizard;