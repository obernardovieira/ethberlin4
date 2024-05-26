"use client";
import React, { useState } from "react";
import { supabase } from "../utils/db";
import { useUserContext } from "@/contexts/UserContext";

const Route: React.FC = () => {
  const { userId } = useUserContext();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmitUser = async () => {
    const { data, error } = await supabase
      .from("app_user")
      .update({ username, bio })
      .eq("identifier", userId)
      .select();

    if (!data || error) {
      console.error("Error updating user", error);
      return;
    }

    setUsername("");
    setBio("");
  };

  return (
    <div>
      <section>
        <h2>Update Username and Bio</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button onClick={handleSubmitUser}>Submit</button>
      </section>
    </div>
  );
};

export default Route;