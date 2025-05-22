import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountryCard from "../customComponents/CountryCard"
import { HiHeart } from "react-icons/hi";
import { Button, Icon } from "@chakra-ui/react";


export default function CountryDetails({ countries }) {

    let [savedCountries, setSavedCountries] = useState([]);

    let { individualCountry } = useParams();

    const filteredCountry = countries.find(country => {
        console.log(country.name.official)
        return country.name.official === individualCountry
    })

    useEffect(() => {
        const userSavedCountries = JSON.parse(localStorage.getItem("userSavedCountries")) || [];
        setSavedCountries(userSavedCountries);

    }, []);

    function handleSave() {
        if (!filteredCountry) return;


        const updatedSavedCountries = [...savedCountries, filteredCountry]; // Create a new array instead of modifying state directly
        setSavedCountries(updatedSavedCountries);
        localStorage.setItem("userSavedCountries", JSON.stringify(updatedSavedCountries));

        console.log(updatedSavedCountries, "userSavedCountries")


    };


    console.log(filteredCountry, "filtered countries")

    return (
        <>
            <CountryCard country={filteredCountry} >
                {/* <a href="" onClick={handleSave}>
                <Button >save</Button>
            </a> */}
            <Icon fontSize="2xl" color="pink.700" >
                <HiHeart onClick={handleSave} />
            </Icon>

            </CountryCard>
            
            
        </>
    )
}