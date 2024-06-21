"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/LeafletMap"), {
  ssr: false,
});

export default function SearchPage() {
  const { isSignedIn, user } = useUser();
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [radius, setRadius] = useState(10);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isSignedIn) {
      axios
        .get("/api/users", {
          params: { lat: location.lat, lng: location.lng, radius },
        })
        .then((response) => setUsers(response.data));
    }
  }, [location, radius, isSignedIn]);

  return (
    <div className="container mx-auto p-4">
      <div className="h-96">
        <Map />
      </div>
      <input
        type="range"
        min="1"
        max="100"
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          {users.map((user: any) => (
            <div key={user.id}>
              <p>Email: {user.email}</p>
              <p>Telegram: {user.telegram}</p>
              <p>Interests: {user.interests}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
