import { useState, useEffect } from "react";
import clouds from "../pictures/clouds-unscreen.gif";
import { getWeatherData } from '../Components/WeatherData';
import { findNearestCity } from "../Components/LocationsData";
import WeatherInfoDashboard from "../Dashboards/WeatherInfoDashboard";

import WeatherLandingDisplay from "../Dashboards/WeatherLandingDisplay";

export default function HomePage({ OnOpen, addedCities ,locationadjuster ,firstadd}) {
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentcity , setCurrentCity] = useState(null);
  const [isNightTime, setIsNightTime] = useState(false);
  const [isInfoShown, setIsInfoShown] = useState(false);

  function locationHandler(LocationName) {
    //console.log("current city " + currentcity);
    locationadjuster(LocationName ,currentcity);
    setCurrentCity(LocationName);
    setLocation(LocationName);

  
    
  }

  useEffect(() => {
   
    const fetchWeather = async (city) => {
      try {
        const data = await getWeatherData(city);
        if (data && data.data && data.data.current_condition) {
          setWeather(data.data.current_condition[0]);
          //console.log(data.data.weather[0].astronomy[0].sunrise);
          const now = new Date();

          const sunrise = new Date();
          const sunset = new Date();

          sunrise.setHours(parseInt(data.data.weather[0].astronomy[0].sunrise.split(':')[0]) + (data.data.weather[0].astronomy[0].sunrise.includes('PM') ? 12 : 0));
          sunrise.setMinutes(parseInt(data.data.weather[0].astronomy[0].sunrise.split(':')[1]));

          sunset.setHours(parseInt(data.data.weather[0].astronomy[0].sunset.split(':')[0]) + (data.data.weather[0].astronomy[0].sunset.includes('PM') ? 12 : 0));
          sunset.setMinutes(parseInt(data.data.weather[0].astronomy[0].sunset.split(':')[1]));

          setIsNightTime(now < sunrise || now > sunset);
          const iconUrl = data.data.current_condition[0].weatherIconUrl[0].value;
          setWeatherIcon(iconUrl);
        } else {
          console.error('Invalid weather data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (navigator.geolocation && location === null) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const nearestCity = findNearestCity(latitude, longitude);
          setLocation(nearestCity);
          setCurrentCity(nearestCity);
          firstadd(nearestCity);
          fetchWeather(nearestCity);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else if (location) {
      fetchWeather(location);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [location ,firstadd]);


  useEffect(() => {
    
    document.body.style.overflow = isInfoShown ? 'auto' : 'hidden';
    return () => {
      
      document.body.style.overflow = 'auto';
    };
  }, [isInfoShown]);

  function ShowInfo() {
    setIsInfoShown(!isInfoShown);
  }

  return (
    <div className={`relative flex flex-col min-h-screen ${
      isNightTime
        ? "bg-gradient-to-b from-blue-950 to-blue-800"
        : "bg-gradient-to-b from-blue-300 to-blue-700"
    } text-white`}>
    
      <img
        src={clouds}
        className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
        alt="Clouds Background"
      />

      <div className="relative flex flex-col items-center justify-center z-10">
        <WeatherLandingDisplay isNightTime={isNightTime} isInfoShown={isInfoShown} weatherIcon={weatherIcon} weather={weather} OnOpen={OnOpen} locationHandler={locationHandler} location={location} ShowInfo={ShowInfo} addedCities={addedCities}/>
        {isInfoShown ? (
         
            <WeatherInfoDashboard city={location} NightTime={isNightTime} />
          
        ) : (
          <div className="bg-gradient-to-b from-blue-950 to-blue-800 h-screen"></div>
        )}
      </div>
    </div>
  );
}
