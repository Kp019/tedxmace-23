// import {Client, Databases, Account, ID, Query, Storage, AppwriteException} from "appwrite";


// const VITE_ENDPOINT =  "https://cloud.appwrite.io/v1"
// const VITE_PROJECTID = "6594684778d28abf8d83"
// const VITE_COLLECTIONID = "6594692eef689754145e"
// const VITE_APP_DATAID = "659469169d4cae8a12e3"
// const VITE_APP_COLLECTION_EARLY = "6597a744a5d2ff7143f4"
// const VITE_APP_COLLECTION_MACE = "6597a7603645251f0ec5"
// const VITE_APP_COLLECTION_MACEP = "6597a767a46f6858c157"
// const VITE_APP_COLLECTION_PREMIUM = "6597a7574dae0cddb234"
// const VITE_APP_COLLECTION_GROUP = "6598e612a937cf4575fc"
// const VITE_APP_COLLECTION_FULL = "659927f84bbaa799cbb6"
// const VITE_APP_BUCKETID = "6594ea6846535114ac07"
// const VITE_APP_PINDOWNID = "65a2823f9596bf5e2be9"

// const client = new Client;

// client.setEndpoint(VITE_ENDPOINT).setProject(VITE_PROJECTID);

// const db = new Databases(client)

// let cursor = null;


// let list;

// db.listDocuments(VITE_APP_DATAID, VITE_APP_COLLECTION_FULL, [
//     Query.limit(121),
// ]
// ).then((response) => {
//     // console.log(response.total)
//     // console.log(response);
//     for(let i=0; i<response.total; i++){
//         console.log(response.documents[i]);
//         const document = response.documents[i];
//         list = response.documents
//     }
// })

// console.log(list)



// const data = [
//     {
//         name:"Sobhana Soman",
//         email:"sanjusoman100@gmail.com",
//         number: "9746288054"
//     },
//     {
//         name: "Narayanan Soman",
//         email: "sanjusoman100@gmail.com",
//         number: "9746288054"

//     },
//     {
//         name:"Safa Nazrin T S",	
//         email:"safanaz4005@gmail.com",
//         number:"9946864526"	
//     },
//     {
//         name:"Adarsh O V",	
//         email:"adarshov2004@gmail.com",
//         number:"9778399698"	

//     },
//     {
//         name:"Harishankar M",
//         email:"mharishankar2005@gmail.com",
//         number:"9495602599"	
//     },
//     {
//         name:"Joann J Koodathil",
//         email:"joannjk2005@gmail.com",
//         number:"8078531845"
//     },
//     {
//         name:"Muhammed Ifthikar C P",
//         email:"muhammedifthikar45@gmail.com",
//         number:"8136936570"
//     }
//   ]


// const imid = "Payment done" 



// for(let i in data){
//     // console.log(data[i])
//     const mace_resp = db.createDocument(
//         VITE_APP_DATAID,
//         VITE_APP_COLLECTION_FULL,
//         ID.unique(),
//         {
//             'name': data[i].name,
//             'number': data[i].number,
//             'email': data[i].email,
//             'organization': "COLLEGE",
//             'organization_name': "MACE",
//             'IMGID' : imid,
//         }
//     )

// }
