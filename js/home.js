let empPayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
    empPayrollList=getEmployeePayrollFromStorage();
    document.querySelector(".emp-count").textContent=empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollFromStorage=()=>{
    return localStorage.getItem('EmployeePayrollList')?JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}

const createInnerHtml=()=>{
    const headerHtml="<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml=`${headerHtml}`;
    for(const empPayroll of empPayrollList)
    {
    innerHtml=`${innerHtml}
    <tr>
    <td><img class="profile" alt="No image" src="${empPayroll._profilePic}"></td>
    <td>${empPayroll._name}</td>
    <td>${empPayroll._gender}</td>
    <td>${getDeptHtml(empPayroll._department)}</td>
    <td>${empPayroll._salary}</td>
    <td>${stringifyDate(empPayroll._startDate)}</td>
    <td>
        <img id="${empPayroll._id}" onclick="remove(this)" alt="delete"
         src="../assets/icons/delete-black-18dp.svg">
        <img id="${empPayroll._id}" onclick="update(this)" alt="edit"
         src="../assets/icons/create-black-18dp.svg">
    </td>
    </tr>`;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
}

const getDeptHtml=(deptList)=>{
    let deptHtml='';
    for(const dept of deptList)
    {
        deptHtml=`${deptHtml}<div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    if (!empPayrollData) return;
    const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    if (empPayrollList.length == 0) {
        location.reload();
    }
    createInnerHtml();
}

const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    if (!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
    window.location.replace(site_properties.add_emp_payroll_page);
}