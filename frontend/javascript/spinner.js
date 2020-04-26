var spinner = document.getElementById("spinner");
function showSpinner() {
    document.getElementById("spinner").classList.add("show");
    setTimeout(() => {
      document.getElementById("spinner").classList.remove("show");
    }, 5000);
  }

  function hideSpinner() {
    document.getElementById("spinner").classList.remove("show");
}
