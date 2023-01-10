import React from 'react'

// Dropzone
import Dropzone from './Dropzone'

// Chakra
import { Flex, Button } from '@chakra-ui/react'

type TImageFormProps = {
    file: File | null
    setFile: (file: File | null) => void
}

const ImageForm = ({ file, setFile }: TImageFormProps) => {
    const onFileAccepted = (file: File) => {
        console.log('file accepted: ', file)

        console.log('uploading form')
        setFile(file)
    }

    return (
        <Flex className="imageForm" background={file ? 'green' : 'blue'}>
            {file && <p>File: {file.name}</p>}
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
