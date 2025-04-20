import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import api from "./config/axiosConfig";
import api from './../../config/axiosConfig';
// import { toast } from "./NotificationProvider";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post(
          "v1/admin/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Logged out successfully.");
      } catch (error) {
        toast.error("Logout failed. Please try again.");
      } finally {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    logout();
  }, [navigate]);

  return (
    <p className="text-center mt-10 text-red-600 dark:text-red-800">
      Logging out...
    </p>
  );
};

export default Logout;
