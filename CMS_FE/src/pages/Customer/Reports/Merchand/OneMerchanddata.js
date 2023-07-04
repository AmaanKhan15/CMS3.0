import React, { Component } from "react";
import ChartistGraph from "react-chartist";

class stackedbarchart extends Component {
    
  render() {
    var barChartData = {
      labels: props.storesdata,
      series: [
        totalAmt
        
      ]
    };
    var barChartOptions = {
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return value / 1000 + "k";
        }
      }
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
