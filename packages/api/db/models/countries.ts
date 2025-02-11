import { Collection, Document } from "mongodb";
import { ReadEntity, WriteEntity, DropEntity } from "db/client";
import { getDbCollection } from "db/connectDb";
import { ENTITIES } from "../../constants";


type Country = {
    country: string | { $regex: string; $options: string; };
    countryisocode: string;
};


class Countries<T extends Document> {
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

    async find(query: Partial<Country>) {
        return this.readEntity.find(query);
    }
    insertMany(data: Country[]) {
        return this.writeEntity.insertMany(data);
    }
    dropCollection() {
        return this.dropEntity.dropCollection();
    }
}

const countriesCollection = await getDbCollection(ENTITIES.countries);
if (!countriesCollection) {
    throw new Error("Failed to get countries collection");
}
const countriesModel = new Countries(countriesCollection);

export default countriesModel;
