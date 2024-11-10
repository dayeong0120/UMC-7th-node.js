import { pool, prisma } from "../db.config.js"

//User 데이터 추가 
export const addUser = async (data) => {

    const user = await prisma.user.findFirst({ where: { email: data.email } })

    if (user) {
        return null
    }

    const created = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            nickname: data.nickname,
            gender: data.gender,
            birth: data.gender,
            address: data.address,
            phoneNumber: data.phoneNumber
        }
    })
    return created.id;

}


//사용자 정보 얻기 (조회)
export const getUser = async (userId) => {
    const user = await prisma.user.findFirstOrThrow({ where: { id: userId } })
    return user
}

//음식 선호 카테고리 매핑 (중간테이블 생성)
export const setPreference = async (userId, foodCategoryId) => {

    await prisma.userPrefer.create({
        data: {
            userId: userId,
            categoryId: foodCategoryId,
        }
    })


}

//사용자 선호 카테고리 반환 
export const getUserPreferencesByUserId = async (userId) => {
    const preferences = await prisma.userPrefer.findMany({
        select: {
            id: true,
            userId: true,
            categoryId: true,
            category: true, //조인으로 함께 조회 
        },
        where: { userId: userId },
        orderBy: { categoryId: "asc" },
    })
    return preferences

}