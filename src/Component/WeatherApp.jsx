import { useEffect } from "react"
import { useRef, useState } from "react"

// 
function WeatherApp() {
    let [city ,setCity] = useState("not Found🤖")
    let [temp,setTemp] = useState(null)
    let [desc,setDesc] = useState(null)
    
    
    const cityref = useRef("Enter city please")
    useEffect(()=>{

        const fetchData= async()=>{
            let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d2620260bc65f1da55df07eafb0b41b`);
            let weatherData = await resp.json();
            console.log('>>>>>>>>>>>', weatherData)
            let temperature = (weatherData.main.temp-271.15).toFixed(1) ;
            let desc = weatherData.weather[0].description
            console.log('>>>>>>>>>>>', desc)

            console.log('>>>>>>>>>>>', temperature)
            console.log('>>>>>>>>>>>', desc)
            setTemp(temperature)
         
          

        }
        fetchData();


    },[city])

    
    const cityHandler=()=>{
        setCity(cityref.current.value)
        
    }

  return (
    <>
    <div className="cont h-screen w-screen bg-slate-700  flex justify-center items-center"  > 
          <div className="card h-[30rem] w-[20rem] bg-slate-400 rounded-lg flex  items-center flex-col gap-6 shadow-lg">
            {/* input  */}
            <div className="input w-screnn mt-8 ">
                <input type="text"placeholder="enter city" 
                className=" border-none h-9 ps-3 rounded-full "
                ref={cityref}
                onChange={cityHandler}
                />
            </div>
            {/* info  */}
            <div className="info bg-slate-300 w-[100%] h-[100%] flex flex-col justify-center items-center gap-2 rounded-lg">
                {/* location  */}
             <div className="location"><h1 className="font-semibold text-3xl">{city}</h1></div>
             {/* temp  */}
        
             <div className="temp font-thin text-5xl"><h1>{temp}</h1></div>
            {/* extra info */}
            <div className="extra"><h2>{desc}</h2></div>
            </div>
          </div>
    </div>
    </>
  )
}

export default WeatherApp