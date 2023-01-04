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
    Stack,
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
        <>
            <h1>New Listing</h1>
            <form onSubmit={handleFormSubmit}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button type="submit">Submit</Button>
            </form>
        </>
    )
}

export default NewListing
