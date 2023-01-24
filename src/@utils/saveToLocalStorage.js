// eslint-disable-next-line import/no-anonymous-default-export
export default (state) => {
  try {
    localStorage.setItem("persistedState", JSON.stringify(state));
  } catch (e) {
    console.warn(e);
  }
};
