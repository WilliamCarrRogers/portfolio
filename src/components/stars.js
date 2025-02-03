const Stars = ({ rating }) => {
    return (
        <div className="star-container">
            {[0, 0, 0, 0, 0].map((r, i) => (
                <div key={i} className="star">
                    {i >= rating ? <div className="open"></div> : null}
                </div>
            ))}
        </div>
    )
}

export default Stars