import React, { useState } from "react"
import {
	Card,
	CardBody,
	TabContent,
	TabPane,
	Container,
	Row,
	Col,
	
} from "reactstrap"
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import Supervisorcards from "./Supervisorcards";
const SkuWizard = (props) => {
	const [activeTab, setactiveTab] = useState(1)
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});

	const onChangeTabVerticle = (TabdataVerticle) => {
		props.TabdataVerticle(TabdataVerticle);
	}
	// console.log("supervisor data is",props.SelectedPerson)
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs maintitle="Customers" title="Add Customer" />
					<Row>
						<Col sm="12">
							<Card>
								<CardBody>
									<div class="stepper stepper-links" id="kt_create_account_stepper">
										{/* <div class="pb-10 pb-lg-15"> */}
										<h2 class="fw-bolder text-dark">Assign Supervisor</h2>
										{/* </div> */}

										<div class="mx-auto mw-900px w-100 pt-15 pb-10" >

											<TabContent
												activeTab={activeTab}
												className="body"
											>
												<TabPane tabId={1}>
													<Supervisorcards TabdataVerticle={onChangeTabVerticle} TabPersonsDetail={props.SelectedPerson} />
												</TabPane>

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