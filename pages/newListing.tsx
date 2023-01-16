// nhost
import { gql, useMutation } from '@apollo/client'
import { useUserData } from '@nhost/react'
import { RecordWithTtl } from 'dns'

// Utils
import _ from 'lodash'

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
import Dropzone from '../components/Dropzone'
import ImageForm from '../components/ImageForm'

// [x] basic upload component
// [x] make forms for each image, upload automatically
// [x] keep state of progress of all these uploads
// [x] let users remove picked images
// [] let users remove uploaded images
// [] show server-hosted images in form
// [] let user drag and drop

const getDefaultFileReducerState = () =>
    ({
        file: null,
        publicURL: '',
        uploading: false,
        pickedFile: null,
    } as TfileReducerItem)

type TfileReducerItem = {
    pickedFile: File | null
    publicURL: string
    uploading: boolean
}

type setPickedFileAction = {
    type: 'setPickedFile'
    payload: {
        position: number
        pickedFile: File | null
    }
}

type setPublicURLAction = {
    type: 'setPublicURL'
    payload: {
        position: number
        publicURL: string
    }
}

type setUploadingAction = {
    type: 'setUploading'
    payload: {
        position: number
        uploading: boolean
    }
}

const fileReducer = (
    state: TfileReducerItem[],
    action: setPickedFileAction | setPublicURLAction | setUploadingAction,
) => {
    switch (action.type) {
        case 'setPickedFile': {
            let newState = [...state] as TfileReducerItem[]
            newState[action.payload.position].pickedFile =
                action.payload.pickedFile
            return newState
        }
        case 'setPublicURL': {
            let newState = [...state] as TfileReducerItem[]
            newState[action.payload.position].publicURL =
                action.payload.publicURL
            return newState
        }
        case 'setUploading': {
            let newState = [...state] as TfileReducerItem[]
            newState[action.payload.position].uploading =
                action.payload.uploading
            return newState
        }
        default:
            console.error('invalid action type passed to fileReducer')
            return state
    }
}

const setFileFactory = (index: number, dispatch: any) => {
    return (file: File | null) => {
        dispatch({
            type: 'setPickedFile',
            payload: { position: index, pickedFile: file },
        })
    }
}

const initialFilesState = new Array(3)
    .fill(null)
    .map((_) => getDefaultFileReducerState() as TfileReducerItem)

const NewListing = () => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [filesState, filesDispatch] = React.useReducer(
        fileReducer,
        initialFilesState,
    )

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

    const handleFormSubmit = (
        event: React.FormEvent<HTMLFormElement> | React.MouseEvent,
    ) => {
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
                        </form>

                        <ImageForm
                            file={filesState[0].pickedFile}
                            setFile={setFileFactory(0, filesDispatch)}
                        />
                        <ImageForm
                            file={filesState[1].pickedFile}
                            setFile={setFileFactory(1, filesDispatch)}
                        />
                        <ImageForm
                            file={filesState[2].pickedFile}
                            setFile={setFileFactory(2, filesDispatch)}
                        />

                        <Button mt={2} type="submit" onClick={handleFormSubmit}>
                            Submit
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default NewListing
