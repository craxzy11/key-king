import mongoose from "mongoose"

const mongoConnect = async(url) => {
    try {
        await mongoose.connect(url, { dbName: "key-king" })    
        console.log("Database connected succesfully");    
    } catch (err) {
        console.log('error connecting to db');
    }
}

export { mongoConnect };