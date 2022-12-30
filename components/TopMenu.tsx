/** @jsxImportSource @emotion/react */

// Variables
const color = 'white'

// React, Next
import * as React from 'react'
import Link from 'next/link'

// nhost
import { useSignOut } from '@nhost/react'

// Marketplace components
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import ResetPassword from '../components/ResetPassword'
import UserDetails from '../components/UserDetails'

// Chakra
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

function TopMenu() {
    const [showLoginModal, setShowLoginModal] = React.useState(false)
    const [loginModalTab, setLoginModalTab] = React.useState<
        'signup' | 'signin' | 'resetpassword'
    >('signup')

    const { signOut } = useSignOut()

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
                    backgroundColor: 'turquoise',
                    '&:hover': {
                        color: color,
                    },
                }}
            >
                <Link href="/">
                    <h1>Marketplace</h1>
                </Link>
                (login, see favourite listings)
                <Button variant="solid" onClick={handleMenuLoginButtonClick}>
                    Login
                </Button>
                <Link href="newListing">
                    <Button
                        variant="solid"
                        onClick={handleMenuLoginButtonClick}
                    >
                        New Listing
                    </Button>
                </Link>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search" />
                    <button>Search</button>
                </form>
            </div>
            <Modal
                onClose={() => setShowLoginModal(false)}
                isOpen={showLoginModal}
            >
                <ModalContent>
                    <div>Modal goes here</div>
                    <Button onClick={() => setLoginModalTab('signup')}>
                        Sign up
                    </Button>
                    <Button onClick={() => setLoginModalTab('signin')}>
                        Sign in
                    </Button>
                    <Button onClick={signOut}>Sign out</Button>
                    <Button onClick={() => setLoginModalTab('resetpassword')}>
                        Reset password
                    </Button>
                    {loginModalTab === 'signup' && <SignUp />}
                    {loginModalTab === 'signin' && <SignIn />}
                    {loginModalTab === 'resetpassword' && <ResetPassword />}
                    <UserDetails />
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}

export default TopMenu
