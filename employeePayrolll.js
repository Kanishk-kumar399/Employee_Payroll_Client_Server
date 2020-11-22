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
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetform();
        window.location.replace("home.html");
    }
    catch(e)
    {return;}
}
const setEmployeePayrollObject=()=>{
    employeePayrollObj._name=getInputValueById('#name');
    employeePayrollObj._profilePic=getSelectedValues('[name=profilePic]').pop();
    employeePayrollObj._gender=getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department=getSelectedValues('[name=department]');
    employeePayrollObj._salary=getInputValueById('#salary');
    employeePayrollObj._note=getInputValueById('#notes');
    let date=getInputValueById('#month')+" "+getInputValueById('#day')+" "+getInputValueById("#year");
    employeePayrollObj._startDate=new Date(date);
}

const createAndUpdateStorage=()=>
{
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData=employeePayrollList.find(empData=>empData._id==employeePayrollObj._id);
        if(!empPayrollData){
            employeePayrollList.push(createEmployeePayroll())
        }
        else{
            const index=employeePayrollList.map(empData=>empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,createEmployeePayroll(empPayrollData._id));
        }
    }
    else{
        empPayrollList=[createEmployeePayroll()]
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}
const createEmployeePayroll=(id)=>{
    let employeePayrollData=new EmployeePayroll1();
    if(!id) employeePayrollData.id=createNewEmployeeId();
    else employeePayrollData.id=id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}
const setEmployeePayrollData=(employeePayrollData)=>{
    try{
        employeePayrollData.name=employeePayrollObj._name;

    }
    catch(e){
        setTextValue('text-error',e);
        throw e;
    }
    employeePayrollData.profilePic=employeePayrollObj._profilePic;
    employeePayrollData.gender=employeePayrollObj._gender;
    employeePayrollData.department=employeePayrollObj._department;
    employeePayrollData.salary=employeePayrollObj._salary;
    employeePayrollData.note=employeePayrollObj._note;
    employeePayrollData.startDate=new Date(Date.parse(employeePayrollObj._startDate));
    alert(employeePayrollData.toString());
}
const createNewEmployeeId=()=>{
    let empId=localStorage.getItem("EmployeeId");
    empId=!empId?1:(parseInt(empId)+1).toString();
    localStorage.setItem("EmployeeId",empId);
    return empId;
}
const getSelectedValues=(property)=>{
    let allItems=document.querySelectorAll(property);
    let selItems=[];
    allItems.forEach(item=>{if(item.checked) selItems.push(item.value)});
    return selItems;
}

const setSelectedValues=(property,value)=>{
    let allItems=document.querySelectorAll(property);
    allItems.forEach(item=>
        {
        if(Array.isArray(value))
        {
            if(value.includes(item.value)){
            item.checked=true;
            }
        }
        else if(item.value==value)
        item.checked=true;
    });
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
const setForm=()=>{
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._notes);
    let date=stringfyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
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
