import React from 'react'

// Utils
import _ from 'lodash'

// Dropzone
import Dropzone from './Dropzone'

// Chakra
import { Flex, Button } from '@chakra-ui/react'

// Nhost
import {
    useUserData,
    useFileUploadItem,
    useFileUpload,
    useMultipleFilesUpload,
} from '@nhost/react'
import { NhostContext } from '../pages/_app'
import Image from 'next/image'

type TImageFormProps = {
    file: File | null
    setFile: (file: File | null) => void
    setUrl: (url: string) => void
    url?: string | null
}

const ImageForm = ({ file, setFile, url, setUrl }: TImageFormProps) => {
    const { upload, clear, progress, cancel, files, add, isUploading } =
        useMultipleFilesUpload()

    const nhost = React.useContext(NhostContext)

    const onFileAccepted = (file: File) => {
        setFile(file)
    }

    React.useEffect(() => {
        if (!file) return

        // console.log('file put into dropzone: ', file)

        // clear old files from staging area
        clear()

        add({ files: file })

        upload().then((res) => {
            // console.log('file upload result: ', res)

            res.files.forEach((uploadFileResult) => {
                const fileId = uploadFileResult.state.context.id

                // console.log(`getting public url of id: ${fileId}`)

                const publicUrl = nhost.storage.getPublicUrl({
                    fileId: fileId!,
                })
                setUrl(publicUrl)
            })

            // console.log('publicUrl: ', publicUrl)
        })
    }, [file])

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
            {url && (
                <Image src={url} width={100} height={100} alt="file.name" />
            )}
            <form>
                <Dropzone onFileAccepted={onFileAccepted} />
            </form>
        </Flex>
    )
}

export default ImageForm
