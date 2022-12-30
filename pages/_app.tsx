// Next, React
import type { AppProps } from 'next/app'
import React from 'react'

// Nhost
import { NhostProvider, NhostClient } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'

const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_REACT_APP_NHOST_REGION,
})

// TanStack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Chakra
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const queryClient = new QueryClient()

// nhost context so we can ask nhost for getting token
export const NhostContext = React.createContext(nhost)

const chakraTheme = extendTheme()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NhostContext.Provider value={nhost}>
            <QueryClientProvider client={queryClient}>
                <NhostProvider nhost={nhost}>
                    <NhostApolloProvider nhost={nhost}>
                        <ChakraProvider theme={chakraTheme}>
                            <Component {...pageProps} />
                        </ChakraProvider>
                    </NhostApolloProvider>
                </NhostProvider>
            </QueryClientProvider>
        </NhostContext.Provider>
    )
}
