import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import sort from "./sort.png";
import Popup from "./popup";
import Header from "./header";
//import json from './usaAll.json'

function Main() {
  let [latest, setLatest] = useState([]);
  let [results, setResults] = useState([]);
  let [loading, setLoading] = useState(true);
  const [type, setType] = useState("desc");
  var searching = decodeURI(window.location.pathname.split("/").pop() + "");

  useEffect(() => {
    fetch("https://disease.sh/v2/jhucsse/counties", {
      headers: { accept: "Accept: application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("aa");
        setLoading(false);

        const tolook = data.filter((each) => {

          return each.province === searching;
        });

        setResults(tolook);
        setLatest(tolook);

        
      });
  }, [searching]);

  function handleSearch(event) {

    const filtered = latest.filter((each) => {
      return each.county
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
      var bandA;
      var bandB;
      if (col !== "county") {
        bandA = a["stats"][col];
        bandB = b["stats"][col];
      } else {
        bandA = a[col];
        bandB = b[col];
      }



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

    if (results.length === 0) {
        return <tr>
            <td  colSpan="4">No Data Available</td>
        </tr>
      }
    const counties = results.map((data, i) => {
      return (
        <tr key={i}>
          <td className="county">
            <span className = "link"style={{ height: `100%` }}>
              {" "}
              <Popup name={data.county} type="state" from={"small"} />
            </span>
          </td>
          <td>
            {" "}
            <NumberFormat
              value={data.stats.confirmed}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>

          <td className="datas">
            <NumberFormat
              value={data.stats.deaths}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
          <td className="datas">
            <NumberFormat
              value={data.stats.recovered}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
        </tr>
      );
    });
    return counties;
  }

  function table() {
    const table = (
      <>
      <br/>
        <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
          <label>
            Search:
            <input onChange={handleSearch} type="text" name="searching" />
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
                  County
                  <span
                    onClick={() => {
                      handleChange("county");
                    }}
                  >
                    {image()}
                  </span>
                </th>
                <th>
                  Total cases
                  <span
                    onClick={() => {
                      handleChange("confirmed");
                    }}
                  >
                    {image()}
                  </span>
                </th>

                <th>
                  Deaths
                  <span
                    onClick={() => {
                      handleChange("confirmed");
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
    return (
      <>
        <Header />
        {show()}
      </>
    );
  }
}

export default Main;
