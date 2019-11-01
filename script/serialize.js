function serializeForm(formElement) {
  const formData = {};
  const inputs = formElement.elements;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].name !== "") formData[inputs[i].name] = inputs[i].value;
  }
  return formData;
}

module.exports = serializeForm;
