import { StatusCodes } from "http-status-codes";
import {
    listRestaurantReviews,
    listRestaurantMissions
} from "../services/restaurant.service.js";
import { isExist } from "../error.js";

export const handleListRestaurantReviews = async (req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId

        await isExist("restaurant", restaurantId)


        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0

        const reviews = await listRestaurantReviews(restaurantId, cursor)

        res.status(StatusCodes.OK).success(reviews)
    } catch (error) {
        next(error)
    }
}

export const handleRestaurantMissions = async (req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId

        await isExist("restaurant", restaurantId) //isExist가 throw하는걸 안기다려서 catch되지 않았던 것 ! 

        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0

        const missions = await listRestaurantMissions(restaurantId, cursor)

        res.status(StatusCodes.OK).success(missions)
    } catch (error) {
        next(error)
    }
}