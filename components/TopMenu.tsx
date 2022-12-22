/** @jsxImportSource @emotion/react */

// Variables
const color = 'white'

// React, Next
import * as React from 'react'
import Link from 'next/link'

// MUI
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'

// Marketplace components
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import ResetPassword from '../components/ResetPassword'
import UserDetails from '../components/UserDetails'

// Styling
import { css } from '@emotion/react'

function TopMenu() {
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

    // Event handlers
    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log('searching, event: ', event)
    }

    return (
        <React.Fragment>
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
                <Link href="newListing">
                    <Button variant="text" onClick={handleMenuLoginButtonClick}>
                        New Listing
                    </Button>
                </Link>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search" />
                    <button>Search</button>
                </form>
            </div>
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
                <UserDetails />
            </Dialog>
        </React.Fragment>
    )
}

export default TopMenu
