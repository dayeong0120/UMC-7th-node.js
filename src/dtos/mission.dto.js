

export const bodyToMission = (body, restaurantId) => {
    const missionPeriod = body.missionPeriod ? new Date(new Date(body.missionPeriod).setUTCHours(0, 0, 0, 0)) : null // null도 가능하게 설정 
    // 한국과 타임존차이로 날짜가 다르게 반환됨 -> UTC 타임존으로 변환한 날짜 사용 

    console.log('dto변환 전 데이터 ', body)
    return {
        awardedPoints: body.awardedPoints || 0,
        minimumAmount: body.minimumAmount || 0,
        missionPeriod,
        restaurantId: restaurantId
    }
}

export const responseFromMission = (data) => {
    const missionPeriod = data.mission_period ? new Date(new Date(data.mission_period).setUTCHours(0, 0, 0, 0)).toISOString().split('T')[0] : null

    return {
        awardedPoints: data.awarded_points || 0,
        minimumAmount: data.minimum_amount || 0,
        missionPeriod: missionPeriod || null,
        restaurantId: data.restaurant_id,
        certificationNumber: data.certification_number

    }
}