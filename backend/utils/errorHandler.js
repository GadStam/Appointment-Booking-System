// exceptions.js

// Handle duplicate email error (MongoDB error code 11000)
const handleDuplicateEmailError = (error) => {
  if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
    return {
      success: false,
      message: "Email already exists. Please use a different email.",
    };
  }
  return null;
};

// Handle validation errors (e.g., from Mongoose)
const handleValidationError = (error) => {
  if (error.name === "ValidationError") {
    return { success: false, message: error.message };
  }
  return null;
};

// Handle generic errors
const handleGenericError = (error) => {
  return {
    success: false,
    message: "An error occurred while processing your request.",
  };
};

// Main error handler function
const handleError = (error) => {
  let errorResponse;

  // Check for specific error types
  errorResponse =
    handleDuplicateEmailError(error) ||
    handleValidationError(error) ||
    handleGenericError(error);

  return errorResponse;
};

// Export the handleError function
export { handleError };
