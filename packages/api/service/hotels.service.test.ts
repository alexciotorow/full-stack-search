import { describe, it, vi, expect, beforeEach } from "vitest";
import "dotenv/config";
import hotelsService from "./hotels.service";
import citiesModel from "db/models/cities";
import hotelsModel from "db/models/hotels";
import countriesModel from "db/models/countries";

vi.mock("db/models/cities");
vi.mock("db/models/hotels");
vi.mock("db/models/countries");

describe("hotels service should work as expected", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    const hotelService = hotelsService();

    it("sanitizeAndRemoveWhiteSpace should remove all white spaces", () => {
        const whiteSpace = "  this is a query with spaces  ";
        const specialChar = " special%@#^&*()+char";
        const noWhiteSpace = hotelService.sanitizeAndRemoveWhiteSpace(whiteSpace);
        const noSpecialChar = hotelService.sanitizeAndRemoveWhiteSpace(specialChar);

        expect(noWhiteSpace).toBe("this is a query with spaces");
        expect(noSpecialChar).toBe("specialchar");
    });

    it("getLocationData should return empty arrays when there is no query", async () => {
        const { hotels, countries, cities } = await hotelService.getLocationData(
            ""
        );
        expect(hotels).toEqual([]);
        expect(countries).toEqual([]);
        expect(cities).toEqual([]);
    });

    it("getLocationData should return the correct data when queried with country", async () => {
        countriesModel.find = vi
            .fn()
            .mockResolvedValue([{ country: "Italy", countryisocode: "IT" }]);
        citiesModel.find = vi.fn().mockResolvedValue([{ name: "Edinburgh" }]);
        hotelsModel.aggregate = vi.fn().mockResolvedValue([
            {
                chain_name: "Samed Resorts Group",
                hotel_name: "Sai Kaew Beach Resort",
                addressline1: "8/1 Moo 4 Tumbon Phe Muang",
                addressline2: "",
                zipcode: "21160",
                city: "Koh Samet",
                state: "Rayong",
                country: "Thailand",
                countryisocode: "TH",
                star_rating: 4,
            },
        ]);

        const result = await hotelService.getLocationData("Country1");
        expect(result).toEqual({
            hotels: [
                {
                    chain_name: "Samed Resorts Group",
                    hotel_name: "Sai Kaew Beach Resort",
                    addressline1: "8/1 Moo 4 Tumbon Phe Muang",
                    addressline2: "",
                    zipcode: "21160",
                    city: "Koh Samet",
                    state: "Rayong",
                    country: "Thailand",
                    countryisocode: "TH",
                    star_rating: 4,
                },
            ],
            countries: [{ country: "Italy", countryisocode: "IT" }],
            cities: [{ name: "Edinburgh" }],
        });
    });
});
