/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

const Notification = ({ status, message }) => {
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setSuccess(status);
  }, [status]);
  return (
    <div className="noti">
      <div className={success ? "noti-success" : "noti-failure"}>{message}</div>
    </div>
  );
};

export default Notification;
