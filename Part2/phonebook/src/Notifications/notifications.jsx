const Notifications = ({ message, messageNotifClass }) => {
    if (message === null) {
        return null
    }

    return (
        <>
            <div className={messageNotifClass ? "success" : "error"}>
                {message}
            </div>
        </>
    )
}

export default Notifications