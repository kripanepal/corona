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

function Charts(props) {
  const [loading, setLoading] = useState(true);
  const [currentGraph, setCurrentGraph] = useState();
  const [currentType, setCurrenType] = useState("confirmed");
  const [showAll, setShowAll] = useState(false);
  const [numDays, setNumdays] = useState(30);

  const [toBeAdded, setToBeAdded] = useState(["USA"]);
  const [countryList, setCountryList] = useState(["USA"]);

  const [test, setTest] = useState([]);
  const [graphType, setGraphType] = useState("Line");

  var lastDate;

  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/v2/historical?lastdays=${numDays}`,
      { headers: { accept: "Accept: application/json" } }
    )
      .then((res) => res.json())
      .then((data) => {
        setTest(data);

        setLoading(false);
        var search = props.name;
        if (props.from === "small") {
          setCurrentGraph(props.name);
          setCountryList([props.name]);
        }
        setCurrentGraph(search);
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
                <YAxis />
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
  function handleList(e) {
    removeFromList(currentGraph);
    setCountryList([...countryList, e.target.value]);
    setCurrentGraph(e.target.value);
  }

  function handleType(e) {
    setCurrenType(e.target.value);
  }

  function show3() {
    showAll ? setShowAll(false) : setShowAll(true);
  }

  function changeDays(event) {
    setNumdays(event.target.value);
  }

  function handleTypes() {
    if (!showAll) {
      return (
        <>
          <form>
            <label> Select Graph for </label>
            <select
              name="type"
              value={currentType}
              onChange={handleType}
              className="selectList"
            >
              <option value="confirmed">Confirmed</option>
              <option value="deaths"> Deaths</option>
              <option value="recovered"> Recovered</option>
            </select>
            <button type="button" onClick={(e) => show3(e)}>
              {temporary()}
            </button>
          </form>

          <form onSubmit={(e) => e.preventDefault()}>
            Number of days:
            <input
              type="number"
              min="0"
              max="200"
              placeholder={numDays}
              style={{ width: 50 }}
              onChange={changeDays}
            />
          </form>
        </>
      );
    }

    return (
      <>
        {" "}
        <button type="button" onClick={(e) => show3(e)}>
          {temporary()}
        </button>
        <form onSubmit={(e) => e.preventDefault()}>
          Number of days:
          <input
            type="number"
            min="0"
            max="200"
            placeholder={numDays}
            style={{ width: 50 }}
            onInput={changeDays}
          />
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

  function addToList(toadd) {
    if (countryList.includes(toadd + "")) {
    } else {
      setCountryList((old) => [...old, toadd]);
    }
  }

  function isFrom() {
    if (props.from !== "small") {
      return (
        <>
          <form onSubmit={(e) => e.preventDefault}>
            <label>Country:</label>

            <select
              value={currentGraph}
              onChange={handleList}
              className="selectList"
            >
              <option disabled>Select Country to compare</option>
              {returnCountryList().map((value, i) => (
                <option value={value} key={i}>
                  {value}
                </option>
              ))}
              ))}
            </select>
            {secondList()}
          </form>

          {handleTypes()}
          {displayGraphMenu()}
          <div className="cover">
            {" "}
            Click to remove: {showCurrentCountries()}
          </div>
        </>
      );
    }
    return handleTypes();
  }
  function temporary() {
    var temporary = showAll ? "Show confirmed" : "Show All";
    return temporary;
  }

  function secondList() {

    if (countryList.length !== 0) {
      return (
        <>
          {" "}
          <select
            className="selectList"
            name="country"
            onChange={(e) => {
              setToBeAdded(e.target.value);
            }}
          >
            <option checked> Select Country</option>
            {returnCountryList().map((value, i) => (
              <option value={value} key={i}>
                {value}
              </option>
            ))}
            ))}
          </select>
          <button type="button" onClick={(e) => addToList(toBeAdded)}>
            Add to Graph
          </button>
        </>
      );
    }
  }

  function removeFromList(toDelete) {
    var index = countryList.indexOf(toDelete);

    if (index !== -1) {
      countryList.splice(index, 1);
    }
    setCountryList([...countryList]);
  }

  function showCurrentCountries() {
    return countryList.map((each) => (
      <span
        key={each}
        className="displayedList"
        onClick={() => removeFromList(each)}
      >
        {each}{" "}
      </span>
    ));
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
      {isFrom()}

      {renderLineChart()}
    </div>
  );
}

export default Charts;
