import { useEffect, useState } from "react";
import Role_card from "./Role_card";
// import Role_card from "./Role_card";

const Roles = () => {
  const url ="https://stagingapi.sugarlogger.com/user_profile?include=roles,lab_access";
  const [token, setToken] = useState("");
  const [pageData, setPageData] = useState({});
  const [role, setRole] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    setToken(accessToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("API passed");
            setPageData(data);
            console.log(data);
          }
        })
        .catch((error) => {
          console.error("Error during API request:", error);
        });
    }
  }, [token]);

  useEffect(() => {
    try {
      if (pageData) {
        const { data } = pageData;
        // console.log(success + " " + message + " " + JSON.stringify(data)+" this is the response data");
        const { roles } = data;
        const curUser = `${data.first_name} ${data.last_name}`;
        setUserName(curUser);
        setRole(roles);
        // console.log(roles);
      }
    } catch {
      console.log("error here in this use effect");
    }
  }, [pageData]);

  return (
    <div className="roles">
      <h1>Login As</h1>
      {role.map((person, i) => (
        <Role_card
          role={person.formatted_name}
          user_name={userName}
          data={pageData}
          key={i}
        />
      ))}
    </div>
  );
};

export default Roles;
