import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager',
    } = process.env;

    this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.client.connect()
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const db = this.client.db();
    const usersCollection = db.collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const db = this.client.db();
    const filesCollection = db.collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

export default dbClient;
