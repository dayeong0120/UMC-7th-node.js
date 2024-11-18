
export const bodyToProgress = (body, userId) => {
    const numUserId = Number(userId)

    return {

        userId: numUserId,
        missionId: body.missionId
    }
}

export const responseFromProgress = (userMission) => {
    return {
        id: userMission.id,
        userId: userMission.userId,
        missionId: userMission.missionId
    }
}