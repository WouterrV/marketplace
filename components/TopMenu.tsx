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
import { Button, ButtonGroup, Flex } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import { Box } from '@chakra-ui/react'

// Icons
import { EnvelopeIcon } from '@heroicons/react/24/outline'

function TopMenu() {
    const [showLoginModal, setShowLoginModal] = React.useState(false)
    const [loginModalTab, setLoginModalTab] = React.useState<
        'signup' | 'signin' | 'resetpassword'
    >('signin')

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
            <Box
                display="flex"
                justifyContent={'space-between'}
                alignItems="center"
                backgroundColor={'bluegray.800'}
                color="white"
                height={16}
                px={4}
            >
                <Flex
                    className="beginContent"
                    alignItems={'center'}
                    columnGap="2"
                >
                    <Link href="/">
                        <h1>BuyHive.eu</h1>
                    </Link>

                    <Link href="/messages">
                        <Button variant="ghost" colorScheme="bluegray">
                            <EnvelopeIcon className="h-6 w-6 text-blue-500" />
                            Messages
                        </Button>
                    </Link>
                </Flex>
                <Flex className="lastContent" columnGap={'2'}>
                    <Link href="/newListing">
                        <Button variant="solid" colorScheme="indigo">
                            New Listing
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        onClick={handleMenuLoginButtonClick}
                    >
                        Login
                    </Button>
                </Flex>
            </Box>
            <Modal
                onClose={() => setShowLoginModal(false)}
                isOpen={showLoginModal}
            >
                <ModalContent padding={8}>
                    <Flex
                        direction="row"
                        justifyContent={'space-evenly'}
                        columnGap={4}
                    >
                        <Button onClick={() => setLoginModalTab('signup')}>
                            Sign up
                        </Button>
                        <Button onClick={() => setLoginModalTab('signin')}>
                            Sign in
                        </Button>
                        <Button
                            variant="outline"
                            colorScheme="red"
                            onClick={signOut}
                        >
                            Sign out
                        </Button>
                        <Button
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => setLoginModalTab('resetpassword')}
                        >
                            Reset password
                        </Button>
                    </Flex>

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
