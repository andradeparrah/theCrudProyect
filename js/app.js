var selectedRow = null
let cars = []

readLS()
function onFormSubmit(e) {
    e.preventDefault()
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
            updateLS()} 
        else{
        updateRecord(formData);
        }
        resetForm();
    }
}

    function updateLS() {
    localStorage.setItem('cars', JSON.stringify(cars))
    }

    function readLS(){
        const carsSaved=localStorage.getItem('cars')
        if(!carsSaved)return
        const cars=JSON.parse(carsSaved)
        cars.forEach(car=>{insertNewRecord(car)})
    }


function readFormData() {
    var formData = {};
    formData["patent"] = document.getElementById("patent").value;
    formData["brand"] = document.getElementById("brand").value;
    formData["model"] = document.getElementById("model").value;
    formData["year"] = document.getElementById("year").value;
    formData["id"]=Date.now()
    return formData;
}

function insertNewRecord(data) {

    var table = document.getElementById("vehicleList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0=newRow.insertCell(0)
    cell0.innerHTML = data.id;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.patent;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.brand;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.model;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.year;
    cell4 = newRow.insertCell(5);
    cell4.innerHTML = `<a onClick="onEdit(this,${data.id})">Editar</a>
                       <a onClick="onDelete(this,${data.id})">Eliminar</a>`;
    cars.push(data)
}

function resetForm() {
    document.getElementById("patent").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("model").value = "";
    document.getElementById("year").value = "";
    selectedRow = null;
}

function onEdit(td,id) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("patent").value = selectedRow.cells[1].innerHTML;
    document.getElementById("brand").value = selectedRow.cells[2].innerHTML;
    document.getElementById("model").value = selectedRow.cells[3].innerHTML;
    document.getElementById("year").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = formData.patent;
    selectedRow.cells[2].innerHTML = formData.brand;
    selectedRow.cells[3].innerHTML = formData.model;
    selectedRow.cells[4].innerHTML = formData.year;
    const id = selectedRow.cells[0].innerHTML
    cars.forEach(car =>{
        if (car.id===id){
        car.patent =selectedRow.cells[1].innerHTML;
        car.brand=selectedRow.cells[2].innerHTML;
        car.model=selectedRow.cells[3].innerHTML;
        car.year=selectedRow.cells[4].innerHTML;
        }
    })
    updateLS() 
}

function onDelete(td,id) {

    Swal.fire({
        title: 'Estas seguro de eliminar este auto',
        text: "¡No podrás recuperar los datos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar auto!'
      }).then((result) => {
        if (result.isConfirmed) {
            row = td.parentElement.parentElement;
            document.getElementById("vehicleList").deleteRow(row.rowIndex);
            cars = cars.filter((car) => car.id !== id)
          Swal.fire(
            'Eliminado!',
            'Tu auto ha sido eliminado',
            'success'
          )
          updateLS()
                }
      })
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
    isValid = true;
    if (document.getElementById("brand").value == "") {
        isValid = false;
        document.getElementById("brandValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("brandValidationError").classList.contains("hide"))
        document.getElementById("brandValidationError").classList.add("hide");
    }
    isValid = true;
    if (document.getElementById("model").value == "") {
        isValid = false;
        document.getElementById("modelValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("modelValidationError").classList.contains("hide"))
        document.getElementById("modelValidationError").classList.add("hide");
    }
    isValid = true;
    if (document.getElementById("year").value == "") {
        isValid = false;
        document.getElementById("yearValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("yearValidationError").classList.contains("hide"))
        document.getElementById("yearValidationError").classList.add("hide");
    }
    return isValid;
}
