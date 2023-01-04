import { useState } from 'react'

// Chakra
import {
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Button,
} from '@chakra-ui/react'

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
                <div className="h-14"></div>

                {isSuccess && <p>Succesfully signed up</p>}
                {isError && <p>{error?.message}</p>}

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mt-12 flex flex-col items-center space-y-6">
                        <div className="w-full flex gap-6">
                            <FormLabel>First Name</FormLabel>
                            <Input
                                value={firstName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => setFirstName(e.target.value)}
                                required
                            />
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                value={lastName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setEmail(e.target.value)}
                            required
                        />
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-6 w-full font-medium inline-flex justify-center items-center rounded-md p-3 text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed  disabled:hover:bg-blue-600 disabled:hover:border-bg-600 transition-colors"
                    >
                        Create account
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
