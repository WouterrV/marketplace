// Next, React
import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

// Apollo
import { gql, useQuery } from '@apollo/client'

const GET_LISTING = gql`
    query GetListing($slug: String!) {
        listings(where: { slug: { _eq: $slug } }) {
            title
            description
            id
            images
            slug
        }
    }
`

// Chakra
import { Flex, Text, Heading } from '@chakra-ui/react'

const OneListing = () => {
    const router = useRouter()

    const {
        query: { id: slug },
    } = router

    const {
        loading,
        data,
        error: listingsDataError,
    } = useQuery(GET_LISTING, {
        variables: { slug },
    })

    console.log('data: ', data)

    let listingData =
        data && data?.listings && data?.listings.length > 0
            ? data['listings'][0]
            : null

    let imagesArr = []

    try {
        if (listingData?.images) {
            imagesArr = JSON.parse(listingData?.images)
        }
    } catch (e) {
        console.error('error parsing images: ', e)
    }

    // const Images = imagesArr.map((url: string) => {
    //     console.log('one image url: ', url)
    //     return <Image src={url} alt="" key={url} />
    // })

    return (
        <Flex className="homepage" flexDirection={'column'} py={4} px={4}>
            <Heading fontSize="xl">{listingData?.title}</Heading>
            <Text color={'blue.500'} fontSize="sm">
                {listingData?.description}
            </Text>
        </Flex>
    )
}

export default OneListing
