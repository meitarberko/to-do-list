import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@todolistcluster.fay4n.mongodb.net/<dbname>?retryWrites=true&w=majority`);
const conn = mongoose.connection;

mongoose.connection.on('connected', () => {
    console.log("you are connected to db!");
    console.log(mongoose.connection.readyState);
});

export default conn;