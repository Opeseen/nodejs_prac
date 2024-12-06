// type is 'success' or 'error'
const $d0f7ce18c37ad6f6$var$hideAlert = ()=>{
    const element = document.querySelector('.alert');
    if (element) element.parentElement.removeChild(element);
};
const $d0f7ce18c37ad6f6$var$showAlert = (type, msg)=>{
    $d0f7ce18c37ad6f6$var$hideAlert();
    const message = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', message);
    window.setTimeout($d0f7ce18c37ad6f6$var$hideAlert, 5000);
};
function $d0f7ce18c37ad6f6$var$myFunction() {
    alert("Hello World!");
}
const $d0f7ce18c37ad6f6$var$testClick = document.querySelector('.clickTest');
if ($d0f7ce18c37ad6f6$var$testClick) $d0f7ce18c37ad6f6$var$testClick.addEventListener('click', $d0f7ce18c37ad6f6$var$myFunction);


//# sourceMappingURL=bundle.js.map
