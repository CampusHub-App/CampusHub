import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventStatus } from "../../services/api";
import DescriptionPageRegistered from "./DescriptionPageRegistered";
import DescriptionPageCancel from "./DescriptionPageCancel";
import DescriptionPageAbsent from "./DescriptionPageAbsent";
import DescriptionPageAttend from "./DescriptionPageAttend";

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/welcome", { replace: true });
      return;
    }

    const loadEventStatus = async () => {
      try {
        const data = await fetchEventStatus(id, token);
        setStatus(data.status);
      } catch (error) {
        setError(error.message);
      }
    };

    loadEventStatus();
  }, [id, navigate]);

  if (status === "registered") {
    return <DescriptionPageRegistered />;
  }

  if (status === "cancelled") {
    return <DescriptionPageCancel />;
  }

  if (status === "absent") {
    return <DescriptionPageAbsent />;
  }

  if (status === "attended") {
    return <DescriptionPageAttend />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader w-16 h-16 border-blue-500 border-t-transparent"></div>
    </div>
  );
}

export default EventPage;