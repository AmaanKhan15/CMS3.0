const URL = process.env.REACT_APP_LOCAL_URL
// const URL = process.env.REACT_APP_BASE_URL;
export const getMerchandList = async id => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/supervisor`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
export const postSupervisor = async (
  fname,
  mname,
  lname,
  email,
  address,
  area,
  poorf_no,
  city,
  selectedProof,
  selectedGroup,
  contact,
  username,
  password
) => {
  var myHeaders = new Headers()
  console.log(
    "data is",
    fname,
    mname,
    lname,
    email,
    address,
    area,
    poorf_no,
    city,
    selectedProof.value,
    selectedGroup.value,
    contact
  )
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  var Bodydata = JSON.stringify({
    first_name: fname,
    middle_name: mname,
    last_name: lname,
    email: email,
    phone_no: contact,
    city: city,
    gender: selectedGroup.value,
    area: area,
    address: address,
    id_proof: selectedProof.value,
    proof_no: poorf_no,
    username: username,
    password: password,
    created_by: 1,
    updated_by: 1,
  })
  let res = await fetch(`${URL}` + `/supervisor`, {
    method: "post",
    headers: myHeaders,
    body: Bodydata,
  })
  console.log("data is", res)
  let response = await res.json()
  console.log("post data is", response)
  //   const empResult=response.data;
  return response
}
export const updateSupervisor = async (
  fname,
  mname,
  lname,
  email,
  address,
  area,
  poorf_no,
  city,
  selectedProof,
  selectedGroup,
  contact,
  username,
  password,
  id
) => {
  var myHeaders = new Headers()
  console.log(
    "data is",
    fname,
    mname,
    lname,
    email,
    address,
    area,
    poorf_no,
    city,
    selectedProof.value,
    selectedGroup.value,
    contact
  )
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  var Bodydata = JSON.stringify({
    first_name: fname,
    middle_name: mname,
    last_name: lname,
    email: email,
    phone_no: contact,
    city: city,
    gender: selectedGroup.value,
    area: area,
    address: address,
    id_proof: selectedProof.value,
    proof_no: poorf_no,
    username: username,
    password: password,
    created_by: 1,
    updated_by: 1,
  })
  var userUpdate = JSON.stringify({
    username: username,
    password: password,
    email: email,
    user_type: "Supervisor",
    created_by: 1,
    updated_by: 1,
  })
  let result = await fetch(`${URL}` + `/users`, {
    method: "put",
    headers: myHeaders,
    body: userUpdate,
  })
  let res = await fetch(`${URL}` + `/supervisor/` + `${id}`, {
    method: "put",
    headers: myHeaders,
    body: Bodydata,
  })
  console.log("data is", res)
  let response = await res.json()
  console.log("post data is", response)
  //   const empResult=response.data;
  return response
}
export const updateSupervisorById = async (superid, custid) => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  var Bodydata = JSON.stringify({
    customer_id: custid,
    created_by: 1,
    updated_by: 1,
  })
  let res = await fetch(`${URL}` + `/promotorBySupervisorId/` + `${superid}`, {
    method: "put",
    headers: myHeaders,
    body: Bodydata,
  })
  console.log("data is", res)
  let response = await res.json()
  console.log("post data is", response)
  //   const empResult=response.data;
  return response
}
export const updateSupervisorByIdMerchand = async (superid, custid) => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  var Bodydata = JSON.stringify({
    customer_id: custid,
    created_by: 1,
    updated_by: 1,
  })
  let res = await fetch(`${URL}` + `/merchandBySupervisor/` + `${superid}`, {
    method: "put",
    headers: myHeaders,
    body: Bodydata,
  })
  let response = await res.json()
  //   const empResult=response.data;
  return response
}
export const postStorewithoutCustomer = async (
  stname,
  refno,
  contno,
  area,
  address,
  lat,
  long
) => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  var Bodydata = JSON.stringify({
    store_name: stname,
    ref_no: refno,
    contact_no: contno,
    area: area,
    address: address,
    latitude: lat,
    longitude: long,
    created_by: 1,
    updated_by: 1,
  })
  let res = await fetch(`${URL}` + `/supervisor`, {
    method: "post",
    headers: myHeaders,
    body: Bodydata,
  })
  let response = await res.json()
  console.log("response is", response)
  return response
}
export const getStoreListData = async () => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/store`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
export const getStoreGroup = async () => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/Unassignedstore`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
export const DeleteMarchand = async id => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/supervisor/` + `${id}`, {
    method: "DELETE",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
