
const URL=process.env.REACT_APP_LOCAL_URL;
// const URL=process.env.REACT_APP_BASE_URL;
export  const getCustomerList=async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}`+`/customerList`,
    {
      method: "GET",
      headers: myHeaders,
    } 
    
  );
  let response = await res.json();
  const empResult=response.List_Customer;
  return empResult;
  }
export  const getCustomer=async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}`+`/customer`,
    {
      method: "GET",
      headers: myHeaders,
    } 
    
  );
  let response = await res.json();
  const empResult=response.data;
  return empResult;
  }
export const postCustomerData=async(cname,fname,lname,email,pno,city,ads,uname,pass,idp,self,ref,floor)=>{
  console.log("post data is",cname,fname,lname,email,pno,city,ads,uname,pass,idp,self,ref,floor)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");  
  var Bodydata= JSON.stringify({
    company_name: cname,
    first_name: fname,
    last_name:lname,
    email: email,
    phone_no:pno,
    city: city,
    address: ads,
    username: pass,
    password:idp,
   id_proof:uname,
    is_shelf:self ,
    is_floor: floor,
    is_refreg: ref,
    created_by: 1,
    updated_by: 1
  })
  let res = await fetch(
    `${URL}`+`/customer`,
    {
      method: "post",
      headers: myHeaders,
      body:Bodydata
    } 
  );

  let response = await res.json();
  const empResult=response.data;
   return response;


}
export  const getProductByTitleApi=async(id)=>{

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
   
    let res = await fetch(
      `${URL}`+`/product/`+`${id}`,
      {
        method: "get",
        headers: myHeaders,
      } 
    );
    let response = await res.json();
    const empResult=response.data;
    console.log("INAPIN SERVICE",empResult)
     return empResult;
}
export  const getCustomerDetails=async(id)=>{

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
   
    let res = await fetch(
      `${URL}`+`/customer/`+`${id}`,
      {
        method: "get",
        headers: myHeaders,
      } 
    );
    let response = await res.json();
    const empResult=response.data;
    console.log("INAPIN SERVICE",empResult)
     return empResult;
}


    export const latestcustomerId=async()=>{
      var myHeaders = new Headers();
      let custId;
      myHeaders.append("Content-Type", "application/json");
     
      let res = await fetch(
        `${URL}`+`/latestcustomer`,
        {
          method: "get",
          headers: myHeaders,
        } 
      );
      let response = await res.json();
      const empResult=response.data;
      console.log("INAPIN SERVICE",empResult)
      empResult.map((item,key)=>{
        custId=item.id;
      })
       return custId;
    }