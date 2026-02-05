import mongoose from "mongoose";

// Db Connection
async function DBConnection() {
  try {
    // Connection Query
    await mongoose
      .connect(process.env.MONGODB_DB_URL)
      .then(() => {
        console.log("DB CONNECTED!");
      })
      .catch((error) => {
        // Error on Connection
        if (error) throw new Error("Failed to connect with DB!");
      });
  } catch (error) {
    console.log(error);
    process.exit(1); // Server stop
  }
}

export default DBConnection;