// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// Apollo
import { gql } from '@apollo/client'

// Nhost, see https://docs.nhost.io/reference/javascript/nhost-js/graphql/request
import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_REACT_APP_NHOST_REGION,
})

// Utils
import { v4 as uuidv4 } from 'uuid'

// [x] receive an object
// [x] create a slug
// [x] post it to nhost
// [] return 200

const CREATE_LISTING = gql`
    mutation createListing(
        $user: uuid!
        $description: String!
        $title: String!
    ) {
        insert_listings_one(
            object: { description: $description, title: $title, user: $user }
        ) {
            user
            title
            id
            description
        }
    }
`

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const bodyObject = JSON.parse(req.body)

    const {
        title = '',
        description = '',
        userId = '',
        nhostToken = '',
    } = bodyObject

    // Generate a slug
    const newUuid = uuidv4()

    // Parse the title: only URL friendly characters
    const titleWithoutSpacesOrSpecialCharacters = title
        .replace(' ', '-')
        // if a char is not in the range of a-Z etc, replace it with an empty string
        .replace(/[^a-zA-Z0-9-_]/g, '')

    const slug = newUuid + '-' + titleWithoutSpacesOrSpecialCharacters

    // Set the token to be used that we'll use in subsequent requests
    console.warn('access token: ', nhostToken)
    // nhost.functions.setAccessToken(nhostToken)

    // Doesnt work - regular sign in?

    // see https://docs.nhost.io/reference/javascript/auth/sign-in
    await nhost.auth.signIn({
        email: process.env.NEXT_PUBLIC_NHOST_EMAIL!,
        password: process.env.NEXT_PUBLIC_NHOST_PASSWORD!,
    })

    // This works! But I want to use the token from the request body

    nhost.graphql
        .request(CREATE_LISTING, {
            user: userId,
            description: description || 'some description',
            title: title || 'some title',
        })
        .then((data) => {
            console.log('graphql request succesful.', data)
        })
        .catch((error) => {
            console.log('graphql request failed.', error)
        })

    res.status(200).json({ name: 'John Doe' })
}
