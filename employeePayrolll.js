let isUpdate=false;
let employeePayrollObj={};
window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector('#name');
    const textError=document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length==0)
        {
        textError.textContent=="";
        return;
        }
        try{
            (new EmployeePayroll1()).name=name.value;
            textError.textContent="";
        }
        catch(e)
        {
            textError.textContent=e;
        }
    });
    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input',function(){
    output.textContent=salary.value;
    });
    checkForUpdate();
});
const checkForUpdate=()=>{
    const employeePayrollJson=localStorage.getItem('editEmp');
    isUpdate=employeePayrollJson?true:false;
    if(!isUpdate)return;
    employeePayrollObj=JSON.parse(employeePayrollJson);
    setForm();
}
const save=() => {
    try {
        let employeePayrollData=createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch(e)
    {return;}
}
function createAndUpdateStorage(employeePayroll)
{
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined)
    {
        employeePayrollList.push(employeePayroll);
    }
    else
    {
    employeePayrollList=[employeePayroll];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}
const createEmployeePayroll=()=>{
    let employeePayroll=new EmployeePayroll1();
    try{
        employeePayroll.name=getInputValueById('#name');
    }
    catch(e)
    {
        setTextValue('.text-error',e); 
        throw e;
    }
    employeePayroll.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayroll.gender=getSelectedValues('[name=gender]').pop();
    employeePayroll.department=getSelectedValues('[name=department]');
    employeePayroll.salary=getInputValueById('#salary');
    employeePayroll.note=getInputValueById('#notes');
    let date=getInputValueById('#month')+" "+getInputValueById('#day')+" "+getInputValueById("#year");
    employeePayroll.startDate=new Date(date);
    alert(employeePayroll.toString());
    return employeePayroll;
}
const getSelectedValues=(property)=>{
    let allItems=document.querySelectorAll(property);
    let selItems=[];
    allItems.forEach(item=>{if(item.checked) selItems.push(item.value)});
    return selItems;
}

const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}

const resetform=()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues=(property)=>{
    let items=document.querySelector(property);
    items.forEach(item=>
        {
            item.checked=false;
        });
}

const setTextValue=(id,value)=>{
    const element=document.querySelector(id);
    element.textContent=value;
}
const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}
