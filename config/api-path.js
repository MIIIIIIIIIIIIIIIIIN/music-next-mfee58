export const API_SERVER = `http://localhost:3005`;

// mac ip 記得改
export const AB_LIST = `${API_SERVER}/api/albums`;

// Add Data method: POST
export const AB_ADD_POST = `${API_SERVER}/api/albums`;
export const AB_Genres_POST = `${API_SERVER}/api/postGenres`;



// Delete Data method:DELETE
// `${API_SERVER}/albums/api/${ab_id}`
export const AB_DEL_DELETE = `${API_SERVER}/api/albums`;

// 讀取單筆 /albums/api/:ab_id
export const AB_GET_ONE = `${API_SERVER}/api/albums`;

// 修改單筆通訊錄項目 method: PUT
// `${API_SERVER}/albums/api/${ab_id}`
export const AB_ITEM_PUT = `${API_SERVER}/api/albums`;


export const JWT_LOGIN_POST =  `${API_SERVER}/login-jwt`;

