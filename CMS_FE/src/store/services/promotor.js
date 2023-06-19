const URL = process.env.REACT_APP_LOCAL_URL;
// const URL = process.env.REACT_APP_BASE_URL;
export const getMerchandList = async (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}` + `/promotor` ,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  let response = await res.json();
  const empResult = response.data;
  return empResult;
}
export const getUnAssignedPromotors = async (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}` + `/Unassignedpromotor` ,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  let response = await res.json();
  const empResult = response.data;
  return empResult;
}
export const promotorByUsersup=async(merchandids,id)=>{
  console.log("data is apai is",merchandids,id)
  const merId=[];
  merchandids.map((item,key)=>{
    merId.push({id:item.id,username:item.username})
  })
  console.log("Total ids are",merId)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  merId.map(async(item,key)=>{
  var Bodydata = JSON.stringify({
    username:item.username,
    promotor_id:item.id,
    customer_id:id,
    created_by: 1,
    updated_by: 1
  });
  let res = await fetch(
    `${URL}` + `/promotorByUsersup/`+`${item.id}`,
    {
      method: "put",
      headers: myHeaders,
      body: Bodydata
    }
  );
  let response = await res.json();
  console.log("post data is",response)
//   const empResult=response.data;
})
//   return response;  
//   console.log("data is",res)
 
}

export const getPromotorListByCustsomer = async (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let res = await fetch(
    `${URL}` + `/promotorbyCustomerId/`+`${id}` ,
    {
      
      method: "GET",
      headers: myHeaders,
    }
  );
  let response = await res.json();
  const empResult = response.data;
  return empResult;
}

export const postUpdateStoresPromotor=async(merchanddata,storegroupid)=>{
  console.log("store id is",storegroupid)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  merchanddata.map(async(item,key)=>{
  console.log("store id is",item.id)
  var Bodydata = JSON.stringify({
    store_id:storegroupid,
    created_by: 1,
    updated_by: 1
  });
  let res = await fetch(
    `${URL}` + `/promotorByStoregroup/`+`${item.id}`,
    {
      method: "put",
      headers: myHeaders,
      body: Bodydata
    }
  );
  let response = await res.json();
  console.log("post data is",response)
//   const empResult=response.data;
  return response;  
})
//   console.log("data is",res)
 
}
export const postPromotor = async (fname,mname,lname,email,address,area,poorf_no,city,selectedProof,selectedGroup,contact,username,password) => { 
  var myHeaders = new Headers();
  console.log("data is",fname,mname,lname,email,address,area,poorf_no,city,selectedProof.value,selectedGroup.value,contact,username)
  myHeaders.append("Content-Type", "application/json");
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
    username:username,
    password:password,
    created_by: 1,
    updated_by: 1
  });
  let res = await fetch(
    `${URL}` + `/promotor`,
    {
      method: "post",
      headers: myHeaders,
      body: Bodydata
    }
  );
  console.log("data is",res)
  let response = await res.json();
  console.log("post data is",response)
//   const empResult=response.data;
  return response;  
}
export const updatePromotor = async (fname,mname,lname,email,address,area,poorf_no,city,selectedProof,selectedGroup,contact,username,password,id) => { 
  var myHeaders = new Headers();
  console.log("data is",fname,mname,lname,email,address,area,poorf_no,city,selectedProof.value,selectedGroup.value,contact)
  myHeaders.append("Content-Type", "application/json");
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
    username:username,
    password:password,
    created_by: 1,
    updated_by: 1
  });
  var userUpdate = JSON.stringify({
    username:username,
    password:password,
    email:email,
    user_type: 'Promotor',                      
    created_by:1,
    updated_by: 1
});
let result = await fetch(
  `${URL}` + `/users`,
{
method: "put",
headers: myHeaders,
body: userUpdate
}
);
  let res = await fetch(
    `${URL}` + `/promotor/`+`${id}`,
    {
      method: "put",
      headers: myHeaders,
      body: Bodydata
    }
  );
  console.log("data is",res)
  let response = await res.json();
  console.log("put data is",response)
//   const empResult=response.data;
  return response;  
}
export const postPromotorUpdate=async(promomtor,id)=>{
  console.log("data is apai is",promomtor,id)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  promomtor.map(async(item,key)=>{
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
    username:item.username,
    password:item.password,
    customer_id:id,
    created_by: 1,
    updated_by: 1
  });
  let res = await fetch(
    `${URL}` + `/promotor/`+`${item.id}`,
    {
      method: "put",
      headers: myHeaders,
      body: Bodydata
    }
  );
  let response = await res.json();
  console.log("post data is",response)
//   const empResult=response.data;
  return response;  
})
//   console.log("data is",res)
 
}
export const postStorewithoutCustomer=async(stname,refno,contno,area,address,lat,long)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var Bodydata = JSON.stringify({
    store_name:stname,
    ref_no: refno,
    contact_no: contno,
    area: area,
    address: address,
    latitude: lat,
    longitude: long,
    created_by: 1,
    updated_by: 1
  });
  let res = await fetch(
    `${URL}` + `/store`,
    {
      method: "post",
      headers: myHeaders,
      body: Bodydata
    }
  );
  let response = await res.json();
 console.log("response is",response)
  return response;
}
export const getStoreListData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let res = await fetch(
      `${URL}` + `/store`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    let response = await res.json();
    const empResult = response.data;
    return empResult;


}
export const getStoreGroup = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let res = await fetch(
      `${URL}` + `/Unassignedstore`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    let response = await res.json();
    const empResult = response.data;
    return empResult;


}
export const DeleteMarchand = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let res = await fetch(
      `${URL}` + `/promotor/`+ `${id}`,
      {
        method: "DELETE",
        headers: myHeaders,
      }      
    );
    let response = await res.json();
    const empResult = response.data;
    return empResult;


}
export const removePromotorfromCustomer = async (proid,custid,username) => {
  console.log("data is",proid,custid,username)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var Bodydata = JSON.stringify({
      customer_id: null,
      promotor_id:null,
      store_id:null,
      username:username,
      created_by: 1,
      updated_by: 1
    });
    let res = await fetch(
      `${URL}` + `/removePromotor/`+ `${proid}/` +`${custid}`,
      {
        method: "PUT",
        headers: myHeaders,
        body: Bodydata
      }      
    );
    let response = await res.json();
    // const empResult = response.data;
    return response;


}

