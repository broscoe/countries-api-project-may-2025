import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import SavedCountries from './pages/SavedCountries';
import  Header  from "./customComponents/Header.jsx";



function App( ) {
  const [countries, setCountries] = useState([]);

  const apiCall = () => {
      fetch('https://restcountries.com/v3.1/all')
          .then(response => response.json())
          .then(data => {
              console.log(data)
              setCountries(data)
          })
          .catch(error => setError('Error: ' + error.message));
  }
  

  useEffect(() => {
      apiCall();
  }, []);


  


  return (
    <>
    
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home countries= {countries}/>}  />
          <Route path="/SavedCountries" element={<SavedCountries countries= {countries}/>} />
          <Route path="/Country/:individualCountry" element={<CountryDetails countries= {countries}/>} />
        </Routes>
      </div>
      
    </>
  );
}

export default App;
