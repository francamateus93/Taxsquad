const SelectField = ({ label, name, value, options, onChange }) => (
  <div>
    <label className="font-semibold">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded-lg w-full"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
