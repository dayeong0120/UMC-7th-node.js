import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import swaggerAutogen from "swagger-autogen"
import swaggerUiExpress from "swagger-ui-express"
import { handleUserSignUp } from "./controllers/user.controller.js"
import { handleAddReview } from "./controllers/review.controller.js"
import { handleAddProgressMission } from "./controllers/userMission.controller.js"
import { handleAddMission } from "./controllers/mission.controller.js"
import { handleListRestaurantReviews } from "./controllers/restaurant.controller.js"
import { handleListUserReviews } from "./controllers/user.controller.js"
import { handleRestaurantMissions } from "./controllers/restaurant.controller.js"
import { handleListUserMissions } from "./controllers/user.controller.js"


dotenv.config()

const app = express()
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

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/users", handleUserSignUp)

app.post('/missions/:missionId/reviews', handleAddReview)

app.post('/users/:userId/missions', handleAddProgressMission)

app.post("/restaurants/:restaurantId/missions", handleAddMission)

app.get("/restaurants/:restaurantId/reviews", handleListRestaurantReviews)

app.get("/users/:userId/reviews", handleListUserReviews)

app.get("/restaurants/:restaurantId/missions", handleRestaurantMissions)

app.get("/users/:userId/missions", handleListUserMissions)

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

