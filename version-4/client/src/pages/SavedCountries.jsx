import React from 'react';
import { useState, useEffect } from 'react';
import { Stack } from "@chakra-ui/react";
import CountryCard from "../customComponents/CountryCard"


export default function savedCountries() {
  //add required props
  //----useState for the user----
  const [userData, setUserData] = useState(null)

  //----useState to save countries----
  // const [SavedCountries, setSavedCountries] = useState(null)

  //----useState to link the two apis----
  const [apiSavedCountries, setApiSavedCountries] = useState(null)

  //useState for form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country_name: '',
    bio: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    let dataObj = formData;
    // console.log(dataObj);
    // console.log(JSON.stringify(formData))

    //----send dataObj to backend----

    //----checks the data that is going to be sent to api----
    console.log(formData, "in submit")

    //----fetch to send the data to the api----****
    fetch('/api/add-one-user', {
      //----tells the fetch that we are posting data to the api----
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        country_name: formData.country_name,
        email: formData.email,
        bio: formData.bio
      }
      )
    }).then(() => {
      console.log("pushed form data to backend")
    })
    // Reset the form
    setFormData({ name: '', email: '', country_name: '', bio: '' });
  };

  //-----------leaving this to make sure I have it for version 2 but the api end point for it below works
  // useEffect(() => {
  //   // if (localStorage.getItem("profile")) {
  //   //   let profileInfo = JSON.parse(localStorage.getItem("profile"))
  //   //   setUser(profileInfo.name)
  //   // }
  //   fetch('/api/get-newest-user', {
  //     //tells the fetch that we are getting data from the api
  //     method: 'GET',
  //     headers: { "Content-Type": "application/json" },
  //   }), []
  // }
  // )

  const retrieveUserData = () => {
    fetch('/api/get-newest-user', {
      //----tells the fetch that we are getting data from the api----
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }).then(response => response.json())
      .then(userApiData => {
        console.log(userApiData, "user Data")
        setUserData(userApiData)
      })
      .catch(error => setError('Error: ' + error.message));
  }

  const retrieveUserCountryData = () => {
    fetch('/api/get-all-saved-countries', {
      //----tells the fetch that we are getting data from the api----
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }).then(response => response.json())
      .then(userSavedCountries => {
        console.log(userSavedCountries, "user country Data")
        setApiSavedCountries(userSavedCountries)
      })
      .catch(error => setError('Error: ' + error.message));
  }

  const filterAPIData = () => {

    //---- empty array to store the objects that pass the filter
    const savedCountriesObjects = []
    //----loop over each country from the instructor's api----
    apiSavedCountries.forEach(apiCountry => {
      //----assign each country a variable based on its country_name value----
      const apiCountryName = apiCountry.country_name
      //----find the array of country objects from the rest api ----
      const filteredCountries = savedCountriesObjects.find(
        //---- checks the name of the country in the country api against the name stored in the instructors api
        (restfulCountryObject) => {
          if (apiCountryName === restfulCountryObject.name.common) {
            return true
          } else {
            return false
          }
        })
        console.log(filteredCountries, "filtered countries")
ƒ    });

  }
  ///const = savedCountryName =
  // restCountryArray.filter((country) => {
  //   if (country_name ===country.name.common) {
  //     return 
  //   }
  // })
  // console.log(savedCountries, "savedCountries")

  useEffect(() => {
    // const userSavedCountries = JSON.parse(localStorage.getItem("userSavedCountries"));
    // setSavedCountries(userSavedCountries);
    retrieveUserData();
    retrieveUserCountryData();
    if (apiSavedCountries) {filterAPIData()};
  }, []);



  return (
    <>
      {/* div for form ternary */}
      <div>
        {userData &&
          <div>
            welcome {userData[0].name}
          </div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name"></label>
          <input
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="email"></label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="country"></label>
          <input
            placeholder="Country"
            type="text"
            name="country_name"
            id="country_name"
            value={formData.country_name}
            onChange={handleChange}
          />
          <label htmlFor="bio">

            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
          </label>
          <button type="submit">Submit</button>
        </form>

      </div>
      {/* div for saved countries ternary */}
      <div>
        {savedCountries && savedCountries.length > 0 ? (<Stack gap="4" direction="row" wrap="wrap">

          {apiSavedCountries.map((apiSavedCountry) => {
            // console.log(savedCountry, "inloop")
            return (<CountryCard country={apiSavedCountry} />
            )
          })}
        </Stack>) :
          (
            <div>
              Nothing Saved
            </div>
          )
        }
      </div>
    </>
  )
}