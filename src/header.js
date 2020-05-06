import React, { useEffect, useState } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import NumberFormat from "react-countup";
import Spinner from "react-bootstrap/Spinner";


function Main() {
  let [latest, setLatest] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect( () => {
    fetch("https://corona.lmao.ninja/v2/all")
      .then((res) => res.json())
      .then((data) => {
        setLatest(data);
        console.log('aaaaaaa')
        setLoading(false);
      });
  }, []);

  function show() {
    const date = new Date(parseInt(latest.updated));
    const lastUpdated = date.toString();
  
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
