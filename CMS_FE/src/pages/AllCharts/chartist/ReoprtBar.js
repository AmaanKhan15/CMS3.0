import React, { Component } from "react";
import ChartistGraph from "react-chartist";

class stackedbarchart extends Component {
  render() {
    var barChartData = {
      labels: ["Promotor 1", "Promotor 2", "Promotor 3", "Promotor 4", "Promotor 5", "Promotor 6","Promotor 7","Promotor 8","Promotor 9"],
      series: [
        [80, 40, 20, 90, 50, 100,60,70,10],
        // [200000, 400000, 500000, 300000, 452000, 500000],
        // [160000, 290000, 410000, 600000, 588000, 410000]
      ]
    };
    var barChartOptions = {
      stackBars: true,
      // axisY: {
      //   labelInterpolationFnc: function(value) {
      //     return value / 1000 + "k";
      //   }
      // }
    };
    return (
      <React.Fragment>
        <ChartistGraph
          data={barChartData}
          style={{ height: "900px" }}
          options={barChartOptions}
          type={"Bar"}
        />
      </React.Fragment>
    );
  }
}

export default stackedbarchart;
