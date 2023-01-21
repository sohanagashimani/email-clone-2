import { FilterTab } from "../../../../@components";

const Header = ({
  filter,
  setShowEmailDetails,
  handleFilterChange,
  setSelectedEmail,
  dispatch,
}) => {
  return (
    <nav className="flex items-center gap-4 py-2 font-normal">
      <p>Filter by: </p>
      <FilterTab
        text="Unread"
        isActive={filter.showUnreadEmails}
        onClick={() => {
          handleFilterChange("showUnreadEmails");
          setShowEmailDetails(false);
          dispatch(setSelectedEmail(null));
        }}
      />
      <FilterTab
        text="Read"
        isActive={filter.showReadEmails}
        onClick={() => {
          handleFilterChange("showReadEmails");
          setShowEmailDetails(false);
          dispatch(setSelectedEmail(null));
        }}
      />
      <FilterTab
        text="Favorites"
        isActive={filter.showFavorites}
        onClick={() => {
          handleFilterChange("showFavorites");
          setShowEmailDetails(false);
          dispatch(setSelectedEmail(null));
        }}
      />
    </nav>
  );
};

export default Header;
