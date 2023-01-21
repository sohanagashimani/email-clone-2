import React from "react";

const UserIcon = ({ email }) => {
  return (
    <div className="w-11 h-11 text-center flex justify-center items-center rounded-full bg-[#E54065] text-white mx-3 p-5 text-xl ">
      <p>{email?.from?.email.charAt(0).toUpperCase()}</p>
    </div>
  );
};

export default UserIcon;
