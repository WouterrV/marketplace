import { useUserData } from '@nhost/react'

const UserDetails = () => {
    const user = useUserData()
    return <div>{JSON.stringify(user)}</div>
}

export default UserDetails
