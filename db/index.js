const mongoose = require('mongoose');


const connectToMongo = async () => {
    try {
        if(mongoose.connection.readyState === 1){
            console.log("database already connected");
            return;
        }
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected successfully")
    } catch (error) {
        console.log(`something went wrong with database connection`, error);
        process.exit(1)
    }
};

module.exports = connectToMongo;