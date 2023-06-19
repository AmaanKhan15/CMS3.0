import React from "react";
import {
	Modal,
} from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"
const CancelModal = (props) => {
	const [openModal,setopenModal]=useState(true);

	return (
        <SweetAlert
        title="Are you sure?"
        warning
        showCancel
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        onConfirm={() => {
          setconfirm_both(false)
          setsuccess_dlg(true)
          setdynamic_title("Deleted")
          setdynamic_description("Your file has been deleted.")
        }}
        onCancel={() => {
          setconfirm_both(false)
          setsuccess_dlg(true)
          setdynamic_title("Cancelled")
          setdynamic_description("Your imaginary file is safe :)")
        }}
      >
        You won't be able to revert this!
      </SweetAlert>

	)
}
export default CancelModal