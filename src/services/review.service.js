import { responseFromReview } from "../dtos/review.dto.js"
import { DuplicateReviewError, NoExistRestaurantError } from "../error.js"
import {
    addReview,
    getReview
} from "../repositories/review.repository.js"

export const reviewAdd = async (data) => {

    console.log('bodyToReview 완료 : ', data.userMissionId)

    const addReviewId = await addReview({
        rating: data.rating, //왜 그냥 data를 보내지않고 한번더 작업해줌? 
        contents: data.contents,
        userMissionId: data.userMissionId
    })

    console.log('addReview의 결과 확인 : ', addReviewId)

    if (addReviewId === 'NoExistRestaurant') {
        throw new NoExistRestaurantError("존재하지 않는 식당입니다", data)
    }

    if (addReviewId === 'duplicateReview') {
        throw new DuplicateReviewError("이미 해당 미션에 대한 리뷰를 작성했습니다", data)
    }

    const review = await getReview(addReviewId)

    console.log('dto변환 전 review : ', review)

    const reviewResult = await responseFromReview(review)

    return reviewResult
}