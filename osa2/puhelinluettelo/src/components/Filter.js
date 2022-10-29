const Filter = ({ value, onChange }) => {
    return (
        <div>
            fliter shown with <input
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Filter