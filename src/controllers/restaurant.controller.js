import { StatusCodes } from "http-status-codes";
import { listRestaurantReviews } from "../services/restaurant.service.js";

export const handleListRestaurantReviews = async (req, res, next) => {
    const restaurantId = req.params.restaurantId


    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0

    const reviews = await listRestaurantReviews(restaurantId, cursor)

    res.status(StatusCodes.OK).json({ result: reviews })
}