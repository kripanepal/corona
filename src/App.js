import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import sort from "./sort.png";
import NumberFormat from "react-number-format";
import Popup from "./popup";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MinCharts from "./minChart";
import Charts from "./Charts";
import "react-tabs/style/react-tabs.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Counties from "./counties";
import Map from "./map";
import Header from "./header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App(props) {
  const [results, setResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [type, setType] = useState("desc");
  var [search, setSearch] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [pathTo, setPathTo] = useState();

  const [url] = useState(props.name);

  

  useEffect(() => {
    fetch("" + url + "?sort=cases", {
      headers: { accept: "Accept: application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setFinalResults(data);
        console.log("aaaaaaa");
        setIsloading(false);
      });
  }, [url]);

  function countries() {
    const countries = results.map((data, i) => {
      let isNewDeath = "";
      let deathSign = "";
      if (data.todayDeaths !== 0) {
        isNewDeath = "danger";
        deathSign = "+";
      }
      let isNewCases = "";
      let casesSign = "";
      if (data.todayCases !== 0) {
        casesSign = "+";
        isNewCases = "casesNew";
      }

      return (
        <tr key={i}>
          <td className="country">
            <span style={{ height: `100%` }}>
              <img src={data.countryInfo.flag} alt="flag" width="20px" />{" "}
              <Link className = "link"
                to={`country/${data.country}`}
                onClick={() => {
                  setPathTo(data.country);
                }}
              >
                {data.country}
              </Link>
            </span>
          </td>

          <td>
            {" "}
            <NumberFormat
              value={data.cases}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
          <td className="datas">
            {" "}
            <NumberFormat
              value={data.deaths}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
          <td className="datas">
            {" "}
            <NumberFormat
              value={data.recovered}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
          <td className={isNewCases}>
            {casesSign}

            <NumberFormat
              value={data.todayCases}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
          <td className={isNewDeath}>
            {" "}
            {deathSign}
            <NumberFormat
              value={data.todayDeaths}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
          <td className="datas">
            {" "}
            <NumberFormat
              value={data.active}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
          <td className="datas">
            {" "}
            <NumberFormat
              value={data.critical}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>

          <td className="datas">
            {" "}
            <NumberFormat
              value={data.casesPerOneMillion}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
          <td className="datas">
            {" "}
            <NumberFormat
              value={data.deathsPerOneMillion}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>

          <td className="datas">
            {" "}
            <NumberFormat
              value={data.testsPerOneMillion}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
        </tr>
      );
    });
    return countries;
  }

  function handleChange(col) {
    console.log(col)
    function compare(a, b) {
      
      const bandA = a[col];
      const bandB = b[col];
      console.log(bandA)
      if (type !== "asc") {
        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      }
      if (type === "asc") {
        let comparison = 0;
        if (bandA < bandB) {
          comparison = 1;
        } else if (bandA > bandB) {
          comparison = -1;
        }
        return comparison;
      }
    }

    const sortedBaz = results.slice().sort(compare);

    setResults(sortedBaz);

    type === "asc" ? setType("desc") : setType("asc");
  }

  function handleSearch(event) {
    setSearch(event.target.value);

    const filtered = finalResults.filter((each) =>
      each.country.toUpperCase().startsWith(event.target.value.toUpperCase())
    );
    setResults(filtered);
  }

  function submitHandler(e) {
    e.preventDefault();
  }

  function image() {
    const image = (
      <img
        src={sort}
        style={{ cursor: "pointer" }}
        alt="Logo"
        className="image"
      />
    );
    return image;
  }

  function table() {
    const table = (
      <>
      <Header type = "main"/>
        <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
          <label>
            Search:
            <input
              onChange={handleSearch}
              type="text"
              name="searching"
              value={search}
            />
          </label>
        </form>
        <div style={{ overflow: "scrollable" }}>
          <Table
            className="table"
            striped
            bordered
            hover
            variant="dark"
            style={{ maxWidth: 900 }}
          >
            <thead>
              <tr>
                <th>
                  Country
                  <span
                    onClick={() => {
                      handleChange("country");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  Total cases
                  <span
                    onClick={() => {
                      handleChange("cases");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  Deaths
                  <span
                    onClick={() => {
                      handleChange("deaths");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  Recovered
                  <span
                    onClick={() => {
                      handleChange("recovered");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  {" "}
                  New cases
                  <span
                    onClick={() => {
                      handleChange("todayCases");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  {" "}
                  New deaths
                  <span
                    onClick={() => {
                      handleChange("todayDeaths");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  {" "}
                  Active cases
                  <span
                    onClick={() => {
                      handleChange("active");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  Critical
                  <span
                    onClick={() => {
                      handleChange("critical");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  Cases/1M
                  <span
                    onClick={() => {
                      handleChange("casesPerOneMillion");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  Deaths/1M
                  <span
                    onClick={() => {
                      handleChange("deathsPerOneMillion");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  Tests/1M
                  <span
                    onClick={() => {
                      handleChange("testsPerOneMillion");
                    }}
                  >
                    {image()}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>{countries()}</tbody>
          </Table>
        </div>
      </>
    );
    return table;
  }

  function tabs() {
    const tabs = (
     
      
        <>
            <Button variant="primary"><Link  className = "links" to = "/">All countries </Link> </Button>{' '}
     
    
            <Button variant="success"><Link className = "links" to = "/worldMap">World Map </Link></Button>{' '}
          
           
            <Button variant="info"><Link className = "links"  to = "/graphs">Graphs </Link></Button>{' '}
         
</>
     
     
    );
    return tabs;
  }

  return isLoading ? (
    <div className="spinners">
      {" "}
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
    </div>
  ) : (
    // <div className="whole">{tabs()}</div>

    <div className="whole">
      {console.log(pathTo)}
      <Router>
        <div>
          {tabs()}
          <Switch>
            <Route path="/" exact>  {table()}</Route>
            <Route path="/worldMap" exact>  <Map data={results} /></Route>
            <Route path="/graphs" exact>  <Charts/></Route>
            <Route path="/country/:name" ><MinCharts name = {pathTo} from = "small"/> </Route>
            <Route path="/USA/:name" ><Counties/> </Route>

          </Switch>
        </div>
      </Router>
    
    </div>
  );
}

export default App;
