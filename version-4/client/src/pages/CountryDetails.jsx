import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountryCard from "../customComponents/CountryCard"
import { HiHeart } from "react-icons/hi";
import { Button, Icon } from "@chakra-ui/react";


export default function CountryDetails({ countries }) {

    let [count, setCount] = useState(0);
    let { individualCountry } = useParams();

    const filteredCountry = countries.find(country => {
        console.log(country.name.official, "filtering country")
        return country.name.official === individualCountry
    })

    const updateCount = () => {
        fetch('/api/update-one-country-count', {
            //----tells the fetch that we are posting data to the api----
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                country_name: individualCountry,
            }
            )
        }).then(response => response.json())
            .then(apiSavedCount => {
                console.log(apiSavedCount, "country count Data")
                setCount(apiSavedCount)
            });
    }

    const handleSave = () => {

        //
        fetch('/api/save-one-country', {
            //----tells the fetch that we are posting data to the api----
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                country_name: individualCountry,
            })
        }).then(response => response.text()).then(countryToSave => {
            console.log(countryToSave, "country being saved")

        })

    }


    useEffect(() => {
        updateCount();
    }, []);


    console.log(filteredCountry, "filtered countries")

    return (
        <>
            <CountryCard country={filteredCountry} >
                <Icon fontSize="2xl" color="pink.700" >
                    <HiHeart onClick={handleSave} />
                </Icon>
                <p>{count.newCount}</p>
            </CountryCard>


        </>
    )
};