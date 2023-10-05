const PersonForm = (props) => {
    const { handleFormSubmit, newName, handleInputNameChange, newNumber, handleInputNumberChange } = props
    return (
        <form onSubmit={handleFormSubmit}>
            <div> name:
                <input
                    type="text"
                    value={newName}
                    onChange={handleInputNameChange}
                    placeholder="Name Surname"
                />
            </div>
            <div> number:
                <input
                    type="text"
                    value={newNumber}
                    onChange={handleInputNumberChange}
                    placeholder="Your Number"
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm