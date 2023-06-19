import React, { Component } from "react";
import ChartistGraph from "react-chartist";

class stackedbarchart extends Component {
  render() {
    var barChartData = {
      labels: ["Vitesse", "Vitesse", "TVS", "TCS", "Zensar", "Vitesse","TVS","Vitesse"],
      series: [
        [15, 12, 3, 2, 4, 2,14,10],        
      ]
    };
    var barChartOptions = {
      stackBars: true,
      
    };
    return (
      <React.Fragment>
        <ChartistGraph
          data={barChartData}
          style={{ height: "600px" }}
          options={barChartOptions}
          type={"Bar"}
        />
      </React.Fragment>
    );
  }
}

export default stackedbarchart;
