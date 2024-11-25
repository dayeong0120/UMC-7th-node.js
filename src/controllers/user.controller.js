import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { listUserReviews } from "../services/user.service.js";
import { listUserMissions } from "../services/userMission.service.js";
import { isExist } from "../error.js";

export const handleUserSignUp = async (req, res, next) => {
    /*
    #swagger.summary = '회원가입 API'
    #swagger.requestBody ={
        required : true,
        content : {
            "application/json" : {
                schema : {
                    type: "object",
                    properties:{
                        email : {type : "string"},
                        name : {type : "string"},
                        nickname : {type :"string"},
                        gender : {type : "number", example: 0},
                        dateOfBirth : {type : "string", format : "date"},
                        address : {type : "string"},
                        phoneNumber : {type : "string"},
                        preferCategory : {tupe: "array", items:{type:"number"}}
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description : "회원가입 성공 응답",
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
                                email: {type : "string"},
                                name : {type : "string"},
                                nickname : {type : "string"},
                                gender : {type : "boolean"},
                                dateOfBirth : {type : "string", format:"date"},
                                address : {type: "string"},
                                phoneNumber : {type :"string"},
                                preferCategoryNames : {type:"array",items : {type : "string"}}
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description : "회원가입 실패 응답",
        content : {
            "application/json" : {
                schema : {
                    type : "object",
                    properties : {
                        resultType : {type:"string", example:"FAIL"},
                        error : {
                            type: "object",
                            properties : {
                                errorCode : {type :"string", example : "U001"},
                                reason : {type :"string"},
                                data : {type : "object"}
                            }
                        },
                        success : {type : "object", nulable : true, example: null}
                    }
                }
            }
        }
    }
    */
    try {
        console.log("회원가입을 요청했습니다");
        console.log("body : ", req.body);

        const user = await userSignUp(bodyToUser(req.body));
        // dto 로 바꾼 후 서비스로직에 인자값으로 보냄. 
        // 그 결과 받아서 response에 보냄 
        res.status(StatusCodes.OK).success(user)
    } catch (error) {
        next(error)
    }
}

export const handleListUserReviews = async (req, res, next) => {
    /*
        #swagger.summary = '사용자의 리뷰 목록 조회 API'
        #swagger.responses[200] = {
            description : "사용자 리뷰 목록 조회 성공 응답",
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
                                                contents : {type : "string"},
                                                rating : {type : "number"},
                                                restaurantId : {type : "number"},
                                                userId : {type : "number"}
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

    console.log('내가 쓴 리뷰 목록 조회를 요청했습니다')

    const userId = req.user.id

    const cursor = typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0

    const reviews = await listUserReviews(userId, cursor)

    res.status(StatusCodes.OK).success(reviews)
}



export const handleListUserMissions = async (req, res, next) => {

    /*
    #swagger.summary = "사용자의 미션 목록 조회 API"
    #swagger.responses[200] = {
        description : "사용자 미션 목록 조회 성공 응답",
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
    console.log('유저의 미션 목록 조회를 요청했습니다.')

    const userId = req.user.id

    const cursor = typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0

    const status = typeof req.query.status === 'string' ? req.query.status : null

    const userMissions = await listUserMissions(userId, cursor, status)

    res.status(StatusCodes.OK).success(userMissions)
}


export const handleEditUser = async (req, res, next) => {
    console.log(req)
    console.log('유저의 회원 정보 수정을 요청했습니다.')
    try {

        const userId = req.user.id

        const user = await userEdit(bodyToUser(req.body, userId))

        res.status(StatusCodes.Ok).success(user)

    } catch (error) {
        next(error)
    }
}

