// duplicateDatabase.js

const mongoose = require('mongoose');

const uri = 'mongodb+srv://linhcka1908g01:Cecilia3108@cluster0.bnetuei.mongodb.net/'; // Replace with your MongoDB URI

const oldDbName = 'myDatabase;'; // Replace with your old database name
const newDbName = 'cosmic'; // Replace with your new database name

async function duplicateDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to MongoDB: ${oldDbName}`);

        // Get collections from the old database
        const oldDb = mongoose.connection.useDb(oldDbName);
        const collections = await oldDb.db.listCollections().toArray();

        // Loop through each collection and copy it to the new database
        for (const collection of collections) {
            const collectionName = collection.name;
            console.log(`Copying collection: ${collectionName}`);

            const documents = await oldDb.collection(collectionName).find().toArray();
            const newDb = mongoose.connection.useDb(newDbName);
            await newDb.collection(collectionName).insertMany(documents);
        }

        console.log(`Database duplicated successfully from ${oldDbName} to ${newDbName}`);
    } catch (error) {
        console.error('Error duplicating database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Execute the function
duplicateDatabase();