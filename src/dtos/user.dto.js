export const bodyToUser = (body) => {

    const result = {}

    if (body.email !== undefined) result.email = body.email
    if (body.name !== undefined) result.name = body.name
    if (body.nickname !== undefined) result.nickname = body.nickname
    if (body.gender !== undefined) {
        const gender = (body.gender == 0) ? false : true
        result.gender = gender
    }
    if (body.dateOfBirth !== undefined) {
        const birth = new Date(body.dateOfBirth);
        // date로 파싱(형태 바꾸기?)해서 변환 
        result.birth = birth
    }
    if (body.address !== undefined) result.address = body.address
    if (body.phoneNumber !== undefined) result.phoneNumber = body.phoneNumber
    if (body.preferCategory !== undefined) result.preferences = body.preferCategory

    console.log('dto 변환 후의 요청 데이터 : ', result)

    return result
}

export const responseFromUser = ({ user, preferences }) => {
    const preferFoods = preferences.map(
        (preference) => preference.category.name
    )

    return {
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        gender: user.gender,
        dateOfBirth: user.birth,
        address: user.address || "",
        phoneNumber: user.phoneNumber,
        preferCategoryNames: preferFoods

    }
}