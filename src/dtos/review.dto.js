



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
        rating: review[0].rating,
        contents: review[0].contents,
        userMissionId: review[0].mission_id
    }
}