import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";
import { isExist } from "../error.js";


export const handleAddReview = async (req, res, next) => {
    /*
    #swagger.summary = "리뷰 추가 API"
    #swagger.requestBody = {
        required : true,
        content : {
            "application/json" : {
                schema : {
                    type : "object",
                    properties : {
                        rating : {type : "number"},
                        contents : {type : "string"}
                    }
                }
            }
        }
    }

    #swagger.responses[200]={
        description : "리뷰 추가 성공 응답",
        content : {
            "application/json" : {
                schema:{
                    type:"object",
                    properties : {
                        resultType : {type: "string" , example : "SUCCESS"},
                        error : {type : "object", nullable : true, example : null},
                        success : {type : "object",
                            properties : {
                                rating : {type : "number"},
                                contents : {type : "string"}
                            }
                        }
                    } 
                }
            }
        }
    }
    #swagger.responses[400] = {
        description : "리뷰 추가 실패 응답 ",
        content : {
            "application/json" : {
                schema:{
                    type:"object",
                    properties : {
                        resultType : {type: "string" , example : "FAIL"},
                        error : {type : "object", 
                            properties : {
                                errorCode : {type : "string", example : "REV002"},
                                reason : {type : "string", example : "이미 해당 미션에 대한 리뷰를 작성했습니다"},
                                data : { type : "object",
                                    properties: {
                                        rating : {type : "number"},
                                        contents : {type : "string"} ,
                                        userMissionId : {type : "number"}
                                    }
                                    
                                }
                            },
                        },
                        success : {type : "object", nullable : true, example : null},
                    } 
                }
            }
        } 
    }
     */

    try {
        const missionId = req.params.missionId //path parameter 추출 

        await isExist("mission", missionId)

        console.log("리뷰추가를 요청했습니다")
        console.log("body : ", req.body)
        console.log('missionId : ', missionId)

        const review = await reviewAdd(bodyToReview(req.body, missionId))

        console.log('응답에 보낼 값 : ', review)

        res.status(StatusCodes.OK).success(review)
    } catch (error) {
        next(error)
    }
}