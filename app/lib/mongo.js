import mongoose from 'mongoose'

const {
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env

const connect = async () => {
    const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
    const database = await mongoose.connect(uri)
    return database
}

export default {
    connect,
}