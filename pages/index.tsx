/** @jsxImportSource @emotion/react */

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

import { css } from '@emotion/react'

const inter = Inter({ subsets: ['latin'] })

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
                    css={css`
                        padding: 32px;
                        background-color: hotpink;
                        font-size: 24px;
                        border-radius: 4px;
                        &:hover {
                            color: ${color};
                        }
                    `}
                >
                    <p>Best offers EU</p>
                </div>

                <div>Marketplace</div>

                <div>
                    <a
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2>
                            Docs <span>-&gt;</span>
                        </h2>
                        <p>
                            Find in-depth information about Next.js features
                            and&nbsp;API.
                        </p>
                    </a>

                    <a
                        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2>
                            Learn <span>-&gt;</span>
                        </h2>
                        <p>
                            Learn about Next.js in an interactive course
                            with&nbsp;quizzes!
                        </p>
                    </a>

                    <a
                        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2>
                            Templates <span>-&gt;</span>
                        </h2>
                        <p>
                            Discover and deploy boilerplate example
                            Next.js&nbsp;projects.
                        </p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2>
                            Deploy <span>-&gt;</span>
                        </h2>
                        <p>
                            Instantly deploy your Next.js site to a shareable
                            URL with&nbsp;Vercel.
                        </p>
                    </a>
                </div>
            </main>
        </>
    )
}
