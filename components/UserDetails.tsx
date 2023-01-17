import { useUserData } from '@nhost/react'

const UserDetails = () => {
    const user = useUserData()

    return <code>{JSON.stringify(user)}</code>
}

export default UserDetails
