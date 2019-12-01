import InputModel from '../../model/InputModel'

/*
 * Get data from form inputs and make object
 */
function serializeForm(formElement: HTMLFormElement = null): InputModel {
  if (!formElement) {
    return null;
  }

  const formData: InputModel = {};
  const inputs = Array.from(formElement.elements);

  inputs.forEach((input: HTMLInputElement) => {
    if (input.name !== '') {
      if (input.type === 'text') {
        formData.url = input.value;
      } else if (input.type === 'radio' && input.checked) {
        formData.device = input.value;
      }
    }
  });

  return formData;
}

export default serializeForm;
