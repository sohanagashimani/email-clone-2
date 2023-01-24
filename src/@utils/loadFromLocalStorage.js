// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  try {
    const persistedState = localStorage.getItem("persistedState");
    if (persistedState === null) return undefined;
    return JSON.parse(persistedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
