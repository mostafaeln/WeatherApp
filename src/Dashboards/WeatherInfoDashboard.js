import React, { useState, useEffect } from 'react';
import { getWeatherData, getWeatherStatistics } from '../Components/WeatherData';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
const WeatherInfoDashboard = ({ city  ,NightTime}) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherStats, setWeatherStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await getWeatherData(city);
        setCurrentWeather(weatherData.data);

        const statsData = await getWeatherStatistics(city);
        setWeatherStats(statsData.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [city]);
  console.log(weatherStats);
  useEffect(() => {
    if (weatherStats) {
      const svg = d3.select('#d3-chart')
        .attr('width', '100%') 
        .attr('height', 400); 

      svg.selectAll('*').remove(); 

      const data = weatherStats.weather; 
      const margin = { top: 20, right: 20, bottom: 60, left: 60 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.maxtempC)]).nice()
        .range([height, 0]);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      g.append('g')
        .selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', d => x(d.date))
        .attr('y', d => y(d.maxtempC))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.maxtempC))
        .attr('fill', NightTime ? 'steelblue' : 'lightblue');

      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x)
          .tickSize(10)
          .tickPadding(10)
          .tickFormat(d => d)); 

      g.append('g')
        .call(d3.axisLeft(y)
          .tickSize(10)
          .tickPadding(10));

      g.append('text')
        .attr('transform', `translate(${width / 2},${height + margin.bottom - 10})`)
        .style('text-anchor', 'middle')
        .text('Date');

      g.append('text')
        .attr('transform', `rotate(-90)`)
        .attr('y', 0 - margin.left + 10)
        .attr('x', 0 - (height / 2))
        .style('text-anchor', 'middle' )
        .text('Max Temperature (°C)');
    }
  }, [weatherStats, NightTime]);
  useEffect(() => {
    if (weatherStats) {
      const svg = d3.select('#d3-chartt')
        .attr('width', '100%') 
        .attr('height', 400); 

      svg.selectAll('*').remove();

      const data = weatherStats.weather; 
      const margin = { top: 20, right: 20, bottom: 60, left: 60 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.mintempC)]).nice()
        .range([height, 0]);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      g.append('g')
        .selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', d => x(d.date))
        .attr('y', d => y(d.mintempC))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.mintempC))
        .attr('fill', NightTime ? 'steelblue' : 'lightblue');

      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x)
          .tickSize(10)
          .tickPadding(10)
          .tickFormat(d => d)); 

      g.append('g')
        .call(d3.axisLeft(y)
          .tickSize(10)
          .tickPadding(10));

      g.append('text')
        .attr('transform', `translate(${width / 2},${height + margin.bottom - 10})`)
        .style('text-anchor', 'middle')
        .text('Date');

      g.append('text')
        .attr('transform', `rotate(-90)`)
        .attr('y', 0 - margin.left + 10)
        .attr('x', 0 - (height / 2))
        .style('text-anchor', 'middle' )
        .text('Min Temperature (°C)');
    }
  }, [weatherStats, NightTime]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 2, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`w-1/2 min-h-full mx-auto p-6 rounded-lg shadow-lg ${
        NightTime ? "bg-blue-700" : "bg-blue-900"
      } mt-10 mb-10`}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-3xl font-bold mb-4 text-center"
      >
        Weather Dashboard for {city}
      </motion.h1>

      <div className="mb-8">
        {currentWeather && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className={`${ !NightTime ? "bg-blue-700" :"bg-blue-900" } p-4 rounded-lg shadow-md mb-4`}
          >
            <h2 className="text-2xl font-semibold mb-2">Current Weather</h2>
            <p className="text-lg">Temperature: {currentWeather.current_condition[0].temp_C} °C</p>
            <p className="text-lg">Humidity: {currentWeather.current_condition[0].humidity} %</p>
            <p className="text-lg">Feels Like : {currentWeather.current_condition[0].FeelsLikeC}°C</p>
            <p className="text-lg">Pressure : {currentWeather.current_condition[0].pressure} hPa</p>
           
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5}}
        className={`${ !NightTime ? "bg-blue-700" :"bg-blue-900" } p-4 rounded-lg shadow-md mb-10`}
      >
        <h2 className="text-2xl font-semibold mb-4">Today's Weather Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Attribute
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-blue-700 divide-y divide-gray-200">
              {weatherStats && weatherStats.weather.length > 0 && (
                <>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Date
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {weatherStats.weather[7].date}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Max Temp (°C)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {weatherStats.weather[7].maxtempC}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Min Temp (°C)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {weatherStats.weather[7].mintempC}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Average Temp (°C)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {weatherStats.weather[7].avgtempC}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Sun Hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {weatherStats.weather[7].sunHour}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Total Snow (cm)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {weatherStats.weather[7].totalSnow_cm}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      UV Index
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {weatherStats.weather[7].uvIndex}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Sunrise
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {weatherStats.weather[7].astronomy[0].sunrise}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Sunset
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {weatherStats.weather[7].astronomy[0].sunset}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Last 7 Days Stats</h2>
        <div className="overflow-x-auto">
          <motion.svg
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            id="d3-chart"
            className="w-[650px]"
          ></motion.svg>
           <motion.svg
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            id="d3-chartt"
            className="w-[650px]"
          ></motion.svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherInfoDashboard;
