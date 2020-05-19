import React, { useEffect, useState } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import NumberFormat from "react-countup";
import Spinner from "react-bootstrap/Spinner";

function Main(props) {
  let [latest, setLatest] = useState([]);
  let [loading, setLoading] = useState(true);
  let [toShow, setToshow] = useState();
  var search = decodeURI(window.location.pathname.split("/").pop());
 

  useEffect(() => {
    var toFetch;
   
    if (props.type === "main") {
      console.log("main");
      toFetch = "https://corona.lmao.ninja/v2/all";
      setToshow("World Wide")
      
    }

    if (window.location.pathname.includes("state")) {
      console.log("satte");
      toFetch = `https://disease.sh/v2/states/${search}`;
      setToshow(search)
   
    }
    if (window.location.pathname.includes("country")) {
      console.log("country");
      toFetch = `https://disease.sh/v2/countries/${search}?yesterday=false&strict=false`;
      setToshow(search)

    }
    fetch(toFetch)
      .then((res) => res.json())
      .then((data) => {
        setLatest(data);
        console.log("aaaaaaa");
        setLoading(false);
      });
  }, []);

  function show() {
    const date = new Date(parseInt(latest.updated));
    const lastUpdated = date.toString();
  console.log(search)
    const header = (
      <div className="deckss">
        <span className="worldWide">{toShow}</span>
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
                  end={latest.cases}
                  duration={1.5}
                  separator={","}
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
                  end={latest.deaths}
                  duration={1.5}
                  separator={","}
                />
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small>Last updated: {lastUpdated}</small>
            </Card.Footer>
          </Card>
          <Card
            bg={"success"}
            text={"white"}
            className="text-center"
            style={{}}
          >
            <Card.Body>
              <Card.Title>Recovered</Card.Title>
              <Card.Text>
                {" "}
                <NumberFormat
                  end={latest.recovered}
                  duration={1.5}
                  separator={","}
                />
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small>Last updated: {lastUpdated}</small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
    );

    return header;
  }
  if (loading)
    return (
      <div className="spinners">
        {" "}
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
      </div>
    );
  return <div> {show()}</div>;
}

export default Main;
