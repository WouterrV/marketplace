// Next, React
import React from 'react'
import { useRouter } from 'next/router'

import { gql, useQuery } from '@apollo/client'

const GET_LISTING = gql`
    query GetListing($slug: String!) {
        listings(where: { slug: { _eq: $slug } }) {
            title
            description
            id
            slug
        }
    }
`

const OneListing = () => {
    const router = useRouter()

    const {
        query: { id: slug },
    } = router

    const {
        loading,
        data: { listings: listingsReceived },
        error: listingsDataError,
    } = useQuery(GET_LISTING, {
        variables: { slug },
    })

    let listingData = listingsReceived[0]

    return (
        <div>
            <h2>{listingData.title}</h2>
            <p>{listingData.description}</p>
        </div>
    )
}

export default OneListing
