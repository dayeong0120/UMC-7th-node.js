import { responseFromReviews } from "../dtos/review.dto.js"
import { getAllRestaurantReviews } from "../repositories/restaurant.repository.js"


export const listRestaurantReviews = async (restaurantId, cursor) => {
    const reviews = await getAllRestaurantReviews(restaurantId, cursor)

    return responseFromReviews(reviews)
}