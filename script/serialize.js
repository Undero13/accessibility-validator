/*
 * get data from form inputs and make object
 */
function serializeForm(formElement) {
  const formData = {};
  const inputs = [...formElement.elements];

  inputs.forEach(input => {
    if (input.name !== "") formData[input.name] = input.value;
  });

  return formData;
}

module.exports = serializeForm;
