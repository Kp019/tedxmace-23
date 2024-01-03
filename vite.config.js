import { defineConfig, loadEnv } from "vite";
import dotenv from 'dotenv';

export default defineConfig({
    define:{
        'process.meta.env.VITE_APP_DATAID':JSON.stringify(process.env.VITE_APP_DATAID),
        'process.meta.env.VITE_COLLECTIONID':JSON.stringify(process.env.VITE_COLLECTIONID),
        'process.meta.env.VITE_PROJECTID':JSON.stringify(process.env.VITE_PROJECTID),
        'process.meta.env.VITE_ENDPOINT':JSON.stringify(process.env.VITE_ENDPOINT),
        
    }
})



