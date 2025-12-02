function checkSavedAccount() {
  return localStorage.getItem("connectedAccount");
}

export default checkSavedAccount