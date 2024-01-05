import {Client, Databases, ID} from "appwrite";


const client = new Client;

const CollectionId = import.meta.env.VITE_COLLECTIONID
const ProjectId = import.meta.env.VITE_PROJECTID
const DataBaseId = import.meta.env.VITE_APP_DATAID
const EndPoint =  import.meta.env.VITE_ENDPOINT
const Collection_early = import.meta.env.VITE_APP_COLLECTION_EARLY


client
    .setEndpoint(EndPoint)
    .setProject(ProjectId);

const db = new Databases(client)

const form = document.querySelector('#myform');
if(form){
    form.addEventListener('submit',submitform);
}

const formearly = document.querySelector('#myformearly');
if(formearly){
    formearly.addEventListener('submit', submitearly);
}


async function submitearly(e){
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phn.value;
    const org = e.target.district.value;
    const orgname = e.target.org_name.value;
    const link = e.target.proof.value;
    console.log(name)
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

async function submitform(e){
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phn.value;
    const org = e.target.district.value;
    const orgname = e.target.org_name.value;
    const link = e.target.proof.value;

    // const promise = storage.createFile(
    //     BucketId,
    //     ID.unique(),
    //     document.getElementById('uploader').files[0]
    // )


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
        form.reset();
        alert('registration Successful');
    })
    .catch(error => {
        alert('Error OCCURED CONTACT AT : +91 8330859663');
        console.error('error occured')
    });
}
