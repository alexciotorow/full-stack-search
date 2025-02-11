import { Collection, Document } from "mongodb";

export class WriteEntity<T extends Document> {
    entity: Collection<T>;

    constructor(entity: Collection<T>) {
        this.entity = entity;
    }
    async insertMany(data: any) {
        return this.entity.insertMany(data);

    }
}
