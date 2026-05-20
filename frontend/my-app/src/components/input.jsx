function Input({ name, type, value, onChange }) {
    return (
        <input
            name={name}
            type={type}
            value={value}
            placeholder=""
            onChange={onChange}
        />
    );
}
export default Input;