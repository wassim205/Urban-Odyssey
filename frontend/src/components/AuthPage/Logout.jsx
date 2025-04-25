import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import api from "./config/axiosConfig";
import api from './../../config/axiosConfig';
import { toast } from "sonner";
// import { toast } from "./NotificationProvider";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post(
          "logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        toast.success("Logged out successfully.");
        // localStorage.clear();
      } catch (error) {
        toast.error("Logout failed. Please try again.");
        console.log("Logout failed:", error);
      } finally {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
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
