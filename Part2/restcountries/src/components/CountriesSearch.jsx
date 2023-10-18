
const CountriesSearch = ({ value, handleChange }) => {
    return (
        <>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Search for a country..."
            />
        </>
    )
}

export default CountriesSearch