let roomList =[
    { 
        "id" : 0,
        "name": "Conference Room", 
        "capacity": 4,
        "picture": "assets/img/room-0.png"
    },
    
    { 
        "id" : 3,
        "name": "Security Room", 
        "capacity": 4,
        "picture": "assets/img/room-1.png"
    },

    { 
        "id" : 1,
        "name": "Reception", 
        "capacity": 4,
        "picture": "assets/img/room-2.png"
    },

    { 
        "id" : 2,
        "name": "Server Room", 
        "capacity": 4,
        "picture": "assets/img/room-3.png"
    },


    { 
        "id" : 4,
        "name": "Staff Room", 
        "capacity": 4,
        "picture": "assets/img/room-4.png"
    },

    { 
        "id" : 5,
        "name": "Spare Room", 
        "capacity": 4,
        "picture": "assets/img/room-5.png"
    }
]
LoadRoomsArrayToLocalStorage(roomList)

function LoadRoomsArrayToLocalStorage(roomList) {
    let roomArray = getEmployeesAddedToLocalStorage("rooms") || []
    if (roomArray.length === 0) {        
        localStorage.setItem("rooms", JSON.stringify(roomList))
    }else{
        return
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

roomList.forEach(room => {
    document.querySelector(".row").innerHTML += displayRoom(room)
})

document.addEventListener('DOMContentLoaded', ()=> {    
    displayUnassignedEmployees();
    displayEmployeesInZone("Conference Room", ".room-0");
    displayEmployeesInZone("Reception", ".room-1");
    displayEmployeesInZone("Server Room", ".room-2");
    displayEmployeesInZone("Security Room", ".room-3");
    displayEmployeesInZone("Staff Room", ".room-4");
    displayEmployeesInZone("Spare Room", ".room-5");
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("employee-photo")) {
        let employeeName = event.target.getAttribute('data-employee-name');
        loadToProfileModal(employeeName);
    }
});

function loadToProfileModal(name) {
    let employeeList = getEmployeesAddedToLocalStorage("employee")
    let chosenEmployee = employeeList.find(employeeTemp => employeeTemp.name == name)

    let experienceHTML = "";

    chosenEmployee.experiences.forEach(experience => {
        experienceHTML += `
            <div class="d-flex align-items-center mb-3">
                <span class="bg-light p-3 rounded me-3">
                    <i class="bi bi-briefcase"></i>
                </span>
                <div>
                    <p class="mb-0 fw-semibold">${experience.role}</p>
                    <small class="text-muted">${experience.company} | ${experience.workerDuration}</small>
                </div>
            </div>
        `;
    });

    let locationHTML = "";
    if(chosenEmployee.location == null){
        locationHTML = `
                <small class="text-success">Unassigned</small>
        `;
    }else{
        locationHTML = `
                <p class="mb-0 fw-semibold">${chosenEmployee.location}</p>
                <small class="text-success">Assigned</small>
        `;
    }

    document.querySelector(".employeeProfile").innerHTML = `
        <div class="text-center mb-4">
            <div class="profile-photo mx-auto rounded-circle" style="background-image:url('assets/img/profile.png');"></div>
            <h4 class="fw-bold mt-3 mb-1">${chosenEmployee.name}</h4>
            <span class="badge bg-success px-3 py-2">Software Engineer</span>
          </div>

          <hr>

          <div class="mb-4">
            <div class="d-flex align-items-center mb-3">
              <span class="material-symbols-outlined bg-light p-2 rounded me-3">E-mail</span>
              <span>${chosenEmployee.email}</span>
            </div>
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined bg-light p-2 rounded me-3">phone</span>
              <span>${chosenEmployee.phone}</span>
            </div>
          </div>

          <div class="mb-4">
            <h6 class="fw-bold mb-3">Experiences</h6>${experienceHTML}
          </div>

          <div class="mb-3">
            <h6 class="fw-bold mb-3">Current Location</h6>
            <div class="d-flex align-items-center">
              <span class="bg-light p-3 rounded me-3"><i class="bi bi-geo-alt"></i></span>
              <div>
                ${locationHTML}
              </div>
            </div>
          </div>
    `
}

let currentRoomName = null;

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("addAssignee")) {
        CheckAssignedEmployees(event.target.getAttribute("roomName"));
    }
});

function CheckAssignedEmployees(roomName){
    currentRoomName = roomName;
    let assignedEmployees = getEmployeesAddedToLocalStorage("employee") || []

    let assignedEmployeesList = assignedEmployees.filter(employee => employee.location === roomName)
    let UnassignedEmployeesList = assignedEmployees.filter(employee => employee.location === null)
    
    document.querySelector(".edit_assigned_staff").innerHTML = "";
    
    if (assignedEmployeesList.length === 0) {
        UnassignedEmployeesList.forEach(employee => {
            document.querySelector(".edit_assigned_staff").innerHTML += displayUnassignedEmployeesList(employee, roomName);
        })
    } else {
        UnassignedEmployeesList.forEach(employee => {
            document.querySelector(".edit_assigned_staff").innerHTML += displayUnassignedEmployeesList(employee, roomName);
        })
        assignedEmployeesList.forEach(employee => {
            document.querySelector(".edit_assigned_staff").innerHTML += displayEmployeesInModal(employee, roomName);
        });
    }
}

function displayEmployeesInModal(assignedEmployee, roomName) {
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

document.getElementById("workerPhoto").addEventListener("change", () =>{
    document.querySelector(".preVisualization").src = document.getElementById("workerPhoto").value
})

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
    displayUnassignedEmployees();
})

function displayUnassignedEmployees() {
    let employees = getEmployeesAddedToLocalStorage("employee") || [];
    let container = document.querySelector(".unassigned-employees");
    
    if (!container) return;
    
    container.innerHTML = "";
    
    let unassignedEmployees = employees.filter(employee => employee.location === null);
    
    if (unassignedEmployees.length === 0) {
        container.innerHTML = "<p>No unassigned employees</p>";
        return;
    }
    
    unassignedEmployees.forEach(employee => {
        container.innerHTML += `
            <div class="d-flex align-items-center justify-content-between bg-light-custom p-2 rounded shadow-soft mb-2">
                <div class="d-flex align-items-center gap-3">
                    <div class="rounded-circle employee-photo" data-bs-toggle="modal" data-bs-target="#employeeModal" data-employee-name="${employee.name}" style="background-image:url('${employee.photo}');"></div>
                    <div>
                        <p class="mb-0 employeeName" data-employee-name="${employee.name}">${employee.name}</p>
                        <small class="text-muted-light">${employee.role}</small>
                    </div>
                </div>
            </div>
        `;    
    });
}

function displayEmployeesInZone(zoneKey, containerSelector) {
    let employees = getEmployeesAddedToLocalStorage("employee") || [];
    let container = document.querySelector(containerSelector);

    container.innerHTML = "";

    let zoneEmployees = employees.filter(employeeTemp => employeeTemp.location === zoneKey);

    zoneEmployees.forEach(employee => {
        container.innerHTML += `
            <div class="d-flex align-items-center bg-light p-2 rounded mb-2">
                <img src="${employee.photo}" class="rounded-circle me-2 employee-photo"
                     data-bs-toggle="modal" data-bs-target="#employeeModal"
                     data-employee-name="${employee.name}">
                <div>
                    <p class="mb-0 small employeeName" data-employee-name="${employee.name}">
                        ${employee.name}
                    </p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1">
                    <i class="bi bi-x-circle" data-employee-name="${employee.name}"></i>
                </button>
            </div>
        `;
    });
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
    displayUnassignedEmployees();
    form.reset();
})

document.addEventListener("click", (event)=>{
    if (event.target.classList.contains("bi-x-circle")) {        
        getTheEmployeeBackToTheUnassignedSection(event.target.getAttribute("data-employee-name"))
    }
})

function getTheEmployeeBackToTheUnassignedSection(name) {
    let employeeList = getEmployeesAddedToLocalStorage("employee") || []

    let searchedForEmployee = employeeList.find(employeeTemp => employeeTemp.name === name)

    searchedForEmployee.location = null
    localStorage.setItem("employee", JSON.stringify(employeeList));
}

function getEmployeesAddedToLocalStorage(employeeInformation) {
    return JSON.parse(localStorage.getItem(employeeInformation));
}

function AddNewEmployee(employee) {
    document.querySelector(".unassigned-employees").innerHTML += `
        <div class="d-flex align-items-center justify-content-between bg-light-custom p-2 rounded shadow-soft mb-2">
            <div class="d-flex align-items-center gap-3">
                <div class="rounded-circle" data-bs-toggle="modal" data-bs-target="#employeeModal" style="background-image:url('assets/img/profile.png');"></div>
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