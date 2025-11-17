fetch("zones.json")
.then((res) => res.json())
.then((roomData) => roomData.forEach(room => {
        document.querySelector(".row").innerHTML += displayRoom(room)
    }
))

// let zone = document.querySelector(`.room-${room.id}`) 
// let employeeCount = zone.querySelectorAll(".profile-info").length;

fetch("employees.json")
.then((response) => response.json())
.then((data) => data.forEach(employee => {
        if (employee.location == null) {        
            document.querySelector(".unassigned-employees").innerHTML += displayUnassignedEmployees(employee)
        }else if(employee.location == "Conference Room"){     
            document.querySelector(".room-0").innerHTML += displayConferenceRoomEmployees(employee)
        }else if(employee.location == "Security Room"){        
            document.querySelector(".room-1").innerHTML += displaySecurityRoomEmployees(employee)
        }else if(employee.location == "Server Room"){        
            document.querySelector(".room-2").innerHTML += displayServerRoomEmployees(employee)
        }else if(employee.location == "Reception Room"){        
            document.querySelector(".room-3").innerHTML += displayReceptionRoomEmployees(employee)
        }else if(employee.location == "Staff Room"){        
            document.querySelector(".room-4").innerHTML += displayStaffRoomEmployees(employee)
        }
    })
)

function displayRoom(room) {
        return `
            <div class="col-12 col-lg-6 col-xl-4">
                <div class="card bg-card-light shadow-soft h-100 rounded-xl">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title mb-0">${room.name}</h5>
                            <button class="btn btn-link text-dark text-decoration-none p-0"><i class="bi bi-plus-circle"></i>Assign</button>
                        </div>
                        <div class="flex-fill room-${room.id}"></div>
                    </div>
                </div>
            </div>
        `
}

function displayUnassignedEmployees(employee) {
    // if (employeeCount != 0) {        
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
    // }else{
    //     return `
    //             <div class="flex-fill staff-room-employees d-flex flex-column justify-content-center align-items-center text-muted-light">
    //                 <i class="bi bi-person-plus"></i>
    //                 <p class="mb-0 small">No one assigned</p>
    //             </div>

    //     `
    // }
}

function displayConferenceRoomEmployees(employee) {
    // if (employeeCount != 0) {        
        return `
            <div class="d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
    // }else{
    //     return `
    //             <div class="flex-fill staff-room-employees d-flex flex-column justify-content-center align-items-center text-muted-light">
    //                 <i class="bi bi-person-plus"></i>
    //                 <p class="mb-0 small">No one assigned</p>
    //             </div>

    //     `
    // }
}

function displayServerRoomEmployees(employee) {
    // if (employeeCount != 0) {        
        return `
            <div class="d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
    // }else{
    //     return `
    //             <div class="flex-fill staff-room-employees d-flex flex-column justify-content-center align-items-center text-muted-light">
    //                 <i class="bi bi-person-plus"></i>
    //                 <p class="mb-0 small">No one assigned</p>
    //             </div>

    //     `
    // }
}

function displayReceptionRoomEmployees(employee) {
    // if (employeeCount != 0) {        
        return `
            <div class="d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
    // }else{
    //     return `
    //             <div class="flex-fill staff-room-employees d-flex flex-column justify-content-center align-items-center text-muted-light">
    //                 <i class="bi bi-person-plus"></i>
    //                 <p class="mb-0 small">No one assigned</p>
    //             </div>

    //     `
    // }
}

function displayStaffRoomEmployees(employee) {
    // if (employeeCount != 0) {        
        return `
            <div class="d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
    // }else{
    //     return `
    //             <div class="flex-fill staff-room-employees d-flex flex-column justify-content-center align-items-center text-muted-light">
    //                 <i class="bi bi-person-plus"></i>
    //                 <p class="mb-0 small">No one assigned</p>
    //             </div>

    //     `
    // }
}

function displaySecurityRoomEmployees(employee) {
    // if (employeeCount != 0) {        
        return `
            <div class="d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
                <img src="${employee.photo}" class="rounded-circle me-2">
                <div>
                    <p class="mb-0 small">${employee.name}</p>
                    <small class="text-muted-light">${employee.role}</small>
                </div>
                <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
            </div>           
        `
    // }else{
    //     return `
    //             <div class="flex-fill staff-room-employees d-flex flex-column justify-content-center align-items-center text-muted-light">
    //                 <i class="bi bi-person-plus"></i>
    //                 <p class="mb-0 small">No one assigned</p>
    //             </div>

    //     `
    // }
}

document.forms["addWorkerForm"].addEventListener("submit", (event)=>{
    event.preventDefault();
    
    let form = event.target;

    let arr = {
        WorkerName : document.getElementById("workerName").value,
        workerRole : document.getElementById("workerRole").value,
        workerEmail : document.getElementById("workerEmail").value,
        workerPhone : document.getElementById("workerPhone").value,
        workerExperience : []
    }   
    
    if (form.company.length == undefined && form.role.length == undefined && form.workerDuration.length == undefined) {
        arr.workerExperience.push({
            company : form.company.value,
            role : form.role.value,
            workerDuration : form.workerDuration.value
        })        
    }else{
        for (let i = 0; i < form.company.length; i++) {      
            arr.workerExperience.push({
                company : form.company[i].value,
                role : form.role[i].value,
                workerDuration : form.workerDuration[i].value
            })        
        }
    }

    saveToLocalStorage("employee", arr)
    AddNewEmployee(arr)
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
                    <p class="mb-0">${employee.WorkerName}</p>
                    <small class="text-muted-light">${employee.workerRole}</small>
                </div>
            </div>
        </div>
    `
}

document.getElementById("addExperienceBtn").addEventListener("click", ()=>{
    document.querySelector(".experience_zone").innerHTML += document.querySelector(".experience_zone").innerHTML
})

function saveToLocalStorage(keyName, dataList) {
    let existingEmployees = getEmployeesAddedToLocalStorage(keyName);
    existingEmployees.push(dataList)
    localStorage.setItem(keyName, JSON.stringify(existingEmployees));
}