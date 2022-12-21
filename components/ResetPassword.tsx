import { useState } from 'react'
import Input from './Input'

const ResetPassword = () => {
    const [email, setEmail] = useState('')

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

                <h1 className="mt-12 text-2xl font-semibold">
                    Reset your password
                </h1>

                <form onSubmit={undefined} className="w-full">
                    <div className="mt-12 w-full flex flex-col items-center space-y-6">
                        <Input
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full font-medium inline-flex justify-center items-center rounded-md p-3 text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed  disabled:hover:bg-blue-600 disabled:hover:border-bg-600 transition-colors"
                    >
                        Send reset link
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
