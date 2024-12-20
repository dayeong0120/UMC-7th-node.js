

export const bodyToMission = (body, restaurantId) => {
    const missionPeriod = body.missionPeriod ? new Date(new Date(body.missionPeriod).setUTCHours(0, 0, 0, 0)) : null // null도 가능하게 설정 
    // 한국과 타임존차이로 날짜가 다르게 반환됨 -> UTC 타임존으로 변환한 날짜 사용 

    console.log('dto변환 전 데이터 ', body)

    const numRestaurantId = Number(restaurantId)
    return {
        awardedPoints: body.awardedPoints || 0,
        minimumAmount: body.minimumAmount || 0,
        missionPeriod,
        restaurantId: numRestaurantId
    }
}

export const responseFromMission = (data) => {
    const missionPeriod = data.missionPeriod ? new Date(new Date(data.missionPeriod).setUTCHours(0, 0, 0, 0)).toISOString().split('T')[0] : null
    console.log('dto 반환 전', data)
    console.log('missionPeriod : ', missionPeriod)
    return {
        awardedPoints: data.awardedPoints || 0,
        minimumAmount: data.minimumAmount || 0,
        missionPeriod: missionPeriod || null,
        restaurantId: data.restaurantId,
        certificationNumber: data.certificationNumber

    }
}


export const responseFromMissions = (missions) => {


    const formattedMissions = missions.map(mission => (

        {
            id: mission.id,
            awardedPoints: mission.awardedPoints || 0,
            minimumAmount: mission.minimumAmount || 0,
            certificationNumber: mission.certificationNumber,
            missionPeriod: mission.missionPeriod ? new Date(new Date(mission.missionPeriod).setUTCHours(0, 0, 0, 0)).toISOString().split('T')[0] : null



        }))

    console.log("뭐가 문제지 : ", formattedMissions)

    return {
        data: formattedMissions,
        pagination: {
            cursor: missions.length ? missions[missions.length - 1].id : null
        }
    }
}