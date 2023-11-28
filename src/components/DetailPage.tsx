import React,{useState,useEffect} from 'react';

const Detail= (props:any) => {

    interface windtype {
        wind:{
            wind_dir:string,
            wind_deg:string,
            wind_in_kph:string,
            wind_in_mph:string,
            gust_in_kph:string,
            gust_in_mph:string
        }
        pressure:{
            pressure_mb:string,
            pressure_in:string,
            humidity:number
        }
        other:{
            visiblity_km:number,
            visiblity_mi:number,
            uv_index:number,
            heat_index_in_c:number,
            heat_index_in_f:number,
            dew_point_in_c:number,
            dew_point_in_f:number,
            precipitation_in_mm:number,
            precipitation_in_in:number,
            chances_of_rain:number,
            chances_of_snow:number,
            feels_like_c:number,
            feels_like_f:number,
            current_condition:string
        }
    }

    const [hourlyData,setHourlyData]=useState([]);
    const [forecastDate,setForecastDate] = useState<string>();
    const [time,setTime] = useState<string>('');
    const [icon,setIcon] = useState<string>('')
    const [temp,setTemp] = useState<string>();
    const [wind,setWind] = useState<windtype["wind"]>();
    const [pressure,setPressure] = useState<windtype['pressure']>();
    const [otherData,setOtherData] = useState<windtype['other']>();

    useEffect(() => {
        if(props.data!==undefined){
            setHourlyData(props.data.hour)
            setForecastDate(props.data.date)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data.hour])

    useEffect(()=>{
        if(hourlyData!==undefined&&hourlyData.length>0){
            getHour(hourlyData[0])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[hourlyData])

    const d = new Date(forecastDate!==undefined?forecastDate:"");

    let format = sessionStorage.getItem("format");

    const getDays = () =>{
        if(d.getDay()===0)
        return "Sunday";
        if(d.getDay()===1)
        return "Monday";
        if(d.getDay()===2)
        return "Tuesday";
        if(d.getDay()===3)
        return "Wednesday";
        if(d.getDay()===4)
        return "Thursday";
        if(d.getDay()===5)
        return "Friday";
        if(d.getDay()===6)
        return "Saturday"
    }

    const getHour = (para:any) => {
        window.scrollTo(0,900);
        setTime(para.time);
        setIcon(para.condition.icon);
        setTemp(para.temp_c+","+para.temp_f);
        setWind({...wind,
        wind_deg:para.wind_degree,
        wind_dir:para.wind_dir,
        wind_in_kph:para.wind_kph,
        wind_in_mph:para.wind_mph,
        gust_in_kph:para.gust_kph,
        gust_in_mph:para.gust_mph
        });
        setPressure({...pressure,
        pressure_in:para.pressure_in,
        pressure_mb:para.pressure_mb,
        humidity:para.humidity
    });
    setOtherData({...otherData,
    visiblity_km:para.vis_km,
    visiblity_mi:para.vis_miles,
    uv_index:para.uv,
    heat_index_in_c:para.heatindex_c,
    heat_index_in_f:para.heatindex_f,
    dew_point_in_c:para.dewpoint_c,
    dew_point_in_f:para.dewpoint_f,
    precipitation_in_mm:para.precip_mm,
    precipitation_in_in:para.precip_in,
    chances_of_rain:para.chance_of_rain,
    chances_of_snow:para.chance_of_snow,
    feels_like_c:para.feelslike_c,
    feels_like_f:para.feelslike_f,
    current_condition:para.condition.text
    });
    }
    
    
    return<section className='result-forecast-div'>
    <nav className='result-hourly-forecast-header'><p>Hourly Weather Forecast</p><p>{getDays()} , {String(forecastDate).slice(5, 7).concat("/").concat(String(forecastDate).slice(8, 10))}</p></nav>
    <section className="result-hourly-forecast-data">
        <div className={time.length===0?'result-forecast-main-empty': 'result-forecast-main'}><p>{String(time).slice(11,16)}</p>
        <img src={icon} alt=""/>
        <p>{otherData?.current_condition}</p>
        <div className='result-forecast-info'>
            <p><span>Temperature</span>
            {format==="C"?String(temp).slice(0,String(temp).indexOf(','))+'°C':String(temp).slice(String(temp).indexOf(',')+1,String(temp).length)+'°F'}
            </p>
            <p><span>Feels like</span>{format==="C"?otherData?.feels_like_c+"°C":otherData?.feels_like_f+"°F"}</p>
            <p><span>Wind</span>{wind?.wind_deg}° {wind?.wind_dir} {format==="C"? wind?.wind_in_kph+" Km/h":wind?.wind_in_mph+" mph"}</p>
            <p><span>Pressure</span>{format==="C"? "↔"+pressure?.pressure_mb+"mb":"↔"+pressure?.pressure_in+"in"}</p>
            <p><span>Humidity</span>{pressure?.humidity}%</p>
            <p><span>Visiblity</span>{format==="C"?otherData?.visiblity_km+"km":otherData?.visiblity_mi+"miles"}</p>
            <p><span>Gust</span>{format==="C"?wind?.gust_in_kph+"km/h":wind?.gust_in_mph+"mph"}</p>
            <p><span>UV index</span>{otherData?.uv_index}</p>
            <p><span>Heat index</span>{format==="C"?otherData?.heat_index_in_c+"°C":otherData?.heat_index_in_f+"°F"}</p>
            <p><span>Dew Point</span>{format==="C"?otherData?.dew_point_in_c+"°C":otherData?.dew_point_in_f+"°F"}</p>
            <p><span>Precipitation</span>{format==="C"?otherData?.precipitation_in_mm+"mm":otherData?.precipitation_in_in+"in"}</p>
            <p><span>Heat index</span>{format==="C"?otherData?.heat_index_in_c+"°C":otherData?.heat_index_in_f+"°F"}</p>
            <p><span>Chances of Rain</span>{otherData?.chances_of_rain}%</p>
            <p><span>Chances of Snow</span>{otherData?.chances_of_snow}%</p>
            
            </div></div>
        <div className= 'result-forecast-single-box'>{hourlyData.map((params:any,index:number)=>{
        return<section className='result-hourly-forecast-box' key={index} onClick={()=>getHour(params)}>
            <p>{String(params.time).slice(11,16)}</p>
        <img src={params.condition.icon} alt={params.condition.text}/>
        <p>{format==='C'?params.temp_c+"°C":params.temp_f+"°F"}</p>
        <p>{params.condition.text}</p>
        </section>
    })}
    </div>
    </section>
    <h6 className='bottom-footer'>Thanks to <span onClick={()=>window.open("http://weatherapi.com","_blank")}>WeatherApi.com</span></h6>

    </section>
}

export default Detail;