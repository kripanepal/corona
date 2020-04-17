import React, { useEffect, useState } from "react";
import "./App.css";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import sort from "./sort.png";
import NumberFormat from "react-number-format";
import Popup from "./popup";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Charts from "./Charts";
import "react-tabs/style/react-tabs.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function App(props) {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [type, setType] = useState("desc");
  var [search, setSearch] = useState("");
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://corona.lmao.ninja/v2/all"),
      fetch("https://corona.lmao.ninja/v2/countries"),
    ])

      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then((data) => {
        function compare(a, b) {
          const bandA = a.cases;
          const bandB = b.cases;

          let comparison = 0;
          if (bandA < bandB) {
            comparison = 1;
          } else if (bandA > bandB) {
            comparison = -1;
          }
          return comparison;
        }
        const sortedBaz = data[1].slice().sort(compare);

        setResults(sortedBaz);
        setFinalResults(sortedBaz);
        setLatest(data[0]);
        setIsloading(false);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

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
            <Popup name={data.country} from={"small"} />
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

  function handleChange(col) {
    function compare(a, b) {
      const bandA = a[col];
      const bandB = b[col];

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

  const image = (
    <img
      src={sort}
      style={{ cursor: "pointer" }}
      alt="Logo"
      className="image"
    />
  );
  const header = (
    <div className="deckss">
      <span className="worldWide">World Wide</span>
      <CardDeck className="deck">
        <Card
          bg={"secondary"}
          text={"white"}
          className="text-center"
          style={{ marginLeft: 3 }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
              <NumberFormat
                value={latest.cases}
                displayType={"text"}
                thousandSeparator={true}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated: {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg={"danger"} text={"white"} className="text-center" style={{}}>
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              {" "}
              <NumberFormat
                value={latest.deaths}
                displayType={"text"}
                thousandSeparator={true}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated: {lastUpdated}}</small>
          </Card.Footer>
        </Card>
        <Card bg={"success"} text={"white"} className="text-center" style={{}}>
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              {" "}
              <NumberFormat
                value={latest.recovered}
                displayType={"text"}
                thousandSeparator={true}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated: {lastUpdated}}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
    </div>
  );

  const table = (
    <>
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
                  {image}
                </span>
              </th>
              <th>
                Total cases
                <span
                  onClick={() => {
                    handleChange("cases");
                  }}
                >
                  {image}
                </span>
              </th>
              <th>
                Deaths
                <span
                  onClick={() => {
                    handleChange("deaths");
                  }}
                >
                  {image}
                </span>
              </th>
              <th>
                Recovered
                <span
                  onClick={() => {
                    handleChange("recovered");
                  }}
                >
                  {image}
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
                  {image}
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
                  {image}
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
                  {image}
                </span>
              </th>
              <th>
                Critical
                <span
                  onClick={() => {
                    handleChange("critical");
                  }}
                >
                  {image}
                </span>
              </th>
              <th>
                Cases/1M
                <span
                  onClick={() => {
                    handleChange("critical");
                  }}
                >
                  {image}
                </span>
              </th>
              <th>
                Deaths/1M
                <span
                  onClick={() => {
                    handleChange("critical");
                  }}
                >
                  {image}
                </span>
              </th>
              <th>
                Tests/1M
                <span
                  onClick={() => {
                    handleChange("critical");
                  }}
                >
                  {image}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>{countries}</tbody>
        </Table>
      </div>
    </>
  );

  const tabs = (
    <Tabs className="tabs">
      <TabList>
        <Tab>
          {" "}
          <Button variant="primary"> All countries </Button>
        </Tab>
        <Tab>
          {" "}
          <Button variant="info">Graphs</Button>
        </Tab>
      </TabList>

      <TabPanel>{table}</TabPanel>
      <TabPanel>
        <Charts name="US" />
      </TabPanel>
    </Tabs>
  );
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
    <div className="whole">
      {header}
      {tabs}
    </div>
  );
}

export default App;
