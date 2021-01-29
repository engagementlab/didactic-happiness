require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const {
    Schema,
} = mongoose;
module.exports = async function() {

    console.log(process.env.DB_URI) // prints your secret value
    // context.log(process.env.DB_URI) // prints your secret value

    const dbAddress = process.env.DB_URI;
 
    try {

        const conn = mongoose.createConnection(dbAddress, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        const linkSchema = new Schema({
            originalUrl: {
                type: String,
                index: true,
                unique: true,
                required: true,
            },
            shortUrl: {
                type: String,
                unique: true,
                required: true,
            },
            label: {
                type: String,
                unique: true,
                required: true,
            },
            date: {
                type: Date,
            },
            clicks: {
                type: Number,
            },
            user: {
                type: String,
            },
        });

        mongoose.set('useCreateIndex', true);
        
        return conn.model('Link', linkSchema);

    } catch (e) {
        console.error(e);
        throw new Error(e);
    }

}