// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = {},
  email,
  prop,
  value,
  isFetchingDetails,
  isFetching
) => {
  const emailIndex = state.emailList.findIndex((e) => e.id === email.id);
  if (emailIndex !== -1) {
    const updatedEmailList = [
      ...state.emailList.slice(0, emailIndex),
      { ...state.emailList[emailIndex], [prop]: value },
      ...state.emailList.slice(emailIndex + 1),
    ];
    return {
      ...state,
      emailList: updatedEmailList,
      selectedEmail: { ...email, [prop]: value },
      isFetchingDetails,
      isFetching,
    };
  }
  return state;
};
