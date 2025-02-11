import { Collection, Document } from "mongodb";
import { ReadEntity, WriteEntity, DropEntity } from "db/client";
import { getDbCollection } from "db/connectDb";
import { ENTITIES } from "../../constants";

type City = {
    _id?: string;
    name: string | { $regex: string; $options: string; };
};


class Cities<T extends Document> {
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

    async find(query: Partial<City>) {
        return this.readEntity.find(query);
    }
    insertMany(data: City[]) {
        return this.writeEntity.insertMany(data);
    }
    dropCollection() {
        return this.dropEntity.dropCollection();
    }
}

const citiesCollection = await getDbCollection(ENTITIES.cities);
if (!citiesCollection) {
    throw new Error("Failed to get cities collection");
}
const citiesModel = new Cities(citiesCollection);

export default citiesModel;
