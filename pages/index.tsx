/** @jsxImportSource @emotion/react */

// Next, React
import Head from 'next/head'
import Image from 'next/image'
import * as React from 'react'

// Styling
import { css } from '@emotion/react'

// MUI
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'

// Marketplace components
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import ResetPassword from '../components/ResetPassword'

// Variables
const color = 'white'

// Event handlers
function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('searching, event: ', event)
}

export default function Home() {
    const [showLoginModal, setShowLoginModal] = React.useState(false)
    const [loginModalTab, setLoginModalTab] = React.useState<
        'signup' | 'signin' | 'resetpassword'
    >('signup')

    function handleMenuLoginButtonClick(
        event: React.MouseEvent<HTMLButtonElement>,
    ) {
        // console.log('Login button clicked, event: ', event)
        setShowLoginModal(true)
    }

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
                <Button variant="text" onClick={handleMenuLoginButtonClick}>
                    Login
                </Button>
            </div>
            <main>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search" />
                    <button>Search</button>
                </form>

                <p>Recent/relevant for you offers go here</p>
            </main>
            <Dialog
                onClose={() => setShowLoginModal(false)}
                open={showLoginModal}
            >
                <div>Modal goes here</div>
                <Button onClick={() => setLoginModalTab('signup')}>
                    Sign up
                </Button>
                <Button onClick={() => setLoginModalTab('signin')}>
                    Sign in
                </Button>
                <Button onClick={() => setLoginModalTab('resetpassword')}>
                    Reset password
                </Button>
                {loginModalTab === 'signup' && <SignUp />}
                {loginModalTab === 'signin' && <SignIn />}
                {loginModalTab === 'resetpassword' && <ResetPassword />}
            </Dialog>
        </>
    )
}
