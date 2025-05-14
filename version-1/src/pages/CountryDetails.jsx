import { useParams } from 'react-router-dom';
import CountryCard from "../customComponents/CountryCard"


export default function CountryDetails({countries}) {

    let { individualCountry } = useParams();
   
    
    const filteredCountry = countries.find(country => {
        console.log(country.name.official)
        return country.name.official === individualCountry
    })
    console.log(filteredCountry)
    return (

        <CountryCard  country={filteredCountry}/>

    )
}