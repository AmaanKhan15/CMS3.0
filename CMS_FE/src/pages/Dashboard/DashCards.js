const URL = process.env.REACT_APP_LOCAL_URL
import React, { useEffect, useState } from "react"
import image1 from "../../assets/images/avatars/029-boy-11.svg"
import { Progress } from "reactstrap"
const Cards = props => {
  const [trenddata, settrenddata] = useState([])
  useEffect(async () => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Cache-Control", "no-cache")
    let res = await fetch(`${URL}` + `/trendingPromotor`, {
      method: "get",
      headers: myHeaders,
    })
    let response = await res.json()
    console.log("post data is", response)
    const empResult = response.data
    settrenddata(empResult)
  }, [])
  return (
    <React.Fragment>
      <div class="row g-5 g-xl-8">
        {trenddata.map((item, key) => {
          return (
            <div class="col-xl-6">
              <div class="card card-xl-stretch mb-xl-8 btn-rounded">
                <div class="card-body d-flex align-items-center pt-3 pb-0">
                  <img src={image1} alt="" class="align-self-center h-100px" />
                  <div class="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                    <a
                      href="#"
                      class="fw-bolder text-dark fs-4 mb-2 text-hover-primary"
                    >
                      {item.first_name + " " + item.last_name}
                    </a>
                    <span class="fw-bold text-muted fs-5 mb-2">
                      {item.customer_detail == null
                        ? ""
                        : item.customer_detail["company_name"]}
                    </span>
                    <div class="d-flex justify-content-between w-100 mt-auto mb-2">
                      <span class="fw-bold fs-6 text-gray-400">
                        Target Completed
                      </span>
                      <span class="fw-bolder fs-6">40%</span>
                    </div>
                    <div className="mb-30">
                      <Progress color="primary" value={50} />
                      <span class="fw-bold fs-6 text-600">
                        {item.store_detail == null
                          ? ""
                          : item.store_detail["store_name"]}
                      </span>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}
export default Cards
