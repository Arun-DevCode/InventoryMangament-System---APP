import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";

function Dashboard() {
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await fetch(
        "http://localhost:4201/api/user/get-user-profile",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await res.json();
      if (!data) {
        throw new Error("failed to fetch user profile.");
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // To get profile info
  useEffect(() => {
    getProfile()
      .then((res) => setProfile(res.user))
      .catch((err) => console.error("Internal Server issue."));
  }, []);
  return (
    <div>
      <h1>Welcome to user Dashboard</h1>
      <div>
        <ProfileCard user={profile} />
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
