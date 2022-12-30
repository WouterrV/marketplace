/** @jsxImportSource @emotion/react */

// Next, React
import Head from 'next/head'
import Image from 'next/image'
import * as React from 'react'

// Styling
import { css } from '@emotion/react'

// Marketplace components
import TopMenu from '../components/TopMenu'

// nhost
import { gql, useQuery } from '@apollo/client'

const GET_LISTINGS = gql`
    query GetListings {
        listings {
            title
            description
            id
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
            <div key={d.id}>
                <h2>{d.title}</h2>
                <p>{d.description}</p>
            </div>
        )
    })

    console.log('Listings: ', Listings)

    return (
        <>
            <Head>
                <title>Marketplace</title>
                <meta
                    name="description"
                    content="Buy and sell second-hand items within the EU."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <TopMenu />

            <main>
                <p>Recent/relevant for you offers go here</p>
                {Listings}
            </main>
        </>
    )
}
