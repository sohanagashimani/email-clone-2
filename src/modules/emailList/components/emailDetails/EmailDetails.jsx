import React from "react";

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
      <div className=" bg-white rounded-md p-5 my-6 mx-4">
        <p className="text-lg font-medium">{selectedEmail?.subject}</p>
        <p className="text-lg font-medium">From: {selectedEmail?.from.email}</p>
        <p className="text-sm text-gray-600">{htmlFrom(selectedEmail?.body)}</p>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-md"
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
  );
};

export default EmailDetails;
