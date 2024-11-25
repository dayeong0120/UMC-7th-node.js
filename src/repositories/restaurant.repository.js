import { prisma } from "../db.config.js"

//특정 가게의 리뷰 조회 
export const getAllRestaurantReviews = async (restaurantId, cursor) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            contents: true,
            rating: true,
            userMission: {
                select: {
                    mission: {
                        select: {
                            restaurantId: true
                        }
                    }
                }
            },
        },
        where: {
            userMission: { mission: { restaurantId: parseInt(restaurantId) } },
            id: { gt: cursor } //cursor값보다 더 큰 아이디만 조회 
        },
        orderBy: { id: "asc" },
        take: 5

    })
    return reviews
}

// 특정 가게의 미션 조회
export const getAllRestaurantMissions = async (restaurantId, cursor) => {
    const missions = await prisma.mission.findMany({
        select: {
            id: true,
            awardedPoints: true,
            minimumAmount: true,
            certificationNumber: true,
            missionPeriod: true,
        },
        where: {
            restaurant: { id: parseInt(restaurantId) },
            id: { gt: cursor }
        },
        orderBy: { id: "asc" },
        take: 5
    })

    return missions
}

