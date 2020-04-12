import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function Charts(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let search = props.name
  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://pomber.github.io/covid19/timeseries.json"
      );
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  function config() {
    if(search ==="UK")
    {
        search = "United Kingdom"
    }

    if(search ==="USA")
    {
        search = "US"
    }

    if(search ==="UAE")
    {
        search = "United Arab Emirates"
    }

    if(search ==="S.Korea")
    {
        search = "South Korea"
    }
    let finalData;
   
    if (data[search]) {
      finalData = data[search];
      if (!loading) {
        
        finalData.forEach((element) => {
          element.date = (element.date + "").substring(5);
          
        });
        
        return finalData;
        
      }


    }
  }


  const renderLineChart = (
    <LineChart
      width={485}
      height={500}
      data={config()}
      className="graph"
     
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="confirmed" stroke="#8884d8" />
      aaa
    </LineChart>
  );



  return <div>{renderLineChart}</div>;
}

export default Charts;
