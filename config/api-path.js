export const API_SERVER = `http://192.168.37.124:3001`;

export const API_LIST = `${API_SERVER}/albums/api`;

// mac ip 記得改
export const AB_LIST = `${API_SERVER}/albums/api`;

// Add Data method: POST
export const AB_ADD_POST = `${API_SERVER}/albums/api`;

// Delete Data method:DELETE
// `${API_SERVER}/albums/api/${ab_id}`
export const AB_DEL_DELETE = `${API_SERVER}/albums/api`;

// 讀取單筆 /albums/api/:ab_id
export const AB_GET_ONE = `${API_SERVER}/albums/api`;

// 修改單筆通訊錄項目 method: PUT
// `${API_SERVER}/albums/api/${ab_id}`
export const AB_ITEM_PUT = `${API_SERVER}/albums/api`;


export const JWT_LOGIN_POST =  `${API_SERVER}/login-jwt`;