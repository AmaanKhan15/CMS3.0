const URL=process.env.REACT_APP_BASE_URL;
// const URL="http://localhost:9001/masters"
export  const getCityList=async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}`+`/customermodule/allCity`,
    {
      method: "GET",
      headers: myHeaders,
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
}
export  const getMerchandiserList=async(city_name,id)=>{
  if(city_name=='' || city_name==undefined){
    city_name='';
  }
  if(id=='' || id==undefined){
    id='';
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    city: city_name, 
    customer_id:id          
  });
  let res = await fetch(
    `${URL}`+`/customermodule/allmerchand`,
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
export  const getStoreGroupList=async(id,custid)=>{
  var m_id=id;
  if(m_id=='' || m_id==undefined){
m_id='';
  }
  if(custid=='' || custid==undefined){
custid='';
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    merchand_id: m_id,           
    customer_id: custid,           
  });
  let res = await fetch(
    `${URL}`+`/customermodule/allStoreGroup`,
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
export  const getStoreList=async(merid,storeid,custid)=>{
  var m_id=merid,s_id=storeid;
  if(m_id=='' || m_id==undefined){
m_id='';
  }
  if(s_id=='' || s_id==undefined){
    s_id='';
  }
  if(custid=='' || custid==undefined){
    custid='';
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    store_group_id: s_id,           
    id: m_id,           
    customer_id: custid,           
  });
  let res = await fetch(
    `${URL}`+`/customermodule/allStore`,
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
export  const getCateoryList=async(storeid,custid)=>{
  var s_id=storeid;
  if(s_id=='' || s_id==undefined){
    s_id='';
  }
  if(custid=='' || custid==undefined){
    custid='';
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    store_id: s_id,                      
    customer_id: custid,                      
  });
  let res = await fetch(
    `${URL}`+`/customermodule/allCategory`,
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
export  const getSKUList=async(cat,custid)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    category: cat,                      
    customer_id: custid,                      
  });
  let res = await fetch(
    `${URL}`+`/customermodule/allSKU`,
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
export  const getDailyMerchandRepo=async(mid,sid,cat,startdate,enddate)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
var merchand=mid;
var store=sid;
var category=cat;
  if(merchand=='' || merchand==undefined){
  merchand='';
  }
  if(store=='' || store==undefined){
  store='';
  }
  
  if(startdate=='' || startdate=='NaN-NaN-NaN'){
    startdate='';
  }
  if(enddate=='' || enddate=='NaN-NaN-NaN'){    
    enddate='';
  }
  if(category=='' || category==undefined){
   category='';
  }
  // if(storegroup!==''){
  //   var BodydataforStor = JSON.stringify({         
  //     store_group_id: storegroup,                      
  //   });
  //   let resStore = await fetch(
  //     `https://cmsapi.connect-mscom.com/auth/masters/customermodule/allStoreIds`,
  //     {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: BodydataforStor
  //     }     
  //   );
  //   let responseStore = await resStore.json();
  //   const StoreResult=responseStore.data;  
  //   console.log("store details are",StoreResult) 
  //   StoreResult.map((item,key)=>{
  //     storeids=item.store_details;
  //     console.log("store details are",storeids)
  //   })   
  // }
  // if(storegroup!=='' && store===''){
  //   finalStores=storeids
  // }
  // if(storegroup==='' && store!==''){
  //   finalStores=store
  // }
  var Bodydata = JSON.stringify({         
    store_id:store,    
    merchand_id:merchand,
    category:category ,
    startdate:startdate,
    enddate:enddate                      
  });
  let res = await fetch(
    `${URL}`+`/customermodule/dailyReport`,
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
export  const LoginReportMerchand=async(mid,sid,startdate,enddate)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
var merchand=mid;
var store=sid;
  if(merchand=='' || merchand==undefined){
  merchand='';
  }
  if(store=='' || store==undefined){
  store='';
  }
  
  if(startdate=='' || startdate=='NaN-NaN-NaN'){
    startdate='';
  }
  if(enddate=='' || enddate=='NaN-NaN-NaN'){    
    enddate='';
  }
  var Bodydata = JSON.stringify({         
    store_id:store,    
    merchand_id:merchand,
    startdate:startdate,
    enddate:enddate                      
  });
  let res = await fetch(
    `${URL}`+`/customermodule/LoginReportMerchand`,
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
export  const LoginReportPromotor=async(mid,sid,startdate,enddate)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
var merchand=mid;
var store=sid;
  if(merchand=='' || merchand==undefined){
  merchand='';
  }
  if(store=='' || store==undefined){
  store='';
  }
  
  if(startdate=='' || startdate=='NaN-NaN-NaN'){
    startdate='';
  }
  if(enddate=='' || enddate=='NaN-NaN-NaN'){    
    enddate='';
  }
  var Bodydata = JSON.stringify({         
    store_id:store,    
    promotor_id:merchand,
    startdate:startdate,
    enddate:enddate                      
  });
  let res = await fetch(
    `${URL}`+`/customermodule/LoginReportPromotor`,
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
export  const getDailyMerchandRepoSKU=async(mid,sid,cat,city,skuid,startdate,enddate)=>{
console.log("in routes",city)
var merchand=mid;
var store=sid;
var category=cat;
var skuId=skuid;
var city=city;

  if(merchand=='' || merchand==undefined){
merchand='';
  }
  if(store=='' || store==undefined){
store='';
  }
  if(category=='' || category==undefined){
category='';
  }
  if(skuId=='' || skuId==undefined){
    skuId='';
  }
  if(city=='' || city==undefined){
    city='';
  }
  if(startdate=='' || startdate=='NaN-NaN-NaN'){
    startdate='';
  }
  if(enddate=='' || enddate=='NaN-NaN-NaN'){    
    enddate='';
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    store_id:store,
    merchand_id:merchand,
    category:category ,
    sku_id:skuId,
    city:city     ,
    startdate:startdate,
    enddate:enddate               
  });
  let res = await fetch(
    `${URL}`+`/customermodule/dailyReportSku`,
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
export  const getUnavialableStock=async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
 
  let res = await fetch(
    `${URL}`+`/customermodule/unavialableStock`,
    {
      method: "GET",
      headers: myHeaders,
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
}
export  const getUnavialableStockWithStore=async(id,city,startdate,enddate)=>{
  if(startdate=='' || startdate=='NaN-NaN-NaN'){
    startdate='';
  }
  if(enddate=='' || enddate=='NaN-NaN-NaN'){    
    enddate='';
  }
  if(city=='' || city==undefined){
    city=''
  }
  if(id=='' || id==undefined){
    id=''
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    store_id:id,
    city:city,
    startdate:startdate,
    enddate:enddate 
                        
  });
  let res = await fetch(
    `${URL}`+`/customermodule/unavialableStockStore`,
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
export  const getDamageStock=async(id,city,startdate,enddate)=>{
  if(startdate=='' || startdate=='NaN-NaN-NaN'){
    startdate='';
  }
  if(enddate=='' || enddate=='NaN-NaN-NaN'){    
    enddate='';
  }
  if(city=='' || city==undefined){
    city=''
  }
  if(id=='' || id==undefined){
    id=''
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
    store_id:id,   
    city:city,
    startdate:startdate,
    enddate:enddate                     
  });
  let res = await fetch(
    `${URL}`+`/customermodule/damageStock`,
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
export  const getNearExpiray=async(id,city,startdate,enddate)=>{
  if(startdate=='' || startdate=='NaN-NaN-NaN'){
    startdate='';
  }
  if(enddate=='' || enddate=='NaN-NaN-NaN'){    
    enddate='';
  }
  if(city=='' || city==undefined){
    city=''
  }
  if(id=='' || id==undefined){
    id=''
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({            
    store_id:id,   
    city:city,
    startdate:startdate,
    enddate:enddate                         
  });
  let res = await fetch(
    `${URL}`+`/customermodule/nearExpiray`,
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