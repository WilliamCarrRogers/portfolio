const uuidv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}
const _k = 91;

export const TextBox = ({ value, onChange, label, name }) => {
    const _id = uuidv4();
    return (
        <div className="input-container">
            <label htmlFor={_id}>{label}</label>
            <input id={_id} type="text" value={value} onChange={onChange} name={name} />
        </div>
    )
}
export const TextArea = ({ value, onChange, label, name }) => {
    const _id = uuidv4();
    return (
        <div className="input-container">
            <label htmlFor={_id}>{label}</label>
            <textarea id={_id} value={value} onChange={onChange} name={name} rows="6" />
        </div>
    )
}
export const Change = (input) => {
    var output = "";
    for (var i = 0; i < input.length; i++) {
        var code = input.charCodeAt(i);
        output += String.fromCharCode(code ^ _k);
    }
    return output.split('').reverse().join('')
}