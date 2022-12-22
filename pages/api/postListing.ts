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
// [] post it to nhost
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
            # what to get back from the server
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

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    let user, title, description

    // Parse the request

    try {
        const {
            title: reqTitle,
            description: reqDescription,
            user: reqUser,
        } = JSON.parse(req.body)
        user = reqUser
        title = reqTitle
        description = reqDescription
    } catch (error) {
        console.log('error', error)
    }

    console.log('title, description', title, description)

    // Generate a slug
    const newUuid = uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d

    // Parse the title: only URL friendly characters
    const titleWithoutSpacesOrSpecialCharacters = title
        .replace(' ', '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')

    const slug = newUuid + '-' + titleWithoutSpacesOrSpecialCharacters

    nhost.graphql
        .request(CREATE_LISTING, {
            user: user?.id,
            description: description || 'some description',
            title: title || 'some title',
        })
        .then((data) => {
            console.log('graphql request succesful.', data)
        })

    // const [mutateListing, { loading: creatingListing }] =

    // mutateListing({
    //     variables: {
    //         user: user?.id,
    //         description,
    //         title,
    //     },
    // })

    res.status(200).json({ name: 'John Doe' })
}
