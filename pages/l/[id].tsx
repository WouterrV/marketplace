// Next, React
import React from 'react'
import { useRouter } from 'next/router'

import { gql, useQuery } from '@apollo/client'

const OneListing = () => {
    // Split the url into the UUID and the title, use UUID to retrieve the listing
    // eh, just use the pretty title for doing all that
    const router = useRouter()

    const {
        query: { id: prettyListingId },
    } = router

    console.log(prettyListingId)

    return (
        <div>
            <h2>Listing title</h2>
            <p>Listing description</p>
        </div>
    )
}

export default OneListing
