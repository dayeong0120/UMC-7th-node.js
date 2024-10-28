import { pool } from "../db.config.js"

//User 데이터 추가 
export const addUser = async (data) => {
    const conn = await pool.getConnection()

    try {
        const [confirm] = await pool.query( //pool.query : DB에 쿼리를 보내고 결과 반환
            'SELECT EXISTS(SELECT 1 FROM user WHERE WMAIL=?) AS isExistEmail',
            // 있는지 없는지만 확인하는거라 *대신 임의의 값 1을 넣은거임 
            data.email
        )
        //[confirm] : pool.query은 배열을 반환한다. 첫번째 요소는 쿼리 결과 데이터,
        // 두번째 요소는 메타데이터 (쿼리실행에 대한 정보)
        // [confirm] 이라는 구조 분해 할당을 이용해 첫번째 요소를 confirm변수에 할당 

        if (confirm.isExistEmail) { //confirm 은 [{ isExistEmail: 0 / 1 }]
            return null
        }

        const [result] = await pool.query(
            'INSERT INTO user (email,name,nickname,gender,date_of_birth,address,phone_number VALUES (?,?,?,?,?,?,?)',
            [
                data.email,
                data.name,
                data.nickname,
                data.gender,
                data.date_of_birth,
                data.address,
                data.phoneNumber,
            ])

        return result.insertId
        //insert문 실행후 삽입된 데이터의 ID를 가져오고 싶을 때 insertId 사용 
    } catch (err) {
        throw new Error(
            '오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})'
        )
    } finally {
        conn.release(); //getconnection을 했으면 반드시 release해주기 
        //릴리즈해줘야 이 커넥션이 pool로 돌아가서 다른 주체가 사용할 수 있도록 할 수 있음 
    }
}


//사용자 정보 얻기 (조회)
export const getUser = async (userId) => {
    const conn = pool.getConnection()

    try {
        const [user] = await pool.query(
            'SELECT * FROM user WHERE id =?', userId
        )

        console.log(user)

        if (user.length === 0) {
            return null
        }

        return user
    } catch (err) {
        throw new Error(
            '오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})'
        )
    } finally {
        conn.release()
    }
}

//음식 선호 카테고리 매핑 (중간테이블 생성)
export const setPreference = async (userId, foodCategoryId) => {
    const conn = await pool.getConnection()

    try {
        await pool.query(
            'INSERT INTO user_prefer (user_id,category_id) VALUES (?,?)',
            [userId, foodCategoryId]
        )

        return;
    } catch (err) {
        throw new Error(
            '오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})'
        )
    } finally {
        pool.release()
    }
}

//사용자 선호 카테고리 반환 
export const getUserPreferencesByUserId = async (userId) => {
    const conn = await pool.getConnection()

    try {
        const [preferences] = await pool.query(
            "SELECT up.id, up.category_id, up.user_id, c.name" + //+로 쿼리 합치기 
            "FROM user_prefer as up JOIN category as c ON up.category_id = c.id" +
            "WHERE up.user_id = ? ORDER BY up.category_id ASC",
            userId
        )

        return preferences
    } catch (err) {
        throw new Error(
            '오류가 발생했어요. 요청파라미터를 확인해주세요. (${err})'
        )
    } finally {
        conn.release()
    }
}