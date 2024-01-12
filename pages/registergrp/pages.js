import {Client, Databases, ID, Storage} from "appwrite";

const client = new Client;
const CollectionIdGrp = import.meta.env.VITE_APP_COLLECTION_GROUP
const ProjectId = import.meta.env.VITE_PROJECTID
const DataBaseId = import.meta.env.VITE_APP_DATAID
const EndPoint =  import.meta.env.VITE_ENDPOINT
const Collection_full = import.meta.env.VITE_APP_COLLECTION_FULL
const BUCKETID = import.meta.env.VITE_APP_BUCKETID




client
    .setEndpoint(EndPoint)
    .setProject(ProjectId);

const db = new Databases(client)
const storage = new Storage(client);



// Get references to the dropdown and container
const numTicketsDropdown = document.getElementById("numTickets");
const ticketDetailsContainer = document.getElementById("ticketDetails");






// Add event listener for dropdown change
numTicketsDropdown.addEventListener("change", () => {
  const numTickets = parseInt(numTicketsDropdown.value);
  let amount= 0;
  if(numTickets<=3){
    let amt = 1099
    amount = amt*numTickets
  }else if(numTickets>3 && numTickets<=6){
    let amt = 1049
    amount = amt*numTickets
  }

  let grptkts = document.getElementById("grpamt")
  if(grptkts){
    grptkts.textContent = `Amount to be paid : ₹${amount}`
  }

  // Clear any existing input sections
  ticketDetailsContainer.innerHTML = "";

  // Create input sections for the selected number of tickets
  for (let i = 1; i <= numTickets; i++) {
    const ticketSection = document.createElement("div");
    ticketSection.innerHTML = `
      <div class"py-2">
      <div class="py-3 fw-bolder">Participant ${i}</div>
      <div class="name py-2">
        <label for="name${i}">Name:</label>
        <input class="input_ty w-100" type="text" id="name${i}" name="name${i}"><br>
      </div>
      <div class="email py-2">  
        <label for="email${i}">Email:</label>
        <input class="input_ty w-100" type="email" id="email${i}" name="email${i}"><br>
      </div>
      <div class="phn_num py-2">  
        <label for="phone${i}">Phone Number:</label>
        <input class="input_ty w-100" type="tel" id="phone${i}" name="phone${i} (avoid +91)"><br>
      </div>  
      <div class="select_itm pt-3 pb-2">
        <select id="district${i}" name="district${i}" class="input_ty w-100 p-2" required>
          <option value="">Select your Organization</option>
          <option value="College">College</option>
          <option value="School">School</option>
          <option value="Working Professional">Working Professional</option>
        </select>
      </div>
      <div class="orgname py-2">
        <label for="org_name">Name of your Organization: </label>
        <input class="input_ty w-100" id="org_name${i}" type="text" name="org_name" required>
      </div>
      </div>
      `;
    ticketDetailsContainer.appendChild(ticketSection);
  }
});


const grptickets = document.querySelector("#grptickets");
if(grptickets){
   grptickets.addEventListener('submit', cook)
}

async function cook(e){
  e.preventDefault()
  alert("please wait for few seconds😊")
  const numTickets = parseInt(numTicketsDropdown.value);
  const ticketsData = [];

    for (let i = 1; i<=numTickets; i++) {
    const name = document.querySelector(`#name${i}`).value;
    const email = document.querySelector(`#email${i}`).value;
    const phone = document.querySelector(`#phone${i}`).value;
    const org = document.querySelector(`#district${i}`).value;
    const orgname = document.querySelector(`#org_name${i}`).value; 
    // const proof  = document.querySelector("#proof").value;
    
    document.getElementById('bookTickets').disabled = true;
    document.getElementById('bookTickets').value = "please wait";

    const upload = storage.createFile(
      BUCKETID,
      ID.unique(),
      document.getElementById('fileup').files[0]
    );
    let imid = (await upload).$id

    // console.log(proof)

    ticketsData.push({
        name,
        email,
        phone,
        org,
        orgname,
        imid,
    });
    }

    let z = 0;

    for(let k=0; k<numTickets; k++){
        // console.log(ticketsData[k].name)
        
        const mace_resp = await db.createDocument(
            DataBaseId,
            Collection_full,
            ID.unique(),
            {
                'name': ticketsData[k].name,
                'number': ticketsData[k].phone,
                'email': ticketsData[k].email,
                'organization': ticketsData[k].org,
                'organization_name': ticketsData[k].orgname,
                'IMGID' : ticketsData[k].imid,
            }
        )

        const rep = await db.createDocument(
            DataBaseId,
            CollectionIdGrp,
            ID.unique(),
            {
                'name' : ticketsData[k].name,
                'number' : ticketsData[k].phone,
                'email' : ticketsData[k].email,
                'organization': ticketsData[k].org,
                'organization_name': ticketsData[k].orgname,
                'IMGID' : ticketsData[k].imid,
            }
            )
            .then((rep) => {
              z = z+1;
            })

            if(z == numTickets){
              chel();
            }
    }

    function chel(){
      grptickets.reset();
      document.getElementById('bookTickets').disabled = false;
      document.getElementById('bookTickets').value = "Book Now";
      alert("registration Successful")
    }
}

