import { StatusCodes } from "http-status-codes";
import { bodyToProgress } from "../dtos/userMission.dto.js"
import { addProgressMission } from "../services/userMission.service.js"
import { listUserMissions } from "../services/userMission.service.js";

export const handleAddProgressMission = async (req, res, next) => {
    /* 
    #swagger.summary = "진행중인 미션 추가 API"
    #swagger.requestBody = {
        required : true,
        content : {
            "application/json" : {
                schema : {
                    type : "object",
                    properties : {
                        missionId : {type : "number"}
                    }
                }
            }
        }
    }

    #swagger.responses[200] = {
        description : "진행중인 미션 추가 성공 응답",
        content : {
            "application/json" : {
                schema : {
                    type : "object",
                    properties : {
                        resultType : {type : "string", example : "SUCCESS"},
                        error : {type : "object", nullable : true, example : null},
                        success : {type : "object", properties : {
                            id : {type:"number"},
                            userId : {type:"number"},
                            missionId : {type : "number"}}}
                        }}}}}

    #swagger.responses[400] = {
        description : "진행중인 미션 추가 실패 응답",
        content : {
            "application/json" : {
                schema : {
                    type: "object",
                    properties: {
                        resultType : {type: "string", example : "FAIL"},
                        error : {
                            type : "object",
                            properties: {
                                errorCode : {type:"string", example : "M001"},
                                reason : {type : "string",example : "이미 진행중인 미션입니다"},
                                data : {type : "object", properties : {userId : {type : "number"}, missionId : {type:"number"}}}
                            }
                        },
                        success : {type:"object", nullable : true, example : null}
                    }
                }
            }
        }
    }
    */

    try {
        const userId = req.params.userId

        console.log('진행중인 미션 추가를 요청했습니다')

        const progressMisson = await addProgressMission(bodyToProgress(req.body, userId))

        console.log('반환데이터', progressMisson)
        res.status(StatusCodes.OK).success(progressMisson)
    } catch (error) {
        next(error)
    }

}

export const handleListUserMissions = async (req, res, next) => {
    console.log('유저의 미션 목록 조회를 요청했습니다.')

    const userId = req.params.userId

    const cursor = typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0

    const missionStatus = typeof req.query.status === 'string' ? req.query.status : null

    const userMissions = await listUserMissions(userId, cursor, missionStatus)

    res.status(StatusCodes.OK).success(userMissions)
}