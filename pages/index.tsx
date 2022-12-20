/** @jsxImportSource @emotion/react */

import Head from 'next/head'
import Image from 'next/image'
import { css } from '@emotion/react'

const color = 'white'

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
            <main>
                <div
                    css={{
                        padding: '32px',
                        'background-color': 'turquoise',
                        '&:hover': {
                            color: color,
                        },
                    }}
                >
                    <h1>Marketplace</h1>
                    <p>Best offers EU</p>
                </div>
            </main>
        </>
    )
}
