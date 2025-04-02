import React from "react";
import AnnualTaxField from "./AnnualField";
import AnnualTaxSelect from "./AnnualSelect";

const AnnualTaxForm = ({
  form,
  errors,
  touched,
  handleChange,
  maritalStatusOptions,
  autonomousCommunities,
}) => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 text-start">
      {Object.entries(form).map(([key, value]) => (
        <div key={key}>
          <label className="block font-semibold capitalize mb-1">
            {key.replace(/_/g, " ")}*
          </label>

          {key === "marital_status" ? (
            <AnnualTaxSelect
              name={key}
              value={value}
              options={maritalStatusOptions}
              handleChange={handleChange}
              error={errors[key]}
              touched={touched[key]}
            />
          ) : key === "autonomous_community" ? (
            <AnnualTaxSelect
              name={key}
              value={value}
              options={autonomousCommunities}
              handleChange={handleChange}
              error={errors[key]}
              touched={touched[key]}
            />
          ) : (
            <AnnualTaxField
              name={key}
              value={value}
              handleChange={handleChange}
              error={errors[key]}
              touched={touched[key]}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AnnualTaxForm;
