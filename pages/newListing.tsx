// nhost
import { gql, useMutation } from '@apollo/client'
import { useUserData } from '@nhost/react'
import { RecordWithTtl } from 'dns'

// React, next
import React from 'react'

// Marketplace components
import TopMenu from '../components/TopMenu'

// [] post data to API url
// [] display status
// [] do sth for images

const NewListing = () => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')

    const serverUser = useUserData()

    let submitListing = (e: React.FormEvent) => {
        e.preventDefault()
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
