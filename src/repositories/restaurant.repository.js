import { prisma } from "../db.config.js"

export const getAllRestaurantReviews = async (restaurantId, cursor) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            contents: true,
            rating: true,
            mission: {
                select: {
                    restaurant: {
                        select: {
                            id: true
                        }
                    }
                }
            },
        },
        where: {
            mission: { restaurantId: parseInt(restaurantId) },
            id: { gt: cursor } //cursor값보다 더 큰 아이디만 조회 
        },
        orderBy: { id: "asc" },
        take: 5

    })
    return reviews
}