import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountryCard from "../customComponents/CountryCard"
import { HiHeart } from "react-icons/hi";
import { Button, Icon } from "@chakra-ui/react";


export default function CountryDetails({ countries }) {

    let [savedCountries, setSavedCountries] = useState([]);
    let [count, setCount] = useState(0);
    let { individualCountry } = useParams();

    const filteredCountry = countries.find(country => {
        console.log(country.name.official)
        return country.name.official === individualCountry
    })

    useEffect(() => {
        const userSavedCountries = JSON.parse(localStorage.getItem("userSavedCountries")) || [];
        setSavedCountries(userSavedCountries);
        getCount()
        sendCount();
    }, []);

    // function handleSave() {
    //     console.log(savedCountries.name.official.find(filteredCountry), "test find")
        
        //     const updatedSavedCountries = [...savedCountries, filteredCountry]; 
        // setSavedCountries(updatedSavedCountries);
        // localStorage.setItem("userSavedCountries", JSON.stringify(updatedSavedCountries));
        // }
        // console.log("clicked")

        function handleSave() {
            if (!filteredCountry) return;
        //check local storage
            //get array of objects from local storage
            //compare filtered country to the array of objects in local storage with find()
            //if returned country === filteredCountry then dont save
        //else save the country to local storage
        // saved item is in local storage
        //country name official
        // filteredCountry = countries.find(country => {
        //     console.log(country.name.official)
        //     return country.name.official === individualCountry
        let userSavedCountries =  JSON.parse(localStorage.getItem("userSavedCountries"))
           console.log(userSavedCountries,"userSavedCountries")

        let userSavedCountry = userSavedCountries.find(savedCountry => {
            console.log(savedCountry.name.official)
            return savedCountry.name.official === individualCountry
        })
        console.log(userSavedCountry, "user saved this country")
        if (userSavedCountry === undefined) {
            //push to local storage
            const updatedSavedCountries = [...savedCountries, filteredCountry]; // Create a new array instead of modifying state directly
            setSavedCountries(updatedSavedCountries);
            localStorage.setItem("userSavedCountries", JSON.stringify(updatedSavedCountries));
        }
           
        //
       
            
         
        // console.log(userSavedCountries, "userSavedCountries")
    //    console.log(updatedSavedCountries, "userSavedCountries")
    };
        

        


    // };

    function getCount () {
        let loadedCount = JSON.parse(localStorage.getItem(`${individualCountry}Count` || 0))
        setCount(loadedCount)
    }

    function sendCount () {
        localStorage.setItem(`${individualCountry}Count`, JSON.stringify(count+1));
         setCount(count+1);
    }

    console.log(filteredCountry, "filtered countries")

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