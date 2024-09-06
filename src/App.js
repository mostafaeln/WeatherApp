import { useState } from "react";
import './App.css';
import HomePage from './pages/homepage';
import AddingModal from "./Components/AddingModal";
import { cities } from "./Components/LocationsData";

function App() {
  const [ModalOpened , SetModalOpened] = useState(false);
  const [wantedCities , setWantedCities] = useState([]);
  let check=0
  const [allcities , setallcities] =useState(cities);
 //console.log("All cities" , allcities);
  function OpenModal() {
    SetModalOpened(true);
  }
  function CloseModal() {
    SetModalOpened(false);
  }
function firstadd(location) {
  //console.log("First add");
  if(check<1) {
  const updatedAllCities = allcities.map((city) =>
    city.name === location ? { ...city, added: true } : city
  );
  setallcities(updatedAllCities);
}
check++;
}


  function locationAdjuster(location ,currentcity ) {
    const updatedAllCities = allcities.map((city) =>
      city.name === location ? { ...city, added: true } : city
    );
    setallcities(updatedAllCities);
    
    setWantedCities((prevwantedcities) => 
      prevwantedcities.filter((item) => item.name !== location)
    );
    const updatedAllCitieswithprev = allcities.map((city) =>
      city.name === currentcity ? { ...city, added: true } : city
    );
    setallcities(updatedAllCitieswithprev);
    setWantedCities((prevwantedcities) => {
      let cityToAdd = allcities.find((city) => city.name === currentcity);
  
     
     
      if (!cityToAdd) {
        console.error(`City with name '${currentcity}' not found in allcities.`);
        return prevwantedcities; // Return previous state if city is not found
      }
     
      cityToAdd = { ...cityToAdd, added: true };
      return [...prevwantedcities, cityToAdd];
    });
    
    
  }
  function AddNewCity(Newcity) {
    setWantedCities((prevCities) => {
     
      const cityExists = prevCities.some((city) => city.name === Newcity.name);
      
      if (cityExists) {
        
        return prevCities; 
      } else {
        const updatedAllCities = allcities.map((city) =>
          city.name === Newcity.name ? { ...city, added: true } : city
        );
        setallcities(updatedAllCities);
        
        return [...prevCities, {...Newcity ,added:true}];
         
      }
      
    });
    //console.log(wantedCities)

  }
  return (
   <>
   <AddingModal isOpen={ModalOpened} OnClose={CloseModal} AddCity={AddNewCity} City={allcities} Message={"city already added"} />
   <HomePage OnOpen={OpenModal} addedCities={wantedCities} locationadjuster={locationAdjuster} firstadd={firstadd}/>
  
   </>
  );
}

export default App;
