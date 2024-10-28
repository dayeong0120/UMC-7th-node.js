
export const bodyToProgress = (body, userId) => {
    return {
        userId: userId,
        missionId: body.missionId
    }
}

export const responseFromProgress = (userMission) => {
    return {
        userId: userMission.user_id,
        missionId: userMission.mission_id
    }
}