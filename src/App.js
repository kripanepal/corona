import React, { useEffect, useState } from "react";
import "./App.css";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import orderBy from "lodash/orderBy";
import sort from "./sort.png";
import NumberFormat from 'react-number-format';


function App(props) {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [finalResults,setFinalResults] = useState([]);
  const [type, setType] = useState("desc");
  var [search,setSearch] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/all"),
        axios.get("https://corona.lmao.ninja/countries"),
      ])

      .then((res) => {
        setLatest(res[0].data);
        setResults(orderBy(res[1].data, ["cases"], ["desc"]))
        setFinalResults(orderBy(res[1].data, ["cases"], ["desc"]))
       
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const countries = results.map((data,i) => {

    let isNewDeath = "";
    if (data.todayDeaths !== 0) {
      isNewDeath = "danger";
    }
    let isNewCases = "";
    if (data.todayDeaths !== 0) {
      isNewCases = "casesNew";
    }

    return (
      <tr key ={i} > 
        <td className="country">{data.country} </td>
        <td>  <NumberFormat value={data.cases} displayType={'text'} thousandSeparator={true}/></td>
        <td className="datas"> <NumberFormat value={data.deaths} displayType={'text'} thousandSeparator={true}/></td>
        <td className="datas"> <NumberFormat value={data.recovered} displayType={'text'} thousandSeparator={true}/></td>
        <td className={isNewCases}> <NumberFormat value={data.todayCases} displayType={'text'} thousandSeparator={true}/></td>
        <td className={isNewDeath}> <NumberFormat value={data.todayDeaths} displayType={'text'} thousandSeparator={true}/></td>
        <td className="datas"> <NumberFormat value={data.active} displayType={'text'} thousandSeparator={true}/></td>
        <td className="datas"> <NumberFormat value={data.critical} displayType={'text'} thousandSeparator={true}/></td>
      </tr>
    );
  });

  function handleChange(col) {
    type === "asc" ? setType("desc") : setType("asc");

    setResults(orderBy(results, [col], [type]));
  }

  function handleSearch(event)
  {
      setSearch(event.target.value)
      const filtered = finalResults.filter(each => ((each.country).toUpperCase()).startsWith((event.target.value).toUpperCase()));
      setResults(filtered);

  }

  const image = <img src={sort} alt="Logo" className="image" />;

  return (
    <div className="all">
      <CardDeck className = "deck"style={{margin:25}}>
        <Card
          bg={"secondary"}
          text={"white"}
          className="text-center"
          style={{ margin: 10 }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text><NumberFormat value={latest.cases} displayType={'text'} thousandSeparator={true}/></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated: {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg={"danger"}
          text={"white"}
          className="text-center"
          style={{ margin: 10 }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text> <NumberFormat value={latest.deaths} displayType={'text'} thousandSeparator={true}/></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated: {lastUpdated}}</small>
          </Card.Footer>
        </Card>
        <Card
          bg={"success"}
          text={"white"}
          className="text-center"
          style={{ margin: 10 }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text> <NumberFormat value={latest.recovered} displayType={'text'} thousandSeparator={true}/></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated: {lastUpdated}}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <form style={{textAlign:"center"}}>
        <label>
          Search:
          <input onChange={handleSearch} type="text" name="searching" value = {search}  />
         
        </label>
       
      </form>

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
            <th
              onClick={() => {
                handleChange("country");
              }}
            >
              Country
              {image}
            </th>
            <th
              onClick={() => {
                handleChange("cases");
              }}
            >
              Total cases
              {image}
            </th>
            <th
              onClick={() => {
                handleChange("deaths");
              }}
            >
              Deaths
              {image}
            </th>
            <th
              onClick={() => {
                handleChange("recovered");
              }}
            >
              Recovered
              {image}
            </th>
            <th
              onClick={() => {
                handleChange("todayCases");
              }}
            >
              New cases
              {image}
            </th>
            <th
              onClick={() => {
                handleChange("todayDeaths");
              }}
            >
              New deaths
              {image}
            </th>
            <th
              onClick={() => {
                handleChange("active");
              }}
            >
              Recovered
              {image}
            </th>
            <th
              onClick={() => {
                handleChange("critical");
              }}
            >
              Critical{image}
            </th>
          </tr>
        </thead>
        <tbody>{countries}</tbody>
      </Table>
    </div>
  );
}

export default App;
