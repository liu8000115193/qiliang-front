import request from "../utils/axios"

export function getCalibrations(){
  return request({
    url: `/calibrations`,
    method: "GET"
  })
}

export function deleteCalibrations(ids:string){
  return request({
    url: `/calibrate/${ids}`,
    method: "DELETE"
  })
}

// 添加标定任务
export function addCalibrate(scanName:string,calibrateType:string){
  return request({
    url: `/calibrate`,
    method: "POST",
    params:{
      scanName,
      calibrateType
    }
  })
}