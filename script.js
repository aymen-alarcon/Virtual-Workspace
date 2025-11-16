fetch("employees.json")
.then((response) => response.json())
.then((data) => data.forEach(employee => {
    if (employee.location == null) {        
        document.querySelector(".unassigned-employees").innerHTML += displayUnassignedEmployees(employee)
    }else if(employee.location == "Conference Room"){        
        document.querySelector(".conference-room-employees").innerHTML += displayConferenceRoomEmployees(employee)
    }else if(employee.location == "Security Room"){        
        document.querySelector(".security-room-employees").innerHTML += displaySecurityRoomEmployees(employee)
    }else if(employee.location == "Server Room"){        
        document.querySelector(".server-room-employees").innerHTML += displayServerRoomEmployees(employee)
    }else if(employee.location == "Reception Room"){        
        document.querySelector(".reception-room-employees").innerHTML += displayReceptionRoomEmployees(employee)
    }else if(employee.location == "Staff Room"){        
        document.querySelector(".staff-room-employees").innerHTML += displayStaffRoomEmployees(employee)
    }
    })
)

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
        <div class="d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
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
        <div class="d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
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
        <div class="d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
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
        <div class="d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
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
        <div class="d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info" data-bs-toggle="modal" data-bs-target="#employeeModal">
            <img src="${employee.photo}" class="rounded-circle me-2">
            <div>
                <p class="mb-0 small">${employee.name}</p>
                <small class="text-muted-light">${employee.role}</small>
            </div>
            <button class="btn btn-link text-danger ms-auto p-1"><i class="bi bi-x-circle"></i></button>
        </div>           
    `
}