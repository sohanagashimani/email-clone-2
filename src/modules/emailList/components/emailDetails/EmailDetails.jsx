import React from "react";
import { DateAndTime, UserIcon } from "../../../../@components";

const EmailDetails = ({
  selectedEmail,
  htmlFrom,
  setShowEmailDetails,
  filter,
  showEmailDetails,
  dispatch,
  toggleFavoriteEmail,
}) => {
  return (
    <div className=" bg-white rounded-md px-4 pr-14 py-5 pb-10 my-6 ml-6 flex space-x-3">
      <UserIcon email={selectedEmail} />

      <section className="flex flex-col space-y-8">
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-medium">{selectedEmail?.subject}</p>
            <p className="text-xs text-gray-600 leading-loose">
              <DateAndTime email={selectedEmail} />
            </p>
          </div>
          <button
            className="bg-[#e54065] text-white text-sm h-8 w-auto px-3 rounded-full"
            onClick={() => {
              setShowEmailDetails(
                filter.showFavorites ? false : showEmailDetails
              );
              dispatch(toggleFavoriteEmail(selectedEmail));
            }}
          >
            {selectedEmail?.isFavorite
              ? "Unmark as Favorite"
              : "Mark as Favorite"}
          </button>
        </div>
        <p className="text-sm">{htmlFrom(selectedEmail?.body)}</p>
      </section>
    </div>
  );
};

export default EmailDetails;
