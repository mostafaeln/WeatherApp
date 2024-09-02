import axios from 'axios';

const API_KEY = '59b4b2ab1df24f61a4c55055243008';
const BASE_URL_Data = 'https://api.worldweatheronline.com/premium/v1/weather.ashx';
const BASE_URL_Statistics = 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx';
export const getWeatherData = async (location) => {
  try {
    const response = await axios.get(BASE_URL_Data, {
      params: {
        key: API_KEY,
        q: location,
        format: 'json',
        num_of_days: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
const getPastDates = (days) => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days);
  
    const formatDate = (date) => date.toISOString().split('T')[0];
  
    return {
      startDate: formatDate(startDate),
      endDate: formatDate(today),
    };
  };
export const getWeatherStatistics = async (city) => {
    const { startDate, endDate } = getPastDates(7);
    
    const response = await axios.get(BASE_URL_Statistics, {
      params: {
        key: API_KEY,
        q: city,
        format: 'json',
        date: startDate,  
        enddate: endDate,  
      }
    });
    return response.data;
  };