import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { listUserReviews } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
    console.log("회원가입을 요청했습니다");
    console.log("body : ", req.body);

    const user = await userSignUp(bodyToUser(req.body));
    // dto 로 바꾼 후 서비스로직에 인자값으로 보냄. 
    // 그 결과 받아서 response에 보냄 
    res.status(StatusCodes.OK).json({ result: user });
}

export const handleListUserReviews = async (req, res, next) => {
    console.log('내가 쓴 리뷰 목록 조회를 요청했습니다')

    const userId = req.params.userId

    const cursor = typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0

    const reviews = await listUserReviews(userId, cursor)

    res.status(StatusCodes.OK).json({ result: reviews })
}