const fieldsToShow = [
  "first_name",
  "last_name",
  "date_of_birth",
  "email",
  "identification_number",
  "phone",
  "address",
  "city",
  "country",
];

const ProfileForm = ({ profile, errors, touched, handleChange }) => {
  const inputClass = (key) =>
    touched[key]
      ? errors[key]
        ? "border-2 border-red-500"
        : "border-2 border-emerald-500"
      : "border border-gray-200";

  return (
    <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {fieldsToShow.map((key) => (
        <div key={key}>
          <label className="block font-semibold capitalize mb-1 text-start">
            {key.replace("_", " ")}*
          </label>
          <input
            type={key === "date_of_birth" ? "date" : "text"}
            name={key}
            value={profile[key]}
            onChange={handleChange}
            className={`p-2 ${inputClass(
              key
            )} rounded-lg w-full text-gray-500 transition duration-200 tracking-tight ${
              key === "email" && "bg-gray-100"
            }`}
            readOnly={key === "email"}
          />
          {touched[key] && errors[key] && (
            <p className="text-red-500 text-xs mt-1 text-start">
              {key === "first_name" &&
                "First name must have at least 3 letters and no numbers."}
              {key === "last_name" &&
                "Last name must have at least 3 letters and no numbers."}
              {key === "date_of_birth" && "Birthdate must be before 2025."}
              {key === "identification_number" &&
                "ID number must be at least 6 characters."}
              {key === "phone" &&
                "Phone must start with + and contain at least 6 digits."}
              {key === "address" &&
                "Address must be at least 6 characters and contain a number."}
              {key === "city" && "City must contain only letters."}
              {key === "country" && "Country must contain only letters."}
            </p>
          )}
        </div>
      ))}
    </form>
  );
};

export default ProfileForm;
