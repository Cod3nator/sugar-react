// import down_arw from "../assets/down_arw.svg";
import { EditDocContext } from "./EditDocProvider";
import Sidebar from "../navigation/Sidebar";
import Top_bar from "../navigation/Top_bar";
import Pagination from "../navigation/Pagination";
import { useContext, useEffect, useState } from "react";
import Notification from "../parts/Notification";
import { useNavigate } from "react-router-dom";

const Refered_doctor = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState();
  const [showNoti, setShowNoti] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const { setDocEditData } = useContext(EditDocContext);

  // useEffect(()=>{

  //   console.log(docEditData+" context doc to send");
  // },[docEditData])
  async function handleRemove(id, lab) {
    try {
      await handleDelete(id, lab);
      await fetchData(url, accessToken, setDoctorData);
      console.log("Data updated after removal");
    } catch (error) {
      console.error("Error handling remove operation:", error);
    }
  }

  async function handleDelete(id, lab) {
    try {
      const resp = await fetch(
        `https://stagingapi.sugarlogger.com/lab/${lab}/referred_by/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      const data = await resp.json();
      console.log(data + " delete resp");
      if (!resp.ok) {
        setFetchStatus(data.success);
        setStatusMessage(data.message);
        setShowNoti(true);
        setTimeout(() => {
          setShowNoti(false);
        }, 2000);
        throw new Error(`Failed to delete data. Status: ${resp.status}`);
      } else {
        setFetchStatus(data.success);
        setStatusMessage(data.message);
        setShowNoti(true);
        setTimeout(() => {
          setShowNoti(false);
        }, 2000);
      }
      console.log("Delete request successful");
    } catch (error) {
      console.error("Error occurred during delete operation:", error);
      throw error;
    }
  }

  const selectedRoleString = localStorage.getItem("selectedRole");
  const selectedRole = JSON.parse(selectedRoleString);
  console.log(selectedRole.uuid);
  const accessToken = localStorage.getItem("token");
  const uuid = localStorage.getItem("lab_group_uuid");

  const url = `https://stagingapi.sugarlogger.com/lab_group/${uuid}/referred_by?per_page=15&page=1`;
  
  const fetchData = async (url, token, setDoctorData) => {
    try {
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });
      const receivedData = await resp.json();
      setDoctorData(receivedData.data);
      // console.log(receivedData);
    } catch (error) {
      console.log(error + " when fetching data");
    }
  };
  useEffect(() => {
    fetchData(url, accessToken, setDoctorData);
  }, [accessToken]);

  const toAddDoc = () => {
    console.log("add doc");
    navigate("/add_doc");
  };
  function handleSearch() {}

  function handleEdit(editDoc) {
    console.log("clicked on edit" + editDoc);
    setDocEditData(editDoc);
    navigate("/edit_doc", { state: editDoc });
  }
  return (
    <EditDocContext.Provider value={setDocEditData}>
      <>
        <Top_bar />
        <Sidebar />
        <div className="refered_doc">
          <h1>Referred Doctor</h1>
          <button onClick={toAddDoc} className="btn btn-uline">
            Add Doc
          </button>
          <div className="list-wrap">
            <div className="list-top">
              <h3 className="list-head">All Doctors</h3>
              <div className="buttons">
                <input
                  type="text"
                  className="search"
                  onChange={handleSearch}
                  placeholder="Search by Name or Mobile No."
                />
              </div>
            </div>
            <table className="patient-list">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile No.</th>
                  <th>City</th>
                  <th>Specialization</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctorData &&
                  doctorData.map((doc) => (
                    <tr key={doc.uuid}>
                      <td>{doc.full_name}</td>

                      <td>{doc.mobile}</td>
                      <td>{doc.city}</td>
                      <td>
                        {doc.specialist_in !== "" ? doc.specialist_in : "-"}
                      </td>

                      <td className="action">
                        <button
                          className="btn update-btn"
                          onClick={() => {
                            setDoctorData(doc);
                            setDocEditData(doc);
                            handleEdit(doc);
                            // console.log(doc);
                          }}
                        >
                          Edit Detials
                        </button>
                        <button
                          className="btn rmv"
                          onClick={() => {
                            handleRemove(doc.uuid, doc.lab_id);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
        {showNoti && (
          <Notification status={fetchStatus} message={statusMessage} />
        )}
      </>
    </EditDocContext.Provider>
  );
};

export default Refered_doctor;

// const AccessContext = () => {
//   const data= useContext(EditDocContext);
//   console.log(data+ " accessed data");
//   return (
//     <div>{data} accessing data below the created context</div>
//   )
// }
