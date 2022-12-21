const Input = ({ type = 'text', label = '', ...props }) => {
    return (
        <div className="w-full flex flex-col">
            {label ? (
                <label className="text-gray-700 font-medium text-sm mb-1">
                    {label}
                </label>
            ) : null}
            <input
                type={type}
                className="w-full shadow-sm rounded-md p-3 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed read-only:opacity-50 read-only:cursor-not-allowed read-only:focus:border-gray-300 read-only:focus:ring-0"
                {...props}
            />
        </div>
    )
}

export default Input
