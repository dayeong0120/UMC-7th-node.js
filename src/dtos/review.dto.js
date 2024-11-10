



export const bodyToReview = (body, missionId) => {
    return {
        rating: body.rating,
        contents: body.contents,
        userMissionId: missionId
    }
}

export const responseFromReview = (review) => {
    console.log("왜제발", review)

    return {
        rating: review.rating,
        contents: review.contents,
        userMissionId: review.mission_id
    }
}

export const responseFromReviews = (reviews) => {
    const formattedReviews = reviews.map(review => ({
        id: review.id,
        contents: review.contents,
        rating: review.rating,
        restaurantId: review.mission.restaurant.id,
    }))

    return {
        data: formattedReviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null
        }
    }
}