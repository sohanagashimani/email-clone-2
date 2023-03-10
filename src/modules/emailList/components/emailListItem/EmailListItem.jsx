import React from "react";
import { DateAndTime, UserIcon } from "../../../../@components";

const EmailListItem = ({
  email,
  setSelectedEmail,
  dispatch,
  selectedEmail,
  showEmailDetails,
  setShowEmailDetails,
  filter,
}) => {
  return (
    <div
      key={email.id}
      className={`p-3 my-6 rounded-lg border border-[#cfd2dc] hover:bg-gray-200 ${
        email.id === selectedEmail?.id && showEmailDetails
          ? "border-[#e54065]"
          : "border-[#cfd2dc]"
      }  ${
        filter.showAllEmails
          ? email.isRead
            ? "bg-[#f2f2f2]"
            : "bg-white"
          : "bg-white"
      } cursor-pointer`}
      onClick={() => {
        dispatch(setSelectedEmail(email));
        setShowEmailDetails(true);
      }}
    >
      <div className="flex items-start">
        <UserIcon email={email} />
        <section className="min-w-0">
          <p className="text-sm leading-relaxed">
            From:{" "}
            <span className="font-medium capitalize mr-1">
              {email.from.name}
            </span>
            <span className="font-extrabold font-mono">{email.from.email}</span>
          </p>
          <p className="text-sm leading-relaxed">
            Subject: <span className=" font-medium"> {email.subject}</span>
          </p>
          <p className="text-sm text-gray-600 truncate leading-loose">
            {email.short_description}
          </p>
          <p className="text-xs text-gray-600 leading-loose">
            <DateAndTime email={email} />
            <span className="ml-7 font-bold text-[#e54065]">
              {email.isFavorite ? "Favorite" : null}
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default EmailListItem;
