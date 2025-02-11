import { Request, Response } from "express";
import hotelsService from "service/hotels.service";

const hotelService = hotelsService();

export async function getLocationController(req: Request, res: Response): Promise<any> {
    const { query } = req.query;
    if (!query) {
        return res.status(404).json({
            hotels: [],
            countries: [],
            cities: [],
        });
    }

    try {
        const { hotels, cities, countries } = await hotelService.getLocationData(
            query as string
        );
        return res.status(200).json({
            hotels,
            countries,
            cities,
        });
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
}
