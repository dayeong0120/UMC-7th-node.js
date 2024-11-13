import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";
import { isExist } from "../error.js";


export const handleAddReview = async (req, res, next) => {

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