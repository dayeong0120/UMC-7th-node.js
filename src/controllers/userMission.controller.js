import { StatusCodes } from "http-status-codes";
import { bodyToProgress } from "../dtos/userMission.dto.js"
import { addProgressMission } from "../services/userMission.service.js"

export const handleAddProgressMission = async (req, res, next) => {

    const userId = req.params.userId

    console.log('진행중인 미션 추가를 요청했습니다')

    const progressMisson = await addProgressMission(bodyToProgress(req.body, userId))

    res.status(StatusCodes.OK).json({ result: progressMisson })

}