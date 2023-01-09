// nhost
import { gql, useMutation } from '@apollo/client'
import { useUserData } from '@nhost/react'
import { RecordWithTtl } from 'dns'

// React, next
import React from 'react'

// Tanstack Query
import { useQuery, useMutation as useRQMutation } from '@tanstack/react-query'

// Chakra
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    FormLabel,
    FormControl,
    Stack,
    Text,
} from '@chakra-ui/react'

// Marketplace components
import TopMenu from '../components/TopMenu'
import { NhostContext } from './_app'

// [x] post data to API url
// [] display status
// [] do sth for images

const NewListing = () => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')

    const serverUser = useUserData()

    const nhost = React.useContext(NhostContext)

    // @ts-ignore
    const nhostToken = nhost.functions.accessToken

    const mutation = useRQMutation({
        mutationFn: () => {
            return fetch('/api/postListing', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    description: description,
                    userId: serverUser?.id,
                    nhostToken: nhostToken,
                }),
            })
        },
    })

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutation.mutate()
    }

    return (
        <Flex
            className="page"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems={'center'}
        >
            <Flex
                className="firstRow"
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignSelf="stretch"
            >
                <Flex
                    className="formCard"
                    flexDirection="column"
                    justifyContent="stretch"
                    flexGrow={1}
                    maxWidth="800px"
                    p={4}
                    m={4}
                    borderRadius="lg"
                    background="white"
                >
                    <Text fontSize="2xl">New Listing</Text>

                    {/* Formcontainer for max width */}
                    <Flex
                        className="formContainer"
                        maxWidth="500px"
                        direction={'column'}
                        alignItems="stretch"
                    >
                        <form onSubmit={handleFormSubmit}>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <FormControl>
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="description"
                                    id="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </FormControl>

                            <Button mt={2} type="submit">
                                Submit
                            </Button>
                        </form>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default NewListing
