import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountryCard from "../customComponents/CountryCard"
import { HiHeart } from "react-icons/hi";
import { Icon } from "@chakra-ui/react";


export default function CountryDetails({ countries }) {

    let [savedCountries, setSavedCountries] = useState([]);
    let [count, setCount] = useState(0);
    let { individualCountry } = useParams();

    const filteredCountry = countries.find(country => {
        //console.log(country.name.official);
        return country.name.official === individualCountry;
    });

        function handleSave() {
        //gets saved countries from local storage and saves them into a variable
        let userSavedCountries =  JSON.parse(localStorage.getItem("userSavedCountries")) || [];
        
        //console.log(userSavedCountries,"userSavedCountries");

           //returns the name of the country we are trying to save if it is in the saved countries list
        let userCountryToSave = userSavedCountries.find(savedCountry => {
            //console.log(savedCountry.name.official);
            return savedCountry.name.official === individualCountry;
        });
        //console.log(userCountryToSave, "user saved this country");
        // if the country we are trying to save is not in the list of countries already saved, it pushes that country to local storage
        if (userCountryToSave === undefined) {
            //add the current country to the array of saved countries
            const updatedSavedCountries = [...userSavedCountries, filteredCountry]; 
            //updates the saved country state with the new array
            setSavedCountries(updatedSavedCountries);
            //push to local storage
            localStorage.setItem("userSavedCountries", JSON.stringify(updatedSavedCountries));
        };
    };
        
    function getCount () {
        let loadedCount = JSON.parse(localStorage.getItem(`${individualCountry}Count` || 0));
        let newCount = loadedCount + 1;
        setCount(newCount);
        localStorage.setItem(`${individualCountry}Count`, JSON.stringify(newCount));
    }

    //console.log(filteredCountry, "filtered countries");


    useEffect(() => {
        const userSavedCountries = JSON.parse(localStorage.getItem("userSavedCountries")) || [];
        setSavedCountries(userSavedCountries);
        getCount();
    }, []);

    return (
        <>
            <CountryCard country={filteredCountry} >
            <Icon fontSize="2xl" color="pink.700" >
                <HiHeart onClick={handleSave} />
            </Icon>
            <p>{count}</p>
            </CountryCard>
        </>
    )
}