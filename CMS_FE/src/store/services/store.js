const URL = process.env.REACT_APP_LOCAL_URL
// const URL = process.env.REACT_APP_BASE_URL;
export const getStoreList = async id => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/storesbycustomer/` + `${id}`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
// export const getStoreids = async (id) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");  myHeaders.append("Cache-Control", "no-cache");;
//   let res = await fetch(
//     `${URL}` + `/storesidsbycustomer/` + `${id}`,
//     {
//       method: "GET",
//       headers: myHeaders,
//     }
//   );
//   let response = await res.json();
//   const empResult = response.data;
//   return empResult;
// }
// export const getSKUList = async (id) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");  myHeaders.append("Cache-Control", "no-cache");;
//   let res = await fetch(
//     `${URL}` + `/skubycustomer/` + `${id}`,
//     {
//       method: "GET",
//       headers: myHeaders,
//     }
//   );
//   let response = await res.json();
//   const empResult = response.data;
//   return empResult;
// }
export const getAllStoreList = async id => {
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
export const postStoreData = async (
  stname,
  refno,
  contno,
  area,
  address,
  lat,
  long,
  customerId,
  city
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
    city: city,
    customer_id: customerId,
    created_by: 1,
    updated_by: 1,
  })
  let res = await fetch(`${URL}` + `/store`, {
    method: "post",
    headers: myHeaders,
    body: Bodydata,
  })
  //   let resp = JSON.stringify(res);
  //   let response = JSON.parse(resp);

  let response = await res.json()
  const empResult = response.data
  return empResult
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

  return response
}
export const updateStore = async (
  stname,
  contno,
  refno,
  address,
  area,
  lat,
  long,
  id
) => {
  console.log("store id is", id)
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
  let res = await fetch(`${URL}` + `/store/` + `${id}`, {
    method: "put",
    headers: myHeaders,
    body: Bodydata,
  })
  let response = await res.json()
  console.log("response from stores update is", response)
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
export const getUnAssignedStores = async id => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/storesbycustomer/` + `${id}`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  console.log("all Unassigned Stores are", empResult)
  return empResult
}
export const DeleteStore = async id => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/store/` + `${id}`, {
    method: "DELETE",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
export const postStoreGroup = async (store_detail, storegroup, custid) => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  var Bodydata = JSON.stringify({
    store_details: store_detail,
    store_group_name: storegroup,
    customer_id: custid,
    created_by: 1,
  })
  let res = await fetch(`${URL}` + `/storeGroup`, {
    method: "post",
    headers: myHeaders,
    body: Bodydata,
  })
  let response = await res.json()
  console.log("Response data is", response)
  return response
}
export const postStoreUpdate = async (promomtor, id) => {
  console.log("data is apai is", promomtor, id)
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  promomtor.map(async (item, key) => {
    var Bodydata = JSON.stringify({
      store_name: item.store_name,
      ref_no: store_name,
      contact_no: store_name,
      area: store_name,
      address: store_name,
      latitude: store_name,
      longitude: store_name,
      customer_id: id,
      created_by: 1,
      updated_by: 1,
    })
    let res = await fetch(`${URL}` + `/store/` + `${item.id}`, {
      method: "put",
      headers: myHeaders,
      body: Bodydata,
    })
    let response = await res.json()
    console.log("post data is", response)
    //   const empResult=response.data;
    return response
  })
}

export const removeStoresfromCustomer = async proid => {
  console.log("data is", proid)
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  var Bodydata = JSON.stringify({
    customer_id: null,
    created_by: 1,
    updated_by: 1,
  })
  let res = await fetch(`${URL}` + `/removeStore/` + `${proid}`, {
    method: "PUT",
    headers: myHeaders,
    body: Bodydata,
  })
  let response = await res.json()
  // const empResult = response.data;
  return response
}
export const getStoreGroup = async () => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/storeGroup`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
