import { useMemo } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (emails, filter, currentPage, selectedEmail) => {
  return useMemo(() => {
    if (filter.showUnreadEmails) {
      return emails.filter((email) => {
        if (email.id === selectedEmail?.id) return true;
        return !email.isRead;
      });
    }
    if (filter.showReadEmails) {
      return emails.filter((email) => {
        if (email.id === selectedEmail?.id) return true;
        return email.isRead;
      });
    }
    return filter.showFavorites
      ? emails?.filter((email) => email.isFavorite)
      : emails?.filter((email) => email.page === currentPage);
  }, [
    filter.showUnreadEmails,
    filter.showReadEmails,
    filter.showFavorites,
    emails,
    selectedEmail?.id,
    currentPage,
  ]);
};
