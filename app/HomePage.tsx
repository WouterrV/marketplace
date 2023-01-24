/** @jsxImportSource @emotion/react */

'use client'

// Next, React
import Head from 'next/head'
import Image from 'next/image'
import * as React from 'react'

// Styling
import { css } from '@emotion/react'

// Marketplace components
import HomepageOfferCard from '../components/HomepageOfferCard'

// Chakra
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    FormLabel,
    FormControl,
    Stack,
    Text,
} from '@chakra-ui/react'

// nhost
import { gql, useQuery } from '@apollo/client'

const GET_LISTINGS = gql`
    query GetListings {
        listings {
            title
            description
            id
            slug
        }
    }
`

export default function Home() {
    const {
        loading,
        data: listingsData,
        error: listingsDataError,
    } = useQuery(GET_LISTINGS)

    console.log('listingsData: ', listingsData)

    let Listings = listingsData?.listings.map((d: any) => {
        return (
            <HomepageOfferCard
                key={d.id}
                description={d.description}
                title={d.title}
                image={d.image || 'https://loremflickr.com/320/240'}
                price={d.price}
                slug={d.slug}
            />
        )
    })

    return (
        <Flex className="homepage" flexDirection={'column'} py={4} px={4}>
            <Text fontSize="2xl" mb={2}>
                Offers picked just for you
            </Text>

            <Flex
                flexDirection={'row'}
                columnGap={5}
                rowGap={5}
                flexWrap="wrap"
            >
                {Listings}
            </Flex>
        </Flex>
    )
}
