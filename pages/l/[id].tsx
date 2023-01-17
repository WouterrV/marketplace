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

    console.log('imagesArr: ', imagesArr)

    const Images = imagesArr.map((url: string) => {
        return (
            <Flex className="imageContainer" p={4} key={url}>
                <Image src={url} alt="" width="500" height="500" />
            </Flex>
        )
    })

    return (
        <Flex
            className="page"
            flexDirection={'column'}
            py={4}
            px={4}
            justifyContent="flex-start"
            alignItems={'center'}
        >
            <Flex
                className="firstRow"
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignSelf="stretch"
            >
                <Flex
                    className="listingCard"
                    flexDirection="column"
                    justifyContent="stretch"
                    flexGrow={1}
                    maxWidth="800px"
                    p={4}
                    m={4}
                    borderRadius="lg"
                    background="white"
                >
                    <Heading fontSize="xl">{listingData?.title}</Heading>
                    <Text color={'blue.500'} fontSize="sm">
                        {listingData?.description}
                    </Text>
                    {Images}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default OneListing
