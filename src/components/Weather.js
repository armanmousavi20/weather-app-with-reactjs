// import React , {useState , useEffect} from 'react';
// import './Weather.css'

// const Weather = () =>
// {
//     const [input , setInput] = useState("tehran");
//     const [weather , setWeather] = useState({});
//     const [isLoading , setIsLoading] = useState(false);
//     const [error , setError] = useState(false);
//     const [errorMsg , setErrorMsg] = useState("");
   
//     const api = {
//         url : "http://api.openweathermap.org/data/2.5/" ,
//         key : "7d333d278b93e47a3b2588ca175ae718"
//     }

//       const iconURL = "http://openweathermap.org/img/w/";


//     useEffect( () => {  fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
//                              .then( (res) => { return res.json(); } )
//                              .then( (data) => {   console.log(data);                                                  
//                                                   setWeather(data);
//                                                   console.log(`country is : ${weather.sys.country}`)
//                                                   setInput("");
//                                                   setError(false);
//                                                   console.log("data is loaded")
//                              });
//                      } , [] )
    
//     const getInput = (e) =>{
//           setInput(e.target.value);
//     }

//     const getWeatherData = (e) =>
//     {
//         if(e.key === "Enter" && input === '')
//         {
//             setError(true);
//             setErrorMsg("Input cant be empty!!!")
//         }

//         if(e.key === "Enter" && input !== "")
//         {
//             fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
//                   .then( (res) => { return res.json(); } )
//                   .then( (data) => {   console.log(data) ;
//                                        setWeather(data);
//                                        setInput("");
//                                        setError(false);
//                 } );
//         }
//     }
//     return(<section>

//                  <div className="container weather">
//                     <div className="weather-app">
//                         <h1> Weather App </h1>
//                         <p> 2022-12-27 </p>
//                         <div>

//                              <input type="text"
//                                     placeholder="Search city name"
//                                     onChange={getInput}
//                                     value={input}
//                                     onKeyPress={getWeatherData}
                                                                        
//                              />
//                         </div>
//                       { error ? (<p> {errorMsg} </p>)
//                               :( <div className='result --card --my2'>
//                                        <h2> {weather.name}</h2>
//                                        <div className='icon'>
//                                            <img 
//                                                 src={iconURL + weather.weather[0].icon + ".png"} 
//                                                 alt={weather.weather[0].main}                                               
//                                             />                          
//                                        </div>
//                                        <p> Temp : {Math.round(weather.main.temp)}°C </p>
//                                        <p> Weather : {weather.weather[0].main} </p>
//                                        <p> Temp Range : {Math.round(weather.main.temp_min)}°C /{" "}
//                                                         {Math.round(weather.main.temp_max)}°C
//                                       </p>
//                                  </div>) }



//                     </div> 
//                  </div> 
//            </section>)
// }

// export default Weather;

import { useState , useEffect } from "react";
import "./Weather.css";

const Weather = () => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [dateToday, setDateToday] = useState(date);

  const api = {
    url: "http://api.openweathermap.org/data/2.5/",
    key: "7d333d278b93e47a3b2588ca175ae718",
  };
  const iconURL = "http://openweathermap.org/img/w/";

  const getInput = (e) => {
    setInput(e.target.value);
  };

  
//   useEffect( () => {
//     setIsLoading(true);
//     setError(true);
//     fetch(`${api.url}weather?q=kish&units=metric&APPID=${api.key}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw Error("Failed to Fetch Data");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setWeather(data);
//         setInput("");
//         setError(false);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.log(err.message);
//         setError(true);
//         setErrorMsg(err.message);
//         setIsLoading(false);
//       });
//   } ,[])
   

  const getWeatherData = (e) => {
    if (e.key === "Enter" && input === "") {
      setErrorMsg("Input cannot be empty");
      setError(true);
    }
    if (e.key === "Enter" && input !== "") {
      setIsLoading(true);
      setError(true);
      fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to Fetch Data");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setWeather(data);
          setInput("");
          setError(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setErrorMsg(err.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <section>
      <div className="container weather --flex-center">
        <div className="weather-app --text-light">
          <h1>Weather App</h1>         
          <p>{dateToday}</p>
          <div className="--form-control --my2">
            <input
              type="text"
              placeholder="Search city"
              onChange={getInput}
              value={input}
              onKeyPress={getWeatherData}
            />
          </div>
          {error ? (
            <p className={errorMsg != "" ? "error" : ""}>{errorMsg}</p>
          ) : (
            <div className="result --card --my2">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="icon">
                <img
                  src={iconURL + weather.weather[0].icon + ".png"}
                  alt={weather.weather[0].main}
                />
              </div>
              <p>Temp: {Math.round(weather.main.temp)}°C</p>
              <p>Weather: {weather.weather[0].main}</p>
              <p>
                Temp Range: {Math.round(weather.main.temp_min)}°C /{" "}
                {Math.round(weather.main.temp_max)}°C
              </p>
            </div>
          )}
          {isLoading && <h3>Loading...</h3>}
        </div>
      </div>
    </section>
  );
};

export default Weather;
