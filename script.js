fetch("zones.json")
.then((res) => res.json())
.then((roomData) => roomData.forEach(room => {document.querySelector(".row").innerHTML += displayRoom(room)}))

let employees = getEmployeesAddedToLocalStorage("employee") || [];
employees.forEach(employee => {
    if (!employee.location) {        
        document.querySelector(".unassigned-employees").innerHTML += displayUnassignedEmployees(employee);
    } else if(employee.location === "Conference Room"){     
        document.querySelector(".room-0").innerHTML += displayConferenceRoomEmployees(employee);
    } else if(employee.location === "Security Room"){        
        document.querySelector(".room-3").innerHTML += displaySecurityRoomEmployees(employee);
    } else if(employee.location === "Server Room"){        
        document.querySelector(".room-2").innerHTML += displayServerRoomEmployees(employee);
    } else if(employee.location === "Reception Room"){        
        document.querySelector(".room-1").innerHTML += displayReceptionRoomEmployees(employee);
    } else if(employee.location === "Staff Room"){        
        document.querySelector(".room-4").innerHTML += displayStaffRoomEmployees(employee);
    } else if(employee.location === "Spare Room"){        
        document.querySelector(".room-5").innerHTML += displaySpareRoomEmployees(employee);
    }
});

function EmployeeSaved(employee) {
    let data = getEmployeesAddedToLocalStorage("employee");
    
    if (!data || data.length === 0) {
        saveToLocalStorage("employee", employee);
        return;
    }
    
    let employeeExist = data.some(emp => emp.name === employee.name);
    
    if (!employeeExist) {
        saveToLocalStorage("employee", employee);
    }
}

function displayRoom(room) {
        return `
            <div class="col-12 col-lg-6 col-xl-4 mb-1">
                <div class="card bg-card-light shadow-soft h-100 rounded-xl" style="background-image: url('${room.picture}'); background-size: cover;">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title text-white mb-0">${room.name}</h5>
                            <button class="btn btn-link text-white text-decoration-none p-0 addAssignee" roomName="${room.name}" data-bs-toggle="modal" data-bs-target="#assignWorker"><i class="bi bi-plus-circle"></i>Assign</button>
                        </div>
                        <div class="flex-fill room-${room.id}"></div>
                    </div>
                </div>
            </div>
        `
}
let currentRoomName = null;
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("addAssignee")) {
        currentRoomName = event.target.getAttribute("roomName")
        CheckAssignedEmployees(event.target.getAttribute("roomName"));
    }
});

function CheckAssignedEmployees(roomName){
    let assignedEmployees = getEmployeesAddedToLocalStorage("employee")

    let assignedEmployeesList = assignedEmployees.filter(employee => employee.location === roomName)
    let UnassignedEmployeesList = assignedEmployees.filter(employee => employee.location === null)
    
    document.querySelector(".edit_assigned_staff").innerHTML = "";
    
    if (assignedEmployeesList.length === 0) {
        UnassignedEmployeesList.forEach(employee => {
            document.querySelector(".edit_assigned_staff").innerHTML += displayUnassignedEmployeesList(employee);
        })
    } else {
        UnassignedEmployeesList.forEach(employee => {
            document.querySelector(".edit_assigned_staff").innerHTML += displayUnassignedEmployeesList(employee);
        })
        assignedEmployeesList.forEach(employee => {
            document.querySelector(".edit_assigned_staff").innerHTML += displayEmployeesInModal(employee);
        });
    }
}
function displayEmployeesInModal(assignedEmployee) {
    return`    
        <div class="d-flex gap-5 g-5 assignedEmployeesCheckbox">
            <input type="checkbox" class="checkbox" name="${assignedEmployee.name}" room="${currentRoomName}" checked>${assignedEmployee.name}
        </div>
    `
}

function displayUnassignedEmployeesList(assignedEmployee) {
    return`    
        <div class="d-flex gap-5 g-5 assignedEmployeesCheckbox">
            <input type="checkbox" class="checkbox" name="${assignedEmployee.name}" room="${currentRoomName}">${assignedEmployee.name}
        </div>
    `
}

document.querySelector('.save_changes').addEventListener("click", ()=>{
    document.querySelectorAll(".checkbox").forEach(employeeCheckBox =>{
        if (employeeCheckBox.checked === true) {
            let nameOfEmployee = employeeCheckBox.getAttribute("name")
            let nameOfRoom = currentRoomName;

            let employeesList = getEmployeesAddedToLocalStorage("employee")
            let employeeToChange = employeesList.find(employeeTemp => employeeTemp.name === nameOfEmployee)
            employeeToChange.location = nameOfRoom
            localStorage.setItem("employee", JSON.stringify(employeesList));
        }else{
            let nameOfEmployee = employeeCheckBox.getAttribute("name")

            let employeesList = getEmployeesAddedToLocalStorage("employee")
            let employeeToChange = employeesList.find(employeeTemp => employeeTemp.name === nameOfEmployee)
            employeeToChange.location = null
            localStorage.setItem("employee", JSON.stringify(employeesList));
        }
    })
})

function displayUnassignedEmployees(employee) {
    return `
            <div class="d-flex align-items-center justify-content-between bg-light-custom p-2 rounded shadow-soft mb-2">
                <div class="d-flex align-items-center gap-3 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                    <div class="rounded-circle" style="background-image:url('${employee.photo}');"></div>
                    <div>
                        <p class="mb-0">${employee.name}</p>
                        <small class="text-muted-light">${employee.role}</small>
                    </div>
                </div>
            </div>
        `
}

function displayConferenceRoomEmployees(employee) {
        return `
            <div class="d-flex align-items-center bg-light p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
}

function displayServerRoomEmployees(employee) {
        return `
            <div class="d-flex align-items-center bg-light p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
}

function displayReceptionRoomEmployees(employee) {
        return `
            <div class="d-flex align-items-center bg-light p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
}

function displayStaffRoomEmployees(employee) {
        return `
            <div class="d-flex align-items-center bg-light p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
}

function displaySpareRoomEmployees(employee) {
        return `
            <div class="d-flex align-items-center bg-light p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
}

function displaySecurityRoomEmployees(employee) {
        return `
            <div class="d-flex align-items-center bg-light p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
}

document.forms["addWorkerForm"].addEventListener("submit", (event)=>{
    event.preventDefault();
    
    let form = event.target;

    let arr = {
        name : document.getElementById("workerName").value,
        role : document.getElementById("workerRole").value,
        email : document.getElementById("workerEmail").value,
        phone : document.getElementById("workerPhone").value,
        photo : "assets/img/profile.png",
        location : null,
        experiences : []
    }   
    
    if (form.company.length == undefined && form.role.length == undefined && form.workerDuration.length == undefined) {
        arr.experiences.push({
            company : form.company.value,
            role : form.role.value,
            workerDuration : form.workerDuration.value
        })        
    }else{
        for (let i = 0; i < form.company.length; i++) {      
            arr.experiences.push({
                company : form.company[i].value,
                role : form.role[i].value,
                workerDuration : form.workerDuration[i].value
            })        
        }
    }

    saveToLocalStorage("employee", arr)
    AddNewEmployee(arr)
    form.reset();
})

function getEmployeesAddedToLocalStorage(employeeInformation) {
    return JSON.parse(localStorage.getItem(employeeInformation));
}

function AddNewEmployee(employee) {
    document.querySelector(".unassigned-employees").innerHTML += `
        <div class="d-flex align-items-center justify-content-between bg-light-custom p-2 rounded shadow-soft mb-2">
            <div class="d-flex align-items-center gap-3 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <div class="rounded-circle" style="background-image:url('assets/img/profile.png');"></div>
                <div>
                    <p class="mb-0">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
            </div>
        </div>
    `
}

document.getElementById("addExperienceBtn").addEventListener("click", ()=>{
    document.querySelector(".experience_zone").innerHTML += document.querySelector(".experience_zone").innerHTML
})

function saveToLocalStorage(keyName, dataList) {
    let existingEmployees = getEmployeesAddedToLocalStorage(keyName) || [] ;
    existingEmployees.push(dataList)
    localStorage.setItem(keyName, JSON.stringify(existingEmployees));
}