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

  const [log, setLog] = useState(<YAxis />);

  const [countryList, setCountryList] = useState(["USA"]);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([
    { label: "USA", value: "USA" },
  ]);

  const [test, setTest] = useState([]);
  const [graphType, setGraphType] = useState("Line");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [availableDateRange, setAvailableDateRange] = useState({
    start: "",
    end: "",
  });

  // Fetch list of all available countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://disease.sh/v3/covid-19/countries", {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        // disease.sh returns an array of country objects with "country" property
        const countries = data.map((item) => item.country).sort();
        setAvailableCountries(countries);
      } catch (e) {
        console.error("Error fetching countries:", e);
        // Fallback to some common countries if API fails
        setAvailableCountries([
          "USA",
          "India",
          "Brazil",
          "Russia",
          "France",
          "UK",
          "Italy",
          "Spain",
          "Germany",
          "Canada",
          "Japan",
          "Mexico",
          "China",
          "South Korea",
        ]);
      }
    };
    fetchCountries();
  }, []);

  // Fetch historical data from disease.sh
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let countries = props.from === "small" ? [props.name] : countryList;
      let results = [];

      for (let country of countries) {
        try {
          const url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`;

          const res = await fetch(url, {
            headers: { Accept: "application/json" },
          });
          const data = await res.json();
          if (data && data.timeline) {
            results.push({ ...data, country });
          }
        } catch (e) {
          console.error("API error for country", country, ":", e);
        }
      }
      const bounds = getDateBounds(results);
      setTest(results);
      setAvailableDateRange(bounds);
      setDateRange({
        start: bounds.start ? toInputDate(bounds.start) : "",
        end: bounds.end ? toInputDate(bounds.end) : "",
      });
      setLoading(false);
      if (props.from === "small") {
        setCountryList([props.name]);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [countryList]);

  function parseDateValue(value) {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return value;
    }

    const trimmed = String(value).trim();
    if (trimmed.includes("-")) {
      const [year, month, day] = trimmed.split("-").map(Number);
      return new Date(year, month - 1, day);
    }

    const [month, day, year] = trimmed.split("/").map(Number);
    const normalizedYear = year < 100 ? year + 2000 : year;
    return new Date(normalizedYear, month - 1, day);
  }

  function toDisplayDate(value) {
    const date = parseDateValue(value);
    if (!date || Number.isNaN(date.getTime())) {
      return "";
    }

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  function toInputDate(value) {
    const date = parseDateValue(value);
    if (!date || Number.isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function normalizeDate(value) {
    if (!value) {
      return "";
    }

    const trimmed = value.trim();
    return toDisplayDate(trimmed);
  }

  function getDateBounds(items) {
    const allDates = [];

    items.forEach((item) => {
      const historyData = item?.timeline;
      const rawDates = Object.keys(historyData?.cases || {});
      rawDates.forEach((date) => allDates.push(normalizeDate(date)));
    });

    if (allDates.length === 0) {
      return { start: "", end: "" };
    }

    const sortedDates = allDates.sort((a, b) => {
      const left = parseDateValue(a);
      const right = parseDateValue(b);
      return left - right;
    });

    return {
      start: sortedDates[0],
      end: sortedDates[sortedDates.length - 1],
    };
  }

  function getDateRange(startDate, endDate) {
    const dates = [];
    const start = parseDateValue(startDate);
    const end = parseDateValue(endDate);

    if (!start || !end) {
      return dates;
    }

    const current = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
    );
    const endCopy = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    while (current <= endCopy) {
      dates.push(toDisplayDate(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  // disease.sh provides historical data with timeline
  // Transform into format suitable for recharts
  function testing(needed) {
    if (!Array.isArray(test) || test.length === 0) {
      return [];
    }

    const countries = countryList.filter((country) =>
      test.some((element) => element.country === country),
    );

    const casesArray = [];
    const deathsArray = [];
    const recoveredArray = [];

    countries.forEach((country) => {
      const element = test.find((item) => item.country === country);
      if (!element || !element.timeline) {
        return;
      }

      const historyData = element.timeline;
      const rawDates = Object.keys(historyData.cases || {});
      const normalizedDates = rawDates.map((date) => normalizeDate(date));
      const dateLookup = new Map(
        normalizedDates.map((date, index) => [date, rawDates[index]]),
      );

      const availableDateValues = normalizedDates;
      const firstDate = availableDateValues[0];
      const lastDate = availableDateValues[availableDateValues.length - 1];
      const rangeStart =
        dateRange.start || availableDateRange.start || firstDate;
      const rangeEnd = dateRange.end || availableDateRange.end || lastDate;
      const fullRange =
        firstDate && lastDate
          ? getDateRange(rangeStart, rangeEnd)
          : availableDateValues;

      fullRange.forEach((dateLabel) => {
        const sourceDate = dateLookup.get(dateLabel) || null;
        const casesValue = sourceDate ? historyData.cases[sourceDate] : 0;
        const deathsValue = sourceDate ? historyData.deaths[sourceDate] : 0;
        const recoveredValue = sourceDate
          ? historyData.recovered[sourceDate]
          : 0;

        const casesEntry = casesArray.find((entry) => entry.date === dateLabel);
        const deathsEntry = deathsArray.find(
          (entry) => entry.date === dateLabel,
        );
        const recoveredEntry = recoveredArray.find(
          (entry) => entry.date === dateLabel,
        );

        if (!casesEntry) {
          casesArray.push({ date: dateLabel });
        }
        if (!deathsEntry) {
          deathsArray.push({ date: dateLabel });
        }
        if (!recoveredEntry) {
          recoveredArray.push({ date: dateLabel });
        }

        const casesRow = casesArray.find((entry) => entry.date === dateLabel);
        const deathsRow = deathsArray.find((entry) => entry.date === dateLabel);
        const recoveredRow = recoveredArray.find(
          (entry) => entry.date === dateLabel,
        );

        casesRow[country] = casesValue || 0;
        deathsRow[country] = deathsValue || 0;
        recoveredRow[country] = recoveredValue || 0;
      });
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
    // disease.sh provides the updated timestamp
    let fixed = (
      <span className="graphMessage">
        Graph last updated: Today (disease.sh)
      </span>
    );
    return fixed;
  }

  function returnLines() {
    const buildSeries = (country) => {
      const color = stringToColour(country);
      const commonProps = {
        key: country,
        dataKey: country,
        stroke: color,
        fill: color,
        strokeWidth: 2.5,
        dot: false,
        activeDot: {
          r: 5,
          strokeWidth: 2,
          fill: color,
          stroke: "#ffffff",
        },
      };

      if (graphType === "Line") {
        return <Line {...commonProps} type="monotone" />;
      }

      if (graphType === "Bar") {
        return <Bar {...commonProps} radius={[4, 4, 0, 0]} barSize={24} />;
      }

      if (graphType === "Area") {
        return <Area {...commonProps} type="monotone" fillOpacity={0.18} />;
      }

      return <Line {...commonProps} type="monotone" />;
    };

    if (countryList.length === 1) {
      return buildSeries(countryList[0]);
    }

    return countryList.map((each) => buildSeries(each));
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
        <div className="graphs chartCard">
          <div className="graphHeader">
            <h3>{toShow}</h3>
            <span className="graphBadge">Live trend</span>
          </div>
          <ResponsiveContainer width={width} height={400}>
            <TestGraph data={current}>
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
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
                formatter={(value) => [Number(value).toLocaleString(), toShow]}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />

              {returnLines()}
            </TestGraph>
          </ResponsiveContainer>
          {showFoot()}
        </div>
      );
    }

    return (
      <div className="graphs chartCard">
        <div className="graphHeader">
          <h3>Confirmed</h3>
          <span className="graphBadge">Multi-series</span>
        </div>
        <ResponsiveContainer width="95%" height={400}>
          <TestGraph data={testing("confirmed")} syncId="anyId">
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
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
              }}
              labelStyle={{ color: "#0f172a" }}
              formatter={(value) => [
                Number(value).toLocaleString(),
                "Confirmed",
              ]}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
            {returnLines()}
          </TestGraph>
        </ResponsiveContainer>
        <div className="graphHeader">
          <h3>Recovered</h3>
          <span className="graphBadge">Multi-series</span>
        </div>
        <ResponsiveContainer width="95%" height={400}>
          <TestGraph data={testing("recovered")} syncId="anyId">
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
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
              }}
              labelStyle={{ color: "#0f172a" }}
              formatter={(value) => [
                Number(value).toLocaleString(),
                "Recovered",
              ]}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />

            {returnLines()}
          </TestGraph>
        </ResponsiveContainer>
        <div className="graphHeader">
          <h3>Deaths</h3>
          <span className="graphBadge">Multi-series</span>
        </div>
        <ResponsiveContainer width="95%" height={400}>
          <TestGraph data={testing("deaths")} syncId="anyId">
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
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
              }}
              labelStyle={{ color: "#0f172a" }}
              formatter={(value) => [Number(value).toLocaleString(), "Deaths"]}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />

            {returnLines()}
          </TestGraph>
        </ResponsiveContainer>

        {showFoot()}
      </div>
    );
  }

  function handleDateRangeChange(field, event) {
    const nextValue = event.target.value;
    setDateRange((current) => {
      const updated = { ...current, [field]: nextValue };

      if (field === "start" && updated.end && updated.start > updated.end) {
        updated.end = updated.start;
      }

      if (field === "end" && updated.start && updated.end < updated.start) {
        updated.start = updated.end;
      }

      return updated;
    });
  }

  function handleTypes() {
    return (
      <div className="controlsShell">
        <div className="controlsCard">
          <div className="controlsHeader">
            <span className="controlsTitle">View controls</span>
            <span className="controlsHint">Tune the comparison</span>
          </div>
          <div className="controlsForm">
            <div className="controlGroup">
              <label className="controlLabel">Metric</label>
              <select className="controlSelect" onChange={handleType}>
                <option value="confirmed">Confirmed</option>
                <option value="recovered">Recovered</option>
                <option value="deaths">Deaths</option>
                <option value="all">All</option>
              </select>
            </div>
            <div className="controlGroup">
              <label className="controlLabel">From</label>
              <input
                className="controlInput"
                type="date"
                value={dateRange.start}
                onChange={(event) => handleDateRangeChange("start", event)}
              />
            </div>
            <div className="controlGroup">
              <label className="controlLabel">To</label>
              <input
                className="controlInput"
                type="date"
                value={dateRange.end}
                onChange={(event) => handleDateRangeChange("end", event)}
              />
            </div>
          </div>
        </div>
        <div className="controlsCard">
          <div className="controlsHeader">
            <span className="controlsTitle">Graph style</span>
            <span className="controlsHint">Choose presentation</span>
          </div>
          <div className="controlsForm">{dropdown0}</div>
        </div>
      </div>
    );
  }

  function returnCountryList() {
    // Use the available countries fetched from disease.sh
    // Fallback to test data if available
    if (availableCountries.length > 0) {
      return availableCountries;
    }
    // Fallback: get from test data if API hasn't fetched country list yet
    var full = Object.values(test);
    let again = new Set();
    full.map((ele, i) => {
      return again.add(ele.country);
    });
    return Array.from(again);
  }

  function handleList(opt) {
    const nextCountries = (opt || []).map((each) => each.value);
    setSelectedCountries(opt || []);
    setCountryList(nextCountries);
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
      <div className="controlsShell">
        <div className="controlsCard controlsCardWide">
          <div className="controlsHeader">
            <span className="controlsTitle">Countries</span>
            <span className="controlsHint">Compare multiple countries</span>
          </div>
          <label className="controlLabel">
            Select countries to add to the graph
          </label>
          <Select
            className="countrySelect"
            classNamePrefix="country-select"
            isMulti
            closeMenuOnSelect={false}
            value={selectedCountries}
            onChange={(opt) => {
              handleList(opt);
            }}
            options={returnCountryList().map((value, i) => ({
              label: value,
              key: i,
              value: value,
            }))}
          />
        </div>
        {handleTypes()}
      </div>
    );
  }

  function handleChange(e) {
    setGraphType(e.target.value);
  }

  var dropdown0 = (
    <>
      <div className="controlGroup">
        <label className="controlLabel">Graph</label>
        <select className="controlSelect" onChange={handleChange}>
          <option value="Line">Line graph</option>
          <option value="Bar">Bar graph</option>
          <option value="Area">Area graph</option>
        </select>
      </div>
      <div className="controlGroup">
        <label className="controlLabel">Scale</label>
        <select
          className="controlSelect"
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
          <option value={"Linear"}>Linear</option>
          <option value={"Log"}>Log</option>
        </select>
      </div>
    </>
  );

  return loading ? (
    <div className="spinners">
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
