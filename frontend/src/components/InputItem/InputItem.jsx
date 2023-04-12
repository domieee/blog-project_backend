import './InputItem.scss'

const InputItem = () => {
    return (
        <>
            <label htmlFor="destination">Destination</label>
            <input
                type="text"
                name='destination'
                id='destination'
                placeholder='e.g. "Bali"'
                onChange={(e) => {
                    setDestination(destination = e.target.value);
                }} />
        </>
    );
}

export default InputItem;