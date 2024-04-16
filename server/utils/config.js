import mongoose from "mongoose"

const mongoConnect = (url) => {
    mongoose.connect(url, { dbName: "key-king" }).
    then((data) => console.log(`Connected to database: ${data.connection.host}`)).
    catch((err) => {
        throw err;
    });
}

export { mongoConnect };