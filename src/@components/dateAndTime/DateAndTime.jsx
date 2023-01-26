import React from "react";

const DateAndTime = ({ email }) => {
  return (
    <div className="inline-block">
      <span>{new Date(email.date).toLocaleDateString()}</span>
      <span className="ml-1">
        {new Date(email.date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })}
      </span>
    </div>
  );
};

export default DateAndTime;
