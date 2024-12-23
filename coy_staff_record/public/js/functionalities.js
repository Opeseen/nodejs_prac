// THOUSAND SEPARATOR SECTION
let inputValue = document.querySelectorAll('input[name="thousand-convert"]');

if(inputValue){
  inputValue.forEach((element) => {
    let value = Number(element.value)
    element.value = value.toLocaleString('en-us');
  });
} 

function use_number(node) {
  let empty_val = false;
  const value = node.value
  if (node.value == '')
    empty_val = true;
  node.type = 'number';
  if (!empty_val)
    node.value = Number(value.replace(/,/g, ''));
};

function use_text(node) {
  let empty_val = false;
  const value = Number(node.value);
  if (node.value == '')
    empty_val = true;
  node.type = 'text';
  if (!empty_val)
    node.value = value.toLocaleString('en-us');
};

// POP-UP SECTION
function openForm(){
  document.getElementById("ModifyEmployeePayGroupInfo").style.display = "block";
};

function closeForm() {
  document.getElementById("ModifyEmployeePayGroupInfo").style.display = "none";
}