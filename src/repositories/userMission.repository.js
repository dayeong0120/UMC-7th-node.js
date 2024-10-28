import { pool } from "../db.config.js"

export const addUserMission = async (data) => {
    const conn = await pool.getConnection()

    try {

        console.log('addUserMission : ', data)

        const [check] = await pool.query(
            `SELECT * FROM user_mission 
            WHERE user_id= ? and mission_id = ?`,
            [data.userId, data.missionId]
        )

        if (!check.length) {
            console.log('이미 진행중인 미션입니다')
            return null
        }

        const [userMission] = await pool.query(
            `INSERT INTO user_mission (user_id,mission_id)
            VALUES (?,?)`,
            [data.userId, data.missionId]
        )

        return userMission.insertId
    } catch (err) {
        throw new Error(
            `사용자의 미션을 추가하는 데 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        )
    } finally {
        conn.release()
    }
}

export const getUserMission = async (userMissionId) => {
    const conn = await pool.getConnection()

    try {
        const [userMission] = await pool.query(
            'SELECT * FROM user_mission WHERE id=?', [userMissionId]
        )

        if (userMission.length === 0) {
            return null
        }

        return userMission[0]
    } catch (err) {
        throw new Error(`사용자의 미션을 조회하는 데 오류가 발생했어요. (${err})`)
    } finally {
        conn.release()
    }

}