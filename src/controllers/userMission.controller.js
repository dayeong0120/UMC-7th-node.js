import { StatusCodes } from "http-status-codes";
import { bodyToProgress } from "../dtos/userMission.dto.js"
import { addProgressMission } from "../services/userMission.service.js"
import { listUserMissions } from "../services/userMission.service.js";

export const handleAddProgressMission = async (req, res, next) => {

    const userId = req.params.userId

    console.log('진행중인 미션 추가를 요청했습니다')

    const progressMisson = await addProgressMission(bodyToProgress(req.body, userId))

    res.status(StatusCodes.OK).json({ result: progressMisson })

}

export const handleListUserMissions = async (req, res, next) => {
    console.log('유저의 미션 목록 조회를 요청했습니다.')

    const userId = req.params.userId

    const cursor = typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0

    const missionStatus = typeof req.query.status === 'string' ? req.query.status : null

    const userMissions = await listUserMissions(userId, cursor, missionStatus)

    res.status(StatusCodes.OK).json({ result: userMissions })
}