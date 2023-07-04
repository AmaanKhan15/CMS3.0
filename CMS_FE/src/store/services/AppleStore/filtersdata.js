// const URL='http://localhost:9001/auth';
// const URL="http://localhost:9001/masters"
const URL=process.env.REACT_APP_BASE_URL;

export  const getAllRegions=async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}`+`/applecustomer/allRegions`,
    {
      method: "GET",
      headers: myHeaders,
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
}
export  const getAllMacProduct=async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}`+`/applecustomer/allProductMac`,
    {
      method: "GET",
      headers: myHeaders,
    }     
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
}

export  const getAllMacComparison=async()=>{
  const data = JSON.parse(localStorage.getItem('authUser'))

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
       
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/MacReportQuater`,     
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAlliPhoneComparison=async()=>{
  const data = JSON.parse(localStorage.getItem('authUser'))

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
       
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/iPhoneReportQuater`,     
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAlliPadComparison=async()=>{
  const data = JSON.parse(localStorage.getItem('authUser'))

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
       
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/iPadReportQuater`,     
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllAirPodsComparison=async()=>{
  const data = JSON.parse(localStorage.getItem('authUser'))

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
       
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/AirPodReportQuater`,     
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAlliPodComparison=async()=>{
  const data = JSON.parse(localStorage.getItem('authUser'))

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
       
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/iPodReportQuater`,     
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllAppleWatchComparison=async()=>{
  const data = JSON.parse(localStorage.getItem('authUser'))

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
       
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/AppleWatchReportQuater`,     
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllAppleCareComparison=async()=>{
  const data = JSON.parse(localStorage.getItem('authUser'))

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
       
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/AppleCareReportQuater`,     
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllAccessoriesComparison=async()=>{
  const data = JSON.parse(localStorage.getItem('authUser'))

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({         
       
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/AccessoriesReportQuater`,     
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllMacSeries=async(month,year,area)=>{
  const data = JSON.parse(localStorage.getItem('authUser'))
console.log("customer id is",data.customer_id)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var aread=area, yeard=year,monthd=month;
  if(aread=='' ){
    aread='';
  }
  if(yeard=='' ){
    yeard='';
  }
  if(monthd=='' ){
    monthd='';
  }
  var Bodydata = JSON.stringify({         
    area: aread,           
    year: yeard,           
    month: monthd,     
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/MacReportWeekly`,
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAlliPhoneSeries=async(month,year,area)=>{
  const data = JSON.parse(localStorage.getItem('authUser'))
console.log("customer id is",data.customer_id)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var aread=area, yeard=year,monthd=month;
  if(aread=='' ){
    aread='';
  }
  if(yeard=='' ){
    yeard='';
  }
  if(monthd=='' ){
    monthd='';
  }
  var Bodydata = JSON.stringify({         
    area: aread,           
    year: yeard,           
    month: monthd,     
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/iPhoneReportWeekly`,
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllIpadSeries=async(month,year,area)=>{
  const data = JSON.parse(localStorage.getItem('authUser'))
console.log("customer id is",data.customer_id)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var aread=area, yeard=year,monthd=month;
  if(aread=='' ){
    aread='';
  }
  if(yeard=='' ){
    yeard='';
  }
  if(monthd=='' ){
    monthd='';
  }
  var Bodydata = JSON.stringify({         
    area: aread,           
    year: yeard,           
    month: monthd,     
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/iPadReportWeekly`,
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllAirPodsSeries=async(month,year,area)=>{
  const data = JSON.parse(localStorage.getItem('authUser'))
console.log("customer id is",data.customer_id)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var aread=area, yeard=year,monthd=month;
  if(aread=='' ){
    aread='';
  }
  if(yeard=='' ){
    yeard='';
  }
  if(monthd=='' ){
    monthd='';
  }
  var Bodydata = JSON.stringify({         
    area: aread,           
    year: yeard,           
    month: monthd,     
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/AirPodReportWeekly`,
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllAppleTVSeries=async(month,year,area)=>{
  const data = JSON.parse(localStorage.getItem('authUser'))
console.log("customer id is",data.customer_id)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var aread=area, yeard=year,monthd=month;
  if(aread=='' ){
    aread='';
  }
  if(yeard=='' ){
    yeard='';
  }
  if(monthd=='' ){
    monthd='';
  }
  var Bodydata = JSON.stringify({         
    area: aread,           
    year: yeard,           
    month: monthd,     
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/AppleTvReportWeekly`,
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllAppleCareSeries=async(month,year,area)=>{
  const data = JSON.parse(localStorage.getItem('authUser'))
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var aread=area, yeard=year,monthd=month;
  if(aread=='' ){
    aread='';
  }
  if(yeard=='' ){
    yeard='';
  }
  if(monthd=='' ){
    monthd='';
  }
  var Bodydata = JSON.stringify({         
    area: aread,           
    year: yeard,           
    month: monthd,     
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/AppleCareReportWeekly`,
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAlliPodSeries=async(month,year,area)=>{
  const data = JSON.parse(localStorage.getItem('authUser'))
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var aread=area, yeard=year,monthd=month;
  if(aread=='' ){
    aread='';
  }
  if(yeard=='' ){
    yeard='';
  }
  if(monthd=='' ){
    monthd='';
  }
  var Bodydata = JSON.stringify({         
    area: aread,           
    year: yeard,           
    month: monthd,     
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/iPodReportWeekly`,
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllAppleWatchSeries=async(month,year,area)=>{
  const data = JSON.parse(localStorage.getItem('authUser'))
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var aread=area, yeard=year,monthd=month;
  if(aread=='' ){
    aread='';
  }
  if(yeard=='' ){
    yeard='';
  }
  if(monthd=='' ){
    monthd='';
  }
  var Bodydata = JSON.stringify({         
    area: aread,           
    year: yeard,           
    month: monthd,     
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/AppleWatchReportWeekly`,
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}
export  const getAllAccessoriesSeries=async(month,year,area)=>{
  const data = JSON.parse(localStorage.getItem('authUser'))
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var aread=area, yeard=year,monthd=month;
  if(aread=='' ){
    aread='';
  }
  if(yeard=='' ){
    yeard='';
  }
  if(monthd=='' ){
    monthd='';
  }
  var Bodydata = JSON.stringify({         
    area: aread,           
    year: yeard,           
    month: monthd,     
    customer_id :data.customer_id,           
  });
  let res = await fetch(
    `${URL}`+`/applecustomer/AccessoriesReportWeekly`,
    {
      method: "POST",
      headers: myHeaders,
      body:Bodydata
    }     
  );
  let response = await res.json();
  const empResult=response.Series;
  return empResult;
}