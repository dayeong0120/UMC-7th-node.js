import { responseFromMission } from "../dtos/mission.dto.js"
import {
    addMission,
    getMission
} from "../repositories/mission.repository.js"

export const missionAdd = async (data) => {

    console.log('dto변환 후 데이터 ', data)

    const missionId = await addMission({
        awardedPoints: data.awardedPoints,
        minimumAmount: data.minimumAmount,
        missionPeriod: data.missionPeriod,
        restaurantId: data.restaurantId
    })

    if (missionId === null) {
        throw new Error('미션을 추가하는 데 오류가 발생했어요')
    }

    const mission = await getMission(missionId)

    const resValue = responseFromMission(mission)

    console.log('DTO 반환후 최종반환값 : ', resValue)
    return resValue

}