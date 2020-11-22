let empPayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
    empPayrollList=getEmployeePayrollFromStorage();
    document.querySelector(".emp-count").textContent=empPayrollList.length;
    createInnerHtml();
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
    <td>${stringfyDate(empPayroll._startDate)}</td>
    <td>
        <img id="${empPayroll._id}" onclick="remove(this)" alt="delete"
         src="delete-black-18dp.svg">
        <img id="${empPayroll._id}" alt="edit" onclick="update(this)"
         src="create-black-18dp.svg">
    </td>
    </tr>`;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
}

const createEmployeePayrollJSON=()=>{
    let empPayrollListLocal=[
        {
            _name:'Kanishk',
            _gender:'male',
            _department:['HR','Finance'],
            _salary:'350000',
            _startDate:'3 Nov 2020',
            _note:'',
            _id:new Date().getTime(),
            _profilePic:'Ellipse -2.png'
        },
        {
            _name:'BillGates',
            _gender:'male',
            _department:['Finance'],
            _salary:'3500000',
            _startDate:'3 Oct 2020',
            _note:'',
            _id:new Date().getTime(),
            _profilePic:'Ellipse -5.png'   
        }
    ];
    return empPayrollListLocal;
}

const getDeptHtml=(deptList)=>{
    let deptHtml='';
    for(const dept of deptList)
    {
        deptHtml=`${deptHtml}<div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const remove=(node)=>{
    let employeePayrollData=empPayrollList.find(empData=>empData._id==node._id);
    if(!employeePayrollData) return;
    const index=empPayrollList.map(empData=>empData._id).indexOf(employeePayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent=empPayrollList.length;
    createInnerHtml();
}