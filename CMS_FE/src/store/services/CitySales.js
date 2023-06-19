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
export  const getStoreByCustomer=async(id)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}`+`/customermodule/storeByCustomer/`+`${id}`,
    {
      method: "GET",
      headers: myHeaders,
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
  }
export  const getAllStore=async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}`+`/customermodule/allStores`,
    {
      method: "GET",
      headers: myHeaders,
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
  }
export  const getAllPromotor=async(id)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}`+`/customermodule/allpromotor`,
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
export  const getProductCitySales=async(id,categ)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    customer_id: id, 
    category: categ         
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
export  const getSKUCitySales=async(id,proname)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    customer_id: id, 
    product_name: proname        
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
export  const getPromotorSalesQty=async(id,skuid,proid)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    sku_id: skuid ,
    promotor_id:proid       
  });
  let res = await fetch(
    `${URL}`+`/customermodule/promotorSalesQty`,
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
export  const getPromotorSalesAmt=async(id,skuid,proid)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    sku_id: skuid ,
    promotor_id:proid       
  });
  let res = await fetch(
    `${URL}`+`/customermodule/promotorSalesAmt`,
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
export  const getPromCompare=async(id,skuid,selectedPromo)=>{
  const porid=[];
  selectedPromo.map((item)=>{
    porid.push(item.value)
  })
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    customer_id: id,
    sku_id: skuid ,
    promotor_id:porid     
  });
  let res = await fetch(
    `${URL}`+`/customermodule/promoComapare`,
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
export  const getPromComparewithoutCust=async(skuid,selectedPromo)=>{
  const porid=[];
  selectedPromo.map((item)=>{
    porid.push(item.value)
  })
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    sku_id: skuid ,
    promotor_id:porid     
  });
  let res = await fetch(
    `${URL}`+`/customermodule/promoComaparewithoutCust`,
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
export  const getStoreCompare=async(id,skuid,selectedPromo)=>{
  const porid=[];
  selectedPromo.map((item)=>{
    console.log("Store id is",item.value)
    console.log("Store id is",item)
    porid.push(item.value)
  })
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    customer_id:id,
    sku_id: skuid,
    store_id:porid     
  });
  let res = await fetch(
    `${URL}`+`/customermodule/storeComapare`,
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
export  const getStoreCompareWithoutCustomer=async(skuid,selectedPromo)=>{
  const porid=[];
  selectedPromo.map((item)=>{
    porid.push(item.value)
  })
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    sku_id: skuid,
    store_id:porid     
  });
  let res = await fetch(
    `${URL}`+`/customermodule/storeComparewithoutcust`,
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
export  const getPromWeekly=async(id,skuid,selectedPromo)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    customer_id:id,
    sku_id: skuid,
    promotor_id:selectedPromo     
  });
  let res = await fetch(
    `${URL}`+`/customermodule/promotorWeekly`,
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
