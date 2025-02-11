import hotelsModel from "db/models/hotels";
import countryModel from "db/models/countries";
import cityModel from "db/models/cities";

export default function hotelsService() {

    function sanitizeAndRemoveWhiteSpace(query: string) {
        return query.replace(/[^\w\s]/gi, "").trim();
    }

    async function getLocationData(query: string) {

        if (!query) {
            return {
                hotels: [],
                countries: [],
                cities: [],
            };
        }

        const queryParam = sanitizeAndRemoveWhiteSpace(query);
        const searchOptions = { $regex: queryParam, $options: "i" };

        const [countries, cities, hotels] = await Promise.all([
            countryModel.find({ country: searchOptions }),
            cityModel.find({ name: searchOptions }),
            hotelsModel.aggregate([
                {
                    $match: {
                        $or: [
                            { chain_name: searchOptions },
                            { hotel_name: searchOptions },
                            { city: searchOptions },
                            { country: searchOptions },
                        ],
                    },
                },
            ]),
        ]);


        return { hotels, countries, cities };
    }
    return { getLocationData, sanitizeAndRemoveWhiteSpace };
}
