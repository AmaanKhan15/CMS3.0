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
export const getFilterReport = async (custid, storid, skuid, promoid) => {
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
  let res = await fetch(`${URL}` + `/merchandmodule/merchandReport`, {
    method: "POST",
    headers: myHeaders,
    body: Bodydata,
  })
  let response = await res.json()
  const empResult = response.data
  console.log("report data is", empResult)
  return empResult
}
