import React, { useState, useEffect } from "react";

function Test() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);

  const [isLoading, setIsloading] = useState(true);

 useEffect(async()=>{

      await fetch("https://corona.lmao.ninja/all")
            .then(response => response.json())
            .then(response => {
                const {memes} = response
                 setResults(memes)
                 setIsloading(false)
            })
  }, [latest]);

if(!isLoading)
{
  function fun() {console.log('inside')}
  console.log("aaaaaaaaaaaaaaaaaa");
 

}

  return (<div>qqqqqqqqqqqqqqqq</div>);
}

export default Test;
