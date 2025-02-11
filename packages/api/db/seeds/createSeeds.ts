import hotelsModel from "db/models/hotels";
import citiesModel from "db/models/cities";
import countriesModel from "db/models/countries";

import { hotels } from "./hotels";
import { cities } from "./cities";
import { countries } from "./countries";
import { createIndexes } from "db/connectDb";

export const createSeeds = async () => {
    try {
        await Promise.all([
            hotelsModel.dropCollection(),
            citiesModel.dropCollection(),
            countriesModel.dropCollection(),
        ]);

        await createIndexes();

        await Promise.all([
            hotelsModel.insertMany(hotels),
            citiesModel.insertMany(cities),
            countriesModel.insertMany(countries),
        ]);
    } catch (error) {
        throw new Error(`Error seeding database: ${error}`);
    }
};
