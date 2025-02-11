import request from "supertest";

import { describe, it, expect } from "vitest";
import app from "./index";

describe("hotels route should", () => {
    it("getHotelsRoute should return empty arrays when there is no query", async () => {
        const response = await request(app).get("/hotels");
        expect(response.body).toHaveProperty("hotels");
        expect(response.body).toHaveProperty("countries");
        expect(response.body).toHaveProperty("cities");
    });

    it("getHotelsRoute should return the correct data when queried with country", async () => {
        const response = await request(app).get("/hotels?query=bulgaria");
        const { hotels, countries, cities } = response.body;
        expect(Object.keys(hotels.at(0))).toEqual([
            '_id',
            'chain_name',
            'hotel_name',
            'addressline1',
            'addressline2',
            'zipcode',
            'city',
            'state',
            'country',
            'countryisocode',
            'star_rating'
        ]);

        expect(Object.keys(countries.at(0))).toEqual(['_id', 'country', 'countryisocode']);
        expect(cities).toEqual([]);
    });

    it("getHotelsRoute should return the correct data when queried with city", async () => {
        const response = await request(app).get("/hotels?query=Iquique");
        const { cities } = response.body;
        expect(Object.keys(cities.at(0))).toEqual(["_id", "name"]);
    });
});
