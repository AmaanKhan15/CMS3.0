import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert"
const SuccessModal = (props) => {
    const [openModal, setopenModal] = useState(props.isOpen);
    const HandleModal = () => {
        setopenModal(false);
        props.TabOpen(false);
        // props.NextTab(4);
    }
    return (
        <SweetAlert
            title="Good job!"
            success
            // showCancel
            confirmBtnBsStyle="success"
            cancelBtnBsStyle="danger"
            onConfirm={() => {
                HandleModal()
            }}

        >
            {props.message} Added Successfully!
        </SweetAlert>

    )
}
export default SuccessModal