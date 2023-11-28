import React, { useState, useEffect, useLayoutEffect, ChangeEvent } from "react";
import { ImCancelCircle } from "react-icons/im";
import Forecast from "../components/Forecast";

const Home = () => {

    interface IState {
        coords: {
            lat: string
            lon: string
        }
    }

    const [query, setQuery] = useState<string>("")
    const [result, setResult] = useState<any>();
    const [load, setLoad] = useState<boolean>(false);
    const [tempUnit, setTempUnit] = useState<string>("C");
    const [coordinates, setCoordinates] = useState<IState["coords"]>();
    const [forecastData,setForecastData] = useState();
    const [status, setStatus] = useState<number>(0);

    useEffect(() => {
        setLoad(false)
        setStatus(0);
    }, [])

    useEffect(() => {
        if (status === 0 || status !== 200) {
            setQuery("");
        }
    }, [status])

    const searchThis = (e: any) => {
        e.preventDefault();

        const keys = {
            method: 'GET',
            headers: {
                'x-RapidAPI-key': '6926da1f62msh19291cdaec1d329p184febjsn2901e7ff2c5b',
                'x-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        }

        fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${query.includes(",") ? query.slice(0, query.indexOf(",")) + "%2C" + query.slice(query.indexOf(",") + 1, query.length) : query}`, keys)
            .then(res => res.json().then(response => ({ status: res.status, data: response })))
            .then(response => {
                setResult(response.data)
                setStatus(response.status)
                setLoad(true);
            }
            )
            .catch(err => console.log("line 50" + err));
            fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${query.includes(",")?query.slice(0,query.indexOf(","))+"%2C"+query.slice(query.indexOf(",")+1,query.length):query}&days=5`,keys)
            .then(res=>res.json().then(response=>({status:res.status,data:response})))
            .then(result=>{
                if(result.status===200){
                    setForecastData(result.data);
                }
            })
            .catch(err=>console.log(err)
            )
    }

    useLayoutEffect(() => {
        let mounted =true;
        if (mounted&&coordinates?.lat !== undefined && coordinates.lon !== undefined) {
            const keys = {
                method: 'GET',
                headers: {
                    'x-RapidAPI-key': '6926da1f62msh19291cdaec1d329p184febjsn2901e7ff2c5b',
                    'x-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            }
            fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${coordinates?.lat}%2C${coordinates?.lon}`, keys)
                .then((Res) => Res.json().then(response => ({ status: Res.status, data: response })))
                .then((response) => {
                    setResult(response.data)
                    setStatus(response.status)
                    setLoad(true);
                })
                .catch((error) => {
                    console.error(error);
                })
                fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${coordinates?.lat}%2C${coordinates?.lon}&days=5`,keys)
                .then(res=>res.json().then(response=>({status:res.status,data:response})))
                .then(result=>{
                    if(result.status===200){
                        setForecastData(result.data);
                    }
                })
                .catch(err=>console.log(err)
                )
        }
        return()=>{
            mounted=false;
        }
    }, [coordinates])
    

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    return (
        <div className="div-card">
            <form onSubmit={searchThis} className='main-form'>
                <input className="search-input" type="text" value={query} onChange={changeHandler} placeholder="Search or Enter Co-ordinates"></input>
                <div className="btn-container">
                    <button onClick={searchThis} type="submit" className="search-btn" ><span className="search-txt">search</span></button>
                </div>
            </form>
            <section className="div-result">
                {load === true && status === 200 ?
                    <section className="div-result-body">
                        <p className="result-header">TODAY'S WEATHER FORECAST<span>{load === true ? String(result.current.last_updated).slice(5, 7).concat("/").concat(String(result.current.last_updated).slice(8, 10)) : ""}</span></p>
                        <div className="result-current-data">
                            <div className="result-current-location"><h3 className="result-location-name">{result.location.name !== undefined ? result.location.name : ""}</h3><h5>{result.location.region},{result.location.country}</h5></div>
                            <div className="result-child-div">
                                <img className="result-weather-icon" src={load === true ? result.current.condition.icon : ""} alt="current-weather-icon" />
                                {tempUnit === "C" ?
                                    <p className="result-current-temp">{result.current.temp_c}<span>°C</span></p> : <p className="result-current-temp">{result.current.temp_f}<span>°F</span></p>

                                }
                            </div>
                            <section className="result-more"><div>Feels like {tempUnit === "C" ? result.current.feelslike_c + " °C" : result.current.feelslike_f + " °F"}</div>
                                <div className="result-current-condition">{load === true ? result.current.condition.text : ''}</div></section>
                        </div>
                        <div className="result-current-update">Last updated : {String(result.current.last_updated).slice(5, 7).concat("/").concat(String(result.current.last_updated).slice(8, 10)).concat(' | ').concat(String(result.current.last_updated).slice(11, 16))}</div>

                        <div className="result-current-more-data">
                            <div className="result-current-single-entity"><p>Humidity</p><span>{result.current.humidity}%</span></div>
                            <div className="result-current-single-entity"><p>Wind</p><span>{result.current.wind_degree}° {result.current.wind_dir} {tempUnit === "C" ? result.current.wind_kph + " km/h" : result.current.wind_mph + " mph"}</span></div>
                            <div className="result-current-single-entity"><p>Visibility</p><span>{tempUnit === "C" ? result.current.vis_km + " Km" : result.current.vis_miles + " mi"}</span></div>
                            <div className="result-current-single-entity"><p>Pressure</p><span>↔{tempUnit === "C" ? result.current.pressure_mb + " mb" : result.current.pressure_in + " in"}</span></div>
                            <div className="result-current-single-entity"><p>UV Index</p><span>{result.current.uv}</span></div>
                            <div className="result-current-single-entity"><p>Wind Gusts</p><span>{tempUnit === "C" ? result.current.gust_kph + " km/h" : result.current.gust_mph + " mph"}</span></div>
                        </div>
                        <div className="result-current-unit"><div className={tempUnit === "F" ? "result-current-c-temp" : "result-current-c-temp-selected"} onClick={(e) =>{e.preventDefault(); setTempUnit("C");sessionStorage.setItem("format","C")}}>°C</div><div className={tempUnit === "F" ? "result-current-f-temp-selected" : "result-current-f-temp"} onClick={(e) =>{e.preventDefault(); setTempUnit("F");sessionStorage.setItem("format","F")}}>°F</div></div>
                    </section>
                    : status !== 200 && status !== 0 ? <div className={status === 200 ? "div-show-none" : "div-show-error"}><ImCancelCircle className="div-cancel-icon" />Error 400 :  Bad Request</div> : ''
                }
            </section>
            {load===true && status===200?<Forecast data={forecastData}/>:''}
        </div>
    );
}

export default Home;