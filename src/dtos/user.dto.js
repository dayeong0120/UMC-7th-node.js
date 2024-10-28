export const bodyToUser = (body) => {
    const birth = new Date(body.dateOfBirth);
    // date로 파싱(형태 바꾸기?)해서 변환 

    return {
        email: body.email,
        name: body.name,
        nickname: body.nickname,
        gender: body.gender,
        birth,
        address: body.address || "",
        phoneNumber: body.phoneNumber,
        preferences: body.preferCategory,
    }
}

export const responseFromUser = ({ user, preferences }) => {
    let prefercategory = []
    preferences.forEach(preference => {
        preferCategory.push(preference.name)
    });
    //preferences는 조회된 user-prefer 객체들을 요소로 가진 배열
    //각각의 객체에서 name값만 빼서 새로운 배열 만들었어요 

    return {
        email: user[0].email,
        name: user[0].name,
        nickname: user[0].nickname,
        gender: user[0].gender,
        dateOfBirth: user[0].date_of_birth,
        address: user[0].address || "",
        phoneNumber: user[0].phone_number,
        preferCategoryNames: prefercategory

    }
}