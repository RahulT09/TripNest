if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}

const mongoose = require("mongoose");
const listing = require("../models/listing.js");
const sampleData = require("./data.js");

const dbUrl = process.env.ATLAS_DB;

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then((res) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function initDb() {
  await listing.deleteMany({});
  sampleData.data = sampleData.data.map((el) => ({
    ...el,
    owner: "69ac63d4103228ae119e908c",
  }));
  await listing.insertMany(sampleData.data);
}

main()
  .then(async () => {
    console.log("DB connected");
    await initDb();
    console.log("Data seeded successfully");
    mongoose.connection.close(); // close after seeding
  })
  .catch((err) => {
    console.log(err);
  });
