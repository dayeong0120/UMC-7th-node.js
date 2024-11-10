
export const bodyToProgress = (body, userId) => {
    const numUserId = Number(userId)

    return {

        userId: numUserId,
        missionId: body.missionId
    }
}

export const responseFromProgress = (userMission) => {
    return {
        userId: userMission.user_id,
        missionId: userMission.mission_id
    }
}