import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";
import Popup from "./popup";
function Map(props) {
  const [data] = useState(props.data);
  const [loading, setLoading] = useState(true);
  const key = "KEY HERE";
  var [lati, setLeti] = useState();
  var [lngi, setLngi] = useState();
  var [type, setType] = useState("cases");

  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;

      console.log(`Longitude: ${crd.longitude}`);

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

    console.log(lati);
  });

  var center = { lat: lati, lng: lngi };
  var countyMap = data.map((each) => {
    return (
      <div
        className="marker"
        key={each.country}
        lat={each.countryInfo.lat}
        lng={each.countryInfo.long}
      >
         <Popup name={each.country} from={"small"} type = "map" />
        <img className="flag" src={each.countryInfo.flag} alt="country image" />
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
  if (!loading) {
    return (
      <>
        <div>
          {form}
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: key }}
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
