//EmployeePayroll

class EmployeePayroll1
{
//getter and setter method
 get name() {
     return this._name;
 }
 set name(name){
     let nameRegex=RegExp('^[A-Z]{1}[a-z]{3,}$');
     if(nameRegex.test(name))
     this._name=name;
     else throw 'Name is Incorrect!';
 }
get id() {
    return this._id;
}
set id(id){
    this._id=id
}
get startDate(){
    return this._startDate;
}
set startDate(startDate)
{
    this._startDate=startDate;
}
get salary() {
    return this._salary;
}
set salary(salary){
    this._salary=salary;
}
get gender() {
    return this._gender;
}
set gender(gender){
    this._gender=gender;
}
get profilePic(){
    return this._profilePic;
}
set profilePic(profilePic)
{
    this._profilePic=profilePic;
}
get department(){
    return this._department;
}
set department(department)
{
    this._department=department;
}
get note(){
    return this._note;
}
set note(note){
    this._note=note;
}
 //method
 toString(){
     const options={year:'numeric',month:'short',day:'numeric'};
     const empDate=!this.startDate?"undefined":
                    this.startDate.toLocaleDateString("en-US",options);
     return "id:"+this.id+"name="+this.name+",gender="+this.gender+
     ",profile pic:"+this.profilePic+",department:"+this.department+",salary="+this.salary+",startDate="+empDate+",note:"+this.note;
 }
}