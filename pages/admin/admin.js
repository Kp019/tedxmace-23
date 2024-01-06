import {Client, Databases, Account, ID, Query} from "appwrite";
// import { Appwrite } from "appwrite";

const client = new Client;


const CollectionId = import.meta.env.VITE_COLLECTIONID
const ProjectId = import.meta.env.VITE_PROJECTID
const DataBaseId = import.meta.env.VITE_APP_DATAID
const EndPoint =  import.meta.env.VITE_ENDPOINT
const Collection_early = import.meta.env.VITE_APP_COLLECTION_EARLY
const Collection_mace = import.meta.env.VITE_APP_COLLECTION_MACE
const Collection_macep = import.meta.env.VITE_APP_COLLECTION_MACEP
const Collection_prem = import.meta.env.VITE_APP_COLLECTION_PREMIUM
const collection_grp = import.meta.env.VITE_APP_COLLECTION_GROUP
const Collection_full = import.meta.env.VITE_APP_COLLECTION_FULL


client
    .setEndpoint(EndPoint)
    .setProject(ProjectId);
    // .setSelfSigned(true); // If using a self-signed certificate
    // .setKey("YOUR_API_KEY");


const account = new Account(client);
const db = new Databases(client)

const log = document.querySelector("#logout")
const sessionId = localStorage.getItem("sessionId");

log.addEventListener('click', ()=>{
    localStorage.removeItem("sessionId"); // Clear session ID
    // Optionally, perform server-side logout as well:
    account.deleteSession(localStorage.getItem("sessionId"))
    .then(() => {
      // Server-side session deleted successfully
      console.log("Session deleted on server");
    })
    .catch((error) => {
      console.error("Error deleting session on server:", error);
    })
    .finally(() => {
      // Redirect to login page
      window.location.href = "/pages/login/index.html";
    });
})

// console.log(sessionId)
if (!sessionId) {
    window.location.href = "/"; // Redirect to login if not authenticated
  }else{
    account.getSession(sessionId)
    .then((response) => {
      // Session is valid, proceed with admin page functionality

let dataset_full = db.listDocuments(
    DataBaseId,
    Collection_full,
)

dataset_full.then(function (response) {
        // console.log(response);
        const documents = response.documents;
        // console.log(documents)
        displayData(documents)
    }, function (error) {
        console.log(error);
});



function displayData(documents) {
    // const dataContainer = document.getElementById("data-container");
    const tableBody = document.getElementById("data-table").querySelector("tbody");
    // Clear any existing content
    // dataContainer.innerHTML = "";
    // console.log(documents)
    if (documents) {
      for (const i of documents) {
        //row
        const rows = document.createElement("tr");  
        
        //elemets in rows
        const emailCell = document.createElement("td");
        const nmcell = document.createElement("td");
        const phncell = document.createElement("td");
        const orgcell = document.createElement("td");
        const orgnmcell = document.createElement("td");
        const prfcell = document.createElement("td");
        nmcell.textContent = i.name;
        emailCell.textContent = i.email;
        phncell.textContent = i.number;
        orgcell.textContent = i.organization
        orgnmcell.textContent = i.organization_name
        prfcell.textContent = i.proof
    
        rows.appendChild(nmcell);
        rows.appendChild(phncell);
        rows.appendChild(emailCell);
        rows.appendChild(orgcell);
        rows.appendChild(orgnmcell);
        rows.appendChild(prfcell);
        
        tableBody.appendChild(rows);
        
      }
    } else {
      // Handle empty collection (e.g., display a message)
    //   dataContainer.textContent = "No data found";
    }
}
}).catch((error) => {
    // Session is invalid, redirect to login
    localStorage.removeItem("sessionId");
    window.location.href = "/";
  });
}

// const exportButton = document.getElementById("export");
const exportButton = document.getElementById("export");
exportButton.addEventListener("click", () => {
  // Fetch data from Appwrite
  db.listDocuments(DataBaseId, Collection_full)
    .then((response) => {
      const dataToExport = response.documents;

      // Create CSV content
      let csvContent = "name,number,email,organization,organization_name,proof\n";
      dataToExport.forEach((document) => {
        csvContent += `${document.name},${document.number},${document.email},${document.organization},${document.organization_name},${document.proof}\n`;
      });

      // Trigger download
      const blob = new Blob([csvContent], { type: "text/csv" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "exported-data.csv";
      downloadLink.click();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Display user-friendly error message
    });
});
