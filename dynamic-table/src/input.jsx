import React, { useState } from "react";

function InputForm() {
  const [inputType, setInputType] = useState("string"); // Option for type selection
  const [inputValue, setInputValue] = useState(""); // State to store the input value
  const [error, setError] = useState(""); // Error message if validation fails

  // Function to handle input type change (string or number)
  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    setInputValue(""); // Clear the input field when type changes
    setError(""); // Reset error when type changes
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Validation logic
    if (inputType === "number") {
      if (!/^\d*\.?\d*$/.test(value)) {  // Allow only numbers or decimal point
        setError("Please enter a valid number");
      } else {
        setError(""); // Clear the error if it's a valid number
      }
    } else {
      if (/\d/.test(value)) {  // Check if string contains any digits
        setError("String cannot contain numbers");
      } else {
        setError(""); // Clear the error if it's a valid string
      }
    }

    setInputValue(value);  // Update the input value
  };

  return (
    <div>
     {/* Dropdown to select the type */}
      <label>
        Select Type:<select value={inputType} onChange={handleTypeChange}>
          <option value="string">String</option>
          <option value="number">Number</option>
        </select>
      </label>

      <br />

      {/* Input field */}
      <label>
        Enter Value:
        <input
          type={inputType === "number" ? "text" : "text"}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={inputType === "number" ? "Enter a number" : "Enter a string"}
        />
      </label>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <br />

      {/* Display the value */}
      <p>Entered Value: {inputValue}</p>
    </div>
  );
}

export default InputForm;
