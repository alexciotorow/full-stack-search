import { Collection, Document } from "mongodb";

export class DropEntity<T extends Document> {
    entity: Collection<T>;

    constructor(entity: Collection<T>) {
        this.entity = entity;
    }
    async dropCollection() {
        return this.entity.drop();

    }
}
