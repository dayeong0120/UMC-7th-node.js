import { StatusCodes } from "http-status-codes";
import {
    listRestaurantReviews,
    listRestaurantMissions
} from "../services/restaurant.service.js";
import { isExist } from "../error.js";

export const handleListRestaurantReviews = async (req, res, next) => {

    /* 
    #swagger.summary = '가게 리뷰 목록 조회 API'
    #swagger.responses[200] = {
        description : "가게 리뷰 목록 조회 성공 응답",
        content: {
            "application/json":{
                schema: {
                    type : "object",
                properties : {
                    resultType : { type : "string", example : "SUCCESS"},
                    error : {type: "object", nullable: true, example:null},
                    success: {
                        type : "object",
                        properties : {
                            data: {
                                type : "array",
                                items : {
                                    type : "object",
                                    properties: {
                                        id : {type : "number"},
                                        restaurant : {type:"object", properties:{id:{type:"number"},name:{type:"string"}}},
                                        user : {type : "object", properties : {id:{type:"number"},email:{type:"string"},name:{type:"string"}}},
                                        content : {type : "string"}
                                        }
                                    }
                                },
                            pagination : {
                                type : "object",
                                properties: {
                                    cursor : {type : "number",nullable : true}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    */
  try {
        const restaurantId = req.params.restaurantId

        await isExist("restaurant", restaurantId)


        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0

        const reviews = await listRestaurantReviews(restaurantId, cursor)

        res.status(StatusCodes.OK).success(reviews)
    } catch (error) {
        next(error)
    }
}

export const handleRestaurantMissions = async (req, res, next) => {
    /*
        #swagger.summary = '가게의 미션 목록 조회 API'
        #swagger.responses[200] = {
            description : "가게의 미션 목록 조회 성공 응답",
            content : {
                "application/json": {
                    schema : {
                        type : "object",
                        properties:{
                            resultType : {type : "string", example:"SUCCESS"},
                            error : {type:"object", nullable : true, example: null},
                            success:{
                                type : "object",
                                properties : {
                                    data : {type : "array", 
                                        items : {
                                            type : "object",
                                            properties : {
                                                id : {type : "number"},
                                                awardedPoints : {type : "number"},
                                                minimumAmount : {type : "number"},
                                                certificationNumber : {type : "number"},
                                                missionPeriod : {type : "string",format : "date"}
                                            }
                                        }
                                    },
                                    pagination : {type : "object", properties : { cursor : {type : "number"}}}
                                }
                            }
                        }
                    }
                }
            }
        } */

  try {
        const restaurantId = req.params.restaurantId

        await isExist("restaurant", restaurantId) //isExist가 throw하는걸 안기다려서 catch되지 않았던 것 ! 

        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0

        const missions = await listRestaurantMissions(restaurantId, cursor)

        res.status(StatusCodes.OK).success(missions)
    } catch (error) {
        next(error)
    }
}