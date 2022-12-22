// nhost
import { gql, useMutation } from '@apollo/client'
import { useUserData } from '@nhost/react'
import { RecordWithTtl } from 'dns'

// React, next
import React from 'react'

// Marketplace components
import TopMenu from '../components/TopMenu'

const CREATE_LISTING = gql`
    mutation createListing(
        $user: uuid!
        $description: String!
        $title: String!
    ) {
        insert_listings_one(
            object: { description: $description, title: $title, user: $user }
        ) {
            # what to get back from the server
            user
            title
            id
            description
        }
    }
`

const NewListing = () => {
    const [mutateListing, { loading: creatingListing }] =
        useMutation(CREATE_LISTING)

    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')

    const serverUser = useUserData()

    let submitListing = (e: React.FormEvent) => {
        e.preventDefault()
        mutateListing({
            variables: {
                user: serverUser?.id,
                description,
                title,
            },
        })
    }

    return (
        <>
            <TopMenu />
            <h1>New Listing</h1>
            <form onSubmit={submitListing}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" onClick={submitListing}>
                    Submit
                </button>
            </form>
        </>
    )
}

export default NewListing
