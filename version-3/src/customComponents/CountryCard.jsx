import React from 'react';
import { Card } from "@chakra-ui/react"
import { Avatar } from "../components/ui/avatar"
import { Link } from 'react-router-dom';

export default function CountryCard({ country, children }) {
    // console.log(country, "country")
    return (
        <>
            {(country) && <Card.Root >
                <Link to={`/Country/${country?.name?.official}`}>
                    <Card.Body gap="2">
                        <Avatar
                            src={country?.flags?.png}
                            name={country.name.official}
                            size="xxlg"
                            shape="rounded"
                        />
                        <Card.Title mb="2">{country.name.official}</Card.Title>
                        <Card.Description>population: {country.population}</Card.Description>
                        <Card.Description>Region: {country.region}</Card.Description>
                        <Card.Description>Capital: {country.capital}</Card.Description>
                        {children}
                    </Card.Body>
                </Link>
            </Card.Root>}
        </>
    )
}