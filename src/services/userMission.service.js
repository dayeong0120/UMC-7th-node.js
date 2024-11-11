import {
    responseFromMissions
} from "../dtos/mission.dto.js"
import { responseFromProgress } from "../dtos/userMission.dto.js"
import {
    addUserMission,
    getUserMission,
    getAllUserMissions
} from "../repositories/userMission.repository.js"

export const addProgressMission = async (data) => {

    console.log('service : ', data)

    const userMissionId = await addUserMission({
        userId: data.userId,
        missionId: data.missionId
    })

    if (userMissionId === null) {
        throw new Error('진행중인 미션을 추가하는 데 문제가 발생했어요')
    }

    const userMission = await getUserMission(userMissionId)

    return responseFromProgress(userMission) //await해야하나



}

export const listUserMissions = async (userId, cursor, missionStatus) => {
    const userMissions = await getAllUserMissions(userId, cursor, missionStatus)

    if (userMissions === null) {
        throw new Error('쿼리스트링을 다시 확인해주세요')
    }

    return responseFromMissions(userMissions)
}