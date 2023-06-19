const URL = process.env.REACT_APP_LOCAL_URL;
export const getSKUList=async(custId,stoId)=>{
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({
      customer_id:custId,
      store_id:stoId
   });
  let res = await fetch(
    `${URL}` + `/skuSelected`,
    {
      method: "post",
      headers: myHeaders,
      body: Bodydata
    }
  );
  console.log("data is",res)
  let response = await res.json();
  const empResult=response.data;
  console.log("data is",empResult)
  return empResult;
}
export const LatestStoresByCustomer=async(CustId)=>{
  var myHeaders = new Headers();
  // let custId;
  // myHeaders.append("Content-Type", "application/json");
 
  // let res = await fetch(
  //   `${URL}`+`/latestcustomer`,
  //   {
  //     method: "get",
  //     headers: myHeaders,
  //   } 
  // );
  // let response = await res.json();
  // const empResult=response.data;
  // empResult.map((item,key)=>{
  //   custId=item.id;
  // })
  let storeres = await fetch(
    `${URL}`+`/storesbycustomer/`+`${CustId}`,
    {
      method: "get",
      headers: myHeaders,
    } 
  );
  let responseStore = await storeres.json();
  const storedata=responseStore.data; 
  var storeids=[];
  storedata.map((item,key)=>{
    storeids.push(item.id)
  })
  return storeids.join(",")

}