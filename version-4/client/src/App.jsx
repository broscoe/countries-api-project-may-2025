import './App.css'
import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import SavedCountries from './pages/SavedCountries';
import Header from "./customComponents/Header.jsx";



function App() {
  //use state to store the countries data
  const [countries, setCountries] = useState([]);
  const [user, setUserData] = useState(null)

  //api call to fetch the countries data
  const apiCall = () => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCountries(data)
      })
  }

  const userDataApiCall = () => {
    fetch('/api/get-newest-user', {
      //tells the fetch that we are getting data from the api
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(userApiData => {
        console.log(userApiData)
        setUserData(userApiData)
      })
  }
  //useEffect to call the api
  useEffect(() => {
    apiCall();
    userDataApiCall();
  }, []);





  return (
    <>

      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home countries={countries} />} />
          <Route path="/SavedCountries" element={<SavedCountries countries={countries}  user={user}/>} />
          <Route path="/Country/:individualCountry" element={<CountryDetails countries={countries} />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
