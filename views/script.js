let button = document.getElementById("submit");

button.addEventListener("click", (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value;
  localStorage.setItem("username", username);
});
