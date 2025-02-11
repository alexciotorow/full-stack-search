import "dotenv/config";
import { describe, it, expect } from "vitest";
import countriesModel from "../countries";
import citiesModel from "../cities";
import hotelsModel from "../hotels";


describe('Model objects should have the correct keys', () => {
    it("should return the correct entities", async () => {
        const entities = ['entity', 'readEntity', 'writeEntity', 'dropEntity'];
        expect(Object.keys(countriesModel)).toEqual(entities);
        expect(Object.keys(citiesModel)).toEqual(entities);
        expect(Object.keys(hotelsModel)).toEqual(entities);
    });
});