const stringfyDate=(date)=>{
    const options={day:'numeric',month:'short',year:'numeric'};
     const empDate=!date?"undefined":
                    new Date(Date.parse(date)).toLocaleDateString("en-GB",options);
    return empDate;
}