/** @jsxImportSource @emotion/react */

// Next, React
import Head from 'next/head'
import Image from 'next/image'
import * as React from 'react'

// Styling
import { css } from '@emotion/react'

// MUI
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'

// Marketplace components
import TopMenu from '../components/TopMenu'

// nhost
import { gql } from '@apollo/client'

const GET_LISTINGS = gql`
  query GetListings() {
    listings{
      *
    }
  }
`

export default function Home() {
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
            </main>
        </>
    )
}
