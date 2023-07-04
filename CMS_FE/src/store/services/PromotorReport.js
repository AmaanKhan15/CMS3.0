const URL = process.env.REACT_APP_LOCAL_URL
// const URL = process.env.REACT_APP_BASE_URL;
export const getCustomerList = async id => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/customerList`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.List_Customer
  return empResult
}
export const getPromotorByCustomerId = async id => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/promotorbyCustomerId/` + `${id}`, {
    method: "GET",
    headers: myHeaders,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
export const getSalesunitReport = async id => {
  var myHeaders = new Headers()
  var Bodydata = JSON.stringify({
    promotor_id: id,
  })
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  let res = await fetch(`${URL}` + `/customermodule/salesUnit`, {
    method: "POST",
    headers: myHeaders,
    body: Bodydata,
  })
  let response = await res.json()
  const empResult = response.data
  return empResult
}
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
//custid for this api
export const getFilterReport = async (
  storid,
  skuid,
  promoid,
  startdate,
  enddate,
  custid
) => {
  if (storid == "" || storid == undefined) {
    storid = ""
  }
  if (skuid == "" || skuid == undefined) {
    skuid = ""
  }
  if (promoid == "" || promoid == undefined) {
    promoid = ""
  }
  if (custid == "" || custid == undefined) {
    custid = ""
  }
  if (startdate == "" || startdate == "NaN-NaN-NaN") {
    startdate = ""
  }
  if (enddate == "" || enddate == "NaN-NaN-NaN") {
    enddate = ""
  }
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  var Bodydata = JSON.stringify({
    customer_id: custid,
    store_id: storid,
    sku_id: skuid,
    promotor_id: promoid,
    startdate: startdate,
    enddate: enddate,
  })
  let res = await fetch(`${URL}` + `/customermodule/promotorReport`, {
    method: "POST",
    headers: myHeaders,
    body: Bodydata,
  })
  let response = await res.json()
  const empResult = response.data
  console.log("report data is", empResult)
  return empResult
}
export const getFilterReportWithoutCustomer = async (
  custid,
  storid,
  skuid,
  promoid
) => {
  console.log("id's are ", custid, storid, skuid, promoid)
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Cache-Control", "no-cache")
  var Bodydata = JSON.stringify({
    customer_id: custid,
    store_id: storid,
    sku_id: skuid,
    promotor_id: promoid,
  })
  let res = await fetch(`${URL}` + `/customermodule/promotorReport`, {
    method: "POST",
    headers: myHeaders,
    body: Bodydata,
  })
  let response = await res.json()
  const empResult = response.data
  console.log("report data is", empResult)
  return empResult
}
