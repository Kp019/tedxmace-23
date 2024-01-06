import { defineConfig, loadEnv } from "vite";
import dotenv from 'dotenv';
import {resolve} from 'path'

export default defineConfig({
    define:{
        'process.meta.env.VITE_APP_DATAID':JSON.stringify(process.env.VITE_APP_DATAID),
        'process.meta.env.VITE_COLLECTIONID':JSON.stringify(process.env.VITE_COLLECTIONID),
        'process.meta.env.VITE_PROJECTID':JSON.stringify(process.env.VITE_PROJECTID),
        'process.meta.env.VITE_ENDPOINT':JSON.stringify(process.env.VITE_ENDPOINT),
        'process.meta.env.VITE_COLLECTION_EARLY':JSON.stringify(process.env.VITE_COLLECTION_EARLY),
        'process.meta.env.VITE_COLLECTION_GROUP':JSON.stringify(process.env.VITE_COLLECTION_GROUP),
        'process.meta.env.VITE_COLLECTION_MACE':JSON.stringify(process.env.VITE_COLLECTION_MACE),
        'process.meta.env.VITE_COLLECTION_MACEP':JSON.stringify(process.env.VITE_COLLECTION_MACEP),
        'process.meta.env.VITE_COLLECTION_PREMIUM':JSON.stringify(process.env.VITE_COLLECTION_PREMIUM),
        'process.meta.env.VITE_COLLECTIONGROUP':JSON.stringify(process.env.VITE_APP_COLLECTION_GROUP),
        
    },

    build: {
        rollupOptions: {
            input: {
            main: resolve(__dirname, 'index.html'),
            registerearly: resolve(__dirname, 'pages/registerearly/index.html'), //earlybird
            registermace: resolve(__dirname, 'pages/registermace/index.html'), //normal ticket
            registerprem: resolve(__dirname, 'pages/registerprem/index.html'), //premium ticket
            registergrp: resolve(__dirname, 'pages/registergrp/index.html'), //grouptickets
        },
        },
      },
})

