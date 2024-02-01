/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";
// import { useEffect,useCallback } from "react";

const Role_card = ({ role, user_name, data }) => {

  const selectedRole = {
    first_name: data.data.first_name,
    last_name: data.data.last_name,
    reg_status: data.data.lab_access[0].lab_group.reg_status,
    lab_name: data.data.lab_access[0].lab_group.name,
    uuid: data.data.lab_access[0].lab_role.uuid,
    role: {
      formatted_name: data.data.lab_access[0].lab_role.formatted_name,
      name: data.data.lab_access[0].lab_role.name,
    },
  };
  console.log(
    `role selected data ${data.data.first_name} ${data.data.last_name} ${data.data.lab_access[0].lab_group.reg_status} ${data.data.lab_access[0].lab_group.name} ${data.data.lab_access[0].lab_role.formatted_name} ${data.data.lab_access[0].lab_role.name} ${data.data.lab_access[0].lab_role.uuid}`
  );
  //     console.log(JSON.stringify(data) +" want to store some data");
  //    console.log(data.data.lab_access[0].lab_group.uuid+" want to se the id");

  const handleClick = (role) => {
    if (role === "Lab User") {
      localStorage.setItem("role", "lab-admin");
      localStorage.setItem("data_uuid", data.data.uuid);
      localStorage.setItem(
        "lab_group_uuid",
        data.data.lab_access[0].lab_group.uuid
      );
      localStorage.setItem("selectedRole", JSON.stringify(selectedRole));
      window.location.href = "./Lab-admin";
    } else {
      window.location.href = "./Fall_page";
    }
  };

  return (
    <button className="role-card" onClick={() => handleClick(role)}>
      <p>{user_name}</p>
      <h3 className="role-title">{role}</h3>
    </button>
  );
};

export default Role_card;
