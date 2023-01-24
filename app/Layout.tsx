'use client'

import Providers from './Providers'

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    console.log('Rendering root layout from new app folder!')

    return (
        <html lang="en">
            <Providers>
                <body>{children}</body>
            </Providers>
        </html>
    )
}
