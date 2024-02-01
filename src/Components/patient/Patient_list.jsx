import { useEffect } from "react";
import Table from "../Table";

const token_type='Bearer'
const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiOTQyYTQ4NTI4NDk1NjRlZjA5ZTY5MTNjNzk1MjZiMDM4ZjFkYThkZjg3MjkwNDkzZGNjMzA2ZWE2YWZmYTE1MGZjMjUyOTJiMGVmYTEzZjEiLCJpYXQiOjE3MDQ4NzEzODMsIm5iZiI6MTcwNDg3MTM4MywiZXhwIjoxNzA0OTU3NzgzLCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.jNgYEmCDENX7iRWCIKDcUpuYlDuTc6M66jdUAuZso-2rXtHGKUN1SLMqssc13-EChiEDL5SWveJENOlpZyXiYuR3kP6nD0tKoB9_L98Am1-mSnW1sL0IfPtp2jgIy3zo-8H0ArUFAA_22Y_CEoYlyhSMpxPJcKx9yRLjBL-I8IGjdIGNn0MfS7a47JmgDQWah_24-CpQaaHAW_-BNEL9TVZ4s-MGx-ax9ySjJMNmoq5qVAGX6WQsuC7-u9vONW2JqUPtEDPqazTnTNTvDCp1c9wAKJYGwSwIP4QW6CN5wUVGBvb2AauGBISlQ5TdxjmkX9dKwox1tKIPTkjyV847Ka8bxqkXefoZCeW1FaPeibvI_uLFFYPeI0BMMka8d0CyBM9UrmNS251Ij8r6CDnLQ4o-fX9n9qRQBa5Yj0YH9xT25Yq2SD8ZIKA5f91DflOxMjsFmMiEdP2QlqYjl1IbbAYt0dJjVlWwGAGRWsenya2k7DzCGBs6OUH_hxOaDXvPvDt8yZZlyHMO8Wp26k1UIgddehiJn59XOnLtwYR8cXlYC434X7Yy5hpG8FPfaQX2TlaDFuEWV4N25HWadVp6TUvwrUiJjkpkDRTK8hw3qGuY4bVyqsvfKHxQIX2oi1LB_hJo4XQYgDWNAZIrI6-GFqYJfneCZsxH07Em0mqjYAM';

localStorage.setItem('token',`${token_type}${token}`);

const loginAs = "lab-admin";
const role = {
  first_name: "Jeet",
  lab_name: "Sugarlogger Labs",
  last_name: "Khandelwal",
  reg_status: "complete",
  role: { formatted_name: "Lab Admin", name: "lab_admin" },
  uuid: "2c01ee46-22d6-4d7f-a772-dc22f5db0526",
};

localStorage.setItem("loginAs", loginAs);
localStorage.setItem("selectedRole", role);



const Patient_list = () => {
  
  useEffect(
    ()=>{
     fetch('https://sugarlogger.com/lab-admin/patients/list', {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
          'Authorization':`${token_type}${token}`,
       },
     })
     .then(response => {
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
         return response.json();
       })
     .then(data=>console.log(data))
     .catch(error => console.error(error))
    },[]
   );
   
  return (
    <div className="Patient_list">
      <h1 className="head">Patients</h1>
      <Table />
    </div>
  );
};

export default Patient_list;
