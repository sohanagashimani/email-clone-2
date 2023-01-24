import { useState } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [filter, setFilter] = useState({
    showReadEmails: false,
    showUnreadEmails: false,
    showFavorites: false,
    showAllEmails: true,
  });

  const handleFilterChange = (key) => {
    Object.keys(filter).forEach((filterKey) => {
      if (filterKey === key) {
        setFilter((prev) => ({ ...prev, [filterKey]: true }));
      } else {
        setFilter((prev) => ({ ...prev, [filterKey]: false }));
      }
    });
  };

  return { filter, handleFilterChange };
};
