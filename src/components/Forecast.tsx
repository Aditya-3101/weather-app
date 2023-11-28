import React,{useState,useLayoutEffect, ChangeEvent, MouseEventHandler} from "react";
import Detail from "./DetailPage";


const Forecast = (props:any) => {
    const [data,setData] = useState<any>([]);
    const [location,setLocation]=useState<String>();
    const [flag,setFlag]=useState<boolean>(false);
    const [hourlyData,setHourlyData]=useState();    

    useLayoutEffect(()=>{
        if(props.data!==undefined){
        setData(props.data.forecast.forecastday);
        setLocation(props.data.location.name);
        setFlag(false);
        }
    },[props])

    useLayoutEffect(()=>{
        sessionStorage.setItem("format","C")
    },[])

    const clickHandler = (params:ChangeEvent<MouseEventHandler>|any) => {
        setFlag(true);
        console.log(params);
        setHourlyData(params);
    }

    return<section className="forecast-section"><nav>3 Day Weather Forecast</nav>
    <div className="forecast-container">{data.map((para:string|any,index:number)=>{
        return<section key={index} className="result-forecast-container" onClick={()=>clickHandler(para)}>
            <div className="result-forecast-dates-location"><p>{location}</p><p className="result-forecast-dates">{String(para.date).slice(5, 7).concat("/").concat(String(para.date).slice(8, 10))}</p></div>
            <img src={para.day.condition.icon} alt={para.day.condition.text} />
            <div className="result-forecast-temp-container"><p>{(sessionStorage.getItem("format")==="C")===true? para.day.maxtemp_c+"°C":para.day.maxtemp_f+"°F"}</p><p> | </p><p>{sessionStorage.getItem("format")==="C"? para.day.mintemp_c+"°C":para.day.mintemp_f+"°F"}</p></div>
            <p className="result-forecast-condition">{para.day.condition.text}</p>
            </section>;
    })}</div>
    {flag===true?<Detail data={hourlyData}/>:''}
    </section>
}

export default Forecast;
