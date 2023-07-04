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
import { makeStyles } from '@material-ui/core/styles';
// import { Switch } from '@material-ui/core';
import Switch from "react-switch"

const useStyles = makeStyles((theme) => ({
    switch_track: {
        backgroundColor: "#C0C0C0",
    },
    switch_base: {
        color: "#C0C0C0",
        "&.Mui-disabled": {
            color: "#e886a9"
        },
        "&.Mui-checked": {
            color: "#306060"
        },
        "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#306060",
        }
    },
    switch_primary: {
        "&.Mui-checked": {
            color: "#306060",
        },
        "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#306060",
        },
    },
}));


const SettingsForm = (props) => {
    const [fnm, setfnm] = useState(false)
    const [checkedShelf, setCheckedShelf] = useState(false);
    const [checkedRef, setCheckedRef] = useState(false);
    const [checkedFloor, setCheckedFloor] = useState(false);
    const [checkedMerchand, setCheckedMerchand] = useState(false);
    const [checkedPromotor, setCheckedPromotor] = useState(false);
    const [checkedSales, setCheckedSales] = useState([]);
    const [checkedProduct, setcheckedProduct] = useState([]);
    const classes = useStyles();

   
    const switchHandlerMerchand = () => {
        setCheckedMerchand(!checkedMerchand);
        setCheckedPromotor(false)
        checkedSales.push('Merchand')
    };
    const switchHandlerPromotor = () => {
        setCheckedPromotor(!checkedPromotor);
        setCheckedMerchand(false)
        checkedSales.push('Promotor')
    };

    function handleSubmit(e) {
        e.preventDefault()

        setfnm(document.getElementById("validationTooltip01").value);


        var d1 = document.getElementsByName("validate")

        document.getElementById("tooltipForm").classList.add("was-validated")

        for (var i = 0; i < d1.length; i++) {
            d1[i].style.display = "block"
        }
        if (document.getElementById("validationTooltip01").value != "") {
            props.Tabdata(5);
            checkedProduct.push(checkedFloor)
            checkedProduct.push(checkedRef)
            checkedProduct.push(checkedShelf)
            props.ProductType(checkedProduct)
            // props.SalesType(checkedSales);
        }
    }

    //for change tooltip display propery
    function changeHandeler(event, eleId) {
        if (event.target.value !== "")
            document.getElementById(eleId).style.display = "none"
        else document.getElementById(eleId).style.display = "block"
    }
    function changePreviousTab() {
        props.TabPreviousdata(3);
    }
    const Offsymbol = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2
                }}
            >
                {" "}
                No
            </div>
        )
    }

    const OnSymbol = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2
                }}
            >
                {" "}
                Yes
            </div>
        )
    }

    return (
        <Form
            class="mx-auto mw-600px w-100 pt-15 pb-10 needs-validation"
            method="post"
            id="tooltipForm"
            onSubmit={e => {
                handleSubmit(e)
            }}>
            <div className="actions clearfix">
                <Row>
                    <Col lg="6">
                        <div className="col mb-6 ">
                            <h4 class="fw-bolder text-dark required">Product Type</h4>&nbsp;
                            <div className="col-md-4 fv-col">
                                <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span >Shelf </span>
                                </label>
                                <div className="mb-3 position-relative">
                                    {/* <Switch
                                    classes={{
                                        track: classes.switch_track,
                                        switchBase: classes.switch_base,
                                        colorPrimary: classes.switch_primary,
                                    }}
                                    color={!checkedShelf ? "primary" : "default"}
                                    checked={checkedShelf}
                                    onChange={switchHandlerShelf}
                                    id="shelfTooltip"
                                /> */}
                                    <Switch
                                        uncheckedIcon={<Offsymbol />}
                                        checkedIcon={<OnSymbol />}
                                        onColor="#306060"
                                        onChange={() => {
                                            setCheckedShelf(!checkedShelf)
                                        }}
                                        checked={checkedShelf}
                                    />                                   
                            </div>
                                &nbsp;
                                {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
                            </div>
                            <div className="col-md-4 fv-col">
                                <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span >Refrigerator</span>
                                </label>
                                <div className="mb-3 position-relative">
                                    <Switch
                                        uncheckedIcon={<Offsymbol />}
                                        checkedIcon={<OnSymbol />}
                                        onColor="#306060"
                                        onChange={() => {
                                            setCheckedRef(!checkedRef)
                                        }}
                                        checked={checkedRef}
                                    />
                                </div>&nbsp;
                                {/* <input type="text" class="form-control form-control-lg " placeholder="First Name" name="first-name" /> */}
                            </div>
                            <div className="col-md-4 fv-col">
                                <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span >Floor</span>
                                </label>
                                <div className="mb-3 position-relative">

                                    <Switch
                                        uncheckedIcon={<Offsymbol />}
                                        checkedIcon={<OnSymbol />}
                                        onColor="#306060"
                                        onChange={() => {
                                            setCheckedFloor(!checkedFloor)
                                        }}
                                        checked={checkedFloor}
                                    />
                                </div>&nbsp;
                            </div>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="col mb-6 ">
                            <h4 class="fw-bolder text-dark required">Sales Type</h4>&nbsp;
                            <div className="col-md-4 fv-col">
                                <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span >Promotor</span>
                                </label>
                                <div className="mb-3 position-relative">

                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    onColor="#306060"
                                    onChange={switchHandlerPromotor}
                                    checked={checkedPromotor}
                                />
                                
                            </div>
                            &nbsp; 
                            </div>
                            <div className="col-md-4 fv-col">
                                <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                                    <span >Merchand</span>
                                </label>
                                <div className="mb-3 position-relative">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    onColor="#306060"
                                    onChange={switchHandlerMerchand}
                                    checked={checkedMerchand}
                                />                                
                            </div>
                            &nbsp;
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="actions clearfix">
                <Row>
                    <Col md={3}>
                        <button
                            type="button"
                            class="btn btn-lg btn-light-primary me-3"
                            onClick={() => {
                                changePreviousTab()
                            }}
                        >
                            <span class="svg-icon svg-icon-3 me-1">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="6" y="11" width="13" height="2" rx="1" fill="white" />
                                    <path d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z" fill="white" />
                                </svg>
                            </span>
                            Back
                        </button>

                    </Col>
                    <Col md={6}></Col>
                    <Col md={3}>
                        <button
                            type="submit"
                            class="btn btn-lg btn-primary"
                        >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="white" />
                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="white" />
                            </svg>

                        </button>
                    </Col>
                </Row>
            </div>
        </Form>
    )
}
export default SettingsForm;