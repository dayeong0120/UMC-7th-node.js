import { StatusCodes } from "http-status-codes";
import { missionAdd } from "../services/mission.service.js"
import { bodyToMission } from "../dtos/mission.dto.js";



export const handleAddMission = async (req, res, next) => {

    const restaurantId = req.params.restaurantId

    console.log('가게에 미션 추가를 요청했습니다')

    const mission = await missionAdd(bodyToMission(req.body, restaurantId))


    res.status(StatusCodes.OK).success(mission)
}