import React from 'react';
import { useState, useEffect } from 'react';
import { Stack } from "@chakra-ui/react";
import CountryCard from "../customComponents/CountryCard"


export default function savedCountries() {

  //useState for the user
  let [user, setUser] = useState("")

  //useState to save countries
  let [savedCountries, setSavedCountries] = useState(null)

  //useState for form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
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

    //send dataObj to backend
    try {
      localStorage.setItem("profile", JSON.stringify(dataObj));
    }
    catch (error) {
      console.log(error);
    }
    // Reset the form
    setFormData({ name: '', email: '', country: '' });
  };

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      let profileInfo = JSON.parse(localStorage.getItem("profile"))
      setUser(profileInfo.name)
    }
    const userSavedCountries = JSON.parse(localStorage.getItem("userSavedCountries"));
    setSavedCountries(userSavedCountries);
  }, []
  )

  // console.log(savedCountries, "savedCountries")

  return (
    <>
    {/* div for form ternary */}
      <div>
        {user ? (
          <div>
            welcome {user}
          </div>
        ) : (
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
              type="country"
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
            />
            <label htmlFor="bio">

              <textarea value={formData.bio} onChange={handleChange} placeholder="Bio" />
            </label>
            <button type="submit">Submit</button>
          </form>)
        }
      </div>
        {/* div for saved countries ternary */}
      <div>
        { savedCountries && savedCountries.length > 0 ? (<Stack gap="4" direction="row" wrap="wrap">
          
          {savedCountries.map((savedCountry) => {
              // console.log(savedCountry, "inloop")
              return (<CountryCard country={savedCountry} />
              )
            })}
        </Stack>):
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