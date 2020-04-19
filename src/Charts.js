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
  const [loading, setLoading] = useState(true);
  const [currentGraph, setCurrentGraph] = useState("USA");
  const [currentType, setCurrenType] = useState("confirmed");
  const [showAll, setShowAll] = useState(false);
  const [numDays, setNumdays] = useState(30);

  const [toBeAdded, setToBeAdded] = useState(["USA"]);
  const [countryList, setCountryList] = useState(["USA"]);

  const [test, setTest] = useState([]);

  var lastDate;

  useEffect(() => {
    fetch(`https://corona.lmao.ninja/v2/historical?lastdays=${numDays}`)
      .then((res) => res.json())
      .then((data) => {
        setTest(data);

        setLoading(false);
        var search = props.name;

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

        for (var i = 0; i < dates.length; i++) {
          if (first) {
            casesArray[i]["date"] = dates[i];
            deathsArray[i]["date"] = dates[i];
            recoveredArray[i]["date"] = dates[i];
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
    if (countryList.length === 1) {
      temp = <Line dataKey={countryList[0]}  stroke={stringToColour(countryList[0])}/>;
    }
    if (countryList.length > 1) {
      temp = countryList.map((each) => {
        return <Line dataKey={each} stroke={stringToColour(each)} />;
      });
    }

    return temp;
  }

  var stringToColour = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  function renderLineChart() {
    var width;

    if (props.from === "small") {
      width = "120%";
    }

    if (!showAll) {
      var current = testing("confirmed");

      return (
        <div className="graphs">
          <div>
            {" "}
            <h3>{currentType} </h3>
            <ResponsiveContainer width={width} height={400}>
              <LineChart data={current}>
                <CartesianGrid />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />

                {returnLines()}
              </LineChart>
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
            <LineChart data={testing("confirmed")}>
              <CartesianGrid />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {returnLines()}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          {" "}
          <h3>Recovered </h3>
          <ResponsiveContainer width="95%" height={400}>
            <LineChart data={testing("recovered")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              {returnLines()}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          {" "}
          <h3>Deaths </h3>
          <ResponsiveContainer width="95%" height={400}>
            <LineChart data={testing("deaths")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              {returnLines()}
            </LineChart>
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
    if (event.which == 13) {
      setNumdays(event.target.value);
    }
  }

  function handleTypes() {
    if (!showAll) {
      return (
     
          <form>
            <label> Select Graph type </label>
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
  <form onSubmit={(e) => e.preventDefault()}>
          Number of days:
            <input type="number" min='0' max = '200'
            placeholder={numDays}
            style = {{width:50}} onKeyPress={changeDays} />
          </form>
          </form>
          
     
      );
    }

    return(<> <button type="button" onClick={(e) => show3(e)}>
    {temporary()}
  </button>
   <form onSubmit={(e) => e.preventDefault()}>
   Number of days:
     <input type="number" min='0' max = '200'
     placeholder={numDays}
     style = {{width:50}} onKeyPress={changeDays} />
   </form>
   </>
)
  }

  function returnCountryList() {
    var full = Object.values(test);
    let again = new Set();
    full.map((ele, i) => {
      again.add(ele.country);
    });
    return Array.from(again);
  }

  function addToList(toadd) {
    setCountryList((old) => [...old, toadd]);
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
              <option value ='' >Select Country</option>
              {returnCountryList().map((value, i) => (
                <option value={value} key={i}>
                  {value}
                </option>
              ))}
              ))}
            </select>

            <select
              className="selectList"
              value = {toBeAdded[0]}
              name="country"
              onChange={(e) => {
                setToBeAdded(e.target.value);
              }}
            >
              <option value =''> Select Country</option>
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
          </form>
         
          {handleTypes()}
        
       
          <div class = 'cover'> Select to remove: {showCurrentCountries()}</div>
        </>
      );
    }
    return handleTypes();
  }
  function temporary() {
    var temporary = showAll ? "Show confirmed" : "Show All";
    return temporary;
  }

  function removeFromList(toDelete) {
    var index = countryList.indexOf(toDelete);
    console.log(index);
    if (index !== -1) {
      countryList.splice(index, 1);
    }
    setCountryList([...countryList]);
  }

  function showCurrentCountries() {
    {
      return countryList.map((each) => (
        <span className="displayedList" onClick={() => removeFromList(each)}>
          {each}{" "}
        </span>
      ));
    }
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
