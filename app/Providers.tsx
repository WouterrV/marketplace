'use client'

// Next, React
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

const chakraTheme = extendTheme({
    colors: {
        // TailwindUI calls it grey, but its quite blue https://tailwindcss.com/docs/customizing-colors
        bluegray: {
            50: '#f9fafb',
            100: '##f3f4f6',
            200: '##e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        },

        indigo: {
            50: '#eef2ff',
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
            800: '#3730a3',
            900: '#312e81',
        },
    },
    fonts: {
        heading: 'Inter',
        body: 'Inter',
    },
})

export default function Providers({
    children,
}: {
    children: React.ReactNode | React.ReactNode[]
}) {
    return (
        <NhostContext.Provider value={nhost}>
            <QueryClientProvider client={queryClient}>
                <NhostProvider nhost={nhost}>
                    <NhostApolloProvider nhost={nhost}>
                        <ChakraProvider theme={chakraTheme}>
                            {children}
                        </ChakraProvider>
                    </NhostApolloProvider>
                </NhostProvider>
            </QueryClientProvider>
        </NhostContext.Provider>
    )
}
