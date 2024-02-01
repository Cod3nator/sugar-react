import { useCallback, useEffect, useState } from "react";
import down_arw from "../assets/down_arw.svg";
import Top_bar from "../navigation/Top_bar";
import Sidebar from "../navigation/Sidebar";
import CheckBoxes from "../parts/CheckBoxes";
// import Pagination from "./Pagination";

// import Pagination from './Pagination';

// import { json } from 'react-router-dom';

const Lab_admin = () => {
  const [pageData, setPageData] = useState({});
  const [labGroupUuid, setLabGroupUuid] = useState("");
  const [rowsPage, setRowsPage] = useState(15);
  const [accessToken, setAccessToken] = useState("");
  const [selectedRole, setSelectedRole] = useState({});
  const [patientData, setPatientData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPatient, setTotalPatient] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [url, setUrl] = useState();
  const [status, setStatus] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [statusLength, setStatusLength] = useState(0);
  const [branches, setBranches] = useState([]);
  const [branchFilter, setBranchFilter] = useState("");
  const [branchLength, setBrancheLength] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [showPopStatus, setShowPopStatus] = useState(false);
  
  console.log(pageData + " " + labGroupUuid + " " + selectedRole);
  useEffect(() => {
    const storedLabGroupUuid = localStorage.getItem("lab_group_uuid");
    const storedAccessToken = localStorage.getItem("token");
    const storedSelectedRole = JSON.parse(localStorage.getItem("selectedRole"));

    if (storedLabGroupUuid) {
      setLabGroupUuid(storedLabGroupUuid);
    }

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    if (storedSelectedRole) {
      setSelectedRole(storedSelectedRole);
    }
  }, []);

  useEffect(() => {
    setUrl(
      `https://stagingapi.sugarlogger.com/lab_group/${localStorage.getItem(
        "lab_group_uuid"
      )}/patient_entry${branchLength > 0 || statusLength > 0 ? "?" : ""}${
        branchLength ? `&branch=${branchFilter}` : ``
      }${statusLength ? `&filter_appointment_status=${statusFilter}` : ``}`
    );
  }, [branchLength, statusLength]);
 
  // useEffect(() => {
  //   const baseUrl = 'https://stagingapi.sugarlogger.com/lab_group/';
  //   const labGroupUuid = localStorage.getItem('lab_group_uuid');
  //   const queryParams = new URLSearchParams();

  //   if (branchLength > 0) {
  //     queryParams.append('branch', branchFilter);
  //   }

  //   if (statusLength > 0) {
  //     queryParams.append('filter_appointment_status', statusFilter);
  //   }

  //   if (branchLength > 0 || statusLength > 0) {
  //     queryParams.append('date_from', '2023-01-12');
  //     queryParams.append('date_to', '2024-01-12');
  //   }

  //   const url = new URL(`patient_entry`, baseUrl + labGroupUuid);
  //   url.search = queryParams.toString();

  //   console.log(url.href);

  // }, [rowsPage, currentPage, branchLength, branchFilter, statusLength, statusFilter]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      const data = await response.json();
      setPageData(data);
      setPatientData(data.data);
      setCurrentPage(data.meta.pagination.current_page);
      setRowsPage(data.meta.pagination.per_page);
      setTotalPatient(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.total_pages);
    } catch (error) {
      console.error("Error during fetch:" + error);
    }
  }, [url, rowsPage, currentPage, branchLength, accessToken, statusLength]);

  // const constructUrl = useCallback(() => {
  //   return

  // },[branchLength,rowsPage,currentPage,branchFilter]);
  useEffect(() => {
    async function getStatus() {
      try {
        if (accessToken) {
          const statuses = await fetch(
            "https://stagingapi.sugarlogger.com/get_appointment_statuses",
            {
              method: "GET",
              headers: {
                Authorization: `${accessToken}`,
              },
            }
          );
          const statusResp = await statuses.json();
          // console.log(statusResp);
          const statusArr = statusResp.data.map((item) => ({
            uuid: item.name,
            name: item.formatted_name,
          }));
          setStatus(statusArr);
        }
      } catch (error) {
        console.error("fetching status error " + error);
      }
    }
    getStatus();
  }, [accessToken]);
  useEffect(() => {
    async function getBranch() {
      try {
        if (accessToken) {
          const statuses = await fetch(
            `https://stagingapi.sugarlogger.com/lab_group/${localStorage.getItem(
              "lab_group_uuid"
            )}/get_labs
          `,
            {
              method: "GET",
              headers: {
                Authorization: `${accessToken}`,
              },
            }
          );
          const branchResp = await statuses.json();
          setBranches(branchResp.data);
          localStorage.setItem("branches", JSON.stringify(branchResp.data));
        }
        // console.log(branchResp.data);
      } catch (error) {
        console.error("fetching status error " + error);
      }
    }
    getBranch();
  }, [accessToken]);

  // Effect for rowsPage changes
  useEffect(() => {
    setRowsPage(rowsPage);
    // fetchData();
    console.log(url);
  }, [rowsPage]);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getBranchFilter(branches, length);
  }, [branches, length]);

  function handleSearch() {}
  function handleUpdate() {}

  function changeRows(rows) {
    console.log("change rows" + rows);
    setRowsPage(rows);
  }
  function pageChange(index) {
    setCurrentPage(index);
    console.log("clicked");
  }
  function getBranchFilter(branches, length) {
    setBranchFilter(branches);
    console.log(branches + "  branches");
    setBrancheLength(length);
    setCurrentPage(1);
    // fetchData();
    // console.log();
  }
  function getStatusFilter(status, length) {
    setStatusFilter(status);
    console.log(JSON.stringify(status) + " status");
    setStatusLength(length);
    setCurrentPage(1);
    // fetchData()
    //  console.log(status+" length "+length);
  }


  const openPop = useCallback(() => {
    setShowPop((showPop) => !showPop);
  }, []);

  const openPopStatus = useCallback(() => {
    setShowPopStatus((showPopStatus) => !showPopStatus);
  }, []);

  useEffect(() => {
    setBranchFilter(branchFilter);
  }, [fetchData, branchFilter]);

  return (
    <>
      <Top_bar />
      <Sidebar />
      <div className="lab-admin">
        <h1>Lab admin</h1>

        <div className="list-wrap">
          <div className="list-top">
            <h3 className="list-head">All patients</h3>{" "}
            <div className="buttons">
              <button className="btn sec export">Export Excel</button>
              <input type="date" className="datePicker" />
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
                <th>Date</th>
                <th>Patient Name</th>
                <th>Mobile No.</th>
                <th>Referal</th>
                <th>Test</th>
                <th>
                  <button
                    className="btn"
                    onClick={() => {
                      openPop(true);
                    }}
                  >
                    Branch
                  </button>
                  {showPop && (
                    <CheckBoxes
                      data={branches}
                      bringFilter={getBranchFilter}
                      selected={selectedBranch}
                      setSelected={setSelectedBranch}
                    />
                  )}
                </th>
                <th>Pending Fees</th>
                <th className="status">
                  <button
                    className="btn"
                    onClick={() => {
                      openPopStatus(true);
                    }}
                  >
                    Status
                  </button>

                  {showPopStatus && (
                    <CheckBoxes
                      data={status}
                      bringFilter={getStatusFilter}
                      closePopup={() => openPopStatus(open)}
                      selected={selectedStatus}
                      setSelected={setSelectedStatus}
                    />
                  )}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientData &&
                patientData.map((patient) => (
                  <tr key={patient.uuid}>
                    <td>{patient.formatted_created_at}</td>
                    <td>{`${patient.patient.title} ${patient.patient.first_name} ${patient.patient.last_name}`}</td>
                    <td>{patient.patient.mobile}</td>
                    <td>
                      {patient.referred_by.full_name != null
                        ? patient.referred_by.full_name
                        : "Self"}
                    </td>
                    <td>{patient.tests.join(", ")}</td>
                    <td>{patient.lab.name}</td>
                    <td className="pendFees">{patient.total_balance}</td>
                    <td>
                      <button
                        className={`btn status-btn ${
                          patient.appointment_status.name === "testing_done"
                            ? "testing-done"
                            : patient.appointment_status.name === "report_sent"
                            ? "report-sent"
                            : patient.appointment_status.name ===
                              "under_testing"
                            ? "under-testing"
                            : "default-class"
                        }`}
                      >
                        {patient.appointment_status.formatted_name}
                      </button>
                    </td>
                    <td>
                      <button className="btn update-btn" onClick={handleUpdate}>
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="pagination">
            <div className="select-rows">
              Row per Page: {rowsPage} <img src={down_arw} />
              <div className="rows-page">
                <div
                  className="rows"
                  onClick={() => {
                    changeRows(15);
                  }}
                >
                  15
                </div>
                <div
                  className="rows"
                  onClick={() => {
                    changeRows(50);
                  }}
                >
                  50
                </div>
                <div
                  className="rows"
                  onClick={() => {
                    changeRows(100);
                  }}
                >
                  100
                </div>
                <div
                  className="rows"
                  onClick={() => {
                    changeRows(150);
                  }}
                >
                  150
                </div>
              </div>
            </div>

            <div className="select-page">
              <div className="prev btn disabled">prev</div>
              {Array.from({ length: `${totalPages}` }).map((_, index) => (
                <div
                  key={index.toString()}
                  className="btn currentPage"
                  onClick={() => {
                    pageChange(index + 1);
                  }}
                >
                  {index + 1}
                </div>
              ))}

              <div className="next btn">Next</div>
            </div>

            <div className="of-total">{totalPatient}</div>
          </div>

          {/* <Pagination
  rowsPage={rowsPage}
  changeRows={changeRows}
  totalPages={totalPages}
  pageChange={pageChange}
  totalPatient={totalPatient}
/> */}
        </div>
      </div>
    </>
  );
};

export default Lab_admin;
