import { StatusCodes } from "http-status-codes";
import { missionAdd } from "../services/mission.service.js"
import { bodyToMission } from "../dtos/mission.dto.js";



export const handleAddMission = async (req, res, next) => {
    /*
    #swagger.summary = "가게에 미션 추가 API"
    #swagger.requestBody = {
        required : true,
        content : {
            "application/json" : {
                schema : {
                    type : "object",
                    properties : {
                        awardedPoints : {type : "number",example : 2000},
                        minimumAmount : {type : "number", example : 12000},
                        missionPeriod : {type : "string",format : "date"}
                    }
                }
            }
        }
    }

    #swagger.responses[200]={
        description : "가게에 미션 추가 성공 응답",
        content : {
            "application/json" : {
                schema:{
                    type:"object",
                    properties : {
                        resultType : {type: "string" , example : "SUCCESS"},
                        error : {type : "object", nullable : true, example : null},
                        success : {type : "object",
                            properties : {
                                awardedPoints : {type : "number", example : 2000},
                                minimumAmount : {type : "number", example : 12000},
                                missionPeriod : {type : "string",format : "date"},
                                restaurantId :  {type : "number"},
                                certificationNumber : {type : "number", example : 345278}
                            }
                        }
                    } 
                }
            }
        }
    }
     */



    const restaurantId = req.params.restaurantId



    console.log('가게에 미션 추가를 요청했습니다')

    const mission = await missionAdd(bodyToMission(req.body, restaurantId))


    res.status(StatusCodes.OK).success(mission)
}