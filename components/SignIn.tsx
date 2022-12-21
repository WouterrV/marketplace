// React, Next
import { useState } from 'react'

// Marketplace components
import Input from './Input'

// nhost
import { useSignInEmailPassword } from '@nhost/react'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {
        signInEmailPassword,
        isLoading,
        isSuccess,
        needsEmailVerification,
        isError,
        error,
    } = useSignInEmailPassword()

    const disableForm = isLoading || needsEmailVerification

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        signInEmailPassword(email, password)
    }

    return (
        <div className="w-full max-w-lg">
            {isSuccess && <p>Succesfully signed in</p>}
            {isError && <p>{error?.message}</p>}
            <div className="sm:rounded-xl sm:shadow-md sm:border border-opacity-50 sm:bg-white px-4 sm:px-8 py-12 flex flex-col items-center">
                <div className="h-14">
                    <img
                        src={process.env.PUBLIC_URL + 'logo.svg'}
                        alt="logo"
                        className="w-full h-full"
                    />
                </div>

                {needsEmailVerification ? (
                    <p>
                        Please check your mailbox and follow the verification
                        link to verify your email.
                    </p>
                ) : (
                    <form onSubmit={handleOnSubmit}>
                        <Input
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setEmail(e.target.value)}
                            disabled={disableForm}
                            required
                        />
                        <Input
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setPassword(e.target.value)}
                            disabled={disableForm}
                            required
                        />

                        <button type="submit" disabled={disableForm}>
                            {isLoading ? 'Loading' : 'Sign in'}
                        </button>

                        {isError ? <p>{error?.message}</p> : null}
                    </form>
                )}
            </div>
        </div>
    )
}

export default SignIn
