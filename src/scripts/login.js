import { loginUser } from "./auth.js";
import { exampleAdd } from "./db.js";
let email = "";
let password = "";
const loginButton = document.querySelector(".submit-form");
document.getElementById("email").addEventListener("change", (e) => {
  email = e.target.value;
});
document.getElementById("pwd").addEventListener("change", (e) => {
  password = e.target.value;
});

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(email, password);
    console.log(res);
    exampleAdd();
  } catch (error) {
    console.log(error.message);
  }
});
