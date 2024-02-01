import Notification from "../parts/Notification";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { v4 as uuidv4 } from 'uuid';
const Add_doc = () => {
  const navigate = useNavigate();
  const [exists, setExists] = useState({});
  const [fetchStatus, setFetchStatus] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selBranch, setSelBranch] = useState();
  const [statusMessage, setStatusMessage] = useState("");
  useEffect(() => {
    setBranches(JSON.parse(localStorage.getItem("branches")));
  }, []);

  const [docInfo, setDocInfo] = useState({
    mobile: "",
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    gender: "",
    degree: "",
    specialization_in: "",
    branch: {
      value: "",
      label: "",
    },
  });

  const [validation, setValidation] = useState({
    mobile: null,
    email: null,
    first_name: null,
    last_name: null,
    address: null,
    pincode: null,
    city: null,
    state: null,
    gender: null,
    degree: null,
    specialization_in: null,
    branch: {
      value: null,
      label: null,
    },
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    const numberPattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const namePattern = /^[a-zA-Z'-\s]+$/;
    const pincodePattern = /^[1-9][0-9]{5}$/;
    const placePattern = /^[a-zA-Z\s']{3,}$/;
    let isValid = true;

    if (name === "mobile") {
      if (numberPattern.test(value)) {
        console.log("correct number");
        checkHas(value);
        isValid = true;
      } else {
        console.log("wrong number");
        isValid = false;
      }
    } else if (name === "email") {
      if (emailPattern.test(value)) {
        isValid = true;
        console.log("correct email");
      } else {
        isValid = false;
        console.log("wrong mail");
      }
    } else if (name === "first_name") {
      if (namePattern.test(value)) {
        console.log("correct name");
        isValid = true;
      } else {
        console.log("wrong name");
        isValid = false;
      }
    } else if (name === "last") {
      if (namePattern.test(value)) {
        console.log("correct last name");
        isValid = true;
      } else {
        console.log("wrong last name");
        isValid = false;
      }
    } else if (name === "pincode") {
      if (pincodePattern.test(value)) {
        console.log("corret pin");
        isValid = true;
      } else {
        console.log("wrong pin");
        isValid = false;
      }
    } else if (name === "city") {
      if (placePattern.test(value)) {
        console.log("correct place");
        isValid = true;
        value = value.toLowerCase();
      } else {
        console.log("wrong place");
        isValid = false;
      }
    } else if (name === "state") {
      if (placePattern.test(value)) {
        console.log("correct place");
        isValid = true;
        value = value.toLowerCase();
      } else {
        console.log("wrong place");
        isValid = false;
      }
    } else if (name === "gender") {
      if (value === null) {
        console.log("wrong gender");
        isValid = false;
      } else {
        console.log("corret gender");
        isValid = true;
      }
    } else if (name === "branch") {
      if (value === null) {
        console.log("select branch ");
        isValid = false;
      } else {
        console.log("ok");
        isValid = true;
      }
    }

    setValidation((prevValidation) => ({
      ...prevValidation,
      [name]: isValid,
    }));

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
        `https://stagingapi.sugarlogger.com/lab/${selBranch}/referred_by`,
        {
          method: "POST",
          body: JSON.stringify(docInfo),
          headers: {
            Authorization: `${accessToken}`,
            "Content-type": "application/json",
          },
        }
      );
      const data = await resp.json();

      if (resp.ok) {
        setFetchStatus(true);
        setStatusMessage(data.message);
        setShowNoti(true);
        setTimeout(() => {
          setShowNoti(false);
        }, 2000);
        setTimeout(() => navigate("/referred_doctor"), 2100);
        console.log("The data was pushed:", data);
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
  const checkHas = async (number) => {
    const resp = await fetch(
      `https://stagingapi.sugarlogger.com/get_user_details?mobile=${number}`,
      {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    const data = await resp.json();
    setExists(data.data);
    console.log(data);
  };
  useEffect(() => {
    for (const key in exists) {
      console.log(`${key} :  ${exists[key]}`);
      setDocInfo((prev) => ({
        ...prev,
        [key]: exists[key],
      }));
    }
  }, [exists]);

  useEffect(() => {}, [docInfo]);

  const handleCancel = () => {
    navigate("/referred_doctor");
    console.log("Editing canceled");
  };

  return (
    <div className="edit-doctor-info">
      <label>
        Mobile Number (Necessary):
        <input
          type="tel"
          name="mobile"
          value={docInfo.mobileNumber}
          onChange={handleInputChange}
          maxLength={10}
          required
          className={validation.mobile ? "valid-in" : "error-in"}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={docInfo.email}
          onChange={handleInputChange}
          className={validation.email === false ? "error-in" : "valid-in"}
        />
      </label>

      <label>
        First Name (Necessary):
        <input
          type="text"
          name="first_name"
          value={docInfo.first_name}
          onChange={handleInputChange}
          className={validation.first_name ? "valid-in" : "error-in"}
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
          className={validation.last_name ? "valid-in" : "error-in"}
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
          className={validation.pincode ? "valid-in" : "error-in"}
          maxLength={6}
        />
      </label>
      <label>
        City:
        <input
          name="city"
          value={docInfo.city}
          onChange={handleInputChange}
          className={validation.city ? "valid-in" : "error-in"}
        />
      </label>
      <label>
        State:
        <input
          name="state"
          value={docInfo.state}
          onChange={handleInputChange}
          className={validation.state ? "valid-in" : "error-in"}
        />
      </label>
      <label>
        Gender
        <select
          name="gender"
          onChange={handleInputChange}
          className={validation.gender ? "valid-in" : "error-in"}
        >
          <option value="null">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Branch:
        <select
          name="branch"
          onChange={handlebranch}
          className={validation.branch ? "valid-in" : "error-in"}
        >
          <option>branch</option>
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

export default Add_doc;
