import React from "react";

const UserProfile = () => {
  // Dữ liệu người dùng
  const user = {
    userID: "78b3d132-9ddf-414b-9d54-54d55c142671",
    userName: "Somith727@gmail.com",
    email: "Somith727@gmail.com",
    name: "Somith727@gmail.com",
    address: "Somith727@gmail.com",
    phone: "Somith727@gmail.com",
    roles: ["Customer"],
    token:
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNvbWl0aDcyN0BnbWFpbC5jb20iLCJzdWIiOiJTb21pdGg3MjdAZ21haWwuY29tIiwianRpIjoiODUyNzE2NGItOWU3Yy00OTg2LWFlOGMtYjEyZjcyMmQ5ZGQ0IiwiZ2l2ZW5fbmFtZSI6IlNvbWl0aDcyN0BnbWFpbC5jb20iLCJyb2xlIjoiQ3VzdG9tZXIiLCJuYmYiOjE3MzExODI0NjEsImV4cCI6MTczMTc4NzI2MSwiaWF0IjoxNzMxMTgyNDYxLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUyNDYiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyNDYifQ.gyipciG6xT-ZaOjCvboohicNHNQXRsEeedMsM7VHor8DCIsV_3foXHEfrIb5yTsCwvis-6Qq3EPqQ5mrCBt13A",
    refreshToken: "JLPC6MAxYBP8gIAS4XWRB6qQmLPADBKl0b0wpd8k2Hg=",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQexWjDnxZrSv2rn57l_Bo6r5iuH7oaKeOHPg&s",
  };

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
