const Header = ({
  filter,
  setShowEmailDetails,
  handleFilterChange,
  setSelectedEmail,
  dispatch,
}) => {
  return (
    <nav className="flex justify-center bg-gray-800 text-white p-4 ">
      <button
        onClick={() => {
          handleFilterChange("showUnreadEmails");
          setShowEmailDetails(false);
          dispatch(setSelectedEmail(null));
        }}
        className={`mx-2 ${
          filter.showUnreadEmails ? "bg-blue-500" : "bg-gray-200"
        } p-2 rounded-md text-white cursor-pointer`}
      >
        Unread
      </button>
      <button
        onClick={() => {
          handleFilterChange("showReadEmails");
          dispatch(setSelectedEmail(null));
          setShowEmailDetails(false);
        }}
        className={`mx-2 ${
          filter.showReadEmails ? "bg-blue-500" : "bg-gray-200"
        } p-2 rounded-md text-white cursor-pointer`}
      >
        Read
      </button>
      <button
        onClick={() => {
          setShowEmailDetails(false);
          handleFilterChange("showFavorites");
          dispatch(setSelectedEmail(null));
        }}
        className={`mx-2 ${
          filter.showFavorites ? "bg-blue-500" : "bg-gray-200"
        } p-2 rounded-md text-white cursor-pointer`}
      >
        Favorites
      </button>
    </nav>
  );
};

export default Header;
