import React, { useEffect, useState } from "react";
import "./App.css";
import "./charts.css";
import Spinner from "react-bootstrap/Spinner";
import "./charts.css";
import Select from "react-select";

import {
  LineChart,
  Bar,
  BarChart,
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
  const [currentType, setCurrenType] = useState("confirmed");
  const [showAll, setShowAll] = useState(false);
  const [numDays, setNumdays] = useState(30);
  
  const [log, setLog] = useState(<YAxis />);


  const [countryList, setCountryList] = useState(["USA"]);

  const [test, setTest] = useState([]);
  const [graphType, setGraphType] = useState("Line");

  var lastDate;

  useEffect(() => {
    fetch(`https://corona.lmao.ninja/v2/historical?lastdays=${numDays}`, {
      headers: { accept: "Accept: application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTest(data);
        console.log("aaaaaaa");
        setLoading(false);
        if (props.from === "small") {
          setCountryList([props.name]);
        }
      });

    // eslint-disable-next-line
  }, [numDays]);

  function testing(needed) {
    var casesArray = [];
    var deathsArray = [];
    var recoveredArray = [];
    var countries = countryList;
    var first = "true";

    test.forEach((element) => {
      if (countries.includes(element.country)) {
        var historyData = { ...element.timeline };

        var dates = Object.keys(historyData.cases);
        var cases = Object.values(historyData.cases);
        var deaths = Object.values(historyData.deaths);
        var recovered = Object.values(historyData.recovered);

        for (var i = 0; i < dates.length; i++) {
          if (casesArray.length < cases.length) {
            casesArray.push({});
            deathsArray.push({});
            recoveredArray.push({});
          }
        }

        for (let i = 0; i < dates.length; i++) {
          if (first) {
            var n = dates[i].lastIndexOf("/");
            casesArray[i]["date"] = dates[i].substring(0, n);
            deathsArray[i]["date"] = dates[i].substring(0, n);
            recoveredArray[i]["date"] = dates[i].substring(0, n);

            lastDate = dates[i];
          }

          casesArray[i][element.country] = cases[i];
          deathsArray[i][element.country] = deaths[i];
          recoveredArray[i][element.country] = recovered[i];
        }
        first = false;
      }
    });

    if (currentType === "confirmed" && needed === "confirmed") {
      return casesArray;
    }

    if (currentType === "recovered" || needed === "recovered") {
      return recoveredArray;
    }
    if (currentType === "deaths" || needed === "deaths") {
      return deathsArray;
    }
  }

  function showFoot() {
    let fixed = (
      <span className="graphMessage">Graph last updated on : {lastDate}</span>
    );

    return fixed;
  }

  function returnLines() {
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
    if (countryList.length === 1) {
      temp = (
        <TestGraph
          dataKey={countryList[0]}
          stroke={stringToColour(countryList[0])}
          fill={stringToColour(countryList[0])}
          dot={false}
        />
      );
    }
    if (countryList.length > 1) {
      temp = countryList.map((each) => {
        return (
          <TestGraph
            key={each}
            dataKey={each}
            stroke={stringToColour(each)}
            fill={stringToColour(each)}
            dot={false}
          />
        );
      });
    }

    return temp;
  }

  var stringToColour = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (var j = 0; j < 3; j++) {
      var value = (hash >> (j * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
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
    if (props.from === "small") {
      width = "120%";
    }

    if (!showAll) {
      var current = testing("confirmed");

      var toShow = currentType.charAt(0).toUpperCase() + currentType.slice(1);

      return (
        <div className="graphs">
          <div>
            {" "}
            <h3>{toShow} </h3>
            <ResponsiveContainer width={width} height={400}>
              <TestGraph data={current}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                {log}
                <Tooltip />
                <Legend />

                {returnLines()}
              </TestGraph>
            </ResponsiveContainer>
            {showFoot()}
          </div>
        </div>
      );
    }

    return (
      <div className="graphs">
        <div>
          {" "}
          <h3>Confirmed </h3>
          <ResponsiveContainer width="95%" height={400}>
            <TestGraph data={testing("confirmed")} syncId="anyId">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              syncId="anyId"
              {returnLines()}
            </TestGraph>
          </ResponsiveContainer>
        </div>
        <div>
          {" "}
          <h3>Recovered </h3>
          <ResponsiveContainer width="95%" height={400}>
            <TestGraph data={testing("recovered")} syncId="anyId">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              {returnLines()}
            </TestGraph>
          </ResponsiveContainer>
        </div>
        <div>
          {" "}
          <h3>Deaths </h3>
          <ResponsiveContainer width="95%" height={400}>
            <TestGraph data={testing("deaths")} syncId="anyId">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              {returnLines()}
            </TestGraph>
          </ResponsiveContainer>
        </div>

        {showFoot()}
      </div>
    );
  }

  function changeDays(event) {
    setNumdays(event.target.value);
  }

  function handleTypes() {
    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <select onChange={handleType}>
            <option value="confirmed"> Confirmed</option>
            <option value="recovered"> Recovered</option>
            <option value="deaths"> Deaths</option>
            <option value="all"> All</option>
          </select>{" "}
          <input
            type="number"
            min="0"
            max="200"
            placeholder={numDays + " days"}
            style={{ width: 90 }}
            onChange={changeDays}
          />{" "}
          {dropdown0}
        </form>
      </>
    );
  }

  function returnCountryList() {
    var full = Object.values(test);
    let again = new Set();
    full.map((ele, i) => {
      return again.add(ele.country);
    });
    return Array.from(again);
  }

  function handleList(opt) {
    console.log(opt);
    setCountryList([]);
    var a = [];
    opt.map((each) => {
      return a.push(each.value);
    });
    console.log(a);
    setCountryList(a);
  }

  function handleType(e) {
    if (e.target.value === "all") {
      setShowAll(true);
    } else {
      setShowAll(false);
      setCurrenType(e.target.value);
    }
  }

  function isFrom() {
    return (
      <>
        <br />
        Select countries to add to the graph:
        <form onSubmit={(e) => e.preventDefault}>
          <Select
            isMulti
            onChange={(opt) => {
              handleList(opt);
            }}
            onInputChange={() => {
              console.log("tara");
            }}
            options={returnCountryList().map((value, i) => ({
              label: value,
              key: i,
              value: value,
            }))}
          />
        </form>
        {handleTypes()}
      </>
    );
  }

  function handleChange(e) {
    setGraphType(e.target.value);
  }

  var dropdown0 = (
    <>
      <select onChange={handleChange}>
        <option defaultChecked disabled>
          {" "}
          Graph type
        </option>
        <option value={"Line"}> Line graph</option>
        <option value={"Bar"}> Bar graph</option>
        <option value={"Area"}> Area graph</option>

        {/* <option value={"Composed"}> Composed</option> */}
      </select>

      <select onChange={
        (e) => {
         
          if (e.target.value === "Linear") {
            setLog(<YAxis />)
          }
          else {
            setLog(<YAxis scale="log" domain={[0.01, 'auto']} allowDataOverflow />)

          }
        }

      }>

        <option value={"Linear"}> Linear</option>
        <option value={"Log"}> Log</option>


      </select>
      {" "}
    </>

  );

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
        {isFrom()}

        {renderLineChart()}
      </div>
    );
}

export default Charts;
