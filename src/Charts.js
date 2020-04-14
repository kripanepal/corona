import React, { useEffect, useState } from "react";
import "./App.css";
import "./charts.css";
import Spinner from "react-bootstrap/Spinner";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Charts(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentGraph, setCurrentGraph] = useState("USA");
  const [currentType, setCurrenType] = useState("confirmed");
  const [showAll, setShowAll] = useState(false);
  var lastDate;

  useEffect(() => {
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        var search = props.name;
        if (props.name === "UK") {
          search = "United Kingdom";
        }

        if (props.name === "USA") {
          search = "US";
        }

        if (props.name === "UAE") {
          search = "United Arab Emirates";
        }

        if (props.name === "S.Korea") {
          search = "South Korea";
        }
        setCurrentGraph(search);
      });
    // eslint-disable-next-line
  }, []);

  function config() {
    let search = currentGraph;

    let finalData;

    if (data[search]) {
      finalData = data[search];
      if (!loading) {
        finalData.forEach((element) => {
          lastDate = element.date;
          element.date = (element.date + "").substring(5);
        });

        return finalData;
      }
    }
  }

  function showFoot() {
    let fixed = (
      <span className="graphMessage">Graph last updated on : {lastDate}</span>
    );

    if (props.from !== "small") {
      fixed = (
        <div>
          {" "}
          {fixed} <span className="graphCountry">{currentGraph} </span>{" "}
        </div>
      );
    }
    return fixed;
  }

  function renderLineChart() {
    var width;

    if (props.from === "small") {
      width = "120%";
    }

    var current = config();

    if (!showAll) {
      return (
        <div className="graphs">
          <ResponsiveContainer width={width} height={400}>
            <LineChart data={current}>
              <CartesianGrid />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey={currentType} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          {showFoot()}
        </div>
      );
    }

    return (
      <div className="graphs">
        <ResponsiveContainer width="95%" height={400}>
          <LineChart data={current}>
            <CartesianGrid />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="confirmed" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="95%" height={400}>
          <LineChart data={current}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="deaths" stroke="red" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="95%" height={400}>
          <LineChart data={current}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="recovered" stroke="green" />
          </LineChart>
        </ResponsiveContainer>

        {showFoot()}
      </div>
    );
  }
  function handleList(e) {
    setCurrentGraph(e.target.value);
  }

  function handleType(e) {
    setCurrenType(e.target.value);
  }

  function show3() {
    showAll ? setShowAll(false) : setShowAll(true);
  }

  function handleTypes() {
    if (!showAll) {
      return (
        <form>
          <label> Select Graph type </label>
          <select name="type" value={currentType} onChange={handleType}>
            <option value="confirmed">Confirmed</option>
            <option value="deaths"> Deaths</option>
            <option value="recovered"> Recovered</option>
          </select>
        </form>
      );
    }
  }

  function isFrom() {
    if (props.from !== "small") {
      return (
        <form onSubmit={(e) => e.preventDefault}>
          <label>Country:</label>
          <select name="country" value={currentGraph} onChange={handleList}>
            <option disabled>Select Country</option>
            {Object.keys(data).map((value, i) => (
              <option value={value} key={i}>
                {value}
              </option>
            ))}
          </select>
          <button type="button" onClick={show3}>
            {temporary}
          </button>
        </form>
      );
    }
  }

  var temporary = showAll ? "Show confirmed" : "Show All";

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
      {handleTypes()}

      {renderLineChart()}
    </div>
  );
}

export default Charts;
