import { responseFromUser } from "../dtos/user.dto.js"
import {
    addUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
} from "../repositories/user.repository.js"

export const userSignUp = async (data) => { //이 data가 bodyToUser
    const joinUserId = await addUser({ //user정보를 추가하는 repository의 로직 
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        phoneNumber: data.phoneNumber,
        nickname: data.nickname,
    })

    if (joinUserId === 'DuplicateEmail') {
        throw new DuplicateUserEmailError(data)
    }

    if (joinUserId === 'DuplicateNumber') {
        throw new DuplicateUserNumberError("이미 존재하는 전화번호입니다", data)
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference)
        //유저와 선호카테고리 중간테이블을 추가하는 repository 로직
    }

    const user = await getUser(joinUserId); // getuser의 반환값은 객체하나를 요소로 가진 배열
    const preferences = await getUserPreferencesByUserId(joinUserId);
    //추가됐는지 조회할 수 있는건가? (select)

    return responseFromUser({ user, preferences })
    //DTO로 다시 데이터 변환해서 응답에 포함시켜 보냄(controller 참고)

}