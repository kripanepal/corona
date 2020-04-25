import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import sort from "./sort.png";
import Popup from "./popup";
//import json from './usaAll.json'

function Main() {
  let [latest, setLatest] = useState([]);
  let [results, setResults] = useState([]);
  let [loading, setLoading] = useState(true);
  var [search, setSearch] = useState("");
  const [type, setType] = useState("desc");
  useEffect(() => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/v2/states?sort=cases",
      { headers: { accept: "Accept: application/json" } }
    )
      .then((res) => res.json())
      .then((data) => {
        setLatest(data);
        setResults(data);

        setLoading(false);
      });
  }, []);

  function handleSearch(event) {
    setSearch(event.target.value);

    const filtered = latest.filter((each) => {
      return each.state
        .toUpperCase()
        .startsWith(event.target.value.toUpperCase());
    });

    setResults(filtered);
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

  function submitHandler(e) {
    e.preventDefault();
  }

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
              {" "}
              <Popup name={data.state} type = 'state' from={"small"} />
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
          <td className={isNewCases}>
            {" "}
            {casesSign}
            <NumberFormat
              value={data.todayCases}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>

          <td className="datas">
            

            <NumberFormat
              value={data.deaths}
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
              value={data.tests}
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

  function table() {
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
                  State
                  <span
                    onClick={() => {
                      handleChange("state");
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
                  New Cases
                  <span
                    onClick={() => {
                      handleChange("todayCases");
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
                  {" "}
                  New Deaths
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
                  Active
                  <span
                    onClick={() => {
                      handleChange("active");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  {" "}
                  Tests
                  <span
                    onClick={() => {
                      handleChange("tests");
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

  function show() {
    return <div>{table()}</div>;
  }
  if (loading)
    return (
      <div className="spinners">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
      </div>
    );
  else {
    return <>{show()}</>;
  }
}

export default Main;
