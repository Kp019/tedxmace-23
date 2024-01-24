import {Client, Databases, ID, Storage} from "appwrite";


var countDownDate = new Date("February 10, 2024 00:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now an the count down date
        var distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="demo"
        document.getElementById("timer").innerHTML =days + "<span> days</span>" + hours + "<span> hours</span>"+ minutes + "<span> mins</span>";
        
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);


const client = new Client;

const CollectionId = import.meta.env.VITE_COLLECTIONID
const ProjectId = import.meta.env.VITE_PROJECTID
const DataBaseId = import.meta.env.VITE_APP_DATAID
const EndPoint =  import.meta.env.VITE_ENDPOINT
const Collection_early = import.meta.env.VITE_APP_COLLECTION_EARLY
const Collection_mace = import.meta.env.VITE_APP_COLLECTION_MACE
const Collection_macep = import.meta.env.VITE_APP_COLLECTION_MACEP
const Collection_prem = import.meta.env.VITE_APP_COLLECTION_PREMIUM
const Collection_full = import.meta.env.VITE_APP_COLLECTION_FULL
const BUCKETID = import.meta.env.VITE_APP_BUCKETID



client
    .setEndpoint(EndPoint)
    .setProject(ProjectId);

const db = new Databases(client)
const storage = new Storage(client);


// const form = document.querySelector('#myform');
// if(form){
//     form.addEventListener('submit',submitform);
// }

//calling premium ticket
const formprem = document.querySelector("#myformprem");
if(formprem){
    formprem.addEventListener('submit', submitprem)
}

//calling early bird ticket
const formearly = document.querySelector('#myformearly');

if(formearly){
    formearly.addEventListener('submit', submitearly);
}

//calling normal ticket
const formmace = document.querySelector("#myformmace")
if(formmace){
    formmace.addEventListener('submit', normalticket);
    // console.log("js working")
}


/*it is used to selecet college and check mace or other, 
if other there will be a new input field*/
const org_bla = document.querySelector("#org_bla")
org_bla.addEventListener('change',(event))
let inp = false
let inpppt = false
onchange = (event) => {
    const bla = org_bla.value
    const container = document.querySelector("#blll")
    
    if(bla=='OTHER' && !inp){
        let org_name_label = document.createElement('label');
        let org_name = document.createElement('input');
        org_name.id='orname'
        org_name.className="input_ty w-100";
        org_name_label.innerText="Name of your Organization:";
        container.appendChild(org_name_label)
        container.appendChild(org_name);
        inp = true
    }else if(bla =='MACE'){
        container.querySelectorAll('label, input').forEach(element => element.remove());
        inp = false
    }
    
    const selectedOption = document.getElementById("org_bla").value; // Get the selected option
    // const numTickets = parseInt(numTicketsDropdown.value);
    let totalAmount = 0;
    let premamt = 0;
    if (selectedOption === "MACE") {
      totalAmount = 999;
      premamt = 1199;
    } else if(selectedOption === "OTHER") {
      totalAmount = 1199;
      premamt = 1399;
    }
    
    let norm = document.getElementById("amount")
    let premamtval = document.getElementById("amount_prem")
    if(norm){
        norm.textContent = `Amount to be paid : ₹${totalAmount}`
    }else if(premamtval){
        premamtval.textContent = `Amount to be paid : ₹${premamt}`
    }

};





//function for premium ticket
async function submitprem(e){
    e.preventDefault()
    alert("please wait for few seconds😊")
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phn.value;
    const org = e.target.district.value;
    let orgname = document.querySelector("#orname")?.value || '';
    // const link = e.target.proof.value;
    const mm = e.target.org_bla.value;
    
    document.getElementById('btn_sub').disabled = true;
    document.getElementById('btn_sub').value = "please wait";

    if(mm=='MACE'){
        orgname = "MACE";
    }
    
    const upload = storage.createFile(
        BUCKETID,
        ID.unique(),
        document.getElementById('fileup').files[0]
    );

    let imid = (await upload).$id
    
    const mace_resp = await db.createDocument(
            DataBaseId,
            Collection_full,
            ID.unique(),
            {
                'name': name,
                'number': phone,
                'email': email,
                'organization': org,
                'organization_name': orgname,
                'IMGID' : imid,
            }
        )

    
    if(orgname==''){
        const mace_resp = await db.createDocument(
            DataBaseId,
            Collection_macep,
            ID.unique(),
            {
                'name': name,
                'number': phone,
                'email': email,
                'organization': org,
                'organization_name': 'MACE',
                'IMGID' : imid,
            }
        )
        
        .then(mace_resp => {
            formprem.reset();
            document.getElementById('btn_sub').disabled = false;
            document.getElementById('btn_sub').value = "Book Now";
            alert('registration Successful');
        })
    
        .catch(error => {
            alert('Error OCCURED CONTACT AT : +91 8330859663');
            console.error('error occured')
        });
    }
    else{
        const response = await db.createDocument(
            DataBaseId,
            Collection_prem,
            ID.unique(),
            {
                'name': name,
                'email': email,
                'number': phone,
                'organization': org,
                'organization_name': orgname,
                'IMGID' : imid,
            }
        )
    
        .then(response => {
            formprem.reset();
            document.getElementById('btn_sub').disabled = false;
            document.getElementById('btn_sub').value = "Book Now";
            alert('registration Successful');
        })
        .catch(error => {
            alert('Error OCCURED CONTACT AT : +91 8330859663');
            console.error('error occured')
        });
    }
    
}

// document.getElementById('uploader').files[0]




// fileup.addEventListener('change', async (event) => {
//     const screenshots = event.target.files[0];
  
//     try {
//       const filesupload = await storage.createFile(
//         BUCKETID,
//         ID.unique, 
//         screenshots
//         ); // Replace with your bucket ID
//       console.log('File uploaded successfully:', response);
//       // Handle successful upload (e.g., display confirmation message)
//       console.log(filesupload.ID)
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         // Handle upload error (e.g., display error message)
//     }
//   });

document.getElementById('btn_sub').disabled = false;

//function for normal ticket
async function normalticket(e){
    e.preventDefault();
    alert("please wait for few seconds😊")
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phn.value;
    const org = e.target.district.value;
    const mm = e.target.org_bla.value;
    let orgname = document.querySelector("#orname")?.value || '';


    document.getElementById('btn_sub').disabled = true;
    document.getElementById('btn_sub').value = "please wait";
    // const link = e.target.proof.value;
    // const files = e.target.file.files;
    // console.log(files)
    // const file = e.target.files[0]
    // console.log(fileup.value)
    // const filesupload = await client.storage.createFile(
    //     BUCKETID,
    //     ID.unique, 
    //     file
    //     );
    const upload = storage.createFile(
        BUCKETID,
        ID.unique(),
        document.getElementById('fileup').files[0]
    );
    
    let imid = (await upload).$id
    
    // console.log(mm)
    // console.log(orgname)

    if(mm=='MACE'){
        orgname = "MACE";
    }

    // console.log(orgname)

    const mace_resp = await db.createDocument(
        DataBaseId,
        Collection_full,
        ID.unique(),
        {
            'name': name,
            'number': phone,
            'email': email,
            'organization': org,
            'organization_name': orgname,
            'IMGID': imid,
        }
    )

    if(orgname==''){
        const mace_resp = await db.createDocument(
            DataBaseId,
            Collection_mace,
            ID.unique(),
            {
                'name': name,
                'number': phone,
                'email': email,
                'organization': org,
                'organization_name': 'MACE',
                'IMGID': imid,
            }
        )
        
        .then(mace_resp => {
            formmace.reset();
            document.getElementById('btn_sub').disabled = false;
            document.getElementById('btn_sub').value = "Book Now";
            alert('registration Successful');
        })
    
        .catch(error => {
            alert('Error OCCURED CONTACT AT : +91 8330859663');
            console.error('error occured')
        });
    }
    else{
        const response = await db.createDocument(
            DataBaseId,
            CollectionId,
            ID.unique(),
            {
                'Name': name,
                'Email': email,
                'Number': phone,
                'Organization': org,
                'Name_Organization': orgname,
                'IMGID' : imid,
            }
        )
    
        .then(response => {
            formmace.reset();
            alert('registration Successful');
            document.getElementById('btn_sub').disabled = false;
            document.getElementById('btn_sub').value = "Book Now";
        })
        .catch(error => {
            alert('Error OCCURED CONTACT AT : +91 8330859663');
            console.error('error occured')
        });
    }
}


//function for earlybird
async function submitearly(e){
    e.preventDefault();
    alert("please wait for few seconds😊")
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phn.value;
    const org = e.target.district.value;
    const orgname = e.target.org_name.value;
    // const link = e.target.proof.value;

    document.getElementById('btn_sub').disabled = true;
    document.getElementById('btn_sub').value = "please wait";
    // const fileup = document.getElementById('fileup');
    const upload = storage.createFile(
        BUCKETID,
        ID.unique(),
        document.getElementById('fileup').files[0]
    );

    let imid = (await upload).$id

    const mace_resp = await db.createDocument(
        DataBaseId,
        Collection_full,
        ID.unique(),
        {
            'name': name,
            'number': phone,
            'email': email,
            'organization': org,
            'organization_name': orgname,
            'IMGID' : imid,
        }
    )

    const erly_resp = await db.createDocument(
        DataBaseId,
        Collection_early,
        ID.unique(),
        {
            'name': name,
            'number': phone,
            'email': email,
            'organization': org,
            'organization_name': orgname,
            'IMGID' : imid,
        }
    )
    
    .then(erly_resp => {
        formearly.reset();
        document.getElementById('btn_sub').disabled = false;
        document.getElementById('btn_sub').value = "Book Now";
        alert('registration Successful');
    })

    .catch(error => {
        alert('Error OCCURED CONTACT AT : +91 8330859663');
        console.error('error occured')
    });
}

