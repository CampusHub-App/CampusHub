import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DescriptionPageRegistered from "./DescriptionPageRegistered";
import DescriptionPageCancel from "./DescriptionPageCancel";
import DescriptionPageAbsent from "./DescriptionPageAbsent";
import DescriptionPageAttend from "./DescriptionPageAttend";

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const status = location.state?.status;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/welcome", { replace: true });
      return;
    }

    if (!status) {
      navigate("/my-events", { replace: true });
      return;
    }
  }, [navigate, status]);

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