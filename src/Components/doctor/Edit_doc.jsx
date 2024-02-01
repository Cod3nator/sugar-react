/* eslint-disable react/prop-types */
import { EditDocContext } from "./EditDocProvider";
import Notification from "../parts/Notification";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Edit_doc = () => {
  // const location = useLocation();

  const { docEditData } = useContext(EditDocContext);
  console.log(docEditData + " data context");

  const data = docEditData;
  const navigate = useNavigate();
  const [showNoti, setShowNoti] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [branches, setBranches] = useState([]);
  const [selBranch, setSelBranch] = useState();
  const [docId, setDocId] = useState();

  useEffect(() => {
    setSelBranch(data.lab_id);
    setDocId(data.uuid);
  }, [data]);

  useEffect(() => {
    setBranches(JSON.parse(localStorage.getItem("branches")));
  }, []);

  const [docInfo, setDocInfo] = useState({
    mobile: `${data.mobile}`,
    email: `${data.email}`,
    first_name: `${data.first_name}`,
    last_name: `${data.last_name}`,
    address: `${data.address}`,
    pincode: `${data.pincode}`,
    city: `${data.city}`,
    state: `${data.state}`,
    gender: `${data.gender}`,
    degree: `${data.degree}`,
    specialization_in: `${data.specialization_in}`,
    branch: {
      value: `${data.lab_id}`,
      label: `${data.lab_name}`,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    console.log(name + "   " + JSON.stringify(value));
  };

  const handlebranch = (e) => {
    const { name, value } = e.target;
    const label = e.target.options[e.target.selectedIndex].text;
    setSelBranch(value);
    setDocInfo((prevInfo) => ({
      ...prevInfo,
      [name]: { value, label },
    }));

    console.log(value, label);
  };

  const accessToken = localStorage.getItem("token");

  const handleSave = async () => {
    try {
      const resp = await fetch(
        `https://stagingapi.sugarlogger.com/lab/${selBranch}/referred_by/${docId}`,
        {
          method: "PUT",
          body: JSON.stringify(docInfo),
          headers: {
            Authorization: `${accessToken}`,
            "Content-type": "application/json",
          },
        }
      );

      const data = await resp.json();

      if (resp.ok) {
        console.log("The data was pushed:", data);
        setFetchStatus(true);
        setShowNoti(true);
        setTimeout(() => {
          setShowNoti(false);
        }, 2000);
        setStatusMessage(data.message);
        setTimeout(() => navigate("/referred_doctor"), 2000);
      } else {
        setFetchStatus(false);
        setStatusMessage(data.message);
        setShowNoti(true);
        setTimeout(() => {
          setShowNoti(false);
        }, 2000);
        console.error("Error pushing data:", data);
      }
    } catch (error) {
      console.error("Error occurred during the fetch:", error);
    }

    console.log("Doctor info saved:", docInfo);
  };

  const handleCancel = () => {
    navigate("/referred_doctor");
    console.log("Editing canceled");
  };

  return (
    <div className="edit-doctor-info">
      <label>
        Mobile Number (Necessary):
        <input
          type="text"
          name="mobile"

          value={docInfo.mobile}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={docInfo.email}
          onChange={handleInputChange}
        />
      </label>

      <label>
        First Name (Necessary):
        <input
          type="text"
          name="first_name"
          value={docInfo.first_name}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Last Name :
        <input
          type="text"
          name="last_name"
          value={docInfo.last_name}
          onChange={handleInputChange}
          required
          minLength="2"
        />
      </label>

      <label>
        Address:
        <textarea
          name="address"
          value={docInfo.address}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Pincode:
        <input
          name="pincode"
          value={docInfo.pincode}
          onChange={handleInputChange}
        />
      </label>
      <label>
        City:
        <input
          name="city"
          value={docInfo.city.toLowerCase()}
          onChange={handleInputChange}
        />
      </label>
      <label>
        State:
        <input
          name="state"
          value={docInfo.state.toLowerCase()}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Gender
        <select name="gender" onChange={handleInputChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Branch:
        <select name="branch" onChange={handlebranch} disabled>
          {branches.map((item) => (
            <option key={item.uuid} value={item.uuid} label={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <div className="buttons">
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>

      {showNoti && (
        <Notification status={fetchStatus} message={statusMessage} />
      )}
    </div>
  );
};

export default Edit_doc;
