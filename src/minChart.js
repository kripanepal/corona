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
  const [log, setLog] = useState(<YAxis />);

  const [lastDays, setLastDays] = useState(30);
  const [requestedLastDays, setRequestedLastDays] = useState(30);

  const [graphType, setGraphType] = useState("Line");
  const [test, setTest] = useState([]);

  var lastDate;
  var search = decodeURI(window.location.pathname.split("/").pop());

  useEffect(() => {
    let toFetch = `https://disease.sh/v3/covid-19/historical/${search}?lastdays=${requestedLastDays}`;
    if (window.location.pathname.includes("state")) {
      toFetch = `https://disease.sh/v3/covid-19/historical/usacounties/${search.toLowerCase()}`;
    }

    if (window.location.pathname.includes("worldMap")) {
      toFetch = `https://disease.sh/v3/covid-19/historical/${props.name}`;
    }

    fetch(toFetch)
      .then((res) => res.json())
      .then((data) => {
        if (window.location.pathname.includes("state")) {
          const here = data;
          const filtered = here.filter((each) => {
            const a = props.name + "";
            const b = each.county + "";

            return a.toUpperCase() === b.toUpperCase();
          });
          setTest(filtered);
        } else {
          setTest(data);
        }
        setLoading(false);
      });

    // eslint-disable-next-line
  }, [requestedLastDays]);

  function normalizeDate(value) {
    if (!value) {
      return "";
    }

    const trimmed = value.trim();
    const normalized = trimmed.includes("/")
      ? trimmed
      : new Date(trimmed).toLocaleDateString("en-US");

    return normalized;
  }

  function getDateRange(startDate, endDate) {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    const current = new Date(start);
    while (current <= end) {
      const month = String(current.getMonth() + 1).padStart(2, "0");
      const day = String(current.getDate()).padStart(2, "0");
      const year = current.getFullYear();
      dates.push(`${month}/${day}/${String(year).slice(-2)}`);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  function testing(needed) {
    if (!test || (Array.isArray(test) && test.length === 0)) {
      return [];
    }

    let historyData = test.timeline;
    if (window.location.pathname.includes("state")) {
      historyData = test[0]?.timeline;
    }

    if (!historyData || !historyData.cases) {
      return [];
    }

    const dates = Object.keys(historyData.cases);
    const normalizedDates = dates.map((date) => normalizeDate(date));
    const dateLookup = new Map(
      normalizedDates.map((date, index) => [date, dates[index]]),
    );

    const availableDateValues = normalizedDates;
    const firstDate = availableDateValues[0];
    lastDate = availableDateValues[availableDateValues.length - 1];
    const rangeStart = new Date(lastDate);
    rangeStart.setDate(
      rangeStart.getDate() - Math.max(1, requestedLastDays) + 1,
    );
    const fullRange =
      firstDate && lastDate
        ? getDateRange(rangeStart, new Date(lastDate))
        : availableDateValues;

    const chartData = fullRange.map((dateLabel) => {
      const sourceDate = dateLookup.get(dateLabel) || null;
      const casesValue = sourceDate ? historyData.cases[sourceDate] : 0;
      const deathsValue = sourceDate ? historyData.deaths[sourceDate] : 0;
      const recoveredValue = sourceDate ? historyData.recovered[sourceDate] : 0;

      return {
        date: dateLabel,
        confirmed: casesValue || 0,
        deaths: deathsValue || 0,
        recovered: window.location.pathname.includes("state")
          ? undefined
          : recoveredValue || 0,
      };
    });

    if (chartData.length > 0) {
      lastDate = chartData[chartData.length - 1].date;
    }

    return chartData;
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
    const color = stringToColour(str);

    if (graphType === "Line") {
      return (
        <Line
          dataKey={str}
          stroke={color}
          fill={color}
          type="monotone"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 2, fill: color, stroke: "#ffffff" }}
        />
      );
    }

    if (graphType === "Bar") {
      return (
        <Bar
          dataKey={str}
          stroke={color}
          fill={color}
          radius={[4, 4, 0, 0]}
          barSize={24}
        />
      );
    }

    if (graphType === "Area") {
      return (
        <Area
          dataKey={str}
          stroke={color}
          fill={color}
          type="monotone"
          strokeWidth={2.5}
          fillOpacity={0.18}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 2, fill: color, stroke: "#ffffff" }}
        />
      );
    }

    return (
      <Line
        dataKey={str}
        stroke={color}
        fill={color}
        type="monotone"
        strokeWidth={2.5}
        dot={false}
        activeDot={{ r: 5, strokeWidth: 2, fill: color, stroke: "#ffffff" }}
      />
    );
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
    if (test.length === 0) {
      console.log("boloooooooooo");
    }
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

    if (test.message) {
      return <div>{test.message}</div>;
    }

    var current = testing("confirmed");
    var toShow;
    if (window.location.pathname.includes("state")) {
      toShow = props.name;
    }

    return (
      <div className="graphs chartCard">
        <div className="graphHeader">
          <h3>{toShow || "COVID timeline"}</h3>
          <span className="graphBadge">Live trend</span>
        </div>
        <ResponsiveContainer width={width} height={400}>
          <TestGraph data={current}>
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            {log}
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
              }}
              labelStyle={{ color: "#0f172a" }}
              formatter={(value) => [Number(value).toLocaleString(), "Cases"]}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />

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

  function changeLastDays(event) {
    setLastDays(event.target.value);
  }

  function handleSearch() {
    setRequestedLastDays(lastDays);
  }

  function isFrom() {
    if (!window.location.pathname.includes("state")) {
      return (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <label style={{ marginRight: 4 }}>Last days</label>
            <input
              type="number"
              min="1"
              max="200"
              value={lastDays}
              onChange={changeLastDays}
              style={{ width: 90, marginRight: 8 }}
            />{" "}
            <button type="submit" style={{ marginLeft: 8 }}>
              Search
            </button>{" "}
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

    return (
      <>
        {dropdown0}
        <select
          onChange={(e) => {
            if (e.target.value === "Linear") {
              setLog(<YAxis />);
            } else {
              setLog(
                <YAxis scale="log" domain={[0.01, "auto"]} allowDataOverflow />,
              );
            }
          }}
        >
          <option value={"Linear"}> Linear</option>
          <option value={"Log"}> Log</option>
        </select>
      </>
    );
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
      <Header type={search} name={props.name} />

      {isFrom()}

      {renderLineChart()}
    </div>
  );
}

export default Charts;
