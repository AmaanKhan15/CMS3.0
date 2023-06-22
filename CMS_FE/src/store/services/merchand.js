const URL = process.env.REACT_APP_LOCAL_URL
// const URL = process.env.REACT_APP_BASE_URL;
export const getMerchandList = async id => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/merchand`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
export const getMerchandListByCustsomer = async id => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/merchandbycustomer/` + `${id}`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
export const postMerchandiser = async (
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
    selectedProof,
    selectedGroup,
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
  let res = await fetch(`${URL}` + `/merchand`, {
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
export const updateMerchandiser = async (
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
  merchid
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
    contact,
    username,
    password,
    merchid
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
    user_type: "Merchandiser",
    created_by: 1,
    updated_by: 1,
  })
  let result = await fetch(`${URL}` + `/users`, {
    method: "put",
    headers: myHeaders,
    body: userUpdate,
  })
  let res = await fetch(`${URL}` + `/merchand/` + `${merchid}`, {
    method: "put",
    headers: myHeaders,
    body: Bodydata,
  })
  let response = await res.json()
  let responseuser = await result.json()
  // console.log("post data is",response)
  console.log("post data is", responseuser)
  //  const empResult=response.data;
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
  let res = await fetch(`${URL}` + `/store`, {
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
  let res = await fetch(`${URL}` + `/merchand/` + `${id}`, {
    method: "DELETE",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
export const postMerchandUpdate = async (promomtor, id) => {
  console.log("data is apai is", promomtor, id)
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  promomtor.map(async (item, key) => {
    var Bodydata = JSON.stringify({
      first_name: item.first_name,
      middle_name: item.middle_name,
      last_name: item.last_name,
      email: item.email,
      phone_no: item.phone_no,
      city: item.city,
      gender: item.gender,
      area: item.area,
      address: item.address,
      id_proof: item.id_proof,
      proof_no: item.proof_no,
      username: item.username,
      password: item.password,
      customer_id: id,
      created_by: 1,
      updated_by: 1,
    })
    let res = await fetch(`${URL}` + `/merchand/` + `${item.id}`, {
      method: "put",
      headers: myHeaders,
      body: Bodydata,
    })
    let response = await res.json()
    console.log("post data is", response)
    //   const empResult=response.data;
    return response
  })
  //   console.log("data is",res)
}
export const postUpdateStoresMerchand = async (
  merchanddata,
  storegroupid,
  custid
) => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  merchanddata.map(async (item, key) => {
    var Bodydata = JSON.stringify({
      store_group_id: storegroupid,
      customer_id: custid,
      created_by: 1,
      updated_by: 1,
    })
    let res = await fetch(`${URL}` + `/merchandByStoregroup/` + `${item.id}`, {
      method: "put",
      headers: myHeaders,
      body: Bodydata,
    })
    let response = await res.json()
    console.log("post data is", response)
    //   const empResult=response.data;
    return response
  })
  //   console.log("data is",res)
}
export const merchandByUsersup = async (merchandids, id) => {
  console.log("data is apai is", merchandids, id)
  const merId = []
  merchandids.map((item, key) => {
    merId.push({ id: item.id, username: item.username })
  })
  console.log("Total ids are", merId)
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  merId.map(async (item, key) => {
    var Bodydata = JSON.stringify({
      username: item.username,
      merchand_id: item.id,
      customer_id: id,
      created_by: 1,
      updated_by: 1,
    })
    let res = await fetch(`${URL}` + `/merchandByUsersup/` + `${item.id}`, {
      method: "put",
      headers: myHeaders,
      body: Bodydata,
    })
    let response = await res.json()
    console.log("post data is", response)
    //   const empResult=response.data;
  })
  //   return response;
  //   console.log("data is",res)
}
export const UpdateStoresforMerchandiser = async () => {}
export const getUnAssignedMerchandiser = async id => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/Unassignedmerchand`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
