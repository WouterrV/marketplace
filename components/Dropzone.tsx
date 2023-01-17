import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Center, useColorModeValue, Icon } from '@chakra-ui/react'

// code inspired by 4ndv on https://github.com/chakra-ui/chakra-ui/issues/457

export default function Dropzone({
    onFileAccepted,
}: {
    onFileAccepted: (file: File) => void
}) {
    const onDrop = useCallback(
        (acceptedFiles: any) => {
            onFileAccepted(acceptedFiles[0])
        },
        [onFileAccepted],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxFiles: 1,
        multiple: false,
    })

    const dropText = isDragActive
        ? 'Drop the files here ...'
        : "Drag 'n' drop image file here, or click to select files"

    const activeBg = useColorModeValue('gray.100', 'gray.600')
    const borderColor = useColorModeValue(
        isDragActive ? 'teal.300' : 'gray.300',
        isDragActive ? 'teal.500' : 'gray.500',
    )

    return (
        <Center
            p={10}
            cursor="pointer"
            bg={isDragActive ? activeBg : 'transparent'}
            _hover={{ bg: activeBg }}
            transition="background-color 0.2s ease"
            borderRadius={4}
            border="3px dashed"
            borderColor={borderColor}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <p>Some icon goes here</p>
            <p>{dropText}</p>
        </Center>
    )
}
