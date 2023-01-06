// React, Next
import React from 'react'
import Image from 'next/image'

// Chakra
import { Flex, Text } from '@chakra-ui/react'
import { useTheme } from '@chakra-ui/react'

type THomePageOfferCardProps = {
    title: string
    description: string
    image: string
    price?: number
}

const HomepageOfferCard = ({
    title,
    description,
    image,
    price,
}: THomePageOfferCardProps) => {
    const theme = useTheme()

    console.log('theme: ', theme)

    return (
        <Flex
            className="offerCard"
            width={265}
            height={265}
            background="white"
            borderRadius="lg"
            flexDirection="column"
            justifyContent={'flex-start'}
            overflow="hidden"
        >
            <Flex
                className="imageContainer"
                width={265}
                height={187}
                position="relative"
                flexShrink={0}
            >
                <Image
                    alt={`photo of ${title}`}
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                    src={image}
                />
            </Flex>

            <Flex
                className="textContainer"
                p={4}
                flexDirection="column"
                overflow="hidden"
            >
                <Text fontSize="sm">{title}</Text>
                <Text color={'blue.500'} fontSize="sm">
                    €{price ? price / 100 : '99,99'}
                </Text>
            </Flex>
        </Flex>
    )
}

export default HomepageOfferCard
