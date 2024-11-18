
//회원가입 시 이메일 중복
export class DuplicateUserEmailError extends Error {
    errorCode = "U001"


    constructor(data) {
        const reason = "이미 존재하는 이메일입니다"
        super(reason) //부모클래스의 생성자르 ㄹ호출 
        this.reason = reason
        this.data = data
    }
}

//회원가입 시 전화번호 중복
export class DuplicateUserNumberError extends Error {
    errorCode = "U002"

    constructor(reason, data) {
        super(reason)
        this.reason = reason
        this.data = data
    }
}

//가게에 리뷰 추가 시 가게 정보 없음 
export class NoExistRestaurantError extends Error {
    errorCode = "RES001"

    constructor(reason, data) {
        super(reason)
        this.reason = reason
        this.data = data
    }
}

//가게에 리뷰 추가 시 이미 리뷰를 작성한 미션
export class DuplicateReviewError extends Error {
    errorCode = "REV002"

    constructor(reason, data) {
        super(reason)
        this.reason = reason
        this.data = data
    }
}

//진행중인 미션 추가 시 이미 진행중인 미션 
export class AlreadyProgressMissionError extends Error {
    errorCode = "M001"


    constructor(reason, data) {
        super(reason)
        this.reason = reason
        this.data = data
    }
}

//path variable로 받은 id가 유효하지 않을 때 
export class InvalidIdError extends Error {
    errorCode = "P001"


    constructor() {
        const reason = "path variable로 받은 id값이 유효하지 않습니다"
        super(reason)
        this.reason = reason
    }
}