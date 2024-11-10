import React from "react";
import useUserStore from "../api/store";

const UserProfile = () => {
  // Dữ liệu người dùng
  const user = useUserStore((state) => state.user);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img
          src={user.image}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
        />
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.roles.join(", ")}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Address:</span>
          <span>{user.address}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Phone:</span>
          <span>{user.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
