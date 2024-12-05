// type is 'success' or 'error'
const hideAlert = () => {
  const element = document.querySelector('.alert');
  if (element) element.parentElement.removeChild(element);
}; 
  
const showAlert = (type, msg) => {
  hideAlert();
  const message = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', message);
  window.setTimeout(hideAlert, 5000);
};