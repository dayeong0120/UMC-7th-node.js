import { responseFromProgress } from "../dtos/userMission.dto.js"
import {
    addUserMission,
    getUserMission
} from "../repositories/userMission.repository.js"

export const addProgressMission = async (data) => {

    console.log('service : ', data)

    const userMissionId = await addUserMission({
        userId: data.userId,
        missionId: data.missionId
    })

    if (userMissionId === null) {
        throw new Error('이미 진행중인 미션입니다')
    }

    const userMission = await getUserMission(userMissionId)

    return responseFromProgress(userMission) //await해야하나



}