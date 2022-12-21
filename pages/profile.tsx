// nhost
import { gql, useMutation } from '@apollo/client'
import { useUserData } from '@nhost/react'

// React, next
import React from 'react'

const UserDetails = () => {}

const UPDATE_USER_MUTATION = gql`
    mutation ($id: uuid!, $displayName: String!, $metadata: jsonb) {
        updateUser(
            pk_columns: { id: $id }
            _set: { displayName: $displayName, metadata: $metadata }
        ) {
            id
            displayName
            metadata
        }
    }
`

const Profile = () => {
    const [mutateUser, { loading: updatingProfile }] =
        useMutation(UPDATE_USER_MUTATION)

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')

    const serverUser = useUserData()
    console.log(serverUser)

    // once userData is available, put it in firstName, lastName

    React.useEffect(() => {
        if (serverUser) {
            setFirstName((serverUser?.metadata?.firstName as string) || '')
            setLastName((serverUser?.metadata?.lastName as string) || '')
        }
    }, [serverUser])

    const updateUserProfile = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await mutateUser({
                variables: {
                    id: serverUser?.id,
                    displayName: `${firstName} ${lastName}`.trim(),
                    metadata: {
                        firstName,
                        lastName,
                    },
                },
            })
            console.log('Updated successfully', { id: 'updateProfile' })
        } catch (error) {
            console.error('Unable to update profile', { id: 'updateProfile' })
        }
    }

    return (
        <div>
            <form onSubmit={updateUserProfile}>
                <label htmlFor="firstName">First name</label>
                <input
                    type="text"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
            </form>
            <div>{JSON.stringify(serverUser)}</div>
        </div>
    )
}

export default Profile
