import React from 'react';
import { For, Stack } from "@chakra-ui/react";
import CountryCard from "../customComponents/CountryCard";
import { useEffect, useState } from 'react';

export default function Home({ countries }) {

  const [userFilteredCountries, setUserFilteredCountries] = useState(countries);
  
  useEffect(() => {
    setUserFilteredCountries(countries);
  }, [countries]);

  return <>

    <Stack gap="4" direction="row" wrap="wrap">
      <For each={userFilteredCountries} >
        {(userFilteredCountry) => (
          <CountryCard country={userFilteredCountry} key={userFilteredCountry.name.official} />
        )}
      </For>
    </Stack>
  </>
}