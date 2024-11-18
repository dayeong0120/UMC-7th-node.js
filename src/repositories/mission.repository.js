import { prisma } from "../db.config.js"
//가게에 미션추가하기 
export const addMission = async (data) => {
    //인증번호 값 랜덤으로 저장 
    const randomNumber = Math.floor(Math.random() * 1000000)

    const mission = await prisma.mission.create({
        data: {
            awardedPoints: data.awardedPoints,
            minimumAmount: data.minimumAmount,
            missionPeriod: data.missionPeriod,
            restaurantId: data.restaurantId,
            certificationNumber: randomNumber
        }
    })

    return mission.id

    // const conn = await pool.getConnection()

    // try {
    //     const randomNumber = Math.floor(Math.random() * 1000000)

    //     const [mission] = await pool.query(
    //         `INSERT INTO mission (restaurant_id,awarded_points,minimum_amount,certification_number,mission_period) 
    //         VALUES (?,?,?,?,?)`,
    //         [
    //             data.restaurantId, data.awardedPoints, data.minimumAmount, randomNumber, data.missionPeriod
    //         ]
    //     )

    //     return mission.insertId
    // } catch (err) {
    //     throw new Error(`에러가 발생했어요gh. 요청파라미터를 확인해주세요 (${err})`)
    // } finally {
    //     conn.release()
    // }
}

//추가한 미션 조회하기
export const getMission = async (missionId) => {

    const mission = await prisma.mission.findFirstOrThrow({
        where: {
            id: missionId
        }
    })

    if (mission === null) {
        return null
    }

    return mission
    // const conn = await pool.getConnection()

    // try {

    //     const [mission] = await pool.query(
    //         `SELECT * FROM mission WHERE id = ?`, missionId
    //     )

    //     if (mission.length === null) {
    //         return null
    //     }

    //     return mission[0]
    // } catch (err) {
    //     throw new Error(`에러가 발생했어요. 요청파라미터를 확인해주세요 (${err})`)
    // } finally {
    //     conn.release()
    // }
}

export const isExistMission = async (missionId) => {
    const isExist = prisma.mission.findFirst({
        where: { id: missionId }
    })

    if (isExist === null) return false
}