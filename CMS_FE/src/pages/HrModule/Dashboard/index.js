const URL = process.env.REACT_APP_LOCAL_URL;
import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import { ThreeDots } from 'react-loader-spinner'
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardTitle
} from "reactstrap"
import { Link } from "react-router-dom"
import "chartist/dist/scss/chartist.scss";
//i18n
import { withTranslation } from "react-i18next"
import RegionData from "./regionData";
const Dashboard = props => {
	const [menu, setMenu] = useState(false)
	const toggle = () => {
		setMenu(!menu)
	}
	const [apidata, setApidata] = useState([])
	const [promoCount, setpromoCount] = useState('')
	const [merchandCount, setmerchandCount] = useState('')
	const [Loading, setLoading] = useState(false)
	const data = JSON.parse(localStorage.getItem('authUser'))

	useEffect(async () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 5000);
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");		
		let regonapi = await fetch(
			`${URL}`+`/hrdetails/promotor`,
			{
				method: "get",
				headers: myHeaders,						
			}
		);
		let merchandapi = await fetch(
			`${URL}`+`/hrdetails/Merchandiser`,
			{
				method: "get",
				headers: myHeaders,						
			}
		);
		let alldata = await regonapi.json();
		let merchand = await merchandapi.json();
		let records=alldata.data;
		let merrecords=merchand.data;
		setpromoCount(records.length)
		setmerchandCount(merrecords.length)
	   	console.log("promotors count is",records.length)
				
	}, [])
	return (
		<React.Fragment>
			<div className="page-content">
				<MetaTags >
					<title>Dashboard | Connect Market Services</title>
				</MetaTags>
				{Loading && promoCount && merchandCount ? (<Container fluid>
					<div
						className="pagination" style={{
							position: 'relative ',
							marginTop: '20%'
						}}>
						<ThreeDots color="#306060" height={80} width={80} />
					</div>

				</Container>) : (
					<Container fluid>
						<div className="page-title-box">
							<Row className="align-items-center">
								<Col md={8}>
									<h6 className="page-title">Dashboard</h6>
									<ol className="breadcrumb m-0">
										<li className="breadcrumb-item ">Welcome to Connect Market Dashboard</li>
									</ol>
								</Col>
							</Row>
						</div>
						<Row >
							<Col xl={4} md={6}>
								<div className="card card-xxl-stretch mb-5 mb-xl-8 btn-rounded" style={{ "backgroundColor": "#FFF3B5" }}>
									<div className="card-body d-flex flex-column">
										{/* <div className="d-flex flex-column mb-7">
													<a href="#" className="text-dark  fw-bolder fs-3">Promotor</a>
												</div>												  */}
										<div className="d-flex flex-row mb-7">
											<div className="col-9">
												<Link to="/hradmin/promoter" className="text-dark  fw-bolder fs-3">Promotor </Link>
											</div>
											<div className="col-3">
											<Link to="/hradmin/promoter" className="text-dark  fw-bolder fs-3"> {promoCount}</Link>
											</div>

										</div>										
									</div>
								</div>
							</Col>
							<Col xl={4} md={6}>
								<div className="card card-xxl-stretch mb-5 mb-xl-8 btn-rounded" style={{ "backgroundColor": "#FFB2B2" }}>
									<div className="card-body d-flex flex-column">
										{/* <div className="d-flex flex-column mb-7">
													<a href="#" className="text-dark  fw-bolder fs-3">Merchandiser</a>													 
												</div>												  */}
										<div className="d-flex flex-row mb-7">
											<div className="col-9">
											<Link to="/hradmin/merchandiser" className="text-dark  fw-bolder fs-3">Merchandiser</Link>
											</div>
											<div className="col-3">
											<Link to="/hradmin/merchandiser" className="text-dark  fw-bolder fs-3"> {merchandCount}</Link>
											</div>

										</div>

										
										{/*end::Row */}
									</div>
								</div>
							</Col>
							
						</Row>
						
					</Container>)}
			</div>
		</React.Fragment>
	)
}

Dashboard.propTypes = {
	t: PropTypes.any
}

export default withTranslation()(Dashboard)
