import { Client, Databases, Query, ID } from "appwrite"

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
const pindown = import.meta.env.VITE_APP_PINDOWNID


client
    .setEndpoint(EndPoint)
    .setProject(ProjectId);

const db = new Databases(client)

const pindownform = document.querySelector("#pindownform");
if(pindownform){
    pindownform.addEventListener('submit', submitform)
    // btnn.addEventListener('click', btnn.disabled = true)

}



// console.log(check())


async function submitform(e){
    e.preventDefault();
    alert("please wait for few seconds😊")
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phn.value;
    const orgname = e.target.orgname.value;
    const walletadd = e.target.wallet_add.value;
    // const link = e.target.proof.value;
    
    document.getElementById('btn_sub').disabled = true;
    document.getElementById('btn_sub').value = "please wait";
    
    const ck = check(email)
    console.log(ck)
    if((await ck) && (await ck).documents && (await ck).documents.length>=1){
        console.log("hiiii")
        const pindown_resp = await db.createDocument(
            DataBaseId,
            pindown,
            ID.unique(),
            {
                'name': name,
                'number': phone,
                'email': email,
                'organization_name': orgname,
                'wallet_address' : walletadd, 
            }
        )
        .then(pindown_resp => {
           pindownform.reset();
           document.getElementById('btn_sub').disabled = false;
           document.getElementById('btn_sub').value = "Submit";
           alert('registration Successful'); 
        })
        .catch(error =>{
            alert('error occured at saving the data')
            pindownform.reset();
            document.getElementById('btn_sub').disabled = false;
            document.getElementById('btn_sub').value = "Submit";
            // console.log(error)
        })

}else{
    alert('You need to register first.')
    window.location.replace('/')
}
}


async function check(email){
    try{
        const response = db.listDocuments(
            DataBaseId,
            Collection_full,
            [
                Query.equal('email', email)
            ])
        // console.log((await response).documents.length)
        if((await response).documents.length>=1){
            return response; // Data found with matching email
        } else {
            return false; // Data not found
        }
        }catch(error){
            console.error('Error checking data:', error);
            return false; // Handle errors gracefully
        }
}
