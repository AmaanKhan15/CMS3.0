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
import PersonalForm from "./PersonalForm"
import CompanyForm from "./CompanyForm"
import VerfiyForm from "./VerifyDetails"
import AccountForm from "./Accountdetails"
import CompanySetting from "./Settings"
import { postCustomerData } from '../../../../store/services/customer'
import Swal from "sweetalert2";
import { ThreeDots } from 'react-loader-spinner'
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import {useHistory} from 'react-router-dom';

const CompanyWizard = (props) => {
	const [activeTab, setactiveTab] = useState(1);
	const [companydata, setcompanydata] = useState('');
	const [verifydata, setverifydata] = useState('');
	const [productdata, setproductdata] = useState('');
	const [accountdata, setaccountdata] = useState('');
	const [personaldata, setpersonaldata] = useState();
	let [loading, setLoading] = useState(false);
	const history=useHistory();

	const onChangeTab = tabdata => {
		setactiveTab(tabdata);
	};
	const CompanyData = cname => {
		setcompanydata(cname);
	}
	const Personaldata = pname => {
		setpersonaldata(pname)
		console.log("Personal data ia", pname)
	}
	const Verifydata = verify => {
		setverifydata(verify)
	}
	const Productdata = pdata => {
		setproductdata(pdata);
	}
	const Accountdata = async (adata) => {
		setaccountdata(adata);
		setLoading(true)
		let data = await postCustomerData(companydata, personaldata[0], personaldata[1], personaldata[2], personaldata[3], personaldata[4], personaldata[5], verifydata, adata[0], adata[1], productdata[0], productdata[1], productdata[2]);
		if (data.status == 200) {
			setLoading(false);
			Swal.fire({
				icon: 'success',
				title: 'Good job!',
				text: 'Custsomer Added Successfully!',
				confirmButtonColor: '#306060',
			})
			// props.TabdataVerticle(2);
			history.push('/customer-step2')
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: data.message,
				confirmButtonColor: '#306060',
			})
		}
	}

	const onChangePrevious = tabprev => {
		setactiveTab(tabprev);
	}
	// const onChangeTabSubmit = () => {
	// 	props.TabdataVerticle(2);
	// }
	const onChangeSales = salesdata => {
		console.log("In HorizontalWizard main page", salesdata)
		// props.SalesTabData(salesdata);
	}
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs maintitle="Customers" title="Add Customer"  />
					<Row>
						<Col sm="12">
							<Card>
								<CardBody>
									<div class="stepper stepper-links" id="kt_create_account_stepper">
										{/*begin::Nav*/}
										<div class="stepper-nav ">
											{/*begin::Step 1*/}
											<div className={`stepper-item  ${activeTab === 1 ? "current" : ""}`} data-kt-stepper-element="nav" style={{ 'position': 'relative', 'flex-shrink': '0' ,'margin': '1rem 4.0rem' }}>
												<h3 class="stepper-title">Company</h3>
											</div>
											{/*end::Step 1*/}
											{/*begin::Step 2*/}
											<div className={`stepper-item  ${activeTab === 2 ? "current" : ""}`} data-kt-stepper-element="nav"  style={{ 'position': 'relative', 'flex-shrink': '0' ,'margin': '1rem 4.0rem' }}>
												<h3 class="stepper-title">Personal Details</h3>
											</div>
											{/*end::Step 2*/}
											{/*begin::Step 3*/}
											<div className={`stepper-item  ${activeTab === 3 ? "current" : ""}`} data-kt-stepper-element="nav"  style={{ 'position': 'relative', 'flex-shrink': '0' ,'margin': '1rem 4.0rem' }}>
												<h3 class="stepper-title">Verify Details</h3>
											</div>
											{/*end::Step 3*/}
											{/*begin::Step 4*/}
											<div className={`stepper-item  ${activeTab === 4 ? "current" : ""}`} data-kt-stepper-element="nav"  style={{ 'position': 'relative', 'flex-shrink': '0' ,'margin': '1rem 3.0rem' }}>
												<h3 class="stepper-title">Settings</h3>
											</div>
											<div className={`stepper-item  ${activeTab === 5 ? "current" : ""}`} data-kt-stepper-element="nav"  style={{ 'position': 'relative', 'flex-shrink': '0' ,'margin': '1rem 3.0rem' }}>
												<h3 class="stepper-title">Account Details</h3>
											</div>
											{/*end::Step 4*/}

										</div>
										{/*end::Nav*/}
										{/*begin::Form*/}
										{/* <form class="mx-auto mw-600px w-100 pt-15 pb-10" > */}
										{/*begin::Step 1*/}
										{/* <div class="mx-auto mw-600px w-100 pt-15 pb-10" > */}
										<div class="mx-auto mw-900px w-100 pt-15 pb-10" >

											{loading ? (
												<div
												  className="pagination" style={{
												    position: 'relative ',
												    marginTop: '10%'
												  }}>
												<ThreeDots color="#306060" height={80} width={80} />
												</div>
											) :
												<TabContent
													activeTab={activeTab}
													className="body"
												>
													<TabPane tabId={1}>
														<CompanyForm Tabdata={onChangeTab} CompanyName={CompanyData} />
													</TabPane>
													<TabPane tabId={2}>

														<PersonalForm Tabdata={onChangeTab} TabPreviousdata={onChangePrevious} Personal={Personaldata} />

													</TabPane>
													<TabPane tabId={3}>
														<VerfiyForm Tabdata={onChangeTab} TabPreviousdata={onChangePrevious} Verify={Verifydata} />
													</TabPane>

													<TabPane tabId={4}>
													{/* SalesType={onChangeSales} */}
														<CompanySetting Tabdata={onChangeTab}  ProductType={Productdata} TabPreviousdata={onChangePrevious} />
													</TabPane>
													<TabPane tabId={5}>
														<AccountForm TabPreviousdata={onChangePrevious} Account={Accountdata} />
													</TabPane>
												</TabContent>
											}
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

export default CompanyWizard;