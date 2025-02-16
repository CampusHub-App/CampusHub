import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DescriptionPageRegistered from "./DescriptionPageRegistered";
import DescriptionPageCancel from "./DescriptionPageCancel";
import DescriptionPageAbsent from "./DescriptionPageAbsent";
import DescriptionPageAttend from "./DescriptionPageAttend";

function EventPage() {
  const { id } = useParams();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/welcome", { replace: true });
      return;
    }

    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `https://campushub.web.id/api/my-events/${id}/status`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setStatus(data.status);
        }
      } catch (error) {
        setError(response.message);
      }
    };

    fetchStatus();
  }, [id]);

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
