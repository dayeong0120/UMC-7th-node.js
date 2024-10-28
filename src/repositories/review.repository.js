import { pool } from "../db.config.js"

export const addReview = async (data) => {
    const conn = await pool.getConnection()

    try {

        // 식당 존재하는지 확인 
        const [check] = await pool.query(
            `SELECT EXISTS(SELECT 1 
            FROM restaurant as r 
            JOIN mission as m ON r.id = m.restaurant_id 
            JOIN user_mission as ur ON m.id = ur.mission_id
            WHERE ur.id = ?) 
            AS isExistRestaurant`,
            [data.userMissionId]
        )

        console.log('sql에 파라미터로 들어가는 missionId값 : ', data.userMissionId)
        console.log('식당 존재 여부:', check);

        // 식당 존재하지 않으면 -> null반환 
        if (!check[0].isExistRestaurant) { //[0] 필수로 설정하기.... 
            return null
        }

        const [review] = await pool.query(
            `INSERT INTO review (mission_id,rating,contents)
            VALUES (?,?,?)`,
            [
                data.userMissionId,
                data.rating,
                data.contents
            ]
        )

        console.log('리뷰추가결과 : ', review)

        console.log('리뷰추가완료')

        return review.insertId
    } catch (err) {
        console.log('에러 내용: ', err)
        throw new Error(
            'addReview 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})'
        )
    } finally {
        conn.release();
    }
}

//추가된 리뷰 정보 가져오기 (반환)
export const getReview = async (reviewId) => {
    const conn = await pool.getConnection()

    try {
        const [review] = await pool.query(
            'SELECT * FROM review WHERE id=?', reviewId
        )

        console.log('getReview : ', review)

        if (review.length === 0) {
            return null //조회된 레코드가 없을 떄 
        }

        return review
    } catch (err) {
        throw new Error(
            'getReview 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})'
        )
    } finally {
        conn.release()
    }
}