import dotenv from "dotenv" //환경변수 관리 
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { prisma } from "./db.config.js"
import { Strategy as NaverStrategy } from "passport-naver"

dotenv.config()

console.log(process.env.PASSPORT_GOOGLE_CLIENT_ID)
console.log(process.env.PASSPORT_NAVER_CLIENT_ID)

export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
        clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/google",
        scope: ["email", "profile"], //요청할 데이터 범위 정의
        state: true, //CSRF 공격을 방지하기 위한 상태 매개변수. 인증 요청 시 고유한 상태 값이 포함되며,
        //인증 후 리디렉션 요청에서 동일한 값인지 확인 
    },
    (accessToken, refreshToken, profile, cb) => { //콜백 
        return googleVerify(profile)
            .then((user) => cb(null, user))
            .catch((err) => cb(err))
    }
    //googleVerify가 반환하는 Promise가 성공적으로 처리 되면 user객체가 반환됨.
    //cb는 done 콜백 함수. 
    //에러가 발생하면 cb콜백에 에러정보 전달 
    //done : 인증 프로세스의 결과를 처리하고 다음 단계로 전달하는 역할
    //이 함수는 주로 verify 콜백 내부에서 호출되며, 인증의 성공 또는 실패 여부를 Passport에 알림 
)

const googleVerify = async (profile) => { //구글 로그인 후 전달 받은 사용자의 프로필 정보 
    const email = profile.emails?.[0]?.value
    //프로필 정보에 이메일 있는지 확인 
    if (!email) {
        throw new Error('profile.email was not found: ${profile}')
    }

    //이메일 이용해서 사용자 조회해봄
    const user = await prisma.user.findFirst({ where: { email } }) //객체 속성과 변수 이름이 같을 때 단축하여 작성 가능
    if (user !== null) {
        return { id: user.id, email: user.email, name: user.name }
    }

    //같은 이메일 가진 사용자 존재하지 않으면 사용자정보 자동 생성
    const created = await prisma.user.create({
        data: {
            email,
            name: profile.displayName,
            nickname: "추후 수정",
            gender: false,
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            phoneNumber: "추후 수정"
        }
    })

    return { id: created.id, email: created.email, name: created.name }

}

export const naverStrategy = new NaverStrategy(
    {
        clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
        clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/naver",
    },
    function (accessToken, refreshToken, profile, cb) {
        return naverVerify(profile)
            .then((user) => (cb(null, user)))
            .catch((err) => cb(err))
    }
)

const naverVerify = async (profile) => {

    console.log('인증 후 받은 profile : ', profile)

    const email = profile.emails?.[0]?.value
    if (!email) {
        throw new Error('profile.email was not found: ${profile}')
    }

    const user = await prisma.user.findFirst({ where: { email } })
    if (user !== null) {
        return { id: user.id, email: user.email, name: user.name }
    }

    const created = await prisma.user.create({
        data: {
            email,
            name: profile.displayName || '추후 수정',
            nickname: "추후 수정",
            gender: false,
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            phoneNumber: "추후 수정"
        }
    })

    return { id: created.id, email: created.email, name: created.name }
}