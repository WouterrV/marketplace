/** @jsxImportSource @emotion/react */

import Head from 'next/head'
import Image from 'next/image'
import { css } from '@emotion/react'

const color = 'white'

function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('searching, event: ', event)
}

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
                (login, see favourite listings)
            </div>
            <main>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search" />
                    <button>Search</button>
                </form>

                <p>Recent/relevant for you offers go here</p>
            </main>
        </>
    )
}
