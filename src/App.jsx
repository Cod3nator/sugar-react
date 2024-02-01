import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Components/login/Login";
import Roles from "./Components/login/Roles";
import LabAdmin from "./Components/admin/Lab_admin";
import FallPage from "./Components/Fall_page";
import Refered_doctor from "./Components/doctor/Refered_doctor";
import Add_doc from "./Components/doctor/Add_doc";
import Edit_doc from "./Components/doctor/Edit_doc";
import { EditDocProvider } from "./Components/doctor/EditDocProvider";

const App = () => {
  return (
    <EditDocProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/lab-admin" element={<LabAdmin />} />
          <Route path="/referred_doctor" element={<Refered_doctor />} />
          <Route path="/referred_doctor/*" element={<Edit_doc />} />
          <Route path="/fall_page" element={<FallPage />} />
          <Route path="/add_doc" element={<Add_doc />} />
          <Route path="/edit_doc" element={<Edit_doc />} />
        </Routes>
      </Router>
    </EditDocProvider>
  );
};

export default App;
