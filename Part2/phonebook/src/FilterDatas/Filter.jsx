const Filter = (props) => {
    const { text, filterValue, handleInputFilterChange } = props
    return (
        <div>
            {text}
            <input
                type="text"
                value={filterValue}
                onChange={handleInputFilterChange}
                placeholder="search in phonebook"
            />
        </div>
    )
}

export default Filter