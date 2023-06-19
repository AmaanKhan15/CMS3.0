// const URL='http://localhost:9001/masters';
const URL=process.env.REACT_APP_BASE_URL;
export  const getCityList=async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}`+`/city`,
    {
      method: "GET",
      headers: myHeaders,
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
  }
export  const getCategoryCitySales=async(id)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    customer_id: id,           
  });
  let res = await fetch(
    `${URL}`+`/customermodule/citysalescategory`,
    {
      method: "POST",
      headers: myHeaders,
      body: Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
  }
export  const getProductCitySales=async(id)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    customer_id: id,           
  });
  let res = await fetch(
    `${URL}`+`/customermodule/citysalesproduct`,
    {
      method: "POST",
      headers: myHeaders,
      body: Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
  }
export  const getSKUCitySales=async(id)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    customer_id: id,           
  });
  let res = await fetch(
    `${URL}`+`/customermodule/citysalessku`,
    {
      method: "POST",
      headers: myHeaders,
      body: Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
  }
export  const getCitySalesUnit=async(id,skuid)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    customer_id: id,
    sku_id: skuid         
  });
  let res = await fetch(
    `${URL}`+`/customermodule/citysalesUnit`,
    {
      method: "POST",
      headers: myHeaders,
      body: Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
  }
