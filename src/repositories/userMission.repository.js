import { pool, prisma } from "../db.config.js"


//진행중인 미션 추가하기 
export const addUserMission = async (data) => {
    //이미 진행중인 미션인지 확인 
    const isProgressMission = await prisma.userMission.findFirst({
        where: {
            userId: data.userId,
            missionId: data.missionId
        }
    })

    if (isProgressMission != null) {
        console.log('이미 진행중인 미션입니다')
        return null
    }

    const userMission = await prisma.userMission.create({
        data: {
            userId: data.userId,
            missionId: data.missionId,
            status: 'progress'
        }
    })

    return userMission.id

    // const conn = await pool.getConnection()

    // try {

    //     console.log('addUserMission : ', data)

    //     const [check] = await pool.query(
    //         `SELECT * FROM user_mission 
    //         WHERE user_id= ? and mission_id = ?`,
    //         [data.userId, data.missionId]
    //     )

    //     if (!check.length) {
    //         console.log('이미 진행중인 미션입니다')
    //         return null
    //     }

    //     const [userMission] = await pool.query(
    //         `INSERT INTO user_mission (user_id,mission_id)
    //         VALUES (?,?)`,
    //         [data.userId, data.missionId]
    //     )

    //     return userMission.insertId
    // } catch (err) {
    //     throw new Error(
    //         `사용자의 미션을 추가하는 데 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    //     )
    // } finally {
    //     conn.release()
    // }
}

export const getUserMission = async (userMissionId) => {

    const userMission = await prisma.userMission.findFirstOrThrow({
        where: {
            id: userMissionId
        }
    })

    return userMission

    // const conn = await pool.getConnection()

    // try {
    //     const [userMission] = await pool.query(
    //         'SELECT * FROM user_mission WHERE id=?', [userMissionId]
    //     )

    //     if (userMission.length === 0) {
    //         return null
    //     }

    //     return userMission[0]
    // } catch (err) {
    //     throw new Error(`사용자의 미션을 조회하는 데 오류가 발생했어요. (${err})`)
    // } finally {
    //     conn.release()
    // }

}


//유저의 미션 목록 조회하기 
export const getAllUserMissions = async (userId, cursor, missionStatus) => {
    if (missionStatus === 'progress') {
        console.log('진행중인 미션 목록 조회를 요청했습니다')
    }
    else if (missionStatus === 'completed') {
        console.log('진행완료된 미션 목록 조회를 요청했습니다')
    }
    else {
        return null
    }

    const missions = await prisma.mission.findMany({
        select: {
            id: true,
            awardedPoints: true,
            minimumAmount: true,
            certificationNumber: true,
            missionPeriod: true,
            userMission: {
                select: {
                    id: true,
                    status: true
                }
            }
        },
        where: {
            userMission: {
                userId: userId,
                status: missionStatus
            },
            userMission: { some: { id: { gt: cursor } } }
        },
        orderBy: { id: "asc" }, //유저미션의 아이디로 정렬할 수 없대 왜 
        take: 5
    })

    return missions

}