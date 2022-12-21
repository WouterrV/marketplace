// Next
import type { AppProps } from 'next/app'

// Nhost
import { NhostProvider, NhostClient } from '@nhost/react'

const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_REACT_APP_NHOST_REGION,
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NhostProvider nhost={nhost}>
            <Component {...pageProps} />
        </NhostProvider>
    )
}
