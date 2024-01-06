import {Client, Databases, ID} from "appwrite";


const client = new Client;

const CollectionId = import.meta.env.VITE_COLLECTIONID
const ProjectId = import.meta.env.VITE_PROJECTID
const DataBaseId = import.meta.env.VITE_APP_DATAID
const EndPoint =  import.meta.env.VITE_ENDPOINT
const Collection_early = import.meta.env.VITE_APP_COLLECTION_EARLY
const Collection_mace = import.meta.env.VITE_APP_COLLECTION_MACE
const Collection_macep = import.meta.env.VITE_APP_COLLECTION_MACEP
const Collection_prem = import.meta.env.VITE_APP_COLLECTION_PREMIUM
// const CollectiongrpId = import.meta.env.VITE_APP_COLLECTION_GROUP

client
    .setEndpoint(EndPoint)
    .setProject(ProjectId);

const db = new Databases(client)

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
}


/*it is used to selecet college and check mace or other, 
if other there will be a new input field*/
const org_bla = document.querySelector("#org_bla")
org_bla.addEventListener('change',(event))
let inp = false
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
};

//to select the number of participants for group ticketing(min-2 & max-6)
let ticket = 5;



//function for premium ticket
async function submitprem(e){
    e.preventDefault()
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phn.value;
    const org = e.target.district.value;
    const orgname = document.querySelector("#orname")?.value || '';
    const link = e.target.proof.value;
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
                'organization-name': 'MACE',
                'proof': link,
            }
        )
        
        .then(mace_resp => {
            formprem.reset();
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
                'organization-name': orgname,
                'proof': link,
            }
        )
    
        .then(response => {
            formprem.reset();
            alert('registration Successful');
        })
        .catch(error => {
            alert('Error OCCURED CONTACT AT : +91 8330859663');
            console.error('error occured')
        });
    }
}


//function for normal ticket
async function normalticket(e){
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phn.value;
    const org = e.target.district.value;
    const orgname = document.querySelector("#orname")?.value || '';
    const link = e.target.proof.value;

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
                'organization-name': 'MACE',
                'proof': link,
            }
        )
        
        .then(mace_resp => {
            formmace.reset();
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
                'Proof': link,
            }
        )
    
        .then(response => {
            formmace.reset();
            alert('registration Successful');
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
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phn.value;
    const org = e.target.district.value;
    const orgname = e.target.org_name.value;
    const link = e.target.proof.value;
    const erly_resp = await db.createDocument(
        DataBaseId,
        Collection_early,
        ID.unique(),
        {
            'name': name,
            'number': phone,
            'email': email,
            'organization': org,
            'orgname': orgname,
            'proof': link,
        }
    )
    
    .then(erly_resp => {
        formearly.reset();
        alert('registration Successful');
    })

    .catch(error => {
        alert('Error OCCURED CONTACT AT : +91 8330859663');
        console.error('error occured')
    });
}


// async function submitform(e){
//     e.preventDefault();
//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const phone = e.target.phn.value;
//     const org = e.target.district.value;
//     const orgname = e.target.org_name.value;
//     const link = e.target.proof.value;

//     // const promise = storage.createFile(
//     //     BucketId,
//     //     ID.unique(),
//     //     document.getElementById('uploader').files[0]
//     // )


//     const response = await db.createDocument(
//         DataBaseId,
//         CollectionId,
//         ID.unique(),
//         {
//             'Name': name,
//             'Email': email,
//             'Number': phone,
//             'Organization': org,
//             'Name_Organization': orgname,
//             'Proof': link,
//         }
//     )
//     .then(response => {
//         form.reset();
//         alert('registration Successful');
//     })
//     .catch(error => {
//         alert('Error OCCURED CONTACT AT : +91 8330859663');
//         console.error('error occured')
//     });
// }
