import {Client, Databases, ID} from "appwrite";

const client = new Client;
const CollectionIdGrp = import.meta.env.VITE_APP_COLLECTION_GROUP
const ProjectId = import.meta.env.VITE_PROJECTID
const DataBaseId = import.meta.env.VITE_APP_DATAID
const EndPoint =  import.meta.env.VITE_ENDPOINT

// console.log(CollectionIdGrp)


client
    .setEndpoint(EndPoint)
    .setProject(ProjectId);

const db = new Databases(client)



// Get references to the dropdown and container
const numTicketsDropdown = document.getElementById("numTickets");
const ticketDetailsContainer = document.getElementById("ticketDetails");






// Add event listener for dropdown change
numTicketsDropdown.addEventListener("change", () => {
  const numTickets = parseInt(numTicketsDropdown.value);

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
        <input class="input_ty w-100" type="tel" id="phone${i}" name="phone${i}"><br>
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
  const numTickets = parseInt(numTicketsDropdown.value);
  const ticketsData = [];

    for (let i = 1; i<=numTickets; i++) {
    const name = document.querySelector(`#name${i}`).value;
    const email = document.querySelector(`#email${i}`).value;
    const phone = document.querySelector(`#phone${i}`).value;
    const org = document.querySelector(`#district${i}`).value;
    const orgname = document.querySelector(`#org_name${i}`).value; 
    const proof  = document.querySelector("#proof").value;
    console.log(proof)

    ticketsData.push({
        name,
        email,
        phone,
        org,
        orgname,
        proof,
    });
    }
    console.log(ticketsData)
    console.log(typeof(ticketsData))

    let z = 0;

    for(let k=0; k<numTickets; k++){
        // console.log(ticketsData[k].name)
        const rep = await db.createDocument(
            DataBaseId,
            CollectionIdGrp,
            ID.unique(),
            {
                'name' : ticketsData[k].name,
                'number' : ticketsData[k].phone,
                'email' : ticketsData[k].email,
                'organization': ticketsData[k].org,
                'organization-name': ticketsData[k].orgname,
                'proof':ticketsData[k].proof,
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
      alert("registration Successful")
    }
    // if(rep){
    //   console.log('hi');
    // }
}

