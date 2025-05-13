import React from 'react';
import { Card } from "@chakra-ui/react"
import { Avatar } from "../components/ui/avatar"
import { Link } from 'react-router-dom';    

export default function CountryCard({country}) {
    
    return (
        <Card.Root key={country.name.official}>
                                <Link to={`/Country/${country.name.official}`}>
                                <Card.Body gap="2">
                                    <Avatar
                                        src={country.flags.png}
                                        name={country.name.official}
                                        size="xxlg"
                                        shape="rounded"
                                    />
                                    <Card.Title mb="2">{country.name.official}</Card.Title>
                                    <Card.Description>
                                        <div>
                                            <p>population: {country.population}</p>
                                            <p>Region: {country.region}</p>
                                            <p>Capital: {country.capital}</p>
                                        </div>
                                    </Card.Description>
                                </Card.Body>
                                </Link>
                            </Card.Root>
    )

}