import React from 'react'

// Dropzone
import Dropzone from './Dropzone'

// Chakra
import { Flex, Button } from '@chakra-ui/react'

// Nhost
import { useUserData, useFileUpload } from '@nhost/react'
import { NhostContext } from '../pages/_app'

type TImageFormProps = {
    file: File | null
    setFile: (file: File | null) => void
}

const ImageForm = ({ file, setFile }: TImageFormProps) => {
    const {
        add,
        upload,
        cancel,
        isUploaded,
        isUploading,
        isError,
        progress,
        id,
        bucketId,
        name,
    } = useFileUpload()

    const nhost = React.useContext(NhostContext)

    const onFileAccepted = (file: File) => {
        setFile(file)

        upload({ file }).then((res) => {
            // console.log('file upload result: ', JSON.parse(JSON.stringify(res)))

            // console.log(`getting public url of id: ${res.id}`)

            const publicUrl = nhost.storage.getPublicUrl({ fileId: res.id! })

            // console.log('publicUrl: ', publicUrl)
        })
    }

    return (
        <Flex className="imageForm" background={file ? 'green' : 'blue'}>
            {file && <p>File: {file.name}</p>}
            {isUploading && <p>Progress: {progress}...</p>}
            <Button
                onClick={(e: React.MouseEvent) => {
                    setFile(null)
                }}
            >
                Remove file
            </Button>
            <form>
                <Dropzone onFileAccepted={onFileAccepted} />
            </form>
        </Flex>
    )
}

export default ImageForm
