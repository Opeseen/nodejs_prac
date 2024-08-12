// type is 'success' or 'error'
export const hideAlert = () => {
  const element = document.querySelector('.alert');
  if (element) element.parentElement.removeChild(element);
}; 

export const showAlert = (type, msg) => {
  hideAlert();
  const message = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', message);
  window.setTimeout(hideAlert, 3000);
};