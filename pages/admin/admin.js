import {Client, Databases, Account, ID, Query, Storage, AppwriteException} from "appwrite";
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
const BUCKETID = import.meta.env.VITE_APP_BUCKETID


client
    .setEndpoint(EndPoint)
    .setProject(ProjectId);

    
const storage = new Storage(client);

let val = 0
const checkidarry = []



async function saveDataToAppwrite(){
  console.log("hi")
}


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
    // console.log((documents))
    if (documents) {
      for (const i of documents) {
        //row
        // console.log(i)
        const rows = document.createElement("tr");  
        
        // const checkbox = document.createElement("input");
        // checkbox.type = "checkbox";
        
        
        //elemets in rows
        const timecell = document.createElement("td");
        const emailCell = document.createElement("td");
        const nmcell = document.createElement("td");
        const phncell = document.createElement("td");
        const orgcell = document.createElement("td");
        const orgnmcell = document.createElement("td");
        const prfcell = document.createElement("td");
        const checkcell = document.createElement("td")
        const idcell = document.createElement("td");
        
        const imgid = i.IMGID;
        const baseurl = "https://cloud.appwrite.io/v1/storage/buckets/6594ea6846535114ac07/files/{{imgid}}/view?project=6594684778d28abf8d83&mode=admin"
        const fileid = baseurl.replace('{{imgid}}', imgid)
        
        const verifycell = document.createElement("td");

        var timeofcre = ""
        let f = storage.getFile(BUCKETID,imgid)
        // timeofcre = response.$createdAt
        .then((response) => {
        const file = response.$id;
        const creationTime = response.$createdAt // Assuming property name
        // console.log(response);
        timeofcre = response.$createdAt
        
        const timestampString = timeofcre;

        // // 1. Create a Date object from the timestamp string:
        const date = new Date(timestampString);

        // 2. Get the UTC time in milliseconds:
        const utcTimeInMillis = date.getTime();

        // 3. Add 5.5 hours (5 hours and 30 minutes) to adjust for IST:
        const istTimeInMillis = utcTimeInMillis + 1 * 60 * 60 * 1000;
        // 4. Create a new Date object representing IST:
        const istDate = new Date(istTimeInMillis);

        //5. Format the IST date as desired:
        const formattedISTDate = istDate.toLocaleString("en-IN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short", // Display "IST"
        });


        timecell.textContent = formattedISTDate 
        nmcell.textContent = i.name;
        emailCell.textContent = i.email;
        phncell.textContent = i.number;
        orgcell.textContent = i.organization
        orgnmcell.textContent = i.organization_name
        prfcell.textContent = fileid
        verifycell.textContent = i.Verified
        

        
        rows.appendChild(timecell);
        rows.appendChild(nmcell);
        rows.appendChild(phncell);
        rows.appendChild(emailCell);
        rows.appendChild(orgcell);
        rows.appendChild(orgnmcell);
        rows.appendChild(prfcell);
        rows.appendChild(verifycell);
        
        tableBody.appendChild(rows);
        
        ++val;
        const total = document.getElementById('totalp')
        if(total){
          total.textContent = `Number of Participants = ${val}`
        }
      })
      .catch((error) => {
        console.error("Error fetching file:", error);
      });

      }
    }
}
}).catch((error) => {
    // Session is invalid, redirect to login
    localStorage.removeItem("sessionId");
    window.location.href = "/";
  });
}

const ck = document.getElementById(checkidarry[0])
// ck.addEventListener("click", saveDataToAppwrite)

if(ck){
  console.log(ck)
}


// const checked = document.querySelector('#mycheckbox:checked') !== null;
// // const ch  = document.querySelector("#mycheckbox:checked")
// console.log(checked)

// const exportButton = document.getElementById("export");
const exportButton = document.getElementById("export");

exportButton.addEventListener("click", () => {
  // Fetch data from Appwrite
  // let f = storage.getFile(BUCKETID,imgid)
  //       // timeofcre = response.$createdAt
  //       .then((response) => {
  //       const file = response.$id;
  //       const creationTime = response.$createdAt // Assuming property name
  //       // console.log(response);
  //       timeofcre = response.$createdAt
        
  //       const timestampString = timeofcre;

  //       // // 1. Create a Date object from the timestamp string:
  //       const date = new Date(timestampString);

  //       // 2. Get the UTC time in milliseconds:
  //       const utcTimeInMillis = date.getTime();

  //       // 3. Add 5.5 hours (5 hours and 30 minutes) to adjust for IST:
  //       const istTimeInMillis = utcTimeInMillis + 1 * 60 * 60 * 1000;
  //       // 4. Create a new Date object representing IST:
  //       const istDate = new Date(istTimeInMillis);

  //       //5. Format the IST date as desired:
  //       const formattedISTDate = istDate.toLocaleString("en-IN", {
  //           year: "numeric",
  //           month: "2-digit",
  //           day: "2-digit",
  //           hour: "2-digit",
  //           minute: "2-digit",
  //           second: "2-digit",
  //           timeZoneName: "short", // Display "IST"
  //       });
  //     });
  db.listDocuments(DataBaseId, Collection_full)
    .then((response) => {
      const dataToExport = response.documents;

      // Create CSV content
      let csvContent = "Date,time,name,number,email,organization,organization_name,proof,verification\n";
      dataToExport.forEach((document) => {
        // console.log(document.$createdAt)
        const timeofcre = document.$createdAt
        const timestampString = timeofcre;
        // // 1. Create a Date object from the timestamp string:
        const date = new Date(timestampString);
        // 2. Get the UTC time in milliseconds:
        const utcTimeInMillis = date.getTime();
        // 3. Add 5.5 hours (5 hours and 30 minutes) to adjust for IST:
        const istTimeInMillis = utcTimeInMillis + 1 * 60 * 60 * 1000;
        // 4. Create a new Date object representing IST:
        const istDate = new Date(istTimeInMillis);
        //5. Format the IST date as desired:
        const formattedISTDate = istDate.toLocaleString("en-IN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short", // Display "IST"
        });
        console.log(document.Verified)
        const imgid = document.IMGID
        const baseurl = "https://cloud.appwrite.io/v1/storage/buckets/6594ea6846535114ac07/files/{{imgid}}/view?project=6594684778d28abf8d83&mode=admin"
        const fileid = baseurl.replace('{{imgid}}', imgid)

        csvContent += `${formattedISTDate},${document.name},${document.number},${document.email},${document.organization},${document.organization_name},${fileid},${document.Verified}\n`;
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