import { pool } from "../db.config.js"

export const addMission = async (data) => {

    const conn = await pool.getConnection()

    try {
        const randomNumber = Math.floor(Math.random() * 1000000)

        const [mission] = await pool.query(
            `INSERT INTO mission (restaurant_id,awarded_points,minimum_amount,certification_number,mission_period) 
            VALUES (?,?,?,?,?)`,
            [
                data.restaurantId, data.awardedPoints, data.minimumAmount, randomNumber, data.missionPeriod
            ]
        )

        return mission.insertId
    } catch (err) {
        throw new Error(`에러가 발생했어요gh. 요청파라미터를 확인해주세요 (${err})`)
    } finally {
        conn.release()
    }
}

export const getMission = async (missionId) => {
    const conn = await pool.getConnection()

    try {

        const [mission] = await pool.query(
            `SELECT * FROM mission WHERE id = ?`, missionId
        )

        if (mission.length === null) {
            return null
        }

        return mission[0]
    } catch (err) {
        throw new Error(`에러가 발생했어요. 요청파라미터를 확인해주세요 (${err})`)
    } finally {
        conn.release()
    }
}