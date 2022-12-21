import { useState } from 'react'

import Input from './Input'

// nHost
import { useSignUpEmailPassword } from '@nhost/react'

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const nhostEmailHook = useSignUpEmailPassword()
    const {
        signUpEmailPassword,
        isLoading,
        // seems isSuccess needs email verification for it to be true
        isSuccess,
        needsEmailVerification,
        isError,
        error,
    } = nhostEmailHook

    console.log(nhostEmailHook)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        signUpEmailPassword(email, password, {
            displayName: `${firstName} ${lastName}`.trim(),
            metadata: {
                firstName,
                lastName,
            },
        })
    }

    return (
        <div className="w-full max-w-lg">
            <div className="sm:rounded-xl sm:shadow-md sm:border border-opacity-50 sm:bg-white px-4 sm:px-8 py-12 flex flex-col items-center">
                <div className="h-14">
                    <img
                        src={process.env.PUBLIC_URL + 'logo.svg'}
                        alt="logo"
                        className="w-full h-full"
                    />
                </div>

                {isSuccess && <p>Succesfully signed up</p>}
                {isError && <p>{error?.message}</p>}

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mt-12 flex flex-col items-center space-y-6">
                        <div className="w-full flex gap-6">
                            <Input
                                label="First name"
                                value={firstName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => setFirstName(e.target.value)}
                                required
                            />
                            <Input
                                label="Last name"
                                value={lastName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <Input
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            label="Create password"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full font-medium inline-flex justify-center items-center rounded-md p-3 text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed  disabled:hover:bg-blue-600 disabled:hover:border-bg-600 transition-colors"
                    >
                        Create account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
