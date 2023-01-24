import { useMemo } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (emails, filter, currentPage) => {
  return useMemo(() => {
    if (filter.showReadEmails) {
      return emails?.filter((email) => email.isRead);
    }
    return filter.showFavorites
      ? emails?.filter((email) => email.isFavorite)
      : emails?.filter((email) => email.page === currentPage);
  }, [emails, filter.showFavorites, filter.showReadEmails, currentPage]);
};
