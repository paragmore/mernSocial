import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'
import {MONGO_URL} from './keys.js'
const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/posts', postRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server running on: ${PORT}.\nSuccessfully connected to MONGO DB` )
        })   
    })
    .catch(err=>{
        console.log(err)
    })

    mongoose.set('useFindAndModify', false);