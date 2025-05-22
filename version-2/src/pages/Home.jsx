import React from 'react';
import { For, Stack, Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Field } from "../components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "../components/ui/native-select";
import CountryCard from "../customComponents/CountryCard";
import { useEffect, useState } from 'react';

export default function Home({ countries }) {
  const [formData, setFormData] = useState({
    search: '',
  });

  const [userFilteredCountries, setUserFilteredCountries] = useState(countries);
  
  useEffect(() => {
    setUserFilteredCountries(countries);
  }, [countries]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setUserFilteredCountries(countries.filter(country => {
      return country.name.official.includes(...formData, search);
    }))
  };

  const FormComponent = () => (
    <FormControl>
      <FormLabel htmlFor="search">Search</FormLabel>
      <Field id="search" name="search" placeholder="Search countries" />
      <FormLabel htmlFor="search">Filter</FormLabel>
      <NativeSelectRoot>
        <NativeSelectField id="filter" name="filter">
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </NativeSelectField>
      </NativeSelectRoot>
      <FormLabel htmlFor="search">Search</FormLabel>
      <Input type="text" id="search" name="search" placeholder="Search" value={formData.search} onChange={handleChange} />
    </FormControl>
  );

  return <>

    {/* push name from obj saved to array to populate saved countries */}
    <FormComponent />

    <Stack gap="4" direction="row" wrap="wrap">
      <For each={userFilteredCountries} >
        {(userFilteredCountry) => (
          <CountryCard country={userFilteredCountry} key={userFilteredCountry.name.official} />
        )}
      </For>
    </Stack>
  </>
}