var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["patent"] = document.getElementById("patent").value;
    formData["brand"] = document.getElementById("brand").value;
    formData["model"] = document.getElementById("model").value;
    formData["year"] = document.getElementById("year").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("vehicleList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.patent;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.brand;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.model;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.year;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Editar</a>
                       <a onClick="onDelete(this)">Eliminar</a>`;
}

function resetForm() {
    document.getElementById("patent").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("model").value = "";
    document.getElementById("year").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("patent").value = selectedRow.cells[0].innerHTML;
    document.getElementById("brand").value = selectedRow.cells[1].innerHTML;
    document.getElementById("model").value = selectedRow.cells[2].innerHTML;
    document.getElementById("year").value = selectedRow.cells[3].innerHTML;

}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.patent;
    selectedRow.cells[1].innerHTML = formData.brand;
    selectedRow.cells[2].innerHTML = formData.model;
    selectedRow.cells[3].innerHTML = formData.year;
}

function onDelete(td) {
    if (confirm('¿Estas seguro de eliminar este vehículo?')) {
        row = td.parentElement.parentElement;
        document.getElementById("vehicleList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("patent").value == "") {
        isValid = false;
        document.getElementById("patentValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("patentValidationError").classList.contains("hide"))
            document.getElementById("patentValidationError").classList.add("hide");
    }
    return isValid;
}