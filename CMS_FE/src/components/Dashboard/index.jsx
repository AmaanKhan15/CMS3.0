import React, { useState, useEffect } from "react"
import "./home.style.css"
import PromoterPng from "./images/promoter.png"
import MerchendiserPng from "./images/merchendiser.png"
import StorePng from "./images/store.png"
import CustomerPng from "./images/customer.png"
import { useHistory } from "react-router-dom"
import { ResponsiveBar } from "@nivo/bar"

const URL = process.env.REACT_APP_LOCAL_URL

const initialCardData = [
  {
    id: 4,
    name: "Customers",
    img: CustomerPng,
    bg: "#732C67",
    border: "#CC45B6",
    color: "#CC45B6",
    count: "--",
  },
  {
    id: 3,
    name: "Stores",
    img: StorePng,
    bg: "#2FBC57",
    border: "#4CE176",
    color: "#01581A",
    count: "--",
  },
  {
    id: 2,
    name: "Merchandiser",
    img: MerchendiserPng,
    bg: "#0E7697",
    border: "#1688AC",
    color: "#77C8E1",
    count: "--",
  },
  {
    id: 1,
    name: "Promoters",
    img: PromoterPng,
    bg: "#F2BF3D",
    border: "#B3C200",
    color: "#71790F",
    count: "--",
  },
]
const dummyhelperCardData = [
  {
    id: 1,
    link1: "customer",
    count1: "--",
    link2: "store",
    count2: "--",
    year: "--",
  },
  {
    id: 2,
    link1: "promotor",
    count1: "--",
    link2: "merchandiser",
    count2: "--",
    year: "--",
  },
]

const Home = () => {
  const history = useHistory()
  const [cardData, setCardData] = useState(initialCardData)
  const [helperCardData, setHelperCardData] = useState([...dummyhelperCardData])
  const [lists, setLists] = useState({})
  const fetchData = async () => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Cache-Control", "no-cache")
    let res = await fetch(`${URL}/dashboardReport`, {
      method: "get",
      headers: myHeaders,
    })
    let response = await res.json()
    console.log("dashboard data is", response)
    const { data } = response
    setHelperCardData([
      {
        id: 1,
        link1: "customer",
        count1: data.customers.total_by_current_year,
        link2: "store",
        count2: data.stores.total_by_current_year,
        year: new Date().getFullYear(),
      },
      {
        id: 2,
        link1: "promotor",
        count1: data.promoters.total_by_current_year,
        name1: "promoters",
        link2: "merchandiser",
        count2: data.merchands.total_by_current_year,
        year: new Date().getFullYear(),
      },
    ])

    setCardData([
      {
        id: 4,
        name: "Customers",
        img: CustomerPng,
        bg: "#732C67",
        border: "#CC45B6",
        color: "#CC45B6",
        count: data.customers.total,
      },
      {
        id: 3,
        name: "Stores",
        img: StorePng,
        bg: "#2FBC57",
        border: "#4CE176",
        color: "#01581A",
        count: data.stores.total,
      },
      {
        id: 2,
        link: "merchand",
        name: "Merchandisers",
        img: MerchendiserPng,
        bg: "#0E7697",
        border: "#1688AC",
        color: "#77C8E1",
        count: data.merchands.total,
      },
      {
        id: 1,
        link: "promotor",
        name: "Promoters",
        img: PromoterPng,
        bg: "#F2BF3D",
        border: "#B3C200",
        color: "#71790F",
        count: data.promoters.total,
      },
    ])
    let res1 = await fetch(`trendingRecords`, {
      method: "get",
      headers: myHeaders,
    })
    let response1 = await res1.json()
    // setApidata(response)
    console.log({ response1 })
    setLists(response1.data)
  }
  useEffect(async () => {
    history.location.pathname == "/dashboard" && fetchData()
  }, [])

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to Connect Market Dashboard</p>
      </div>
      <div className="m-card-wrapper">
        {cardData.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      <div className="graph-wrapper">
        <MyResponsiveBar data={data} />
      </div>
      <div className="helper-m-card-wrapper">
        {helperCardData.map(hc => (
          <HelperCard key={hc.id} {...hc} />
        ))}
      </div>
      <div className="trending-wrapper">
        {console.log({ lists_m: lists?.Top_Merchand })}
        <TrendingList name="Mechaniders" list={lists?.Top_Merchand || []} />
        <TrendingList name="Promoters" list={lists?.Top_Promotor || []} />
      </div>
    </section>
  )
}

const Card = ({ bg, border, color, name, img, count = 0, link: _link }) => {
  const history = useHistory()

  const link = _link || name.slice(0, -1).toLowerCase()
  return (
    <div
      className="m-card"
      style={{
        backgroundColor: bg,
        borderColor: border,
      }}
    >
      <div className="m-card-details">
        <img src={img} alt="" />
        <div className="m-card-info">
          <h3>{count}</h3>
          <p style={{ color }}>{name}</p>
        </div>
      </div>
      <div className="m-card-actions">
        {/* todo : navigate on buttons */}
        <div className="c-btn" onClick={() => history.push(link + "-list")}>
          See All
        </div>
        <div className="c-btn" onClick={() => history.push(link + "-add")}>
          Add New +
        </div>
      </div>
    </div>
  )
}

const HelperCard = ({ link1 = "", link2 = "", count1, count2, year }) => {
  const history = useHistory()

  return (
    <div className="helper-m-card">
      <p>
        {link1} arrised by {count1} count in current year ({year})
      </p>
      <p>
        {link2} arrised by {count2} count in current year ({year})
      </p>
      <br />
      {/* <p>We have {count1} {link1}s and {count2} {link2}s.</p> */}
      <br />

      <div className="m-card-actions">
        {/* todo : navigate on buttons */}
        <div className="c-btn" onClick={() => history.push(link1 + "-list")}>
          See {link1}s
        </div>
        <div className="c-btn" onClick={() => history.push(link2 + "-list")}>
          See {link2}s
        </div>
      </div>
    </div>
  )
}

const TrendingList = ({ name, list = [] }) => (
  <div className="trending-list-wrapper">
    {console.log({ list })}
    <h2>Trending {name}</h2>
    <div className="trending-list">
      {/* todo : map list here */}
      {list.map((li, index) => (
        <div className="trending-list-item" key={index}>
          <div className="t-avatar"></div>
          <div className="t-info">
            <p className="t-name">
              {li.first_name} <span>| {li.city}</span>{" "}
            </p>
            <p className="t-al">Target Completed 80%</p>
            <progress id="file" value="32" max="100">
              {" "}
              32%{" "}
            </progress>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
  {
    country: "AD",
    "hot dog": 189,
    "hot dogColor": "hsl(111, 70%, 50%)",
    burger: 180,
    burgerColor: "hsl(236, 70%, 50%)",
    sandwich: 3,
    sandwichColor: "hsl(156, 70%, 50%)",
    kebab: 121,
    kebabColor: "hsl(258, 70%, 50%)",
    fries: 129,
    friesColor: "hsl(347, 70%, 50%)",
    donut: 188,
    donutColor: "hsl(206, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 46,
    "hot dogColor": "hsl(317, 70%, 50%)",
    burger: 173,
    burgerColor: "hsl(342, 70%, 50%)",
    sandwich: 23,
    sandwichColor: "hsl(168, 70%, 50%)",
    kebab: 166,
    kebabColor: "hsl(251, 70%, 50%)",
    fries: 77,
    friesColor: "hsl(128, 70%, 50%)",
    donut: 108,
    donutColor: "hsl(47, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 53,
    "hot dogColor": "hsl(354, 70%, 50%)",
    burger: 109,
    burgerColor: "hsl(20, 70%, 50%)",
    sandwich: 28,
    sandwichColor: "hsl(60, 70%, 50%)",
    kebab: 199,
    kebabColor: "hsl(139, 70%, 50%)",
    fries: 162,
    friesColor: "hsl(30, 70%, 50%)",
    donut: 15,
    donutColor: "hsl(104, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 129,
    "hot dogColor": "hsl(127, 70%, 50%)",
    burger: 75,
    burgerColor: "hsl(287, 70%, 50%)",
    sandwich: 127,
    sandwichColor: "hsl(332, 70%, 50%)",
    kebab: 76,
    kebabColor: "hsl(240, 70%, 50%)",
    fries: 37,
    friesColor: "hsl(223, 70%, 50%)",
    donut: 55,
    donutColor: "hsl(122, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 0,
    "hot dogColor": "hsl(99, 70%, 50%)",
    burger: 85,
    burgerColor: "hsl(75, 70%, 50%)",
    sandwich: 35,
    sandwichColor: "hsl(45, 70%, 50%)",
    kebab: 150,
    kebabColor: "hsl(172, 70%, 50%)",
    fries: 71,
    friesColor: "hsl(190, 70%, 50%)",
    donut: 51,
    donutColor: "hsl(322, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 10,
    "hot dogColor": "hsl(21, 70%, 50%)",
    burger: 91,
    burgerColor: "hsl(178, 70%, 50%)",
    sandwich: 120,
    sandwichColor: "hsl(319, 70%, 50%)",
    kebab: 79,
    kebabColor: "hsl(235, 70%, 50%)",
    fries: 34,
    friesColor: "hsl(139, 70%, 50%)",
    donut: 167,
    donutColor: "hsl(318, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 166,
    "hot dogColor": "hsl(183, 70%, 50%)",
    burger: 156,
    burgerColor: "hsl(183, 70%, 50%)",
    sandwich: 181,
    sandwichColor: "hsl(223, 70%, 50%)",
    kebab: 42,
    kebabColor: "hsl(112, 70%, 50%)",
    fries: 143,
    friesColor: "hsl(300, 70%, 50%)",
    donut: 100,
    donutColor: "hsl(54, 70%, 50%)",
  },
]
const MyResponsiveBar = (
  {
    /* see data tab */
  }
) => (
  <ResponsiveBar
    data={data}
    keys={["donut"]}
    indexBy="country"
    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
    padding={0.65}
    groupMode="grouped"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    borderRadius={5}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Stores",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Customer",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    role="application"
    ariaLabel="Nivo bar chart"
    barAriaLabel={function (e) {
      return e.id + ": " + e.formattedValue + " in country: " + e.indexValue
    }}
  />
)

export default Home
