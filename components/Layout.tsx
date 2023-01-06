// React, next
import React from 'react'
import Head from 'next/head'

// Marketplace components
import TopMenu from '../components/TopMenu'

// Chakra
import { Flex } from '@chakra-ui/react'

const Layout = ({
    children,
}: {
    children: React.ReactElement | React.ReactElement[]
}) => {
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
                {/* Used in TailwindUI */}
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>

            <Flex
                className="app"
                direction="column"
                minHeight="100vh"
                backgroundColor="gray.300"
            >
                <TopMenu />
                {children}
            </Flex>
        </>
    )
}

export default Layout
