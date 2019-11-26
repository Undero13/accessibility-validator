/*
 * Get data from form inputs and make object
 */
function serializeForm(formElement = null) {
  if (!formElement) {
    return null;
  }

  const formData = {};
  const inputs = [...formElement.elements];

  inputs.forEach(input => {
    if (input.name !== "") {
      if (input.type === "text") {
        formData[input.name] = input.value;
      } else if (input.type === "radio" && input.checked) {
        formData[input.name] = input.value;
      }
    }
  });

  return formData;
}

module.exports = serializeForm;
