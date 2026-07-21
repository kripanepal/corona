import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";
import Popup from "./popup";

function Map(props) {
  const [data] = useState(props.data);
  const [loading, setLoading] = useState(true);
  const [mapKey, setMapKey] = useState("");
  var [lati, setLeti] = useState();
  var [lngi, setLngi] = useState();
  var [type, setType] = useState("cases");

  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;

      setLeti(crd.latitude);
      setLngi(crd.longitude);

      setLoading(false);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);

      setLeti(37);
      setLngi(95);

      setLoading(false);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    async function fetchMapKey() {
      try {
        const response = await fetch("/.netlify/functions/google-maps-key");

        if (!response.ok) {
          throw new Error("Unable to load Google Maps key");
        }

        const payload = await response.json();

        if (payload.key) {
          setMapKey(payload.key);
        }
      } catch (error) {
        console.error("Failed to load map key", error);
      }
    }

    fetchMapKey();
  }, []);

  var center = { lat: lati, lng: lngi };
  var countyMap = data.map((each) => {
    return (
      <div
        className="marker"
        key={each.country}
        lat={each.countryInfo.lat}
        lng={each.countryInfo.long}
      >
        <Popup name={each.country} from={"small"} type="map" />
        <img
          className="flag"
          src={each.countryInfo.flag}
          alt={`Flag of ${each.country}`}
        />
        <br />
        {each[type]}
      </div>
    );
  });

  var form = (
    <>
      {" "}
      <input
        type="radio"
        value="cases"
        onChange={handleChange}
        checked={type === "cases"}
      />{" "}
      Cases <span> </span>
      <input type="radio" name="type" value="deaths" onChange={handleChange} />
      Deaths<span> </span>
      <input
        type="radio"
        name="type"
        value="recovered"
        onChange={handleChange}
      />
      Recovered
    </>
  );

  function handleChange(e) {
    setType(e.target.value);
  }
  if (!loading && mapKey) {
    return (
      <>
        <div>
          {form}
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: mapKey }}
              defaultCenter={center}
              defaultZoom={4}
            >
              {countyMap}
            </GoogleMapReact>
          </div>
        </div>
      </>
    );
  }
  return "Loading...";
}

export default Map;
