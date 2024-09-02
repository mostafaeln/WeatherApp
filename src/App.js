import { useState } from "react";
import './App.css';
import HomePage from './pages/homepage';
import AddingModal from "./Components/AddingModal";
import { cities } from "./Components/LocationsData";

//import WeatherInfoDashboard from "./pages/WeatherInfo";
function App() {
  const [ModalOpened , SetModalOpened] = useState(false);
  const [wantedCities , setWantedCities] = useState([]);
  
  const [allcities , setallcities] =useState(cities);
 //console.log("All cities" , allcities);
  function OpenModal() {
    SetModalOpened(true);
  }
  function CloseModal() {
    SetModalOpened(false);
  }
  function AddNewCity(Newcity) {
    setWantedCities((prevCities) => {
      // Check if the city is already in the array
      const cityExists = prevCities.some((city) => city.name === Newcity.name);
      
      if (cityExists) {
        
        return prevCities; // Return the same array without adding the city again
      } else {
        const updatedAllCities = allcities.map((city) =>
          city.name === Newcity.name ? { ...city, added: true } : city
        );
        setallcities(updatedAllCities);
        
        return [...prevCities, {...Newcity ,added:true}];
         // Add the new city
      }
      
    });
    console.log(wantedCities)

  }
  return (
   <>
   <AddingModal isOpen={ModalOpened} OnClose={CloseModal} AddCity={AddNewCity} City={allcities} Message={"city already added"} />
   <HomePage OnOpen={OpenModal} addedCities={wantedCities} />
  
   </>
  );
}

export default App;
