import { useMemo } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (emails, filter) => {
  return useMemo(() => {
    if (filter.showReadEmails) {
      return emails?.filter((email) => email.isRead);
    }
    return filter.showFavorites
      ? emails?.filter((email) => email.isFavorite)
      : emails;
  }, [emails, filter.showFavorites, filter.showReadEmails]);
};
