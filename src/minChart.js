import React, { useEffect, useState } from "react";
import "./App.css";
import "./charts.css";
import Header from "./header";
import USAStates from "./usastates";

import Spinner from "react-bootstrap/Spinner";
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

function Charts(props) {
  const [loading, setLoading] = useState(true);

  const [numDays, setNumdays] = useState(30);

  const [graphType, setGraphType] = useState("Line");
  const [test, setTest] = useState([]);

  var lastDate;
  var search = decodeURI(window.location.pathname.split("/").pop());

  useEffect(() => {
    var toFetch = `https://disease.sh/v2/historical/${search}?lastdays=${numDays}`;
    if (window.location.pathname.includes("state")) {
      console.log(props.name);
      toFetch = `https://disease.sh/v2/historical/usacounties/${search}`;
    }
    fetch(toFetch)
      .then((res) => res.json())
      .then((data) => {
        if (window.location.pathname.includes("state")) {
          var here = data;
          var temp = here.filter((each) => {
              var a = (props.name)+""
              var b = (each.county)+""
 
            return (a.toUpperCase()===b.toUpperCase());
          });
          console.log(temp);
          setTest(temp);
        } else {
          setTest(data);
        }

        setLoading(false);
      });

    // eslint-disable-next-line
  }, [numDays]);

  function testing(needed) {
    var casesArray = [];

    var first = "true";

    var historyData = { ...test.timeline };
    if (window.location.pathname.includes("state")) {
      historyData = test[0].timeline;
    }

    var dates = Object.keys(historyData.cases);
    var cases = Object.values(historyData.cases);
    var deaths = Object.values(historyData.deaths);
    if (!window.location.pathname.includes("state")) {
      var recovered = Object.values(historyData.recovered);
    }

    for (var i = 0; i < dates.length; i++) {
      if (casesArray.length < cases.length) {
        casesArray.push({});
      }
    }

    for (var i = 0; i < dates.length; i++) {
      if (first) {
        var n = dates[i].lastIndexOf("/");
        casesArray[i]["date"] = dates[i].substring(0, n);
        lastDate = dates[i];
      }

      casesArray[i]["confirmed"] = cases[i];
      casesArray[i]["deaths"] = deaths[i];
      if (!window.location.pathname.includes("state")) {
        casesArray[i]["recovered"] = recovered[i];
      }
    }
    first = false;

    return casesArray;
  }

  function showFoot() {
    let fixed = (
      <div>
        <div className="graphMessage">Graph last updated on : {lastDate}</div>
      </div>
    );

    return fixed;
  }

  function returnLines(str) {
    var temp;
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
        dataKey={str}
        stroke={stringToColour(str)}
        fill={stringToColour(str)}
        dot={false}
      />
    );

    return temp;
  }

  var stringToColour = function (str) {
    if (str === "confirmed") {
      return "blue";
    }
    if (str === "deaths") {
      return "red";
    }
    if (str === "recovered") {
      return "green";
    }
  };

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

    var current = testing("confirmed");
    var toShow;
    if (window.location.pathname.includes("state")) {
      toShow = props.name;
    }

    return (
      <div className="graphs">
        <br />
        <ResponsiveContainer width={width} height={400}>
          <TestGraph data={current}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            {returnLines("confirmed")}
            {returnLines("deaths")}
            {returnLines("recovered")}
          </TestGraph>
        </ResponsiveContainer>
        <div className="graphMessage">
          <h4>{toShow}</h4>
        </div>

        {showFoot()}
      </div>
    );
  }

  function changeDays(event) {
    setNumdays(event.target.value);
  }

  function isFrom() {
    if (!window.location.pathname.includes("state")) {
      return (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="number"
              min="0"
              max="200"
              placeholder={"30 days"}
              style={{ width: 72 }}
              onChange={changeDays}
            />{" "}
            {displayGraphMenu()}
          </form>
        </>
      );
    }

    return displayGraphMenu();
  }

  function displayGraphMenu() {
    function handleChange(e) {
      setGraphType(e.target.value);
    }

    var dropdown0 = (
      <>
        <select onChange={handleChange}>
          <option value={"Line"} checked>
            {" "}
            Graph type
          </option>
          <option value={"Line"}> Line</option>
          <option value={"Bar"}> Bar</option>
          <option value={"Area"}> Area</option>

          {/* <option value={"Composed"}> Composed</option> */}
        </select>
        <br />
      </>
    );

    return <>{dropdown0} </>;
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
  ) : search === "USA" ? (
    <>
      <Header type="USA" />
      <USAStates />
      <div className="chartsNew">
        {isFrom()}
        {renderLineChart()}
      </div>
    </>
  ) : (
    <div className="chartsNew">
      <Header type={search} />

      {isFrom()}

      {renderLineChart()}
    </div>
  );
}

export default Charts;
