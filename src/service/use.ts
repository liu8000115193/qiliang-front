import request from "../utils/axios"

/**
 * 获取设备信息
 * @returns 
 */
export function getEquipment() {
  return request({
    url: `/scanner/status`,
    method: "GET"
  })
}

// 唤醒屏幕
export function wakeScreen() {
  return request({
    url: `/wake/screen`,
    method: "POST"
  })
}

export function getStat() {
  return request({
    url: `/scan/stat`,
    method: "GET"
  })
}

export function getSetting(){
  return request({
    url: `/setting`,
    method: "GET"
  })
}

export function getNotify(){
  return request({
    url: `/scanner/notify`,
    method: "GET"
  })
}

export function deleteNotify(type:string){
  return request({
    url: `/scanner/notify`,
    method: "DELETE",
    params:{
      type
    }
  })
}

export function updateSetting(params:Record<string,any>){
  return request({
    url: `/setting`,
    method: "PUT",
    data:params
  })
}

/**
 * 开始扫描
 * @returns 
 */
export function scanning(params:object) {
  return request({
    url: `/v1/start/scan`,
    method: "POST",
    params
  })
}

/**
 * 停止扫描
 * @returns 
 */
export function stopScan(params:object) {
  return request({
    url: `/kill/process`,
    method: "POST",
    params
  })
}

/**
 * 获取扫描状态
 * @returns 
 */
export function getScanType(scanPath:string){
  return request({
    url: `/v1/scan/status`,
    method: "GET",
    params:{
      scanPath: `/scanning/result_files/${scanPath}`
    }
  })
}

export function getElectricity(){
  return request({
    url: `/native/electricity`,
    method: "GET"
  })
}

// 关机
export function closeEquipment(){
  return request({
    url: `/close`,
    method: "GET"
  })
}

// 获取wifi
export function getWifiList(){
  return request({
    url: `/wifi/list`,
    method: "GET"
  })
}

// 连接wifi
export function connectWifi(params:Record<string,any>){
  return request({
    url: `/wifi/connect`,
    method: "POST",
    params
  })
}

// 设置设备旋转
export function startRotate(isRotate:boolean){
  return request({
    url: `/rotate`,
    method: "GET",
    params:{
      isRotate
    }
  })
}

export function getScanList(){
  return request({
    url: `/scan/list`,
    method: "GET"
  })
}

export function deleteScanItem(ids:string){
  return request({
    url: `/scan/${ids}`,
    method: "DELETE"
  })
}