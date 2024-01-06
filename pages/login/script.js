import { Client, Account } from "appwrite";

const client = new Client;

const ProjectId = import.meta.env.VITE_PROJECTID
const DataBaseId = import.meta.env.VITE_APP_DATAID
const EndPoint =  import.meta.env.VITE_ENDPOINT

client
    .setEndpoint(EndPoint)
    .setProject(ProjectId);


const account = new Account(client);


const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Authenticate user using Appwrite's account features:
  const promise = account.createEmailSession(email, password);
    promise.then((response) => {
        alert("success")
      // Store session ID (e.g., in local storage)
      localStorage.setItem("sessionId", response.$id);
      // Redirect to admin page
      window.location.href = "/pages/admin/";
    })
    .catch((error) => {
      errorMessage.textContent = "Invalid username or password";
    });
});