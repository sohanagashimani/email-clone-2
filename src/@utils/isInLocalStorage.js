// eslint-disable-next-line import/no-anonymous-default-export
export default (currentPage) => {
  try {
    const persistedState = localStorage.getItem("persistedState");
    if (persistedState === null) return undefined;
    return JSON.parse(persistedState).emailList.some(
      (email) => email.page === currentPage
    );
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
