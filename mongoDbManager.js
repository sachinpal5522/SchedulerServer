const { MongoClient, ObjectId } = require("mongodb");

const userid = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${userid}:${password}@spdevelopment.hideqdd.mongodb.net/?retryWrites=true&w=majority&appName=SPDevelopment`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function getAppointment() {
  try {
    await client.connect();
    const database = client.db("Demos");
    const collection = database.collection("dentist_appointment");
    const query = {};
    const result = await collection
      .find(query, {
        projection: {
          id: "$_id",
          title: 1,
          start: 1,
          end: 1,
          allDay: 1,
          extendedProps: 1,
          _id: 0,
        },
      })
      .toArray();
    return result;
  } catch (ex) {
    console.log(ex);
  } finally {
    await client.close();
  }
}

async function addAppointment(payload) {
  try {
    await client.connect();
    const database = client.db("Demos");
    const collection = database.collection("dentist_appointment");
    const result = await collection.insertOne(payload);
    return result;
  } catch (ex) {
    console.log(ex);
  } finally {
    await client.close();
  }
}

async function updateAppointment(payload) {
  try {
    await client.connect();
    const database = client.db("Demos");
    const collection = database.collection("dentist_appointment");
    const filter = { _id: new ObjectId(payload.id) };
    delete payload.id;
    const dataToUpdate = {
      $set: payload,
    };
    const result = await collection.updateOne(filter, dataToUpdate);
    return result;
  } catch (ex) {
    console.log(ex);
  } finally {
    await client.close();
  }
}

async function deleteAppointment(payload) {
  try {
    await client.connect();
    const database = client.db("Demos");
    const collection = database.collection("dentist_appointment");
    const filter = { _id: new ObjectId(payload.id) };
    const result = await collection.deleteOne(filter);
    return result;
  } catch (ex) {
    console.log(ex);
  } finally {
    await client.close();
  }
}

const MongoDb = {
  getAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};

module.exports = MongoDb;
