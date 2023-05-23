import mongoose from "mongoose";

const connection = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Database Connected Successfully"
      // connect.connection.host,
      // connect.connection.name
    );
  } catch (err) {
    console.log("Error Message is: ", err);
    process.exit(1);
  }
};

export default connection;
