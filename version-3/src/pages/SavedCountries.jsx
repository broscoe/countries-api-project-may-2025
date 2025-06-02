import React from 'react';
import { useState, useEffect } from 'react';
import { Stack } from "@chakra-ui/react";
import CountryCard from "../customComponents/CountryCard"


export default function savedCountries() {
  //add required props
  //useState for the user
  let [user, setUser] = useState("")

  //useState to save countries
  let [savedCountries, setSavedCountries] = useState(null)

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

    //checks the data that is going to be sent to api
    console.log(formData, "in submit")

    //fetch to send the data to the api
    fetch('/api/add-one-user', {
      //tells the fetch that we are posting data to the api
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        country_name: formData.country_name,
        email: formData.email,
        bio: formData.bio
      })
    }

    ).then(() => {
      console.log("pushed form data to backend")
    })
    // Reset the form
    setFormData({ name: '', email: '', country_name: '', bio: '' });
  };

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      let profileInfo = JSON.parse(localStorage.getItem("profile"))
      setUser(profileInfo.name)
    }
  }, []
  )

  useEffect(() => {
    const userSavedCountries = JSON.parse(localStorage.getItem("userSavedCountries"));
    setSavedCountries(userSavedCountries);
  }, []);

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
          </form>)
        }
      </div>
      {/* div for saved countries ternary */}
      <div>
        {savedCountries && savedCountries.length > 0 ? (<Stack gap="4" direction="row" wrap="wrap">

          {savedCountries.map((savedCountry) => {
            // console.log(savedCountry, "inloop")
            return (<CountryCard country={savedCountry} />
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