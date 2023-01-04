// React, next
import React from 'react'
import Head from 'next/head'

// Marketplace components
import TopMenu from '../components/TopMenu'

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
            </Head>

            <TopMenu />

            <main>{children}</main>
        </>
    )
}

export default Layout
