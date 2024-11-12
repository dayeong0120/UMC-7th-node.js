export const bodyToUser = (body) => {
    const birth = new Date(body.dateOfBirth);
    // date로 파싱(형태 바꾸기?)해서 변환 
    const gender = (body.gender == 0) ? false : true

    return {
        email: body.email,
        name: body.name,
        nickname: body.nickname,
        gender: gender,
        birth,
        address: body.address || "",
        phoneNumber: body.phoneNumber,
        preferences: body.preferCategory,
    }
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