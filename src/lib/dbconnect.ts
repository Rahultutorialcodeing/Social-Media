import mongoose from "mongoose";

type ConnectObject = {
    isconnected?: number
}

const connection: ConnectObject = {} //blanck obj asign

async function dbConnect(): Promise<void> {

    if (connection.isconnected) {
        console.log('DB allready Connected!!!!!')
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || '', {})
        connection.isconnected = db.connections[0].readyState;
        console.log("DB Connected!!!!!")

    } catch (error) {
        console.log("DB connection faled", error)

        process.exit(1)
    }

}

export default dbConnect;