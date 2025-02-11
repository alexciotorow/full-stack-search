import { Collection, Document } from "mongodb";
import { ReadEntity, WriteEntity, DropEntity } from "db/client";

import { getDbCollection } from "db/connectDb";
import { ENTITIES } from "../../constants";


type Hotel = {
    _id?: string;
    chain_name: string;
    hotel_name: string;
    city: string;
    country: string;
    zipcode: string;
    addressline1: string;
    countryisocode?: string;
};

class Hotels<T extends Document> {
    entity: Collection<T>;
    readEntity: ReadEntity<T>;
    writeEntity: WriteEntity<T>;
    dropEntity: DropEntity<T>;

    constructor(entity: Collection<T>) {
        this.entity = entity;
        this.readEntity = new ReadEntity(this.entity);
        this.writeEntity = new WriteEntity(this.entity);
        this.dropEntity = new DropEntity(this.entity);
    }

    async find() {
        return this.readEntity.find();
    }

    async aggregate(query: any) {
        return this.readEntity.aggregate(query);
    }

    insertMany(data: Hotel[]) {
        return this.writeEntity.insertMany(data);
    }
    dropCollection() {
        return this.dropEntity.dropCollection();
    }
}

const hotelsCollection = await getDbCollection(ENTITIES.hotels);
if (!hotelsCollection) {
    throw new Error("Failed to get hotels collection");
}
const hotelsModel = new Hotels(hotelsCollection);

export default hotelsModel;
