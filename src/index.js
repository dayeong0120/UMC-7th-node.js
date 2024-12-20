import dotenv from "dotenv"
import express from "express"
// node_modules 에 있는 express 관련 파일을 가져옴
import cors from "cors"
import swaggerAutogen from "swagger-autogen"
import swaggerUiExpress from "swagger-ui-express"
import { handleUserSignUp, handleEditUser } from "./controllers/user.controller.js"
import { handleAddReview } from "./controllers/review.controller.js"
import { handleAddProgressMission } from "./controllers/userMission.controller.js"
import { handleAddMission } from "./controllers/mission.controller.js"
import { handleListRestaurantReviews } from "./controllers/restaurant.controller.js"
import { handleListUserReviews } from "./controllers/user.controller.js"
import { handleRestaurantMissions } from "./controllers/restaurant.controller.js"
import { handleListUserMissions } from "./controllers/user.controller.js"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"
import passport from "passport"
import session from "express-session"
import { googleStrategy, naverStrategy } from "./auth.config.js"
import { prisma } from "./db.config.js"


dotenv.config()

passport.use(googleStrategy)
passport.use(naverStrategy)
//passport 라이브러리에 내가 정의한 로그인 방식을 등록 
//네이버, 카카오 등 다양한 로그인 방식 추가할 수 있음
//모든 라우트 보다 앞에서 passport.use() 실행시켜야야 함 
passport.serializeUser((user, done) => done(null, user))
//session에 사용자 정보를 저장할 때 상ㅇ하는 함수. 일단 그대로 주고받도록 정의 
//done은 Passport.js 내부에서 비동기 작업의 완료를 알리고, 결과를 전달하기 위한 콜백 함수
//첫번째 매개변수 : 에러 객체, 두번쨰 : 다음 단계로 넘길 데이터
passport.deserializeUser((user, done) => done(null, user))
//session의 정보를 가져올 때 사용하는 함수 



const app = express()
// express 는 함수이므로, 반환값을 변수에 저장한다.
const port = process.env.PORT

// 공통 응답으로 사용하기 위한 헬퍼함수 등록
//미들웨어들이 res.success, res.error함수를 사용할 수 있음 
app.use((req, res, next) => {
    res.success = (success) => {
        return res.json({ resultType: "SUCCESS", error: null, success })
    }
    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
        return res.json({
            resultType: "FAIL",
            error: {
                errorCode, reason, data
            },
            success: null
        })
    }

    next()
})

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

//세션 사용
app.use( //HTTP Cookie 를 이용해서 SessionID는 프론트엔드에 저장하고,
    //이에 연결되는 사용자데이터는 store를 통해 Prisma로 연결된 Mysql DB에 저장하게 된다 
    session({
        cookie: { //세션 ID 쿠키의 옵션을 지정하는 객체
            maxAge: 7 * 24 * 60 * 1000, //ms
        },
        resave: false, //수정되지 않은 세션일지라도 다시 저장할지(세션을 언제나 저장할지) 나타내는 부울 값.
        saveUninitalized: false, //초기화되지 않은 세션을 저장할지(세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지) 
        secret: process.env.EXPRESS_SESSION_SECRET, //세션 ID 쿠키를 서명하는 데 사용할 문자열. 보안 목적으로 필수적.
        store: new PrismaSessionStore(prisma, { // 세션 데이터의 저장 메커니즘
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined
        })
    })
)

app.use(passport.initialize())
app.use(passport.session());
//사용자의 모든 요청에 HTTP Cookie 중 sid 값이 있다면, 이를 MySQL DB에서 찾아 
//일치하는 세션이 있다면 사용자 데이터를 가져와 req.user에 넣어주게 됨 

app.use(
    "/docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup({}, {
        swaggerOptions: {
            url: "/openapi.json",
        },
    })
)

app.get("/openapi.json", async (req, res, next) => {
    // #swagger.ignore = true
    const options = {
        openapi: "3.0.0",
        disableLogs: true,
        writeOutputFile: false,
    }
    const outputFile = "/dev/null" //파일출력은 사용하지 않습니다
    const routes = ["./src/index.js"]
    const doc = {
        info: {
            title: "UMC 7th",
            description: "UMC 7th Node.js 테스트 프로젝트입니다",
        },
        host: "localhost:3000"
    }

    const result = await swaggerAutogen(options)(outputFile, routes, doc)
    res.json(result ? result.data : null)
}
)


app.get("/oauth2/login/google", passport.authenticate("google"))
//자동으로 google 호그인 주소로 이동하여 사용자가 google 로그인을 할 수 있도록 해줌
app.get(
    "/oauth2/callback/google",
    passport.authenticate("google", {
        failureRedirect: "/oauth2/login/google",
        failureMessage: true,
    }),
    (req, res) => res.redirect("/")
)
//google 로그인이 성공하면 되돌아오는 주소. 쿼리 파라미터로 전달된 code값을 이용해
//google API를 호출하여 사용자의 프로필 정보를 조회해오고, session에 저장하게 됨 

//passport.authenticate(strategy, options) 
//strategy : 사용할 인증 전략의 이름 / options : 인증 실패 시 동작이나 성공 후의 콜백 지정 

app.get("/oauth2/login/naver", passport.authenticate("naver"))
app.get(
    "/oauth2/callback/naver",
    passport.authenticate("naver", {
        failureRedirect: "/oauth2/login/naver",
        failureMessage: true,
    }),
    (req, res) => res.redirect("/")

)

app.get('/', (req, res) => {
    // #swagger.ignore = true
    console.log(req.user)
    res.send('Hello World!')
})

app.post("/users", handleUserSignUp)

app.post('/missions/:missionId/reviews', handleAddReview)

app.post('/users/missions', handleAddProgressMission)

app.post("/restaurants/:restaurantId/missions", handleAddMission)

app.get("/restaurants/:restaurantId/reviews", handleListRestaurantReviews)

app.get("/users/reviews", handleListUserReviews)

app.get("/restaurants/:restaurantId/missions", handleRestaurantMissions)

app.get("/users/missions", handleListUserMissions)

app.patch("/users", handleEditUser)



//전역 오류를 처리하기 위한 미들웨어
//컨트롤러에서 별도로 처리하지 않은 오류가 발생했을때 공통된 오류 응답 내려줌
app.use((err, req, res, next) => {
    console.log('전역 오류 처리 미들웨어')
    if (res.headersSent) {
        return next(err)
    }

    res.status(err.statusCode || 500).error({
        errorCode: err.errorCode || "unknown",
        reason: err.reason || err.message || null,
        data: err.data || null
    })
})

//지정한 포트로 서버 오픈 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

