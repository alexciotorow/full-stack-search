import { Collection, Document } from "mongodb";

export class ReadEntity<T extends Document> {
    entity: Collection<T>;

    constructor(entity: Collection<T>) {
        this.entity = entity;
    }
    async find(query: any = {}) {
        return this.entity.find(query).toArray();

    }
    async aggregate(query: any) {
        return this.entity.aggregate(query).toArray();
    }
}
