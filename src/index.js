import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { handleUserSignUp } from "./controllers/user.controller.js"
import { handleAddReview } from "./controllers/review.controller.js"
import { handleAddProgressMission } from "./controllers/userMission.controller.js"
import { handleAddMission } from "./controllers/mission.controller.js"


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

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/users", handleUserSignUp)

app.post('/mission/:missionId/reviews', handleAddReview)

app.post('/users/:userId/missions', handleAddProgressMission)

app.post("/restaurants/:restaurantId/missions", handleAddMission)

//전역 오류를 처리하기 위한 미들웨어
//컨트롤러에서 별도로 처리하지 않은 오류가 발생했을때 공통된 오류 응답 내려줌
app.use((err, req, res, next) => {
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

