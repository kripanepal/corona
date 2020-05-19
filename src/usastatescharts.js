import React, { useEffect, useState } from "react";
import "./App.css";
import "./charts.css";
import Spinner from "react-bootstrap/Spinner";
import "./charts.css";

import {
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Area,
  AreaChart,
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function USACharts(props) {
  const [loading, setLoading] = useState(true);
  const [currentGraph] = useState(props.name);

  const [test, setTest] = useState([]);
  const [graphType, setGraphType] = useState("Line");

  var lastDate;

  useEffect(() => {
    fetch(
      `https://corona.lmao.ninja/v2/nyt/states`,
      { headers: { accept: "Accept: application/json" } }
    )
      .then((res) => res.json())
      .then((data) => {
        setTest(data);

        setLoading(false);
      });

    // eslint-disable-next-line
  }, []);

  function testing(needed) {
    var testAgain = test.filter((e) => {
      //console.log(currentGraph+" "+(e["state"])+"="+(e["state"]===currentGraph))

      if (e["state"] === currentGraph) {
        lastDate = e["date"];
       
      }
      return e["state"] === currentGraph;
    });
    return testAgain;
  }

  function showFoot() {
    let fixed = (
      <span className="graphMessage">Graph last updated on : {lastDate}</span>
    );

    return fixed;
  }

  function returnLines(type) {
    var temp;
    var color = "red";
    if(type==='cases')
    {
      color = 'blue'
    }
    function what() {
      if (graphType === "Line") {
        return Line;
      }

      if (graphType === "Bar") {
        return Bar;
      }

      if (graphType === "Area") {
        return Area;
      }

      if (graphType === "AreaLineComposed") {
        return;
      }
    }

    var TestGraph = what();

    temp = (
      <TestGraph
        dataKey={type}
        stroke={color}
        fill={color}
        dot={false}
      />
    );

    return temp;
  }


  function renderLineChart() {
    var width;
    function what() {
      if (graphType === "Line") {
        return LineChart;
      }

      if (graphType === "Bar") {
        return BarChart;
      }
      if (graphType === "Area") {
        return AreaChart;
      }
      if (graphType === "Pie") {
        return PieChart;
      }
      if (graphType === "AreaLineComposed") {
        return ComposedChart;
      }
    }

    var TestGraph = what();
    if (props.from === "small") {
      width = "120%";
    }
    var data = testing();

    return (
      <div className="graphs">
        <div>
          {" "}
          <ResponsiveContainer width={width} height={400}>
            <TestGraph data={data} syncId="anyId">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              syncId="anyId"
              {returnLines("cases")}
            </TestGraph>
          </ResponsiveContainer>
          {showFoot()}
        </div>
        <div>
          {" "}
          <ResponsiveContainer width={width} height={400}>
            <TestGraph data={data} syncId="anyId">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              {returnLines("deaths")}
            </TestGraph>
          </ResponsiveContainer>
          {showFoot()}
        </div>
      </div>
    );
  }

  function displayGraphMenu() {
    function handleChange(e) {
      setGraphType(e.target.value);
    }

    var dropdown0 = (
      <>
        <select onChange={handleChange}>
          <option value={"Line"}> Line</option>
          <option value={"Bar"}> Bar</option>
          <option value={"Area"}> Area</option>

          {/* <option value={"Composed"}> Composed</option> */}
        </select>
      </>
    );

    return <form>Graph type: {dropdown0}</form>;
  }

  return loading ? (
    <div className="spinners">
      {" "}
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
    </div>
  ) : (
    <div className="chartsNew">
      {displayGraphMenu()}
      {renderLineChart()}
    </div>
  );
}

export default USACharts;
