import React from 'react';
import { ColorModeButton } from "../components/ui/color-mode";
import { Button } from "../components/ui/button"
import { Icon, Heading } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
                <Link to="/">
                <Heading size="4xl">Where in the world?</Heading>
                </Link>
                <Link to="/SavedCountries">
                    <Button size="md">
                        <Icon fontSize="2xl" color="pink.700">
                            <HiHeart />
                        </Icon>
                        Saved Courntries
                    </Button>
                </Link>
                <ColorModeButton />
            </>
            )
}