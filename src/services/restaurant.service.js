import { responseFromReviews } from "../dtos/review.dto.js"
import { responseFromMissions } from "../dtos/mission.dto.js"
import { getAllRestaurantReviews, getAllRestaurantMissions } from "../repositories/restaurant.repository.js"


export const listRestaurantReviews = async (restaurantId, cursor) => {
    const reviews = await getAllRestaurantReviews(restaurantId, cursor)

    return responseFromReviews(reviews)
}

export const listRestaurantMissions = async (restaurantId, cursor) => {
    const missions = await getAllRestaurantMissions(restaurantId, cursor)

    console.log('sql성공적 반환(DTO변환 전)')
    return responseFromMissions(missions)
}