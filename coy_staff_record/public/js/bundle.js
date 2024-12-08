var $jqtH7$axios = require("axios");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $a9f2c066f21b2766$exports = {};

var $c67cb762f0198593$exports = {};
// type is 'success' or 'error'
const $c67cb762f0198593$var$hideAlert = ()=>{
    const element = document.querySelector('.alert');
    if (element) element.parentElement.removeChild(element);
};
const $c67cb762f0198593$var$showAlert = (type, msg)=>{
    $c67cb762f0198593$var$hideAlert();
    const message = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', message);
    window.setTimeout($c67cb762f0198593$var$hideAlert, 5000);
};
$c67cb762f0198593$exports = {
    hideAlert: $c67cb762f0198593$var$hideAlert,
    showAlert: $c67cb762f0198593$var$showAlert
};


var $a9f2c066f21b2766$require$showAlert = $c67cb762f0198593$exports.showAlert;
var $a9f2c066f21b2766$require$hideAlert = $c67cb762f0198593$exports.hideAlert;
// EMPLOYEES SECTION
const $a9f2c066f21b2766$var$processUpdatedEmployeeRecord = async (id, firstname, lastname, phone, email, address, state, city, nationality)=>{
    try {
        const response = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: 'PUT',
            url: `http://localhost:8080/api/mun/v1/employee/${id}`,
            data: {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                email: email,
                address: address,
                state: state,
                city: city,
                nationality: nationality
            }
        });
        if (response.data.success) {
            $a9f2c066f21b2766$require$showAlert('success', 'Employee Details Successfully Updated');
            window.setTimeout(()=>{
                location.reload();
            }, 2000);
        }
    } catch (error) {
        $a9f2c066f21b2766$require$showAlert('error', error.response.data.message);
    }
};
$a9f2c066f21b2766$exports = {
    processUpdatedEmployeeRecord: $a9f2c066f21b2766$var$processUpdatedEmployeeRecord
};


var $d0f7ce18c37ad6f6$require$processUpdatedEmployeeRecord = $a9f2c066f21b2766$exports.processUpdatedEmployeeRecord;
// EMPLOYEE QUERY SELECTOR
const $d0f7ce18c37ad6f6$var$updatedEmployeeRecord = document.querySelector('.modify-employee');
// Employee Section
if ($d0f7ce18c37ad6f6$var$updatedEmployeeRecord) $d0f7ce18c37ad6f6$var$updatedEmployeeRecord.addEventListener('submit', (event)=>{
    event.preventDefault();
    const firstname = document.getElementById('fname').value;
    const lastname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const nationality = document.getElementById('nationality').value;
    const id = document.getElementById('docid').value;
    console.log(true);
    $d0f7ce18c37ad6f6$require$processUpdatedEmployeeRecord(id, firstname, lastname, phone, email, address, state, city, nationality);
});


//# sourceMappingURL=bundle.js.map
