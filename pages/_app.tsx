// Next
import type { AppProps } from 'next/app'

// Nhost
import { NhostProvider, NhostClient } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'

const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_REACT_APP_NHOST_REGION,
})

// TanStack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <NhostProvider nhost={nhost}>
                <NhostApolloProvider nhost={nhost}>
                    <Component {...pageProps} />
                </NhostApolloProvider>
            </NhostProvider>
        </QueryClientProvider>
    )
}
