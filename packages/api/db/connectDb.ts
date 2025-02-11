import { ENTITIES } from "../constants";
import { MongoClient, Db } from "mongodb";

type Entity = typeof ENTITIES[keyof typeof ENTITIES];

const uri = process.env.DATABASE_URL;
if (!uri) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
}
const client = new MongoClient(uri);
let db: Db | null = null;

export const getDbCollection = async (collectionName: Entity) => {
    if (!db) {
        await connectDb();
    }
    if (db) {
        return db.collection(collectionName);
    }
};

export const createIndexes = async () => {
    const [citiesCollection, countriesCollection, hotelsCollection] = await Promise.all([
        getDbCollection(ENTITIES.cities),
        getDbCollection(ENTITIES.countries),
        getDbCollection(ENTITIES.hotels),
    ]);

    if (hotelsCollection) {
        await Promise.all([
            hotelsCollection.createIndex({ chain_name: 1 }),
            hotelsCollection.createIndex({ hotel_name: 1 }),
            hotelsCollection.createIndex({ city: 1 }),
            hotelsCollection.createIndex({ country: 1 }),
        ]);
    }

    if (citiesCollection) {
        await citiesCollection.createIndex({ name: 1 });
    }

    if (countriesCollection) {
        await countriesCollection.createIndex({ country: 1 });
    }
};

export const connectDb = async (): Promise<Db> => {
    if (db) {
        return db;
    }
    try {
        await client.connect();
        db = client.db("tryHackMe");

        return db;
    } catch (error) {
        console.error(`DB connection failed: ${error}`);
        process.exit(1);
    }
};
